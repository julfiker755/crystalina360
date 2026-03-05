"use client";
import { Repeat } from "@/components/reuseable/repeat";
import { SubTitle } from "@/components/reuseable/sub-title";
import TabBox from "@/components/reuseable/tab-box";
import { QuillText } from "@/components/reuseable/text-editor";
import UpdatePassword from "@/components/reuseable/update-password";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Skeleton,
  TabsContent,
} from "@/components/ui";
import CouponBox from "@/components/view/user/simple/coupon";
import { useGetFqaQuery } from "@/redux/api/admin/fqaApi";
import { useGetPrivacyQuery } from "@/redux/api/admin/privacyApi";
import { useGetTermsQuery } from "@/redux/api/admin/termsApi";

export default function Profile() {
  const { data: terms, isLoading: termsLoading } = useGetTermsQuery({});
  const { data: privacy, isLoading: privacyLoading } = useGetPrivacyQuery({});
  const { data: fqa, isLoading: fqaLoading } = useGetFqaQuery({});

  return (
    <div className="bg-figma-gray p-4 rounded-md space-y-6 h-full *:text-figma-black">
      <SubTitle className="text-figma-black" text="Account Settings" />
      <TabBox
        defaultValue="terms-&-conditions"
        tabItem={[
          "Terms & conditions",
          "Privacy Policy",
          "FAQ",
          "Coupons",
          "Security"
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
          {privacyLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="space-y-4">
              <PrivacyText
                title="Data Collection"
                text={privacy?.data?.data_collection}
              />
              <PrivacyText
                title="Data Usage"
                text={privacy?.data?.data_usage}
              />
              <PrivacyText
                title="Data Protection"
                text={privacy?.data?.data_protection}
              />
              <PrivacyText
                title="Your Responsibilities"
                text={privacy?.data?.your_responsibility}
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="faq" className="mt-8 space-y-6">
          {fqaLoading ? (
            <SkeletonLoader />
          ) : (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {fqa?.data?.slice(0, 5)?.map((item: any, index: any) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-lg cursor-pointer">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className="text-article">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </TabsContent>

        <TabsContent value="coupons" className="mt-8 space-y-6">
          <CouponBox />
        </TabsContent>
        <TabsContent value="security" className="mt-8 space-y-6">
          <UpdatePassword btnStyle="flex w-fit" />
        </TabsContent>
      </TabBox>
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

const PrivacyText = ({ title, text }: { title: string; text: string }) => {
  return (
    <div>
      <h5 className="font-bold text-lg">{title}</h5>
      <p className="text-article text-base">{text} </p>
    </div>
  );
};
