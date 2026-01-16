"use client";
import { Repeat } from "@/components/reuseable/repeat";
import { NoItemData } from "@/components/reuseable/table-no-item";
import { Skeleton } from "@/components/ui";
import OpEvtCd from "@/components/view/admin/reuse/op-event-cd";
import FavIcon from "@/icon/favIcon";
import useConfirmation from "@/provider/confirmation";
import {
  useAdminEventQuery,
  useDeleteEventMutation,
} from "@/redux/api/admin/eventsApi";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState } from "react";
import { Pagination } from "@/components/reuseable/pagination";

function RetreatBox() {
  const { confirm } = useConfirmation();
  const qry = useSearchParams();
  const params = qry.get("type");

  const [page, setPage] = useState(1);
  const status = params === "operator" ? "operator" : "";
  const opratorby = params === "operator" ? true : false;
  const { data: eventItem, isLoading } = useAdminEventQuery({
    ...(status && { status: status }),
    tags: "retreat",
    page: page,
  });
  const [deleteEvent] = useDeleteEventMutation();

  const handleDeleteEvent = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete event",
      title: "You are going to delete this event",
      description:
        "After deleting, event's won't be able to find this event on your system",
    });
    if (confirmed) {
      await deleteEvent(id).unwrap();
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
        {isLoading ? (
          <Repeat count={10}>
            <Skeleton className="w-full h-[300px]" />
          </Repeat>
        ) : eventItem?.data?.length > 0 ? (
          eventItem?.data?.map((item: any, idx: any) => (
            <OpEvtCd key={idx} admin={true} operator={opratorby} item={item}>
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-2 [&_button]:bg-[#FFFFFF]/20 [&_button]:cursor-pointer [&_button]:grid [&_button]:place-items-center [&_button]:size-11 [&_button]:backdrop-blur-[15px] [&_button]:rounded-md">
                  <Link href={`/admin/events/${item.id}`}>
                    <button aria-label="View">
                      <FavIcon color="#fff" name="preview" />
                    </button>
                  </Link>
                  {params === "my-events" && (
                    <Link href={`/admin/events/edit/${item.id}`}>
                      <button aria-label="Edit">
                        <FavIcon color="#fff" name="edit2" />
                      </button>
                    </Link>
                  )}
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
            className="col-span-1 md:col-span-2"
            title="No events found at this moment"
          />
        )}
      </div>
      <Pagination onPageChange={(v: any) => setPage(v)} {...eventItem?.meta} />
    </div>
  );
}

export default function RetreatEvents() {
  return (
    <Suspense fallback={<div className="opacity-0">Loading...</div>}>
      <RetreatBox />
    </Suspense>
  );
}
