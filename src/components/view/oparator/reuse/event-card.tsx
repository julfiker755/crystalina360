import { Badge } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { helpers, PlaceholderImg } from "@/lib";

export default function EventCard({ item }: any) {
  const { title, status, description, location, dateTime, price, attendees } =
    item || {};

  return (
    <div className="overflow-hidden  transition-shadow bg-figma-gray rounded-lg p-3">
      {/* Event Image */}
      <div className="relative h-60 rounded-md bg-muted overflow-hidden">
        <img
          src={PlaceholderImg()}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="py-3 space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold  text-foreground">{title}</h3>
          <Badge variant={helpers.lowerCase(status) as any}>{status}</Badge>
        </div>

        {/* Event Description */}
        <p className="text-muted-foreground line-clamp-2">{description}</p>

        {/* Event Details */}
        <div className="space-y-1 text-sm mt-5">
          <div className="[&_div]:flex  [&_div]:gap-2  [&_div]:items-center [&_div]:text-muted-foreground flex flex-col lg:flex-row lg:justify-between">
            <div>
              <FavIcon className="size-5" name="location" />
              <span className="text-base text-primary">{location}</span>
            </div>
            <div className="flex  gap-2  items-center text-muted-foreground">
              <FavIcon className="size-5" name="tiket" />
              <span className="text-base text-primary">{attendees}</span>
            </div>
          </div>
          <div className="[&_div]:flex  [&_div]:gap-2  [&_div]:items-center [&_div]:text-muted-foreground flex flex-col lg:flex-row lg:justify-between">
            <div className="flex  gap-2  items-center text-muted-foreground">
              <FavIcon className="size-5" name="ongoing_events" />
              <span className="text-base text-primary">{dateTime}</span>
            </div>
            <div className="flex  gap-2  items-center text-muted-foreground">
              <FavIcon className="size-5" name="price22" />
              <span className="text-base text-primary">{price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
