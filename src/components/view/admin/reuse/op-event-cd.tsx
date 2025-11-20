import { Badge, Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { helpers } from "@/lib";
import { getDeliveryType } from "@/lib/function-utils";

interface opevtcdProps {
  children?: React.ReactNode;
  item: any;
}

export default function OpEvtCd({ item, children }: opevtcdProps) {
  const {
    title,
    status,
    mode,
    description,
    location,
    dateTime,
    price,
    attendees,
  } = item || {};

  return (
    <div className="overflow-hidden   transition-shadow bg-figma-gray rounded-lg p-3">
      {/* Event Image */}
      <div className="relative h-60  group rounded-md bg-muted overflow-hidden">
        <img
          src={
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop"
          }
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute  right-2 top-2">
          <div className="flex items-center space-x-2">
            <Button size="default" className="bg-[#434549] text-white">
              {getDeliveryType(helpers.slugify(mode) as any, "#fff")}
              {mode}
            </Button>
            <Button size="default" variant={helpers.lowerCase(status) as any}>
              {status}
            </Button>
          </div>
        </div>
        {children}
      </div>

      <div className="py-3 space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold  text-foreground">{title}</h3>
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
