"use client";
import { Badge } from "@/components/ui";
import TicketChart from "@/components/view/oparator/simple/ticket-chart";
import FavIcon from "@/icon/favIcon";
import { cn, RandomImg } from "@/lib";
import { useParams } from "next/navigation";

export default function EvnetSingle() {
  const { id } = useParams();
  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
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
              <Badge variant={"upcoming"}>Upcoming</Badge>
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
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <ShowBox icon="events" name="Event type" text="Group" />
                <ShowBox
                  icon="delivery"
                  name="Delivery mode"
                  text="Offline (In-person)"
                />
              </div>
              <ShowBox
                icon="location"
                name="Location"
                text="Event location goes here"
              />
              <ShowBox
                icon="ongoing_events"
                name="Date & Time"
                text="10 Sep, 2025 at 05:00 PM - 09:00 PM"
              />
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <ShowBox icon="tiket" name="Ticket sold" text="153 / 300" />
                <ShowBox icon="price22" name="Ticket price" text="$15.00" />
              </div>
              <ShowBox
                icon="price22"
                name="Total earned from this event"
                text="$2,295"
                className="bg-[#EDEDED] px-2 py-2 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="col-span-2">
            <h1 className="text-2xl font-semibold text-left text-figma-black mb-3">
              Ticket Sold Statistics
            </h1>
            <TicketChart className="h-[300px]" />
          </div>
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
