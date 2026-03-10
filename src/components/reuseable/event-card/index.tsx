import FavIcon from "@/icon/favIcon";
import { delivary_t, event_t, fakeZoom, helpers } from "@/lib";
import { Calendar, MapPin, Tag } from "lucide-react";
import { useWishEventsMutation } from "@/redux/api/user/userEventsApi";
import { Skeleton } from "@/components/ui";
import Avatars from "../avater";
import CopyBox from "../copy-box";
import { StarBadge } from "../star-badge";
import { ImgBox } from "../Img-box";
import Image from "next/image";

interface EventCardProps {
  item: any;
  wish: boolean;
}

export default function EventCard({ item, wish = false }: EventCardProps) {
  const {
    id,
    organizer,
    event_title,
    event_description,
    event_type,
    country,
    region,
    province,
    city,
    price,
    event_date,
    event_time,
    delivery_type,
    img,
    is_loved_by_user,
    organizer_label,
  } = item || {};



  const [wishEvents, { isLoading }] = useWishEventsMutation();
  let elementShow: any;
  if (event_type === event_t.onetoone || event_type == event_t.retreat) {
    elementShow = (
      <div className="flex  gap-2  items-center text-muted-foreground">
        <Calendar size={22} />
        <span className="text-base">{event_date?.[0]}</span>
      </div>
    );
  } else if (event_type === event_t.group) {
    elementShow = (
      <div className="flex  gap-2  items-center text-muted-foreground">
        <FavIcon color="#7F7F7F" className="size-5" name="ongoing_events" />
        <span className="text-base">{helpers.planTime(event_time?.[0])}</span>
      </div>
    );
  }
  //  ===========  store wish ================
  const submitWish = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const data = helpers.fromData({
      event_id: id,
    });

    if (!isLoading && wish) {
      await wishEvents(data).unwrap();
    }
  };

  return (
    <div className="overflow-hidden  transition-shadow bg-figma-gray rounded-lg p-3">
      <div className="relative h-60 overflow-hidden rounded-md ">
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
          <div>
            <img
              src={img || "/not.png"}
              alt={"title"}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {wish && (
          <div
            onClick={(e) => submitWish(e)}
            className="size-10 grid place-items-center cursor-pointer absolute right-3 top-3 rounded-full bg-white"
          >
            {is_loved_by_user ? (
              <FavIcon name="u_loves_true" />
            ) : (
              <FavIcon name="love" />
            )}
          </div>
        )}
      </div>
      <div className="pt-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center h-fit gap-3">
            <Avatars
              alt={organizer?.name}
              src={organizer?.img || "/avater.png"}
              fallback={organizer?.name}
            />
            <span className="text-lg items-center flex space-x-1 font-bold text-foreground">
              <h5>{organizer?.name}</h5>
              {organizer_label ? (
                <Image src={"/admin.png"} width={17} height={10} alt="img" />
              ) : (
                <StarBadge
                  is_subscribed={organizer?.is_subscribed}
                  is_top_seller={organizer?.is_top_seller}
                />
              )}
            </span>
          </div>
          <div className="border rounded-md w-fit h-fit bg-[#F2F2F2] font-medium py-1 px-3">
            {event_type === event_t.onetoone
              ? "1.1"
              : helpers.capitalize(event_type)}
          </div>
        </div>

        <div className="py-5 space-y-1">
          <h3 className="text-lg font-semibold truncate text-foreground">
            {event_title}
          </h3>
          <p className="text-muted-foreground line-clamp-2">
            {event_description}
          </p>
          <div className="space-y-1 mt-3 text-sm">
            {delivery_type === delivary_t.online ? (
              <div className="flex  gap-2  items-center text-muted-foreground">
                <CopyBox icon={false} value={fakeZoom} />
              </div>
            ) : (
              <div className="flex  gap-2  items-center text-muted-foreground">
                <MapPin size={24} />
                <span className="text-base">{`${city}, ${province}, ${region}, ${country}`}</span>
              </div>
            )}

            {elementShow}
            {delivery_type === delivary_t.ondemand ? (
              <h5 className="text-gray-500 opacity-0">Not Show ondemand </h5>
            ) : (
              <div className="flex  gap-2  items-center text-muted-foreground">
                <Tag size={20} />
                <span className="text-base">{price}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const SkeletonEventCard = () => {
  return (
    <div className="rounded-md">
      <Skeleton className="w-full h-[250px]" />
      <div className="my-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="w-30 h-4" />
        </div>
        <Skeleton className="w-20 h-9" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
      </div>
      <div className="space-y-2 mt-2">
        <Skeleton className="w-[70%] h-5" />
        <Skeleton className="w-[60%] h-5" />
        <Skeleton className="w-1/2 h-5" />
      </div>
    </div>
  );
};
