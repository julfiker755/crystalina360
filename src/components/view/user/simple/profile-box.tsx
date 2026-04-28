"use client";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { Button } from "@/components/ui";
import { SubTitle } from "@/components/reuseable/sub-title";
import { ImgBox } from "@/components/reuseable/Img-box";
import { useLogout } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ProfileBox() {
  const t = useTranslations("user.profile.left");
  const { logout, isLoading: logoutLoading } = useLogout();
  const { data: profile, isLoading } = useGetProfileQuery({});
  const { img, name, email } = profile?.data?.user || {};

  const itemBox = [
    {
      id: 1,
      icon: "completed",
      title: t("completed_events"),
      count: profile?.data?.completed_events,
      bgColor: "#FFF5F6",
      shadow:
        "0 2px 4px 0 rgba(196, 172, 164, 0.25), 0 -2px 4px 0 rgba(196, 172, 164, 0.25), 2px 0 4px 0 rgba(196, 172, 164, 0.25), -2px 0 4px 0 rgba(196, 172, 164, 0.25)",
    },
    {
      id: 2,
      icon: "cost",
      title: t("total_cost"),
      count: profile?.data?.total_paid,
      bgColor: "#FDF6FF",
      shadow:
        "0 2px 4px 0 rgba(196, 172, 164, 0.25), 0 -2px 4px 0 rgba(196, 172, 164, 0.25), 2px 0 4px 0 rgba(196, 172, 164, 0.25), -2px 0 4px 0 rgba(196, 172, 164, 0.25)",
    },
  ];
  return (
    <div className="space-y-4">
      <div className="bg-figma-gray h-fit p-4 rounded-md space-y-6 *:text-figma-black">
        <SubTitle className="text-figma-black" text={t("basic_info")} />
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
              <Button className="w-full text-white!">{t("edit_profile")}</Button>
            </Link>
          </div>
          <Button
            onClick={() => logout()}
            className="w-full text-primary! bg-transparent border disabled:opacity-100"
            disabled={logoutLoading}
          >
            {t("log_out")}
          </Button>
        </div>
      </div>
      {!isLoading && !profile?.data?.user?.profile_status?.is_profile_complete && (
        <div className="bg-figma-gray h-fit p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-figma-black">{t("profile_completion")}</h4>
            <span className="text-[#9C8474] font-bold">{profile?.data?.user?.profile_status?.completion_percentage || '0%'}</span>
          </div>
          <div className="w-full bg-[#F5EBE0] h-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9C8474] rounded-full"
              style={{
                width: `${profile?.data?.user?.profile_status?.completion_percentage}`,
              }}
            />
          </div>
          <p className="text-sm text-figma-black mt-3">
            {t("description")}
          </p>
        </div>
      )}

    </div>
  );
}
