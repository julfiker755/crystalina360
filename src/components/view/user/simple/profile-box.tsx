"use client";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { Button } from "@/components/ui";
import { SubTitle } from "@/components/reuseable/sub-title";
import { ImgBox } from "@/components/reuseable/Img-box";
import { useLogout } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";


export default function ProfileBox() {
  const { logout, isLoading: logoutLoading } = useLogout();
  const { data: profile } = useGetProfileQuery({});
  const { img, name, email } = profile?.data?.user || {};

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
    <div className="bg-figma-gray h-fit p-4 rounded-md space-y-6 *:text-figma-black">
      <SubTitle className="text-figma-black" text="Basic info" />
      <div>
        <ImgBox
          src={img || "/avater.png"}
          className="w-32 h-32 mx-auto"
          alt="Profile"
        />
        <div className="flex items-center justify-center space-x-2 mt-3">
          <span className="font-medium text-base">{name}</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <span className="font-medium text-base"> {email}</span>
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
        <div>
          <Link href={`/profile/update`}>
            <Button
              className="w-full text-white!"
            >
              Edit Profile
            </Button>
          </Link>
        </div>
        <Button
          onClick={() => logout()}
          className="w-full text-primary! bg-transparent border disabled:opacity-100"
          disabled={logoutLoading}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
