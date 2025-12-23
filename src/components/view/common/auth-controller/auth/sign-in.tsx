import { FromInput } from "@/components/reuseable/form-input";
import Form from "@/components/reuseable/from";
import { Button, Checkbox, Label } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import { useDispatch } from "react-redux";
import {
  setActiveModal,
  setUser,
  toggleIsOpen,
} from "@/redux/features/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { sign_In } from "@/schema";
import { roleKey, routeName } from "@/lib";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { useLoginInMutation } from "@/redux/api/authApi";

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [LoginIn] = useLoginInMutation();
  const from = useForm({
    resolver: zodResolver(sign_In),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const roleName = pathname.includes("/operator")
    ? roleKey.operator
    : roleKey.user;

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
    // console.log(values);
    // dispatch(
    //   setUser({
    //     name: "John Doe",
    //     email: values.email,
    //     role: roleName,
    //   })
    // );
    // dispatch(toggleIsOpen());
    // toast.success("Login Successfully", {
    //   description: "You have successfully logged in",
    // });
    // router.push("/dashboard");
  };
  return (
    <div>
      <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
        {pathname?.includes(routeName) ? (
          <div className="mt-1">
            <FromInput2
              className="h-10"
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
          </div>
        ) : (
          <FromInput
            className="h-10"
            name="email"
            label="Email"
            placeholder="Enter your email"
            icon={<FavIcon name="mail" className="size-4" color="#777777" />}
          />
        )}

        {pathname?.includes(routeName) ? (
          <div className="mt-6">
            <FromInput2
              className="h-10"
              name="password"
              label="Password"
              placeholder="Enter your password"
              eye={true}
            />
          </div>
        ) : (
          <FromInput
            className="h-10"
            name="password"
            label="Password"
            placeholder="Enter your password"
            eye={true}
            icon={
              <FavIcon name="password" className="size-5" color="#777777" />
            }
          />
        )}
        <div className="flex items-center mt-3 justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Checkbox className="" id="remember-me" />
            <Label htmlFor="remember-me">Remember me</Label>
          </div>
          <div
            className="text-primary cursor-pointer  hover:underline"
            onClick={() => dispatch(setActiveModal("forgot"))}
          >
            Forgot Password?
          </div>
        </div>
        <Button className="w-full">Sign in</Button>
      </Form>
    </div>
  );
}
