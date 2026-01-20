import { Badge } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { delivary_t, event_t, helpers } from "@/lib";
import { Calendar } from "lucide-react";

export default function EventCard({ item }: any) {
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
    delivery_type,
  } = item || {};

  const NotOnDemand = (item: any) => {
    return delivery_type === delivary_t.ondemand ? null : item;
  };

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
    <div className="overflow-hidden  transition-shadow bg-figma-gray rounded-lg p-3">
      <div className="relative h-60 rounded-md bg-muted overflow-hidden">
        {delivery_type == delivary_t.ondemand ? (
          <video
            key={img}
            autoPlay
            loop
            playsInline
            muted
            preload="auto"
            style={{
              width: "100%",
              height: "240px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          >
            <source src={img} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={img || "/not.png"}
            alt={event_title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="py-3 space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold truncate  text-foreground">
            {event_title}
          </h3>
          <Badge variant={helpers.lowerCase(status) as any}>
            {helpers.capitalize(status)}
          </Badge>
        </div>
        <p className="text-muted-foreground line-clamp-2">
          {event_description}
        </p>

        {/* Event Details */}
        <div className="space-y-1 text-sm mt-5">
          <div className="[&_div]:flex  [&_div]:gap-2  [&_div]:items-center [&_div]:text-muted-foreground flex flex-col lg:flex-row lg:justify-between">
            <div>
              <FavIcon className="size-5" name="location" />
              <span className="text-base text-primary">
                {city}, {province}, {region}, {country}
              </span>
            </div>
            {NotOnDemand(
              <div className="flex  gap-2  items-center text-muted-foreground">
                <FavIcon className="size-5" name="tiket" />
                <span className="text-base text-primary">
                  {ticket_quantity}
                </span>
              </div>,
            )}
          </div>
          <div className="[&_div]:flex  [&_div]:gap-2  [&_div]:items-center [&_div]:text-muted-foreground flex flex-col lg:flex-row lg:justify-between">
            {elementShow}
            {NotOnDemand(
              <div className="flex  gap-2  items-center text-muted-foreground">
                <FavIcon className="size-5" name="price22" />
                <span className="text-base text-primary">{price}</span>
              </div>,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
