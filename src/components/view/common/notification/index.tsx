"use client";
import Avatars from "@/components/reuseable/avater";
import { Pagination } from "@/components/reuseable/pagination";
import { Repeat } from "@/components/reuseable/repeat";
import { SubTitle } from "@/components/reuseable/sub-title";
import { Skeleton } from "@/components/ui/skeleton";
import { helpers } from "@/lib";
import {
  useGetNotiQuery,
  useMarkAllNotiMutation,
  useMarkNotiMutation,
} from "@/redux/api/common/notificationApi";
import { useState } from "react";

export default function UserOpratorNofi() {
  const [page, setIsPage] = useState(1);
  const { data: noti, isLoading } = useGetNotiQuery({ page: page });
  const [markNoti, { isLoading: markloading }] = useMarkNotiMutation();
  const [markAllNoti, { isLoading: markAllLoading }] = useMarkAllNotiMutation();

  const handleRead = async (id: string) => {
    await markNoti(id).unwrap();
  };

  const handleAllRead = async () => {
    if (!markAllLoading) {
      await markAllNoti({}).unwrap();
    }
  };

  return (
    <>
      <ul className="flex items-center justify-between mt-10 md:mt-16 mb-10">
        <li>
          <SubTitle text="Notification" />
        </li>
        <li
          onClick={() => {
            if (!markAllLoading) {
              handleAllRead();
            }
          }}
          className="font-medium underline cursor-pointer text-primary"
        >
          Read all
        </li>
      </ul>
      <div className="border p-4 rounded-xl mb-5">
        <div className="space-y-4">
          {isLoading ? (
            <Repeat count={10}>
              <Skeleton className="w-full h-12 rounded-md" />
            </Repeat>
          ) : (
            noti?.data?.map((item: any, index: any) => (
              <div
                key={index}
                className={`flex items-center ${
                  item.is_read && "bg-[#FBFBFB]"
                }  py-2 px-2 rounded-md justify-between space-x-2`}
                onClick={() => {
                  if (!markloading) {
                    handleRead(item.id);
                  }
                }}
              >
                <div className="flex space-x-2 items-center">
                  <Avatars
                    src={item?.avatar}
                    fallback={item.username}
                    alt={item.username}
                  />
                  <p
                    className={`text-article ${
                      item?.active && "text-figma-black"
                    }`}
                  >
                    {item?.data?.title}
                  </p>
                </div>
                <p
                  className={`text-article ${
                    item?.is_read && "text-figma-black"
                  }`}
                >
                  {helpers.formatDate(item?.created_at)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <Pagination
        className="flex justify-center mx-auto mb-6"
        onPageChange={(v: any) => setIsPage(v)}
        {...noti?.meta}
      />
    </>
  );
}
