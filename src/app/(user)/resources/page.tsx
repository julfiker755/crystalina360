import TabBox from "@/components/reuseable/tab-box";
import { TabsContent } from "@/components/ui";
import {
  Blogs,
  Partnership,
  Podcast,
} from "@/components/view/user/simple/resources-tab";
import { useTranslations } from "next-intl";


export default function Resources() {
  const t = useTranslations("user.resources");
  return (
    <div className="container">
      <TabBox
        defaultValue="blogs"
        tabItem={[
          { label: t("blogs"), value: "blogs" },
          { label: t("podcast"), value: "podcast" },
          { label: t("partnership"), value: "partnership" },
        ]}
        className="flex justify-start w-fit mt-8"
        tabStyle="border-b border-transparent text-lg data-[state=active]:border-primary! data-[state=active]:border-b! data-[state=active]:text-primary"
      >
        <TabsContent value="blogs">
          <Blogs />
        </TabsContent>
        <TabsContent value="podcast">
          <Podcast />
        </TabsContent>
        <TabsContent value="partnership">
          <Partnership />
        </TabsContent>
      </TabBox>
    </div>
  );
}
