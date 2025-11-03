import { ImgBox } from "@/components/reuseable/Img-box";
import { SubTitle } from "@/components/reuseable/sub-title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  TabsContent,
} from "@/components/ui";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";
import {
  tabItem,
  termsAndConditions,
  privacyPolicy,
  faqQuestions,
} from "@/components/view/user/dummy-json";
import { AppAlert } from "@/components/view/user/reuse";
import FavIcon from "@/icon/favIcon";
import { PlaceholderImg } from "@/lib";

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

export default function Profile() {
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
          <Button className="w-full">Edit Profile</Button>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-figma-gray p-4 rounded-md space-y-6 h-full *:text-figma-black">
            <SubTitle className="text-figma-black" text="Account Settings" />
            <Tabs defaultValue="terms" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4  bg-transparent p-0 h-auto rounded-none">
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

              {/* Tab Contents */}
              <TabsContent value="terms" className="mt-8 space-y-6">
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

              <TabsContent value="privacy" className="mt-8 space-y-6">
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
                <h1>Coupons</h1>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <AppAlert className="pb-10" />
    </div>
  );
}
