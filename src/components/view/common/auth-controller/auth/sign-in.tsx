import { FromInput } from "@/components/reuseable/form-input";
import Form from "@/components/reuseable/from";
import { Button, Checkbox, Label } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import {
  controlkey,
  setActiveModal,
  setOtpInfo,
  setUser,
  toggleIsOpen,
} from "@/redux/features/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { sign_In } from "@/schema";
import { authKey, helpers, roleKey, routeName } from "@/lib";
import { FromInput2 } from "@/components/reuseable/form-input2";
import {
  authApi,
  useForgotPasswordMutation,
  useLoginInMutation,
} from "@/redux/api/authApi";
import { useId, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ErrorText } from "@/components/reuseable/error";
import { AppState } from "@/redux/store";
import sonner from "@/components/reuseable/sonner";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [LoginIn, { isLoading }] = useLoginInMutation();
  const permition = useAppSelector((state: AppState) => state.auth.signupRole);
  const [error, setIsError] = useState("");
  const [errEmailVarify, setErrEmailVarify] = useState<any>();
  const [forgotPassword, { isLoading: resetLoading }] =
    useForgotPasswordMutation();
  const rememberId = useId();
  const from = useForm({
    resolver: zodResolver(sign_In),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //  == handleSubmit  ==
  const handleSubmit = async (values: FieldValues) => {
    setIsError("");
    setErrEmailVarify({});
    try {
      const data = helpers.fromData(values);
      const res = await LoginIn(data).unwrap();
      const resRole = res?.data?.user?.role;
      const token = res?.data?.token;

      // role base access
      if (resRole !== "admin" && resRole !== permition) {
        const roleErrorMap: Record<string, string> = {
          [roleKey.user]: "You are a user. Go to User Website",
          [roleKey.operator]: "You are an operator. Go to Operator Website",
        };
        setIsError(roleErrorMap[resRole]);
        return;
      }

      if (res.status) {
        helpers.setAuthCookie(authKey, token);
        dispatch(setUser({ token }));
        dispatch(toggleIsOpen());
        if (helpers.getAuthCookie(authKey)) {
          dispatch(
            authApi.endpoints.getProfile.initiate(undefined, {
              forceRefetch: true,
            }),
          );
        }
        if (resRole == roleKey.admin) {
          router.push("/admin");
        } else if (resRole === roleKey.operator) {
          router.push("/operator/dashboard")
        } else if (resRole === roleKey.user) {
          router.push("/")
        }
      }
    } catch (err: any) {
      if (err?.data?.data?.is_verfied == false) {
        setErrEmailVarify(err?.data);
        return;
      } else {
        setIsError(err?.data?.message);
      }
    }
  };

  const handleResetOtp = async (email: string) => {
    try {
      const data = helpers.fromData({ email: email });
      const res = await forgotPassword(data).unwrap();
      if (res.status) {
        dispatch(
          setOtpInfo({
            email: res?.data?.email,
            otp: "",
          }),
        );
        sonner.success(
          "OTP sent successfully",
          "Please check your email for the otp Apply",
        );
      }
    } finally {
      dispatch(setActiveModal(controlkey.emailVafi));
    }
  };

  return (
    <div>
      <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
        {pathname?.includes(routeName) ? (
          <>
            <div className="mt-1 mb-5">
              <FromInput2
                className="h-10"
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
            </div>
            <FromInput2
              className="h-10"
              name="password"
              label="Password"
              placeholder="Enter your password"
              eye={true}
            />
          </>
        ) : (
          <>
            <div>
              <FromInput
                className="h-10"
                name="email"
                label="Email"
                placeholder="Enter your email"
                icon={
                  <FavIcon name="mail" className="size-4" color="#777777" />
                }
              />
            </div>
            <FromInput
              className="h-10"
              name="password"
              label="Password"
              placeholder="Enter your Password"
              eye={true}
              icon={
                <FavIcon name="password" className="size-5" color="#777777" />
              }
            />
          </>
        )}

        <div className="flex items-center mt-3 justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Checkbox className="" id={rememberId} />
            <Label htmlFor={rememberId}>Remember me</Label>
          </div>
          <div
            className="text-primary cursor-pointer  hover:underline"
            onClick={() => dispatch(setActiveModal("forgot"))}
          >
            Forgot Password?
          </div>
        </div>

        <div>
          {errEmailVarify?.message && (
            <h5 className="text-red-500 font-medium text-sm mb-3   flex justify-center">
              {errEmailVarify?.message}{" "}
              <span
                onClick={() => {
                  if (!resetLoading) {
                    handleResetOtp(errEmailVarify?.data?.email);
                  }
                }}
                className="text-figma-green cursor-pointer text-sm underline ml-1.5"
              >
                {" "}
                Varify
              </span>
            </h5>
          )}

          <ErrorText error={error} className="mb-3" />
          <Button disabled={isLoading} className="w-full">
            Sign in
          </Button>
        </div>
      </Form>
    </div>
  );
}
