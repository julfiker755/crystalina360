"use client";
import { ImgBox } from "@/components/reuseable/Img-box";
import {
  BadgeShow,
  InputShow,
  TextAreaShow,
} from "@/components/reuseable/input-show";
import Modal2 from "@/components/reuseable/modal2";
import { SubTitle } from "@/components/reuseable/sub-title";
import TabBox from "@/components/reuseable/tab-box";
import UpdatePassword from "@/components/reuseable/update-password";
import { Button, TabsContent } from "@/components/ui";
import { CloseIcon } from "@/components/view/common/btn-modal";
import ProfileEdit2 from "@/components/view/oparator/simple/edit-profile";
import { useModalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import { RandomImg } from "@/lib";
import { clearAuth } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const itemBox = [
  {
    id: 1,
    icon: "completed",
    title: "Total Events",
    count: "653",
  },
  {
    id: 2,
    icon: "cost",
    title: "Total revenue",
    count: "$5684.00",
  },
  {
    id: 3,
    icon: "ongoing_events",
    title: "Joined since",
    count: "16 Sep, 2024",
  },
];

const initState = {
  isProfile: false,
  isPassword: false,
};
export default function Profile() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [state, setState] = useModalState(initState);

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="bg-figma-delete p-6 rounded-md space-y-6 *:text-figma-black">
          <div>
            <ImgBox
              src={RandomImg()}
              className="w-32 h-32 rounded-full mx-auto"
              alt="Profile"
            />
            <div className="flex items-center justify-center space-x-2 mt-3">
              <span className="font-medium text-base">Elizabeth Olson</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>example@gmail.com</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {itemBox?.map((item) => (
              <div
                key={item.id}
                className="p-3 flex last:col-span-2 items-center bg-white rounded-md space-y-0.5"
              >
                <div className="grid size-10 rounded-md place-items-center">
                  <FavIcon className="size-6" name={item.icon as any} />
                </div>
                <div>
                  <p className="text-figma-black">{item.title}</p>
                  <h2>{item.count}</h2>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={() => {
              dispatch(clearAuth());
              router.push("/operator");
            }}
            className="flex justify-center mt-5"
          >
            <Button variant="destructive" size="lg" className="w-fit">
              <FavIcon className="size-5" name="logout" />
              Logout
            </Button>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <div className="p-4 rounded-md space-y-6 h-full *:text-figma-black">
            <SubTitle className="text-figma-black" text="Profile" />
            <TabBox
              defaultValue="overview"
              tabItem={["Overview", "Change password"]}
              className="justify-start w-fit"
              tabStyle="border-b  border-transparent data-[state=active]:border-primary!  data-[state=active]:border-b!  data-[state=active]:text-primary"
            >
              <TabsContent value="overview" className="p-0">
                <div className="space-y-7 pt-4 relative">
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <InputShow label="Your full name" value="Elizabeth Olson" />
                    <InputShow label="Email" value="example@gmail.com" />
                  </div>
                  <TextAreaShow
                    label="Your bio"
                    value="Lorem ipsum dolor sit amet consectetur. Viverra pretium maecenas tortor odio interdum arcu sed gravida aliquam. Eros amet pulvinar amet sit. Viverra tortor auctor faucibus nulla sapien consequat ligula lectus in. Ut at quis dolor senectus turpis. Nunc at vitae duis quis ornare tempus. Et ornare erat molestie lacus. Iaculis sed metus vitae egestas adipiscing pulvinar amet. Morbi mattis facilisis convallis adipiscing ut arcu turpis mattis. Eu viverra posuere nunc amet nulla ac. Aliquam scelerisque quam nibh aliquam velit. Consectetur a tincidunt vel arcu viverra pellentesque. Hac vivamus amet netus non lacus vivamus eget at. Quam enim duis sagittis elit egestas. Nec enim sem elementum nulla."
                  />
                  <BadgeShow
                    label="Your skills"
                    items={["Skill-1", "Skill-2", "Skill-3"]}
                  />
                  <Button
                    onClick={() => setState("isProfile", true)}
                    className="absolute  -top-10 right-0"
                  >
                    {" "}
                    <FavIcon color="#fff" name="edit2" />
                    Edit profile
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="change-password" className="space-y-6">
                <div className="pt-5">
                  <UpdatePassword
                    btnStyle="flex w-fit justify-end"
                    className="space-y-8"
                  />
                </div>
              </TabsContent>
            </TabBox>
          </div>
        </div>
      </div>
      {/* ====== profie edit======= */}
      <Modal2
        open={state.isProfile}
        setIsOpen={(v) => setState("isProfile", v)}
        className="sm:max-w-lg"
      >
        <CloseIcon
          className="mt-2 mr-2"
          onClose={() => setState("isProfile", false)}
        />
        <ProfileEdit2 />
      </Modal2>
    </div>
  );
}
