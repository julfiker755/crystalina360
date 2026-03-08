"use client";
import Avatars from "@/components/reuseable/avater";
import { CustomTable } from "@/components/reuseable/custom-table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Badge, Button, TableCell, TableRow } from "@/components/ui";
import TicketChart from "@/components/view/oparator/simple/ticket-chart";
import { useSingleEventsQuery } from "@/redux/api/operator/opratorApi";
import { cn, delivary_t, event_t, helpers } from "@/lib";
import VideoPlayer from "@/components/reuseable/player";
import { getDeliveryIcon } from "@/lib/function-utils";
import { Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import FavIcon from "@/icon/favIcon";
import CopyBox from "@/components/reuseable/copy-box";

export default function EvnetSingle({ admin = false }: { admin?: boolean }) {
  const { id } = useParams();
  const headers = ["Attendee name", "Ticket booked", "Booking date", "Price"];

  const { data: events_all, isLoading } = useSingleEventsQuery(id);
  const { event, attendee_list } = events_all?.data || {};
  const {
    img,
    event_title,
    event_description,
    event_type,
    delivery_type,
    status,
    city,
    province,
    region,
    country,
    ticket_quantity,
    price,
    revenue,
    ticket_sold_stats,
    event_date,
    event_time,
    sold_tickets,
    link,
  } = event || {};

  const NotOnDemand = (item: any) => {
    return delivery_type === delivary_t.ondemand ? null : item;
  };

  let elementShow: any;
  if (event_type === event_t.onetoone || event_type == event_t.retreat) {
    elementShow = (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="size-6 text-primary" />
          <div className="flex flex-col">
            <span className="text-base text-figma-black">Date</span>
            <span className="text-base text-figma-black font-medium">
              {event_date?.[0]}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <FavIcon className="size-6" name="ongoing_events" />
          <div className="flex flex-col">
            <span className="text-base text-figma-black">Time{event_type === event_t.onetoone && ("s")}</span>
            <div className="space-x-3">
              {event_time?.map((item: any, idx: any) => (
                <span
                  key={idx}
                  className={`text-base ${event_type === event_t.onetoone && ("bg-figma-delete px-3 font-normal!  py-0.5")} font-medium rounded-full text-figma-black`}
                >
                  {helpers.planTime(item)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (event_type === event_t.group) {
    elementShow = (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FavIcon className="size-6" name="ongoing_events" />
          <div className="flex flex-col">
            <span className="text-base text-figma-black">Time</span>
            <span className="text-base text-figma-black font-medium">
              {helpers.planTime(event_time?.[0])}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="size-6 text-primary" />
          <div className="flex flex-col">
            <span className="text-base text-figma-black">Dates</span>
            <div className="space-x-3">
              {event_date?.map((item: any, idx: any) => (
                <span
                  key={idx}
                  className="text-base bg-figma-delete px-3  py-0.5 rounded-full text-figma-black"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
      <div className="overflow-hidden col-span-1 lg:col-span-2 transition-shadow  rounded-lg p-3">
        <div className="overflow-hidden relative">
          {delivery_type == delivary_t.ondemand ? (
            <VideoPlayer key={"id"} src={img} />
          ) : (
            <div className="h-60 rounded-md bg-muted ">
              <img
                src={img || "/not.png"}
                alt={"title"}
                className="w-full h-full rounded-md object-cover"
              />
            </div>
          )}

          {admin && !isLoading && (
            <div className="absolute  right-2 top-2">
              <div className="flex items-center space-x-2">
                <Button size="default" className="bg-[#434549] text-white">
                  {getDeliveryIcon(delivery_type, "#FFFFFF")}{" "}
                  {helpers.capitalize(delivery_type)}
                </Button>
                <Button
                  size="default"
                  variant={helpers.lowerCase(status) as any}
                >
                  {helpers.capitalize(status)}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="py-3 space-y-1">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold  text-foreground">
              {event_title || "N/A"}
            </h3>
            {!admin && (
              <Badge variant={helpers.lowerCase(status) as any}>
                {helpers.capitalize(status)}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground line-clamp-2">
            {event_description || "N/A"}
          </p>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <ShowBox
                icon="events"
                name="Event type"
                text={helpers.capitalize(event_type) || "N/A"}
              />
              <ShowBox
                icon="delivery"
                name="Delivery mode"
                text={helpers.capitalize(delivery_type) || "N/A"}
              />
            </div>
            {delivery_type === delivary_t.online ? (
              <CopyBox
                value={link}
                valueStyle="text-primary text-base!"
                linkStyle="text-primary"
              />
            ) : (
              <ShowBox
                icon="location"
                name="Location"
                text={`${city},${province},${region},${country}` || "N/A"}
              />
            )}

            {elementShow}
            {NotOnDemand(
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <ShowBox
                    icon="tiket"
                    name="Ticket sold"
                    text={`${sold_tickets} / ${ticket_quantity}` || "N/A"}
                  />
                  <ShowBox
                    icon="price22"
                    name="Ticket price"
                    text={price || "0"}
                  />
                </div>
                <ShowBox
                  icon="price22"
                  name="Total earned from this event"
                  text={revenue || "0"}
                  className="bg-figma-delete px-2 py-2 rounded-md"
                />
              </>,
            )}
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-4">
        <div className="col-span-2">
          <h1 className="text-2xl font-semibold text-left text-figma-black mb-3">
            Ticket Sold Statistics
          </h1>
          <TicketChart data={ticket_sold_stats} className="h-[300px]" />
        </div>
        <h4 className="text-figma-black text-xl font-semibold relative mt-10">
          Attendee List
        </h4>
        <div className="relative -top-6">
          <CustomTable headers={headers}>
            {isLoading ? (
              <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
            ) : attendee_list?.length > 0 ? (
              attendee_list?.map((item: any, index: any) => (
                <TableRow key={index} className="border">
                  <TableCell className="relative">
                    <div className="flex items-center gap-3">
                      <Avatars
                        src={item.img || "/avater.png"}
                        fallback={item.name}
                        alt="profile"
                        fallbackStyle="aStyle"
                      />
                      <div className="flex flex-col leading-3 mb-2">
                        <span className="font-semibold text-base">
                          {item.name}
                        </span>
                        <span>{item.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <h5 className="ml-4">{item.quantity}</h5>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <h5 className="">
                      {helpers.formatDate(item.booking_date)}
                    </h5>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <h5 className="">{item.amount}</h5>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableNoItem
                colSpan={headers?.length}
                title="No users are currently available for this ticket"
                tdStyle="!bg-background"
              />
            )}
          </CustomTable>
        </div>
      </div>
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
