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
import { useLogout, useModalState } from "@/hooks";
import { useGetProfileQuery } from "@/redux/api/authApi";
import FavIcon from "@/icon/favIcon";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useConnectPaypalMutation } from "@/redux/api/operator/opratorApi";

const initState = {
  isProfile: false,
  isPassword: false,
};
export default function Profile() {
  const [state, setState] = useModalState(initState);
  const { data: profile } = useGetProfileQuery({});
  const { img, name, email, bio, skills } = profile?.data?.user || {};
  const { logout, isLoading: logoutLoading } = useLogout();
  const [connectPaypal, { isLoading: paypalLoading }] = useConnectPaypalMutation()


  const stashItem = [
    {
      id: 1,
      icon: "completed",
      title: "Total Events",
      count: profile?.data?.total_events,
    },
    {
      id: 2,
      icon: "cost",
      title: "Total revenue",
      count: profile?.data?.total_revenue,
    }
  ];

  const collectPaypal = async () => {
    const res = await connectPaypal({}).unwrap()
    if (res.status) {
      window.location.href = res?.data
    }
  }

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="bg-figma-delete px-2 lg:px-6 py-8 rounded-md space-y-6 *:text-figma-black">
          <div>
            <ImgBox
              src={img || "/avater.png"}
              className="w-32 h-32 rounded-full mx-auto"
              alt="Profile"
            />
            <div className="flex items-center justify-center space-x-2 mt-3">
              <span className="font-medium text-base">{name}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>{email}</span>
            </div>
          </div>
          <h1 className="w-full h-px bg-[#C4ACA4]/15"></h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {stashItem?.map((item) => (
              <div
                className="p-3 flex  items-center bg-white rounded-md space-y-0.5"
                key={item.id}
              >
                <div className="grid size-10 rounded-md place-items-center">
                  <FavIcon className="size-6" name={item.icon as any} />
                </div>
                <div>
                  <p className="text-figma-black">{item.title}</p>
                  <h2>{item.count || 0}</h2>
                </div>
              </div>
            ))}
          </div>
          <h1 className="w-full h-px bg-[#C4ACA4]/15"></h1>
          <div
            className="p-3 flex last:col-span-2 items-center bg-white rounded-md space-y-0.5"
          >
            <div className="grid size-10 rounded-md place-items-center">
              <FavIcon className="size-6" name="ongoing_events" />
            </div>
            <div>
              <p className="text-figma-black">Joined since</p>
              <h2>{profile?.data?.user?.joined_date}</h2>
            </div>
          </div>


          <div className="flex justify-center mt-5">
            <Button
              disabled={logoutLoading}
              onClick={() => logout()}
              variant="destructive"
              size="lg"
              className="w-fit"
            >
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
                    <InputShow label="Your full name" value={name || "N/A"} />
                    <InputShow label="Email" value={email || "N/A"} />
                  </div>
                  <TextAreaShow label="Your bio" value={bio || "N/A"} />

                  <BadgeShow label="Your skills" items={skills || []} />
                  <Button
                    onClick={() => setState("isProfile", true)}
                    className="absolute  -top-10 right-0"
                  >
                    {" "}
                    <FavIcon color="#fff" name="edit2" />
                    Edit profile
                  </Button>
                  <div className="border p-3 rounded-md flex-col lg:flex-row lg:flex items-center justify-center gap-10">
                    <div>
                      To collect and receive revenue generated from events, you will need to connect your PayPal account to the system. This will allow payments to be processed and transferred to you smoothly and securely
                    </div>
                    {/* PayPal connected */}
                    {profile?.data?.user?.paypal_merchant_id?.length > 0 ? (
                      <Button disabled className="bg-white border disabled:opacity-80 border-primary/20 text-black font-medium mt-5 lg:mt-0"><Image src={"/paypal.svg"} width={20} height={20} alt="img" />
                        PayPal Connected
                      </Button>
                    ) : (
                      <Button disabled={paypalLoading} onClick={() => collectPaypal()} className="bg-white border border-primary/20 text-black font-medium mt-5 lg:mt-0"><Image src={"/paypal.svg"} width={20} height={20} alt="img" />
                        {paypalLoading ? "Connecting your Paypal" : "Connect your Paypal account"}
                        <ArrowRight className="text-[#2790C3]" /></Button>
                    )}

                  </div>
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
