"use client";
import { FromInput } from "@/components/reuseable/form-input";
import Form from "@/components/reuseable/from";
import { FromTextArea } from "@/components/reuseable/from-textarea";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { cn } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

interface ContactUsProps {
  title?: string;
  className?: string;
}

export default function ContactUs({
  title = "Contact Us",
  className,
}: ContactUsProps) {
  const from = useForm({
    // resolver: zodResolver(sign_In),
    defaultValues: {
      name: "",
      email: "",
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
    <div id="contact-us" className={cn("pt-16 container", className)}>
      <h1 className="mb-10">{title}</h1>
      <div className="bg-figma-gray rounded-md p-3 md:p-15">
        <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
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
          <FromTextArea
            label="Description"
            name="description"
            placeholder="Briefly describe your issue"
            className="min-h-44 rounded-3xl"
          />

          <Button className="w-full">Send</Button>
        </Form>
      </div>
    </div>
  );
}
