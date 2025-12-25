import { FromInput } from "@/components/reuseable/form-input";
import Form from "@/components/reuseable/from";
import { Button } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { setActiveModal, setOtpInfo } from "@/redux/features/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { sign_In } from "@/schema";
import { helpers, routeName } from "@/lib";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { useState } from "react";
import sonner from "@/components/reuseable/sonner";

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const [error, setIsError] = useState("");
  const from = useForm({
    resolver: zodResolver(sign_In.partial()),
    defaultValues: {
      email: "",
    },
  });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (values: FieldValues) => {
    setIsError("");
    try {
      const data = helpers.fromData(values);
      const res = await forgotPassword(data).unwrap();
      if (res.status) {
        dispatch(setActiveModal("verify"));
        dispatch(
          setOtpInfo({
            email: res?.data?.email,
            otp: "",
          })
        );
        sonner.success(
          "OTP sent successfully",
          "Please check your email for the otp"
        );
      }
    } catch (err: any) {
      setIsError(err?.data?.error);
    }
  };
  return (
    <>
      <div className="bg-figma-delete  text-xl font-bold w-full h-12 content-center text-center top-0 left-0">
        <ul className="flex justify-between items-center">
          <li onClick={() => dispatch(setActiveModal("signIn"))}>
            {" "}
            <ArrowLeft
              size={20}
              className="text-figma-black ml-2 cursor-pointer"
            />{" "}
          </li>
          <li className="text-xl font-bold">Forgot Password</li>
          <li className="opacity-0">0</li>
        </ul>
      </div>
      <div className="p-4">
        <div className="pb-5">
          <h5 className="size-10 rounded-md mx-auto border grid place-items-center">
            <FavIcon name="forget" />
          </h5>
          <p className="text-center px-10 pt-2">
            Enter your registered email address and we will sent you a 6 digit
            code to that email.
          </p>
        </div>
        <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
          {pathname?.includes(routeName) ? (
            <FromInput2
              className="h-10"
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
          ) : (
            <FromInput
              className="h-10"
              name="email"
              label="Email"
              placeholder="Enter your email"
              icon={<FavIcon name="mail" className="size-4" color="#777777" />}
            />
          )}
          <div>
            {error && (
              <h5 className="text-red-500 flex justify-center mb-3 text-sm">
                {error}
              </h5>
            )}
            <Button disabled={isLoading} className="w-full">
              Send Code
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
