import { FromInput } from "@/components/reuseable/form-input";
import Form from "@/components/reuseable/from";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { setActiveModal, setOtpInfo } from "@/redux/features/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { sign_In } from "@/schema";

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const router = useRouter();
  const from = useForm({
    resolver: zodResolver(sign_In.partial()),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
    dispatch(setActiveModal("verify"));
    dispatch(
      setOtpInfo({
        email: values.email,
      })
    );
    // toast.success("Login Successfully", {
    //   description: "You have successfully logged in",
    // });
    // router.push("/dashboard");
  };
  return (
    <>
      <div className="bg-[#EDEDED]  text-xl font-bold w-full h-12 content-center text-center top-0 left-0">
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
          <FromInput
            className="h-10"
            name="email"
            label="Email"
            placeholder="Enter your email"
            icon={<FavIcon name="mail" className="size-4" color="#777777" />}
          />

          <Button className="w-full">Send Code</Button>
        </Form>
      </div>
    </>
  );
}
