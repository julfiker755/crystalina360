"use client";
import Avatars from "@/components/reuseable/avater";
import { PreviewBtn } from "@/components/reuseable/btn";
import { CustomTable } from "@/components/reuseable/custom-table";
import Modal from "@/components/reuseable/modal";
import NavTitle from "@/components/reuseable/nav-title";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Badge, TableCell, TableRow } from "@/components/ui";
import { useGetTicketsQuery } from "@/redux/api/admin/ticketApi";
import { useDebounce } from "use-debounce";
import { useGlobalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import { helpers } from "@/lib";

const intState: any = {
  page: 1,
  isPreview: false,
  search: "",
  details: {},
};

export default function Tickets() {
  const [global, updateGlobal] = useGlobalState(intState);
  const [value] = useDebounce(global.search, 1000);
  const { data: ticket, isLoading } = useGetTicketsQuery({
    page: global.page,
    ...(value && { search: value }),
  });

  const headers = [
    "User",
    "Operator",
    "Event title",
    "Ticket id",
    "Quantity",
    "Total Paid",
    "Status",
    "Action",
  ];

  return (
    <div>
      <NavTitle
        title="Ticket Managements"
        subTitle="Manage all of the tickets across your system from this section"
      />
      <SearchBox onChange={(v: any) => updateGlobal("search", v)} />
      <CustomTable
        headers={headers}
        pagination={
          ticket?.meta?.total > 10 && (
            <ul className="flex items-center flex-wrap justify-between py-3">
              <li className="flex">
                Total:
                <sup className="font-medium text-2xl relative -top-3 px-2 ">
                  {ticket?.meta?.total}
                </sup>
                tickets
              </li>
              <li>
                <Pagination
                  onPageChange={(v: any) => updateGlobal("page", v)}
                  {...ticket?.meta}
                />
              </li>
            </ul>
          )
        }
      >
        {isLoading ? (
          <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
        ) : ticket?.data?.length > 0 ? (
          ticket?.data?.map((item: any, index: any) => (
            <TableRow key={index} className="border">
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={item?.user?.img || "/avater.png"}
                    fallback={item?.user?.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item?.user?.name}</span>
                </div>
              </TableCell>
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={item?.events?.organizer?.img}
                    fallback={item?.events?.organizer?.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item?.events?.organizer?.name}</span>
                </div>
              </TableCell>
              <TableCell>{item?.events?.event_title.slice(0, 30)}...</TableCell>
              <TableCell>{item.invoice_no}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>
                <Badge variant={helpers.lowerCase(item.status) as any}>
                  {helpers.capitalize(item.status)}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="ml-2">
                  {" "}
                  <PreviewBtn
                    onClick={() => {
                      updateGlobal("isPreview", true);
                      updateGlobal("details", item);
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={headers?.length}
            title="No tickets are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </CustomTable>
      {/* ============== preview modal ============== */}
      <Modal
        open={global.isPreview}
        setIsOpen={(v: any) => updateGlobal("isPreview", v)}
        title="Ticket Details"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <div className="space-y-6 py-4">
          <ul className="mx-auto">
            <li className="size-14 mb-2 mx-auto grid place-items-center bg-figma-sidebar rounded-full">
              <FavIcon name="tickets_i" />
            </li>
            <li className="font-medium text-lg text-center">
              {global.details?.invoice_no}
            </li>
            <li className="text-center">
              {helpers.formatDate(global.details?.tickets?.created_at)}
            </li>
            <li className="flex justify-center mt-1">
              <Badge
                variant={helpers.capitalize(global?.details?.status) as any}
              >
                {helpers.capitalize(global?.details?.status)}
              </Badge>
            </li>
          </ul>

          <div>
            <h5 className="font-medium text-lg mb-1">Ticket is for :</h5>
            <div className="border rounded-xl p-3 flex justify-between flex-wrap items-center">
              <div className="flex items-center space-x-2">
                <Avatars
                  src={global?.details?.user?.img || "/avater.png"}
                  fallback="Event Title"
                  alt="event"
                />
                <div className="flex flex-col leading-4 mb-2">
                  <span className="font-semibold text-lg">
                    {global?.details?.events?.event_title}
                  </span>
                  <span className="text-primary">
                    {global?.details?.events?.city},
                    {global?.details?.events?.province},
                    {global?.details?.events?.region},
                    {global?.details?.events?.country},
                  </span>
                </div>
              </div>
              <h5>
                {global?.details?.events?.event_date} at{" "}
                {global?.details?.events?.event_time}
              </h5>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-lg mb-1">Operator Details :</h5>
            <div className="border rounded-xl p-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Avatars
                  src={global?.details?.events?.organizer?.img || "/avater.png"}
                  fallback="Event Title"
                  alt="event"
                />
                <div className="flex flex-col leading-4 mb-2">
                  <span className="font-semibold text-lg">
                    {global?.details?.events?.event_title}
                  </span>
                  <span className="text-primary">
                    {global?.details?.events?.organizer?.email || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
