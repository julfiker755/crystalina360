import TabBox from "@/components/reuseable/tab-box";
import { TabsContent } from "@/components/ui";
<<<<<<< HEAD
import {
  Blogs,
  Partnership,
  Podcast,
} from "@/components/view/user/simple/resources-tab";
=======
>>>>>>> 10431b705134f9a8036a04c66323d975365de2ec

export default function Resources() {
  return (
    <div className="container">
      <TabBox
        defaultValue="blogs"
        tabItem={["Blogs", "Podcast", "Partnership"]}
<<<<<<< HEAD
        className="flex justify-start w-fit mt-5"
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
=======
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
>>>>>>> 10431b705134f9a8036a04c66323d975365de2ec
        </TabsContent>
      </TabBox>
    </div>
  );
}
