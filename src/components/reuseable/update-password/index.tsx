import Form from "@/components/reuseable/from";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { FromInput } from "../form-input";
import { change_Pass } from "@/schema";
import { cn, roleKey } from "@/lib";
import { useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { FromInput2 } from "../form-input2";

export default function UpdatePassword({
  btnStyle,
  btnStyle2,
  className,
  inputStyle,
}: any) {
  const { user } = useAppSelector((state: AppState) => state.auth);
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
    <Form from={from2} onSubmit={handlePasswordSubmit}>
      <div className={cn("space-y-6", className)}>
        {user.role === roleKey.user ? (
          <>
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
          </>
        ) : (
          <>
            <FromInput2
              label="Current Password"
              name="current_password"
              placeholder="Enter current password"
              className={cn("h-10", inputStyle)}
              eye={true}
            />
            <FromInput2
              label="New Password"
              name="new_password"
              placeholder="Enter new password"
              className={cn("h-10", inputStyle)}
              eye={true}
            />
            <FromInput2
              label="Retype New Password"
              name="c_password"
              placeholder="Enter retype new password"
              className={cn("h-10", inputStyle)}
              eye={true}
            />
          </>
        )}

        <div className={btnStyle2}>
          <Button className={cn("w-full", btnStyle)}>Save Changes</Button>
        </div>
      </div>
    </Form>
  );
}
