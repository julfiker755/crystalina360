"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import Modal from "@/components/reuseable/modal";
import NavTitle from "@/components/reuseable/nav-title";
import { Badge, Button, Skeleton } from "@/components/ui";
import OpEvtCd from "@/components/view/admin/reuse/op-event-cd";
import useConfirmation from "@/provider/confirmation";
import {
  useDeleteUserMutation,
  useSlgOpratorsQuery,
} from "@/redux/api/admin/userApi";
import { useParams, useRouter } from "next/navigation";
import FavIcon from "@/icon/favIcon";
import { cn, helpers } from "@/lib";
import { useState } from "react";
import { Repeat } from "@/components/reuseable/repeat";
import { NoItemData } from "@/components/reuseable/table-no-item";
import { useDeleteEventMutation } from "@/redux/api/admin/eventsApi";
import EventInfo from "@/components/view/admin/reuse/event-info";
import Link from "next/link";
import { getInterval } from "@/lib/function-utils";

export default function OperatorDetils() {
  const { id } = useParams();
  const router = useRouter();
  const { confirm } = useConfirmation();
  const [isPreview, setIsPreview] = useState(false);
  const { data: details, isLoading } = useSlgOpratorsQuery(id);
  const [isDetails, setIsDetails] = useState<any>({});
  const [deleteUser] = useDeleteUserMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const {
    id: oprator_id,
    name,
    email,
    img,
    skills,
    bio,
    is_top_seller,
    events,
    total_events,
    total_earned,
    total_tickets_sold,
    created_at,
    subscribed_plans,
  } = details?.data || {};

  const handleOperatorDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Operator",
      title: "You are going to delete this operator",
      description:
        "After deleting, this operator will no longer available in your system",
    });
    if (confirmed) {
      await deleteUser(id).unwrap();
      router.back();
    }
  };

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

  const stash = [
    {
      title: "Total events",
      value: total_events,
      icon: "events",
    },
    {
      title: "Ticket sold",
      value: total_tickets_sold,
      icon: "tiket",
    },
    {
      title: "Total revenue",
      value: total_earned,
      currency: "$",
      icon: "price22",
    },
    {
      title: "Joined since",
      value: helpers.formatDate(created_at),
      icon: "ongoing_events",
    },
  ];

  return (
    <div>
      <NavTitle
        title="Operator Details"
        subTitle="Manage your system operators from this section"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-figma-sidebar p-4 h-fit rounded-xl">
          <BackBtn className="bg-white" iconStyle="text-primary" />
          <div className="space-y-7">
            <div>
              <ImgBox
                className="size-28 rounded-full mx-auto"
                src={img || "/avater.png"}
                alt="img"
              />
              <ul className="mt-2">
                <li className="text-center font-medium text-xl">{name}</li>
                <li className="text-center">{email}</li>
                <li className="flex items-center mt-1 mx-auto bg-white w-fit py-1 px-3 rounded-md">
                  {is_top_seller == true ? (
                    <>
                      <FavIcon name="top_seller" />
                      <span className="font-semibold text-lg  ml-1">
                        Top Seller
                      </span>
                    </>
                  ) : (
                    <>
                      <FavIcon className="size-5" name="verified" />
                      <span className="font-semibold text-lg  ml-1">
                        Verified
                      </span>
                    </>
                  )}
                </li>
                <li className="flex items-center mt-3 mx-auto bg-white w-fit py-1 px-3 rounded-md">
                  <ul className="flex justify-between space-x-10">
                    <li className="flex items-center">
                      <FavIcon name="a_plans" />{" "}
                      <span className="ml-2 text-base font-normal">
                        Active plan:
                      </span>
                    </li>
                    <li className="font-medium text-lg">
                      {subscribed_plans?.interval
                        ? getInterval[subscribed_plans?.interval]
                        : "Free"}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-center">{bio}</p>
              <div className="flex items-center justify-center gap-2">
                {skills?.map((skill: any, idx: any) => (
                  <div
                    key={idx}
                    className="text-center w-fit bg-white px-3 rounded-full"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {stash?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex bg-white p-4 rounded-xl space-x-2 items-center"
                >
                  <FavIcon className="size-6" name={item.icon as any} />
                  <ul>
                    <li>{item.title}</li>
                    <li className="text-xl font-medium">{item.value}</li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => handleOperatorDelete(oprator_id)}
                size="lg"
                className="w-fit bg-white mx-auto text-black"
              >
                <FavIcon name="delete_a" />
                Delete Operator
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex items-center justify-between mb-2">
            <li className="text-xl font-semibold text-gray-900">
              Latest Events
            </li>
            {events?.length > 6 && (
              <li>
                <Link
                  className="text-sm text-primary cursor-pointer hover:underline"
                  href={`/admin/operators/event-all/${oprator_id}`}
                >
                  See all
                </Link>
              </li>
            )}
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
            {isLoading ? (
              <Repeat count={6}>
                <Skeleton className="w-full h-[500px] rounded-md" />
              </Repeat>
            ) : events?.length > 0 ? (
              events?.map((item: any, idx: any) => (
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
                className="col-span-1 lg:col-span-2"
                title="No events found at this moment"
              />
            )}
          </div>
        </div>
      </div>
      {/* ============== preview events =========== */}
      <Modal
        open={isPreview}
        setIsOpen={setIsPreview}
        title="Event Details"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <EventInfo video_key="single-oprator-player" oprator={true} details={isDetails} />
      </Modal>
    </div>
  );
}
