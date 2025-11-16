"use client";
import Avatars from "@/components/reuseable/avater";
import { DeleteBtn, PreviewBtn } from "@/components/reuseable/btn";
import { CustomTable } from "@/components/reuseable/custom-table";
import Modal from "@/components/reuseable/modal";
import NavTitle from "@/components/reuseable/nav-title";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Badge, TableCell, TableRow } from "@/components/ui";
import { dummyJson } from "@/components/view/user/dummy-json";
import { useGlobalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import { helpers, RandomImg } from "@/lib";

const intState = {
  page: 1,
  isPreview: false,
};

export default function Tickets() {
  const [global, updateGlobal] = useGlobalState(intState);
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
  const isLoading = false;

  const data = [
    {
      user: {
        name: "Elizabeth Olson",
        avatar: "/avatar1.png",
      },
      operator: {
        name: "John Doe",
        avatar: "/avatar-operator.png",
      },
      eventTitle: "Event title goes here.",
      ticketId: "TKT-000001",
      quantity: "02",
      totalPaid: "$40",
      status: "Ongoing",
      action: "View",
    },
    {
      user: {
        name: "Elizabeth Olson",
        avatar: "/avatar1.png",
      },
      operator: {
        name: "John Doe",
        avatar: "/avatar-operator.png",
      },
      eventTitle: "Event title goes here.",
      ticketId: "TKT-000002",
      quantity: "02",
      totalPaid: "$40",
      status: "Upcoming",
      action: "View",
    },
    {
      user: {
        name: "Elizabeth Olson",
        avatar: "/avatar1.png",
      },
      operator: {
        name: "John Doe",
        avatar: "/avatar-operator.png",
      },
      eventTitle: "Event title goes here.",
      ticketId: "TKT-000003",
      quantity: "02",
      totalPaid: "$40",
      status: "Ongoing",
      action: "View",
    },
    {
      user: {
        name: "Elizabeth Olson",
        avatar: "/avatar1.png",
      },
      operator: {
        name: "John Doe",
        avatar: "/avatar-operator.png",
      },
      eventTitle: "Event title goes here.",
      ticketId: "TKT-000004",
      quantity: "02",
      totalPaid: "$40",
      status: "Upcoming",
      action: "View",
    },
    {
      user: {
        name: "Elizabeth Olson",
        avatar: "/avatar1.png",
      },
      operator: {
        name: "John Doe",
        avatar: "/avatar-operator.png",
      },
      eventTitle: "Event title goes here.",
      ticketId: "TKT-000005",
      quantity: "02",
      totalPaid: "$40",
      status: "Ongoing",
      action: "View",
    },
    {
      user: {
        name: "Elizabeth Olson",
        avatar: "/avatar1.png",
      },
      operator: {
        name: "John Doe",
        avatar: "/avatar-operator.png",
      },
      eventTitle: "Event title goes here.",
      ticketId: "TKT-000006",
      quantity: "02",
      totalPaid: "$40",
      status: "Upcoming",
      action: "View",
    },
    {
      user: {
        name: "Elizabeth Olson",
        avatar: "/avatar1.png",
      },
      operator: {
        name: "John Doe",
        avatar: "/avatar-operator.png",
      },
      eventTitle: "Event title goes here.",
      ticketId: "TKT-000007",
      quantity: "02",
      totalPaid: "$40",
      status: "Ongoing",
      action: "View",
    },
    {
      user: {
        name: "Elizabeth Olson",
        avatar: "/avatar1.png",
      },
      operator: {
        name: "John Doe",
        avatar: "/avatar-operator.png",
      },
      eventTitle: "Event title goes here.",
      ticketId: "TKT-000008",
      quantity: "02",
      totalPaid: "$40",
      status: "Upcoming",
      action: "View",
    },
    {
      user: {
        name: "Elizabeth Olson",
        avatar: "/avatar1.png",
      },
      operator: {
        name: "John Doe",
        avatar: "/avatar-operator.png",
      },
      eventTitle: "Event title goes here.",
      ticketId: "TKT-000009",
      quantity: "02",
      totalPaid: "$40",
      status: "Ongoing",
      action: "View",
    },
    {
      user: {
        name: "Elizabeth Olson",
        avatar: "/avatar1.png",
      },
      operator: {
        name: "John Doe",
        avatar: "/avatar-operator.png",
      },
      eventTitle: "Event title goes here.",
      ticketId: "TKT-000010",
      quantity: "02",
      totalPaid: "$40",
      status: "Upcoming",
      action: "View",
    },
  ];

  return (
    <div>
      <NavTitle
        title="Ticket Managements"
        subTitle="Manage all of the tickets across your system from this section"
      />
      <SearchBox onChange={(e) => console.log(e)} />
      <CustomTable
        headers={headers}
        pagination={
          <ul className="flex items-center flex-wrap justify-between py-3">
            <li className="flex">
              Total:
              <sup className="font-medium text-2xl relative -top-3 px-2 ">
                500
              </sup>
              tickets
            </li>
            <li>
              <Pagination
                onPageChange={(v: any) => updateGlobal("page", v)}
                {...dummyJson.meta}
              />
            </li>
          </ul>
        }
      >
        {isLoading ? (
          <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
        ) : data?.length > 0 ? (
          data?.map((item, index) => (
            <TableRow key={index} className="border">
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={""}
                    fallback={item.user.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item.user.name}</span>
                </div>
              </TableCell>
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={""}
                    fallback={item.operator.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item.operator.name}</span>
                </div>
              </TableCell>
              <TableCell>{item.eventTitle}</TableCell>
              <TableCell>{item.ticketId}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.totalPaid}</TableCell>
              <TableCell>
                <Badge variant={helpers.lowerCase(item.status) as any}>
                  {helpers.capitalize(item.status)}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="ml-2">
                  {" "}
                  <PreviewBtn onClick={() => updateGlobal("isPreview", true)} />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={headers?.length}
            title="No users are available at the moment"
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
            <li className="font-medium text-lg text-center">TKT-000001</li>
            <li className="text-center">22 Sep, 2025</li>
            <li className="flex justify-center mt-1">
              <Badge variant="ongoing">Ongoing</Badge>
            </li>
          </ul>

          <div>
            <h5 className="font-medium text-lg mb-1">Ticket is for :</h5>
            <div className="border rounded-xl p-3 flex justify-between flex-wrap items-center">
              <div className="flex items-center space-x-2">
                <Avatars src={RandomImg()} fallback="Event Title" alt="event" />
                <div className="flex flex-col leading-4 mb-2">
                  <span className="font-semibold text-lg">
                    Event title goes here
                  </span>
                  <span className="text-primary">Event location goes here</span>
                </div>
              </div>
              <h5>10 Sep, 2025 at 05:00 PM - 09:00 PM</h5>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-lg mb-1">Operator Details :</h5>
            <div className="border rounded-xl p-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Avatars src={RandomImg()} fallback="Event Title" alt="event" />
                <div className="flex flex-col leading-4 mb-2">
                  <span className="font-semibold text-lg">
                    Operator name goes here
                  </span>
                  <span className="text-primary">example@gmmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
