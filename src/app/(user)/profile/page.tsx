"use client";
import { ImgBox } from "@/components/reuseable/Img-box";
import Modal2 from "@/components/reuseable/modal2";
import { SubTitle } from "@/components/reuseable/sub-title";
import TabBox from "@/components/reuseable/tab-box";
import UpdatePassword from "@/components/reuseable/update-password";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  TabsContent,
} from "@/components/ui";
import { CloseIcon } from "@/components/view/common/btn-modal";
import {
  termsAndConditions,
  privacyPolicy,
  faqQuestions,
  couponsItem,
} from "@/components/view/user/dummy-json";
import { AppAlert } from "@/components/view/user/reuse";
import ProfileEdit from "@/components/view/user/simple/profile-edit";
import { useModalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import { PlaceholderImg } from "@/lib";
import { useState } from "react";

const itemBox = [
  {
    id: 1,
    icon: "completed",
    title: "Completed events",
    count: "653",
    bgColor: "#FFF5F6",
    shadow:
      "0 2px 4px 0 rgba(196, 172, 164, 0.25), 0 -2px 4px 0 rgba(196, 172, 164, 0.25), 2px 0 4px 0 rgba(196, 172, 164, 0.25), -2px 0 4px 0 rgba(196, 172, 164, 0.25)",
  },
  {
    id: 2,
    icon: "cost",
    title: "Total cost",
    count: "$5684.00",
    bgColor: "#FDF6FF",
    shadow:
      "0 2px 4px 0 rgba(196, 172, 164, 0.25), 0 -2px 4px 0 rgba(196, 172, 164, 0.25), 2px 0 4px 0 rgba(196, 172, 164, 0.25), -2px 0 4px 0 rgba(196, 172, 164, 0.25)",
  },
];

const initState = {
  isProfile: false,
  isPassword: false,
};
export default function Profile() {
  const [state, setState] = useModalState(initState);
  const [copied, setCopied] = useState("");

  const handleCopy = async (value: any) => {
    await navigator.clipboard.writeText(value);
    setCopied(value);
  };

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="bg-figma-gray p-4 rounded-md space-y-6 *:text-figma-black">
          <SubTitle className="text-figma-black" text="Basic info" />
          <div>
            <ImgBox
              src={PlaceholderImg()}
              className="w-32 h-32 mx-auto"
              alt="Profile"
            />
            <div className="flex items-center justify-center space-x-2 mt-3">
              <span className="font-medium text-base">Das Mithun</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="font-medium text-base">sourov12@gmail.com</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {itemBox?.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: item.bgColor,
                }}
                className="p-3 rounded-md space-y-0.5"
              >
                <div
                  style={{
                    boxShadow: item.shadow,
                  }}
                  className="grid size-10 rounded-md bg-white place-items-center"
                >
                  <FavIcon className="size-6" name={item.icon as any} />
                </div>
                <p className="text-lg text-figma-black">{item.title}</p>
                <h2 className="text-2xl">{item.count}</h2>
              </div>
            ))}
          </div>
          <Button
            onClick={() => setState("isProfile", true)}
            className="w-full"
          >
            Edit Profile
          </Button>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <div className="bg-figma-gray p-4 rounded-md space-y-6 h-full *:text-figma-black">
            <SubTitle className="text-figma-black" text="Account Settings" />
            <TabBox
              defaultValue="terms-&-conditions"
              tabItem={[
                "Terms & conditions",
                "Privacy Policy",
                "FAQ",
                "Coupons",
              ]}
              tabStyle="border-b border-transparent data-[state=active]:border-primary!  data-[state=active]:border-b!  data-[state=active]:text-primary"
            >
              <TabsContent
                value="terms-&-conditions"
                className="mt-8 space-y-6"
              >
                <div className="space-y-4">
                  {termsAndConditions?.map((item, index) => (
                    <div key={index}>
                      <h2 className="text-start">
                        {index + 1}.&nbsp;{item.title}
                      </h2>
                      <p className="mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="privacy-policy" className="mt-8 space-y-6">
                <div className="space-y-4">
                  {privacyPolicy?.map((item, index) => (
                    <div key={index}>
                      <h2 className="text-start">
                        {index + 1}.&nbsp;{item.title}
                      </h2>
                      <p className="mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="faq" className="mt-8 space-y-6">
                {/* faqQuestions */}
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  {faqQuestions.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                      <AccordionTrigger className="text-lg cursor-pointer">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>{item.description}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="coupons" className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                  {couponsItem.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex rounded-2xl  overflow-hidden coupons-shadow  bg-white"
                    >
                      <div className="w-24 bg-[#5D37C5] flex items-center justify-center relative">
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-figma-gray! rounded-full shadow-lg" />
                        <span className="text-white font-bold text-xl  transform -rotate-90 whitespace-nowrap">
                          Discount
                        </span>
                      </div>

                      {/* Right White Section with Details */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <h4 className="text-gray-500 text-base lg:text-xl font-semibold">
                            {item.offer}
                          </h4>
                          <h2 className="text-xl lg:text-3xl font-bold text-figma-black">
                            {item.code}
                          </h2>
                          <h4 className="md:text-lg text-article mt-1">
                            Expiry: {item.expiry}
                          </h4>
                        </div>

                        <Button
                          onClick={() => handleCopy(item.code)}
                          className={`w-fit text-lg font-normal mt-5 md:h-12 px-5 lg:px-10 rounded-full bg-transparent border `}
                        >
                          {copied === item.code ? "Copied!" : "Copy code"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </TabBox>
            {/* <Tabs defaultValue="terms" className="w-full">
              <TabsList className="flex justify-between  w-full flex-wrap bg-transparent p-0 h-auto rounded-none">
                {tabItem?.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.value}
                    className="text-article cursor-pointer border-b border-transparent data-[state=active]:border-primary!  data-[state=active]:border-b! data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary"
                  >
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>

     
              
            </Tabs> */}
          </div>
        </div>
      </div>
      <AppAlert className="pb-10" />
      {/* ========== edit profile modal ==========  */}
      <Modal2
        open={state.isProfile}
        setIsOpen={(v) => setState("isProfile", v)}
        className="sm:max-w-lg"
      >
        <CloseIcon
          className="mt-2 mr-2"
          onClose={() => setState("isProfile", false)}
        />
        <ProfileEdit>
          <div
            onClick={() => {
              setState("isPassword", true);
              setState("isProfile", false);
            }}
            className="text-primary cursor-pointer text-end underline mt-2"
          >
            Change Password
          </div>
        </ProfileEdit>
      </Modal2>
      {/* ========== update password Modal ==========  */}
      <Modal2
        open={state.isPassword}
        setIsOpen={(v) => setState("isPassword", v)}
        className="sm:max-w-lg"
      >
        <CloseIcon
          className="mt-2 mr-2"
          onClose={() => setState("isPassword", false)}
        />
        <div className="pb-2">
          <div className="my-5">
            <h2 className="font-bold text-center">Change Password</h2>
            <p className="text-center text-primary text-sm">
              Please fill in the correct information to update your account
            </p>
          </div>
          <UpdatePassword btnStyle="" />
        </div>
      </Modal2>
    </div>
  );
}
