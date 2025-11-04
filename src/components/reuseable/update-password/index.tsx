import Form from "@/components/reuseable/from";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { FromInput } from "../form-input";
import { change_Pass } from "@/schema";

export default function UpdatePassword() {
  const from2 = useForm({
    resolver: zodResolver(change_Pass),
    defaultValues: {
      current_password: "",
      new_password: "",
      c_password: "",
    },
  });

  const handlePasswordSubmit = async (values: FieldValues) => {
    console.log(values);
    // toast.success("Update Successful", {
    //   description: "Your profile has been updated successfully",
    // });
  };
  return (
    <div className="pb-2">
      <div className="my-5">
        <h2 className="font-bold text-center">Change Password</h2>
        <p className="text-center text-primary text-sm">
          Please fill in the correct information to update your account
        </p>
      </div>
      <Form from={from2} onSubmit={handlePasswordSubmit}>
        <div className="space-y-6 pt-5">
          <FromInput
            label="Current Password"
            name="current_password"
            placeholder="Enter current password"
            className="h-10"
            icon={
              <FavIcon name="password" className="size-5" color="#777777" />
            }
            eye={true}
          />
          <FromInput
            label="New Password"
            name="new_password"
            placeholder="Enter new password"
            className="h-10"
            icon={
              <FavIcon name="password" className="size-5" color="#777777" />
            }
            eye={true}
          />
          <FromInput
            label="Retype New Password"
            name="c_password"
            placeholder="Enter retype new password"
            className="h-10"
            icon={
              <FavIcon name="password" className="size-5" color="#777777" />
            }
            eye={true}
          />
          <Button className="w-full">Save Changes</Button>
        </div>
      </Form>
    </div>
  );
}
