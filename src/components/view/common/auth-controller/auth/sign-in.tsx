import { FromInput } from "@/components/reuseable/form-input";
import Form from "@/components/reuseable/from";
import { Button, Checkbox, Label } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import {
  setActiveModal,
  setUser,
  toggleIsOpen,
} from "@/redux/features/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { sign_In } from "@/schema";
import { authKey, helpers, roleKey, routeName } from "@/lib";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { authApi, useLoginInMutation } from "@/redux/api/authApi";
import { useId, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [LoginIn, { isLoading }] = useLoginInMutation();
  const [error, setIsError] = useState("");
  const rememberId = useId();
  const from = useForm({
    resolver: zodResolver(sign_In),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    setIsError("");
    try {
      const data = helpers.fromData(values);
      const res = await LoginIn(data).unwrap();
      if (res.status) {
        helpers.setAuthCookie(authKey, res?.data?.token);
        dispatch(setUser({ token: res?.data?.token }));
        dispatch(toggleIsOpen());
        if (helpers.getAuthCookie(authKey)) {
          dispatch(
            authApi.endpoints.getProfile.initiate(undefined, {
              forceRefetch: true,
            })
          );
        }
        if (res?.data?.user?.role == roleKey.admin) {
          router.push("/admin");
        }
      }
    } catch (err: any) {
      setIsError(err?.data?.message);
    }
  };
  return (
    <div>
      <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
        {pathname?.includes(routeName) ? (
          <>
            <div className="mt-1">
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
          {error && (
            <h5 className="text-red-500 flex justify-center mb-3 text-sm">
              {error}
            </h5>
          )}
          <Button disabled={isLoading} className="w-full">
            Sign in
          </Button>
        </div>
      </Form>
    </div>
  );
}
