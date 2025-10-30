import FavIcon from "@/icon/favIcon";
import { PlaceholderImg } from "@/lib";
import Avatars from "../avater";
import { Calendar, MapPin, Tag } from "lucide-react";
import Link from "next/link";

export default function EventCard({ item }: any) {
  const { id, title, organizer, badge, description, location, date, price } =
    item || {};
  return (
    <Link href={`/events-all/${id}`}>
      <div className="overflow-hidden  transition-shadow bg-figma-gray rounded-lg p-3">
        {/* Event Image */}
        <div className="relative h-60 rounded-md bg-muted overflow-hidden">
          <img
            src={PlaceholderImg()}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="size-10 grid place-items-center cursor-pointer absolute right-3 top-3 rounded-full bg-white">
            <FavIcon name="love" />
          </div>
        </div>

        {/* Event Content */}
        <div className="pt-5">
          {/* Organizer Info */}
          <div className="flex justify-between items-center">
            <div className="flex items-center h-fit gap-3">
              <Avatars
                alt={organizer.name}
                src={organizer.avatar}
                fallback={organizer.name}
              />
              <span className="text-lg font-bold text-foreground">
                {organizer.name}
              </span>
            </div>
            <div className="border rounded-md w-fit h-fit bg-[#F2F2F2] font-medium py-1 px-3">
              {badge || "1.1"}
            </div>
          </div>

          <div className="py-5 space-y-1">
            {/* Event Title */}
            <h3 className="text-lg font-semibold  text-foreground">{title}</h3>

            {/* Event Description */}
            <p className="text-muted-foreground line-clamp-2">{description}</p>

            {/* Event Details */}
            <div className="space-y-1 text-sm">
              <div className="flex  gap-2  items-center text-muted-foreground">
                <MapPin size={20} />
                <span className="text-base">{location}</span>
              </div>
              <div className="flex  gap-2  items-center text-muted-foreground">
                <Calendar size={20} />
                <span className="text-base">{date}</span>
              </div>
              <div className="flex  gap-2  items-center text-muted-foreground">
                <Tag size={20} />
                <span className="text-base">{price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
