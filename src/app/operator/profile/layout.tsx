"use client";
import { ImgBox } from "@/components/reuseable/Img-box";
import { Button } from "@/components/ui";
import { useGetProfileQuery } from "@/redux/api/authApi";
import FavIcon from "@/icon/favIcon";
import { authKey, helpers } from "@/lib";
import { useAppDispatch } from "@/redux/hooks";
import { clearAuth } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { getInterval } from "@/lib/function-utils";
import { baseApi } from "@/redux/api/baseApi";
import { childrenProps } from "@/types";

export default function ProfileLayout({ children }: childrenProps) {
  const { data: profile } = useGetProfileQuery({});
  const { img, name, email, subscribed_plans } = profile?.data?.user || {};

  const dispatch = useAppDispatch();
  const router = useRouter();

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
    },
  ];

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="bg-figma-delete h-fit px-2 lg:px-6 py-8 rounded-md space-y-6 *:text-figma-black">
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
            <div className="bg-figma-delete w-full py-1 px-3 rounded-md">
              <div className="flex justify-between space-x-10 bg-white px-2 py-1 mx-auto rounded-md max-w-xs mt-3">
                <div className="flex items-center">
                  <FavIcon name="a_plans" />{" "}
                  <span className="ml-2 text-base font-normal">
                    Active plan:
                  </span>
                </div>
                <div className="font-medium text-lg">
                  {subscribed_plans?.interval
                    ? getInterval[subscribed_plans?.interval]
                    : "Free"}
                </div>
              </div>
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
          <div className="p-3 flex last:col-span-2 items-center bg-white rounded-md space-y-0.5">
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
              onClick={() => {
                router.push("/operator");
                helpers.removeAuthCookie(authKey);
                dispatch(clearAuth());
                dispatch(baseApi.util.resetApiState());
              }}
              variant="destructive"
              size="lg"
              className="w-fit"
            >
              <FavIcon className="size-5" name="logout" />
              Logout
            </Button>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2">{children}</div>
      </div>
    </div>
  );
}
