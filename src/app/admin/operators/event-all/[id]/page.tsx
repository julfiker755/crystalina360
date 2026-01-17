"use client";
import Modal from "@/components/reuseable/modal";
import NavTitle from "@/components/reuseable/nav-title";
import { Repeat } from "@/components/reuseable/repeat";
import { NoItemData } from "@/components/reuseable/table-no-item";
import { Skeleton } from "@/components/ui";
import EventInfo from "@/components/view/admin/reuse/event-info";
import OpEvtCd from "@/components/view/admin/reuse/op-event-cd";
import useConfirmation from "@/provider/confirmation";
import { useDeleteEventMutation } from "@/redux/api/admin/eventsApi";
import { useOpratorsEventAllQuery } from "@/redux/api/admin/userApi";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import FavIcon from "@/icon/favIcon";
import { Pagination } from "@/components/reuseable/pagination";

export default function EventAll() {
  const { id } = useParams();
  const [isPreview, setIsPreview] = useState(false);
  const [isDetails, setIsDetails] = useState<any>({});
  const [page, setPage] = useState(1);
  const { confirm } = useConfirmation();
  const { data: allevents, isLoading } = useOpratorsEventAllQuery({
    id,
    arg: {
      page: page,
    },
  });
  const [deleteEvent] = useDeleteEventMutation();

  const handleDeleteEvent = async (e_id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Event",
      title: "You are going to delete this event",
      description:
        "After deleting, this event will no longer available in your system",
    });
    if (confirmed) {
      await deleteEvent(e_id).unwrap();
    }
  };

  return (
    <div>
      <NavTitle
        title="Operator Events"
        subTitle="Manage your system operators from this section"
      />
      <div className="grid grid-cols-1 md:grid-cols-3  gap-10">
        {isLoading ? (
          <Repeat count={10}>
            <Skeleton className="w-full h-[500px] rounded-md" />
          </Repeat>
        ) : allevents?.data?.length > 0 ? (
          allevents?.data?.map((item: any, idx: any) => (
            <OpEvtCd admin={true} key={idx} item={item}>
              <div
                className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="flex items-center space-x-2 [&_button]:bg-[#FFFFFF]/20 [&_button]:cursor-pointer [&_button]:grid [&_button]:place-items-center [&_button]:size-11 [&_button]:backdrop-blur-[15px] [&_button]:rounded-md">
                  <button
                    onClick={() => {
                      setIsPreview(true);
                      setIsDetails(item);
                    }}
                    aria-label="View"
                  >
                    <FavIcon color="#fff" name="preview" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(item.id)}
                    aria-label="Delete"
                  >
                    <FavIcon color="#ff8080" name="delete_two" />
                  </button>
                </div>
              </div>
            </OpEvtCd>
          ))
        ) : (
          <NoItemData
            className="col-span-1 lg:col-span-3"
            title="No events found at this moment"
          />
        )}
      </div>
      {allevents?.meta?.total > 10 && (
        <ul className="flex items-center flex-wrap justify-between py-3">
          <li className="flex">
            Total:
            <sup className="font-medium text-2xl relative -top-3 px-2 ">
              {allevents?.meta?.total}
            </sup>
            users
          </li>
          <li>
            <Pagination
              onPageChange={(v: any) => setPage(v)}
              {...allevents?.meta}
            />
          </li>
        </ul>
      )}
      {/*  ============== modal box======== */}
      <Modal
        open={isPreview}
        setIsOpen={setIsPreview}
        title="Event Details"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <EventInfo oprator={true} details={isDetails} />
      </Modal>
    </div>
  );
}
