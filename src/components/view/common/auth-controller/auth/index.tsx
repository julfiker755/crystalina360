import { CloseIcon } from "../../btn-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/redux/hooks";
import { toggleIsOpen } from "@/redux/features/authSlice";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import { useState } from "react";

export default function Auth({ title }: any) {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("sign-in");

  return (
    <>
      <div className="bg-figma-delete text-xl font-bold w-full h-12 content-center text-center top-0 left-0">
        {title}
      </div>
      <div className="mt-2">
        <CloseIcon
          className="top-3 right-4"
          onClose={() => dispatch(toggleIsOpen())}
        />
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-[95%] mx-auto mt-2  h-10 p-0 rounded-full">
            <TabsTrigger
              value="sign-in"
              className="cursor-pointer   border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground rounded-full bg-muted py-3"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="sign-up"
              className="cursor-pointer  border-transparent data-[state=active]:border-primary rounded-full  data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground bg-muted py-3"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent className="p-4" value="sign-in">
            <SignIn />
          </TabsContent>
          <TabsContent className="p-4" value="sign-up">
            <SignUp setActiveTab={setActiveTab} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
