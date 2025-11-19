"use client";
import Avatars from "@/components/reuseable/avater";
import { BackBtn } from "@/components/reuseable/back-btn";
import { DeleteBtn, PreviewBtn } from "@/components/reuseable/btn";
import { CustomTable } from "@/components/reuseable/custom-table";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Button, TableCell, TableRow } from "@/components/ui";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import { dummyJson } from "@/components/view/user/dummy-json";
import useConfirmation from "@/provider/confirmation";
import { Check } from "lucide-react";

export default function EventRequests() {
  const { confirm } = useConfirmation();
  const headers = ["Operator name", "Email", "Title", "Date", "Time", "Action"];
  const isLoading = false;

  const data = [
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      eventTitle: "Event title goes here",
      date: "5 Sep, 2025",
      time: "10:00 AM",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      eventTitle: "Event title goes here",
      date: "5 Sep, 2025",
      time: "10:00 AM",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      eventTitle: "Event title goes here",
      date: "5 Sep, 2025",
      time: "10:00 AM",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      eventTitle: "Event title goes here",
      date: "5 Sep, 2025",
      time: "10:00 AM",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      eventTitle: "Event title goes here",
      date: "5 Sep, 2025",
      time: "10:00 AM",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      eventTitle: "Event title goes here",
      date: "5 Sep, 2025",
      time: "10:00 AM",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      eventTitle: "Event title goes here",
      date: "5 Sep, 2025",
      time: "10:00 AM",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      eventTitle: "Event title goes here",
      date: "5 Sep, 2025",
      time: "10:00 AM",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      eventTitle: "Event title goes here",
      date: "5 Sep, 2025",
      time: "10:00 AM",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      eventTitle: "Event title goes here",
      date: "5 Sep, 2025",
      time: "10:00 AM",
    },
  ];
  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Decline Event",
      title: "You are going to decline this event",
      description:
        "After declining, this event will no longer available in your system",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <SvgBox>
        <div className="flex items-center space-x-2">
          <BackBtn className="bg-white rounded-md" />
          <h2>Event Requests</h2>
        </div>
      </SvgBox>
      <div className="mt-5 flex items-center justify-between">
        <SearchBox onChange={() => {}} />
        <Button size="lg" className="bg-[#02A40D] rounded-xl">
          <Check />
          Approve all
        </Button>
      </div>
      <div>
        <CustomTable
          headers={headers}
          pagination={
            <ul className="flex items-center flex-wrap justify-between py-3">
              <li className="flex">
                Total:
                <sup className="font-medium text-2xl relative -top-3 px-2 ">
                  500
                </sup>
                Requests
              </li>
              <li>
                <Pagination
                  onPageChange={(v: any) => console.log(v)}
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
                      fallback={item.name}
                      alt="profile"
                      fallbackStyle="aStyle"
                    />
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.eventTitle}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>
                  <ul className="flex gap-2">
                    <li>
                      <PreviewBtn
                      // onClick={() => updateGlobal("isPreview", true)}
                      />
                    </li>
                    <li>
                      <Button className="bg-figma-delete size-10">
                        <Check className="text-[#02A40D] text-2xl" />
                      </Button>
                    </li>
                    <li>
                      <DeleteBtn onClick={() => handleDelete("4343")} />
                    </li>
                  </ul>
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
      </div>
    </div>
  );
}
