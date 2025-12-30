"use client";
import { Repeat } from "@/components/reuseable/repeat";
import { SubTitle } from "@/components/reuseable/sub-title";
import TabBox from "@/components/reuseable/tab-box";
import { QuillText } from "@/components/reuseable/text-editor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Skeleton,
  TabsContent,
} from "@/components/ui";
import {
  privacyPolicy,
  faqQuestions,
  couponsItem,
} from "@/components/view/user/dummy-json";
import { AppAlert } from "@/components/view/user/reuse";
import ProfileBox from "@/components/view/user/simple/profile-box";
import { useGetTermsQuery } from "@/redux/api/admin/termsApi";
import { useState } from "react";

export default function Profile() {
  const [copied, setCopied] = useState("");
  const { data: terms, isLoading: termsLoading } = useGetTermsQuery({});

  const handleCopy = async (value: any) => {
    await navigator.clipboard.writeText(value);
    setCopied(value);
  };

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <ProfileBox />
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
                {termsLoading ? (
                  <SkeletonLoader />
                ) : (
                  <QuillText
                    conStyle="bg-transparent!"
                    editorStyle="bg-transparent!"
                    text={terms?.data?.terms_condition}
                  />
                )}
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
                        <span className="text-white text-xl font-bold lg:text-2xl  transform -rotate-90 whitespace-nowrap">
                          Discount
                        </span>
                      </div>

                      {/* Right White Section with Details */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <h4 className="text-gray-500 text-base lg:text-lg font-semibold">
                            {item.offer}
                          </h4>
                          <h2 className="text-xl lg:text-[28px] font-bold text-figma-black">
                            {item.code}
                          </h2>
                          <h4 className="text-article mt-1">
                            Expiry: {item.expiry}
                          </h4>
                        </div>

                        <Button
                          onClick={() => handleCopy(item.code)}
                          className={`w-fit text-lg text-black font-normal mt-5 md:h-12 px-5 lg:px-10 rounded-full bg-transparent border `}
                        >
                          {copied === item.code ? "Copied!" : "Copy code"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </TabBox>
          </div>
        </div>
      </div>
      <AppAlert className="pb-10" />
    </div>
  );
}

const SkeletonLoader = () => {
  return (
    <div className="space-y-8">
      <Repeat count={3}>
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/2 bg-[#e9e5e5c1] rounded-sm" />
          <Skeleton className="h-6 w-full bg-[#e9e5e5c1] rounded-sm" />
          <Skeleton className="h-6 w-full bg-[#e9e5e5c1] rounded-sm" />
        </div>
      </Repeat>
    </div>
  );
};
