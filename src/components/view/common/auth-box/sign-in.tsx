import { FromInput } from "@/components/reuseable/form-input";
import Form from "@/components/reuseable/from";
import { Button, Checkbox, Label } from "@/components/ui";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const from = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
    // toast.success("Login Successfully", {
    //   description: "You have successfully logged in",
    // });
    // router.push("/dashboard");
  };
  return (
    <div>
      <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
        <FromInput
          className="h-10"
          name="email"
          label="Email"
          placeholder="Enter your email"
          icon={<FavIcon name="mail" className="size-4" color="#777777" />}
        />

        <FromInput
          className="h-10"
          name="password"
          label="Password"
          placeholder="Password"
          eye={true}
          icon={<FavIcon name="password" className="size-5" color="#777777" />}
        />
        <div className="flex items-center mt-3 justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Checkbox className="" id="remember-me" />
            <Label htmlFor="remember-me">Remember me</Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-primary  hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <Button className="w-full">Sign in</Button>
      </Form>
    </div>
  );
}
