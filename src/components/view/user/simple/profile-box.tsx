"use client";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { clearAuth } from "@/redux/features/authSlice";
import { Button } from "@/components/ui";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { SubTitle } from "@/components/reuseable/sub-title";
import { ImgBox } from "@/components/reuseable/Img-box";
import { PlaceholderImg } from "@/lib";
import FavIcon from "@/icon/favIcon";
import { useModalState } from "@/hooks";
import Modal2 from "@/components/reuseable/modal2";
import { CloseIcon } from "../../common/btn-modal";
import ProfileEdit from "./profile-edit";
import UpdatePassword from "@/components/reuseable/update-password";

const initState = {
  isProfile: false,
  isPassword: false,
};

export default function ProfileBox() {
  const [state, setState] = useModalState(initState);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: profile } = useGetProfileQuery({});

  console.log(profile);

  const itemBox = [
    {
      id: 1,
      icon: "completed",
      title: "Completed events",
      count: profile?.data?.completed_events,
      bgColor: "#FFF5F6",
      shadow:
        "0 2px 4px 0 rgba(196, 172, 164, 0.25), 0 -2px 4px 0 rgba(196, 172, 164, 0.25), 2px 0 4px 0 rgba(196, 172, 164, 0.25), -2px 0 4px 0 rgba(196, 172, 164, 0.25)",
    },
    {
      id: 2,
      icon: "cost",
      title: "Total cost",
      count: profile?.data?.total_paid,
      bgColor: "#FDF6FF",
      shadow:
        "0 2px 4px 0 rgba(196, 172, 164, 0.25), 0 -2px 4px 0 rgba(196, 172, 164, 0.25), 2px 0 4px 0 rgba(196, 172, 164, 0.25), -2px 0 4px 0 rgba(196, 172, 164, 0.25)",
    },
  ];
  return (
    <div className="bg-figma-gray p-4 rounded-md space-y-6 *:text-figma-black">
      <SubTitle className="text-figma-black" text="Basic info" />
      <div>
        <ImgBox
          src={profile?.data?.user?.img || "/avater.png"}
          className="w-32 h-32 mx-auto"
          alt="Profile"
        />
        <div className="flex items-center justify-center space-x-2 mt-3">
          <span className="font-medium text-base">
            {profile?.data?.user?.name}
          </span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="font-medium text-base">
            {" "}
            {profile?.data?.user?.email}
          </span>
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
            <h2 className="text-2xl">{item.count || 0}</h2>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <Button
          onClick={() => setState("isProfile", true)}
          className="w-full text-white!"
        >
          Edit Profile
        </Button>
        <Button
          onClick={() => {
            dispatch(clearAuth());
            router.push("/");
          }}
          className="w-full text-primary! bg-transparent border"
        >
          Log Out
        </Button>
      </div>
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
