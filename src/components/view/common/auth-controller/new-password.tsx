import { FromInput } from "@/components/reuseable/form-input";
import { clearOtpInfo, setActiveModal } from "@/redux/features/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { useResetPassMutation } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Form from "@/components/reuseable/from";
import { Button } from "@/components/ui";
import { usePathname } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { new_Pass } from "@/schema";
import { helpers, routeName } from "@/lib";
import { useState } from "react";
import FavIcon from "@/icon/favIcon";
import { ArrowLeft } from "lucide-react";

export default function NewPassword() {
  const pathname = usePathname();
  const from = useForm({
    resolver: zodResolver(new_Pass),
    defaultValues: {
      password: "",
      c_password: "",
    },
  });
  const [error, setIsError] = useState("");
  const [resetPass, { isLoading }] = useResetPassMutation();
  const otpInfo = useAppSelector((state) => state.auth.otpInfo);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      email: otpInfo.email,
      otp: otpInfo.otp,
      password: values.password,
      password_confirmation: values.c_password,
    };
    try {
      const data = helpers.fromData(value);
      const res = await resetPass(data).unwrap();
      if (res.status) {
        dispatch(setActiveModal("signIn"));
        dispatch(clearOtpInfo());
      }
    } catch (err: any) {
      setIsError(err?.data?.message);
    }
  };
  return (
    <>
      <div className="bg-figma-delete text-xl font-bold w-full h-12 content-center text-center top-0 left-0">
        <ul className="flex justify-between items-center">
          <li onClick={() => dispatch(setActiveModal("signIn"))}>
            {" "}
            <ArrowLeft
              size={20}
              className="text-figma-black ml-2 cursor-pointer"
            />{" "}
          </li>
          <li className="text-xl font-bold">Set New Password</li>
          <li className="opacity-0">0</li>
        </ul>
      </div>
      <div className="p-4">
        <div className="pb-5">
          <h5 className="size-10 rounded-md mx-auto border grid place-items-center">
            <FavIcon name="new_pass" />
          </h5>
          <p className="text-center px-10 pt-2">
            Set your new password here. It must be 8 characters and combination
            of special characters.
          </p>
        </div>
        <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
          {pathname?.includes(routeName) ? (
            <div className="space-y-7">
              {/* opratore */}
              <FromInput2
                className="h-10"
                name="password"
                label="Password"
                placeholder="Enter Your Password"
                eye={true}
              />
              <FromInput2
                className="h-10"
                name="c_password"
                label="Confirm password"
                placeholder="Enter Yopur Confirm password"
                eye={true}
              />
            </div>
          ) : (
            <>
              <FromInput
                className="h-10"
                name="password"
                label="Password"
                placeholder="Enter Your Password"
                eye={true}
                icon={
                  <FavIcon name="password" className="size-5" color="#777777" />
                }
              />
              <FromInput
                className="h-10"
                name="c_password"
                label="Confirm password"
                placeholder="Enter Yopur Confirm password"
                eye={true}
                icon={
                  <FavIcon name="password" className="size-5" color="#777777" />
                }
              />
            </>
          )}
          <div>
            {error && (
              <h5 className="text-red-500 flex justify-center mb-3 text-sm">
                {error}
              </h5>
            )}

            <Button disabled={isLoading} className="w-full">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
