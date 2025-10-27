import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

export default function AuthBox({ title }: any) {
  return (
    <div>
      <div className="bg-[#EDEDED]  text-xl font-bold w-full h-12 content-center text-center top-0 left-0">
        {title}
      </div>
      <div className="mt-2">
        <Tabs defaultValue="sign-in">
          <TabsList className="w-full  h-10 p-0 rounded-xs">
            <TabsTrigger
              value="sign-in"
              className="cursor-pointer  border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground bg-muted py-3"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="sign-up"
              className="rounded-none  cursor-pointer  border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground bg-muted py-3"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent className="p-4" value="sign-in">
            <SignIn />
          </TabsContent>
          <TabsContent className="p-4" value="sign-up">
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
