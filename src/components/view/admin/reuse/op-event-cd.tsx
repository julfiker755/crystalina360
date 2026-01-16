import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { event_t, helpers } from "@/lib";
import { Calendar } from "lucide-react";

interface opevtcdProps {
  children?: React.ReactNode;
  item: any;
  admin?: boolean;
}

export default function OpEvtCd({
  item,
  children,
  admin = false,
}: opevtcdProps) {
  const {
    event_type,
    event_title,
    img,
    status,
    event_description,
    ticket_quantity,
    price,
    event_date,
    event_time,
    city,
    province,
    region,
    country,
  } = item || {};

  let elementShow: any;

  if (event_type === event_t.onetoone || event_type == event_t.retreat) {
    elementShow = (
      <div className="flex  gap-2  items-center text-muted-foreground">
        <Calendar className="size-5 text-primary" />
        <span className="text-base text-primary">{event_date?.[0]}</span>
      </div>
    );
  } else if (event_type === event_t.group) {
    elementShow = (
      <div className="flex  gap-2  items-center text-muted-foreground">
        <FavIcon className="size-5" name="ongoing_events" />
        <span className="text-base text-primary">{event_time?.[0]}</span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden   transition-shadow bg-figma-gray rounded-lg p-3">
      <div className="relative h-60  group rounded-md bg-muted overflow-hidden">
        <img
          src={img}
          alt={event_title}
          className="w-full h-full object-cover"
        />
        {admin && (
          <div className="absolute  right-2 top-2">
            <div className="flex items-center space-x-2">
              <Button size="default" className="bg-[#434549] text-white">
                {helpers.capitalize(event_type)}
              </Button>
              <Button size="default" variant={helpers.lowerCase(status) as any}>
                {helpers.capitalize(status)}
              </Button>
            </div>
          </div>
        )}
        {children}
      </div>

      <div className="py-3 space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold  text-foreground">
            {event_title}
          </h3>
        </div>
        <p className="text-muted-foreground line-clamp-2">
          {event_description}
        </p>
        <div className="space-y-1 text-sm mt-5">
          <div className="[&_div]:flex  [&_div]:gap-2  [&_div]:items-center [&_div]:text-muted-foreground flex flex-col lg:flex-row lg:justify-between">
            <div>
              <FavIcon className="size-5" name="location" />
              <span className="text-base text-primary">
                {city}, {province}, {region}, {country}
              </span>
            </div>
            <div className="flex  gap-2  items-center text-muted-foreground">
              <FavIcon className="size-5" name="tiket" />
              <span className="text-base text-primary">{ticket_quantity}</span>
            </div>
          </div>
          <div className="[&_div]:flex  [&_div]:gap-2  [&_div]:items-center [&_div]:text-muted-foreground flex flex-col lg:flex-row lg:justify-between">
            {elementShow}
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
