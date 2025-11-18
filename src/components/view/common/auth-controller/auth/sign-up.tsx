import { FromInput } from "@/components/reuseable/form-input";
import Form from "@/components/reuseable/from";
import { Button } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { sign_Up } from "@/schema";
import { routeName } from "@/lib";
import { FromInput2 } from "@/components/reuseable/form-input2";

export default function SignUp() {
  const pathname = usePathname();
  const router = useRouter();
  const from = useForm({
    resolver: zodResolver(sign_Up),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      c_password: "",
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
        {pathname?.includes(routeName) ? (
          // == oprator ==
          <div className="space-y-7">
            <FromInput2
              className="h-10"
              name="name"
              label="Full Name"
              placeholder="Enter your Full Name"
            />
            <FromInput2
              className="h-10"
              name="email"
              label="Email"
              placeholder="Enter your email"
            />

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
              placeholder="Enter Your Confirm password"
              eye={true}
            />
          </div>
        ) : (
          // == user ==
          <>
            <FromInput
              className="h-10"
              name="name"
              label="Full Name"
              placeholder="Enter your Full Name"
              icon={<FavIcon name="user" className="size-4" color="#777777" />}
            />
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
              placeholder="Enter Your Confirm password"
              eye={true}
              icon={
                <FavIcon name="password" className="size-5" color="#777777" />
              }
            />
          </>
        )}

        <Button className="w-full">Sign Up</Button>
      </Form>
    </div>
  );
}
