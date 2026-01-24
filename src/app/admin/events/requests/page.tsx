"use client";
import {
  useApproveAllMutation,
  useApproveEventMutation,
  useGetPandingEventQuery,
  useRejectEventsMutation,
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
import useSuccessDialog from "@/provider/success";
import { Check } from "lucide-react";
import { useDebounce } from "use-debounce";
import NavTitle from "@/components/reuseable/nav-title";
import sonner from "@/components/reuseable/sonner";
import EventInfo from "@/components/view/admin/reuse/event-info";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reuseable/from";
import { FromTextarea2 } from "@/components/reuseable/from-textarea2";
import { InputShow } from "@/components/reuseable/input-show";
import { zodResolver } from "@hookform/resolvers/zod";
import { rejection_sc } from "@/schema";
import { useState } from "react";
import { helpers } from "@/lib";
import FavIcon from "@/icon/favIcon";
import ModalHeading from "@/components/reuseable/modal-heading";
import Modal2 from "@/components/reuseable/modal2";

const initialState = {
  isPreview: false,
  isReject: false,
  page: 1,
  search: "",
};

export default function EventRequests() {
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
  const [rejectEvents, { isLoading: rejectLoading }] =
    useRejectEventsMutation();
  const headers = ["Operator name", "Email", "Title", "Date", "Time", "Action"];

  const from = useForm({
    resolver: zodResolver(rejection_sc),
    defaultValues: {
      message: "",
    },
  });

  //  ======== handleSubmit =========
  const handleSubmit = async (values: FieldValues) => {
    try {
      const data = helpers.fromData({
        message: values.message,
      });
      const res = await rejectEvents({ id: details?.id, data }).unwrap();
      if (res.status) {
        sonner.warning(
          "Event Rejected Successfully",
          "The operator has been notified via email",
          "bottom-right",
        );
        from.reset();
        updateGlobal("isReject", false);
      }
    } catch (error) {
      // Handle error if needed
    }
  };

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
          disabled={pendingEvents?.data?.length === 0}
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
                <TableCell>{item?.event_title?.slice(0, 20) + "..."}</TableCell>
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
                              "bottom-right",
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
                    <li>
                      <div
                        onClick={() => {
                          updateGlobal("isReject", true);
                          setIsDetails(item);
                        }}
                        className="bg-figma-delete cursor-pointer rounded-md grid place-items-center  size-10"
                      >
                        <FavIcon name="reject_icon" />
                      </div>
                    </li>
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
      {/* <Modal
        open={global.isPreview}
        setIsOpen={(v) => updateGlobal("isPreview", v)}
        title="Event Details"
        titleStyle="text-center"
        className="sm:max-w-2xl"
      >
        <EventInfo details={details} />
      </Modal> */}
      {/*  =========== reject message ========== */}
      <Modal2
        open={global.isReject}
        setIsOpen={(v) => updateGlobal("isReject", v)}
        title="Cause of Rejection"
        titleStyle="text-center"
        className="sm:max-w-2xl"
      >
        <ModalHeading
          title="Cause of Rejection"
          onClose={() => {
            updateGlobal("isReject", false);
            from.reset();
          }}
        />
        <Form className="space-y-5 pt-5" from={from} onSubmit={handleSubmit}>
          <InputShow value={details?.organizer?.email} label="Email" />
          <FromTextarea2
            name="message"
            label="Message"
            placeholder="Enter your message"
            className="min-h-30"
          />

          <Button
            disabled={rejectLoading}
            size="lg"
            className="w-full rounded-xl"
          >
            Send
          </Button>
        </Form>
      </Modal2>
    </div>
  );
}
