"use client";
import Avatars from "@/components/reuseable/avater";
import { BackBtn } from "@/components/reuseable/back-btn";
import { DeleteBtn, PreviewBtn } from "@/components/reuseable/btn";
import { CustomTable } from "@/components/reuseable/custom-table";
import Modal from "@/components/reuseable/modal";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Button, TableCell, TableRow } from "@/components/ui";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import { dummyJson } from "@/components/view/user/dummy-json";
import { useGlobalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import { cn, RandomImg } from "@/lib";
import useConfirmation from "@/provider/confirmation";
import useSuccessDialog from "@/provider/success";
import { Check } from "lucide-react";

const initialState = { isPreview: false };

export default function EventRequests() {
  const { confirm } = useConfirmation();
  const { open } = useSuccessDialog();
  const [global, updateGlobal] = useGlobalState(initialState);

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
        <Button size="lg" className="bg-figma-green rounded-xl">
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
                        onClick={() => updateGlobal("isPreview", true)}
                      />
                    </li>
                    <li>
                      <div
                        onClick={() => {
                          open({
                            title: "Event approved successfully",
                            description:
                              "Now users can find this event on your system",
                          });
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
              src={RandomImg()}
              alt={"title"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="py-3 space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold  text-foreground">
                Event title goes here
              </h3>
            </div>

            {/* Event Description */}
            <p className="text-muted-foreground line-clamp-2">
              Lorem ipsum dolor sit amet consectetur. Dignissim donec nunc
              tellus bibendum neque vel ut vulputate id. Aliquet quis enim
              tristique dictumst. Odio nec semper ornare maecenas eget diam
              tellus enim id. Mattis erat a dignissim mauris velit aliquam
              nulla. Auctor vestibulum id et risus in. Facilisi libero vitae
              neque feugiat volutpat risus eget. Vehicula nec morbi risus
              sodales tempor. Nibh sem diam dui gravida felis eu molestie
              euismod. In quisque viverra nisi facilisi tellus.
            </p>
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <ShowBox icon="events" name="Event type" text="Group" />
                <ShowBox
                  icon="delivery"
                  name="Delivery mode"
                  text="Offline (In-person)"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <ShowBox
                  icon="location"
                  name="Location"
                  text="Event location goes here"
                />
                <ShowBox icon="tiket" name="Ticket sold" text="153 / 300" />
              </div>
              <ShowBox
                icon="ongoing_events"
                name="Date & Time"
                text="10 Sep, 2025 at 05:00 PM - 09:00 PM"
              />
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
