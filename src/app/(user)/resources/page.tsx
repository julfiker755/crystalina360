import TabBox from "@/components/reuseable/tab-box";
import { TabsContent } from "@/components/ui";

export default function Resources() {
  return (
    <div className="container">
      <TabBox
        defaultValue="blogs"
        tabItem={["Blogs", "Podcast", "Partnership"]}
        className="flex justify-start w-fit"
      >
        <TabsContent value="blogs">
          <h1>Blogs</h1>
        </TabsContent>
        <TabsContent value="podcast">
          <h1>Podcast</h1>
        </TabsContent>
        <TabsContent value="partnership">
          <h1>Partnership</h1>
        </TabsContent>
      </TabBox>
    </div>
  );
}
