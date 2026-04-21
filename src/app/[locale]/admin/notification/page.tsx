"use client";
import NavTitle from "@/components/reuseable/nav-title";
import { Pagination } from "@/components/reuseable/pagination";
import { Repeat } from "@/components/reuseable/repeat";
import { Skeleton } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { helpers } from "@/lib";
import {
  useGetNotiQuery,
  useMarkNotiMutation,
} from "@/redux/api/common/notificationApi";
import { useState } from "react";

export default function Notification() {
  const [page, setIsPage] = useState(1);
  const { data: noti, isLoading } = useGetNotiQuery({ page: page });
  const [markNoti, { isLoading: markloading }] = useMarkNotiMutation();

  const handleRead = async (id: string) => {
    await markNoti(id).unwrap();
  };

  return (
    <div>
      <NavTitle
        title="Notifications"
        subTitle="Manage all the notifications across your system from this section"
      />
      <div className="space-y-8 py-5">
        {isLoading ? (
          <Repeat count={10}>
            <Skeleton className="w-full h-15 rounded-md" />
          </Repeat>
        ) : (
          noti?.data?.map((item: any, index: any) => (
            <div
              onClick={() => {
                if (!markloading) {
                  handleRead(item.id);
                }
              }}
              key={index}
              className={`border-l-4  border p-3 relative rounded-xl  grid grid-cols-1 lg:grid-cols-3`}
            >
              <div className="mb-2 md:mb-0">
                <h3 className="lg:text-base xl:text-xl font-semibold  text-blacks">
                  {item?.data?.title}
                </h3>
                <p className="text-sm truncate text-blacks">
                  {item?.data?.message}{" "}
                  {/* <span className="text-gray1 cursor-pointer">Tap to view</span> */}
                </p>
              </div>
              <ul className="md:left-1/2 relative space-y-2 *:text-gray1">
                <li className="flex items-center gap-1">
                  <FavIcon
                    stroke="#888888"
                    name="calender"
                    className="size-4"
                  />
                  <span className="text-sm text-[#888888]">
                    {helpers.formatDate(item?.created_at)}
                  </span>
                </li>
                <li className="flex items-center gap-1">
                  <FavIcon
                    color="#888888"
                    name="ongoing_events"
                    className="size-4"
                  />
                  <span className="text-sm text-[#888888]">
                    {helpers.formatTime(item?.created_at)}
                  </span>
                </li>
              </ul>

              <div className="text-gray-500 items-center absolute right-3 top-4 md:static md:right-0 md:top-0 md:flex md:justify-end">
                {item?.is_read ? (
                  <FavIcon name="unRead" className="size-4" />
                ) : (
                  <FavIcon name="read" className="size-4" />
                )}
              </div>
            </div>
          ))
        )}
        <ul className="flex items-center flex-wrap justify-between py-3">
          <li className="flex">
            Total:
            <sup className="font-medium text-2xl relative -top-3 px-2 ">
              {noti?.meta?.total}
            </sup>
            Notification
          </li>
          <li>
            <Pagination
              onPageChange={(v: any) => setIsPage(v)}
              {...noti?.meta}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
