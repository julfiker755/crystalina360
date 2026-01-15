"use client";
import {
  useApproveAllMutation,
  useApproveEventMutation,
  useGetPandingEventQuery,
} from "@/redux/api/admin/eventsApi";
import Avatars from "@/components/reuseable/avater";
import { BackBtn } from "@/components/reuseable/back-btn";
import { PreviewBtn } from "@/components/reuseable/btn";
import { CustomTable } from "@/components/reuseable/custom-table";
import Modal from "@/components/reuseable/modal";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Button, TableCell, TableRow } from "@/components/ui";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import { useGlobalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import { cn, event_t, helpers } from "@/lib";
import useConfirmation from "@/provider/confirmation";
import useSuccessDialog from "@/provider/success";
import { Calendar, Check } from "lucide-react";
import { useDebounce } from "use-debounce";
import NavTitle from "@/components/reuseable/nav-title";
import sonner from "@/components/reuseable/sonner";
import { useState } from "react";

const initialState = {
  isPreview: false,
  page: 1,
  search: "",
};

export default function EventRequests() {
  const { confirm } = useConfirmation();
  const { open } = useSuccessDialog();
  const [global, updateGlobal] = useGlobalState(initialState);
  const [value] = useDebounce(global.search, 1000);
  const [details, setIsDetails] = useState<any>({});
  const { data: pendingEvents, isLoading } = useGetPandingEventQuery({
    page: global.page,
    ...(value && { search: value }),
  });
  const [approveEvent] = useApproveEventMutation();
  const [approveAll] = useApproveAllMutation();

  const headers = ["Operator name", "Email", "Title", "Date", "Time", "Action"];

  // const handleDelete = async (id: any) => {
  //   const confirmed = await confirm({
  //     subTitle: "Decline Event",
  //     title: "You are going to decline this event",
  //     description:
  //       "After declining, this event will no longer available in your system",
  //   });
  //   if (confirmed) {
  //     console.log(id);
  //   }
  // };

  let elementShow: any;

  if (
    details?.event_type === event_t.onetoone ||
    details?.event_type == event_t.retreat
  ) {
    elementShow = (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Calendar className="size-5 text-primary" />
        <div className="flex flex-col">
          <span className="text-base text-figma-black">Date</span>
          <span className="text-base text-figma-black font-medium">
            {details?.event_date?.[0]}
          </span>
        </div>
      </div>
    );
  } else if (details?.event_type === event_t.group) {
    elementShow = (
      <div className="flex items-center gap-2 text-muted-foreground">
        <FavIcon className="size-5" name="ongoing_events" />
        <div className="flex flex-col">
          <span className="text-base text-figma-black">Time</span>
          <span className="text-base text-figma-black font-medium">
            {details.event_time?.[0]}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavTitle
        title="Manage events"
        subTitle="Manage all of the events from this section"
      />
      <SvgBox>
        <div className="flex items-center space-x-2">
          <BackBtn className="bg-white rounded-md" />
          <h2>Event Requests</h2>
        </div>
      </SvgBox>
      <div className="mt-5 flex items-center justify-between">
        <SearchBox onChange={(v: any) => updateGlobal("search", v)} />
        <Button
          onClick={async () => {
            const res = await approveAll({}).unwrap();
            if (res.status) {
              open({
                title: "Approved successfully",
                description: "All events approved successfully",
              });
            }
          }}
          size="lg"
          className="bg-figma-green rounded-xl"
        >
          <Check />
          Approve all
        </Button>
      </div>
      <div>
        <CustomTable
          headers={headers}
          pagination={
            pendingEvents?.meta?.total > 10 ? (
              <ul className="flex items-center flex-wrap justify-between py-3">
                <li className="flex">
                  Total:
                  <sup className="font-medium text-2xl relative -top-3 px-2 ">
                    {pendingEvents?.meta?.total}
                  </sup>
                  Requests
                </li>
                <li>
                  <Pagination
                    onPageChange={(v: any) => updateGlobal("page", v)}
                    {...pendingEvents?.meta}
                  />
                </li>
              </ul>
            ) : null
          }
        >
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
          ) : pendingEvents?.data?.length > 0 ? (
            pendingEvents?.data?.map((item: any, index: any) => (
              <TableRow key={index} className="border">
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item?.organizer?.img}
                      fallback={item?.organizer?.name}
                      alt="profile ++++ organizer name"
                      fallbackStyle="aStyle"
                    />
                    <span>{item?.organizer?.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item?.organizer?.email}</TableCell>
                <TableCell>{item.event_title}</TableCell>
                <TableCell>{helpers.formatDate(item?.created_at)}</TableCell>
                <TableCell>{helpers.formatTime(item?.created_at)}</TableCell>
                <TableCell>
                  <ul className="flex gap-2">
                    <li>
                      <PreviewBtn
                        onClick={() => {
                          updateGlobal("isPreview", true);
                          setIsDetails(item);
                        }}
                      />
                    </li>
                    <li>
                      <div
                        onClick={async () => {
                          const res = await approveEvent(item?.id).unwrap();
                          if (res.status) {
                            sonner.success(
                              "Approved successfully",
                              "The event has been approved successfully",
                              "bottom-right"
                            );
                          }
                        }}
                        className="bg-figma-delete rounded-md grid place-items-center  size-10"
                      >
                        <Check
                          size={21}
                          className="text-figma-green cursor-pointer"
                        />
                      </div>
                    </li>
                    {/* <li>
                      <DeleteBtn onClick={() => handleDelete("4343")} />
                    </li> */}
                  </ul>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No request are available at the moment"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
      {/*  ====================== preview ======================== */}
      <Modal
        open={global.isPreview}
        setIsOpen={(v) => updateGlobal("isPreview", v)}
        title="Event Details"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <div className="overflow-hidden col-span-1 lg:col-span-2 transition-shadow  rounded-lg p-3">
          {/* Event Image */}
          <div className="relative h-60 rounded-md bg-muted overflow-hidden">
            <img
              src={details?.img || "/not.png"}
              alt={"title"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="py-3 space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold  text-foreground">
                {details?.event_title}
              </h3>
            </div>

            {/* Event Description */}
            <p className="text-muted-foreground line-clamp-2">
              {details?.description}
            </p>
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <ShowBox
                  icon="events"
                  name="Event type"
                  text={details?.event_type}
                />
                <ShowBox
                  icon="delivery"
                  name="Delivery mode"
                  text={details?.delivery_type}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <ShowBox
                  icon="location"
                  name="Location"
                  text={`${details?.city}, ${details?.province}, ${details?.region}, ${details?.country}`}
                />
                <ShowBox
                  icon="tiket"
                  name="Ticket sold"
                  text={details?.ticket_quantity}
                />
              </div>
              {elementShow}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ShowBox({ icon, text, name, className }: any) {
  return (
    <div
      className={cn("flex items-center gap-2 text-muted-foreground", className)}
    >
      <FavIcon className="size-6" name={icon as any} />
      <div className="flex flex-col">
        <span className="text-base text-figma-black">{name}</span>
        <span className="text-base text-figma-black font-medium">{text}</span>
      </div>
    </div>
  );
}
