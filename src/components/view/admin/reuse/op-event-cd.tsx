import Avatars from "@/components/reuseable/avater";
import CopyBox from "@/components/reuseable/copy-box";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { delivary_t, event_t, helpers } from "@/lib";
import { getDeliveryIcon } from "@/lib/function-utils";
import { Calendar } from "lucide-react";

interface opevtcdProps {
  children?: React.ReactNode;
  item: any;
  admin?: boolean;
  operator?: boolean;
}

export default function OpEvtCd({
  item,
  children,
  admin = false,
  operator = false,
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
    organizer,
    delivery_type,
    link,
  } = item || {};

  let elementShow: any;

  if (event_type === event_t.onetoone || event_type == event_t.retreat) {
    elementShow = delivery_type != delivary_t.ondemand && (
      <div className="flex  gap-2  items-center text-muted-foreground">
        <Calendar className="size-5 text-primary" />
        <span className="text-base text-primary">{event_date?.[0]}</span>
      </div>
    );
  } else if (event_type === event_t.group) {
    elementShow = delivery_type != delivary_t.ondemand && (
      <div className="flex  gap-2  items-center text-muted-foreground">
        <FavIcon className="size-5" name="ongoing_events" />
        <span className="text-base text-primary">
          {helpers.planTime(event_time?.[0])}
        </span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden   transition-shadow bg-figma-gray rounded-lg p-3">
      <div className="relative h-60  group rounded-md bg-muted overflow-hidden">
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

        {admin && (
          <div className="absolute  right-2 top-2">
            <div className="flex items-center space-x-2">
              <Button size="default" className="bg-[#434549] text-white">
                {getDeliveryIcon(delivery_type, "#FFFFFF")}{" "}
                {helpers.capitalize(delivery_type)}
              </Button>
              {delivery_type != delivary_t.ondemand && (
                <Button
                  size="default"
                  variant={helpers.lowerCase(status) as any}
                >
                  {helpers.capitalize(status)}
                </Button>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
      {/* ==================== operator ================= */}
      {operator && (
        <div className="flex items-center gap-x-1 mt-2">
          <Avatars
            src={organizer?.img || "/avater.png"}
            fallback={organizer?.name}
            alt="profile"
            fallbackStyle="aStyle"
          />
          <span className="font-medium">{organizer?.name}</span>
          {organizer?.is_top_seller === true ? (
            <FavIcon name="top_seller" />
          ) : (
            <FavIcon className="size-5" name="verified" />
          )}
        </div>
      )}

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
          <div className="[&_div]:flex  [&_div]:gap-2   [&_div]:items-center [&_div]:text-muted-foreground flex flex-col lg:flex-row lg:justify-between">
            {delivery_type === delivary_t.online ? (
              <CopyBox
                value={link}
                valueStyle="text-primary text-base!"
                linkStyle="text-primary"
              />
            ) : (
              <div>
                <FavIcon className="size-5" name="location" />
                <span className="text-base text-primary">
                  {city}, {province}, {region}, {country}
                </span>
              </div>
            )}
            {/* -- ondemad not show -- */}
            {delivery_type === delivary_t.ondemand ? null : (
              <div className="flex  gap-2  items-center text-muted-foreground">
                <FavIcon className="size-5" name="tiket" />
                <span className="text-base text-primary">
                  {ticket_quantity}
                </span>
              </div>
            )}
          </div>
          <div className="[&_div]:flex  [&_div]:gap-2  [&_div]:items-center [&_div]:text-muted-foreground flex flex-col lg:flex-row lg:justify-between">
            {elementShow}
            <div className="flex  gap-2  items-center text-muted-foreground">
              <FavIcon className="size-5" name="price22" />
              <span className="text-base text-primary">{price || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
