"use client";
import Avatars from "@/components/reuseable/avater";
import Modal2 from "@/components/reuseable/modal2";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { PlaceholderImg } from "@/lib";
import { toggleIsOpen } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Calendar, MapPin, Tag } from "lucide-react";
import AuthModalController from "../../common/auth-controller";
import Link from "next/link";

const eventsData = [
  {
    id: "1",
    title: "Event title",
    description:
      "This event organize for the music lover peoples. Every members...",
    image: "/music-event-concert.jpg",
    organizer: {
      name: "Julian Ena",
      avatar: "/diverse-profile-avatars.png",
    },
    location: "Event location",
    date: "13 September, 2025",
    price: "$485.00",
    badge: "Group",
  },
  {
    id: "2",
    title: "Event title",
    description:
      "This event organize for the music lover peoples. Every members...",
    image: "/conference-hall-event.jpg",
    organizer: {
      name: "Julian Ena",
      avatar: "/diverse-profile-avatars.png",
    },
    location: "http://zoom.com/2532sdf",
    date: "09:00 AM",
    price: "$389.00",
    badge: "Group",
  },
  {
    id: "3",
    title: "Event title",
    description:
      "This event organize for the music lover peoples. Every members...",
    image: "/business-meeting-event.jpg",
    organizer: {
      name: "Julian Ena",
      avatar: "/diverse-profile-avatars.png",
    },
    location: "Event location",
    date: "13 September, 2025",
    price: "$485.00",
  },
  {
    id: "4",
    title: "Event title",
    description:
      "This event organize for the music lover peoples. Every members...",
    image: "/concert-stage-lights.png",
    organizer: {
      name: "Julian Ena",
      avatar: "/diverse-profile-avatars.png",
    },
    location: "Event location",
    date: "09:00 AM - 05:00 PM",
    price: "$389.00",
  },
  {
    id: "5",
    title: "Event title",
    description:
      "This event organize for the music lover peoples. Every members...",
    image: "/music-performance-stage.jpg",
    organizer: {
      name: "Julian Ena",
      avatar: "/diverse-profile-avatars.png",
    },
    location: "Event location",
    date: "13 September, 2025",
    price: "$389.00",
  },
  {
    id: "6",
    title: "Event title",
    description:
      "This event organize for the music lover peoples. Every members...",
    image: "/office-meeting-business.jpg",
    organizer: {
      name: "Julian Ena",
      avatar: "/diverse-profile-avatars.png",
    },
    location: "Event location",
    date: "12 Nov, 2025 at 09:00 AM - 03:00 PM",
    price: "$485.00",
    badge: "Repost",
  },
];

export default function ExploreEvents() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state: any) => state.auth);
  return (
    <div className="py-10 container">
      <h1 className="mb-10">Explore Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {eventsData.map((event) => (
          <div
            key={event.id}
            className="overflow-hidden  transition-shadow bg-[#FBFBFB] rounded-lg p-3"
          >
            {/* Event Image */}
            <div className="relative h-60 rounded-md bg-muted overflow-hidden">
              <img
                src={PlaceholderImg()}
                alt={event.title}
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
                    alt={event.organizer.name}
                    src={event.organizer.avatar}
                    fallback={event.organizer.name}
                  />
                  <span className="text-lg font-bold text-foreground">
                    {event.organizer.name}
                  </span>
                </div>
                <div className="border rounded-md w-fit h-fit bg-[#F2F2F2] font-medium py-1 px-3">
                  {event.badge || "1.1"}
                </div>
              </div>

              <div className="py-5 space-y-1">
                {/* Event Title */}
                <h3 className="text-lg font-semibold  text-foreground">
                  {event.title}
                </h3>

                {/* Event Description */}
                <p className="text-muted-foreground line-clamp-2">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-1 text-sm">
                  <div className="flex  gap-2  items-center text-muted-foreground">
                    <MapPin size={20} />
                    <span className="text-base">{event.location}</span>
                  </div>
                  <div className="flex  gap-2  items-center text-muted-foreground">
                    <Calendar size={20} />
                    <span className="text-base">{event.date}</span>
                  </div>
                  <div className="flex  gap-2  items-center text-muted-foreground">
                    <Tag size={20} />
                    <span className="text-base">{event.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() => dispatch(toggleIsOpen())}
        className="flex justify-center"
      >
        <Button size="lg" className="mt-10">
          Create account to get access
        </Button>
      </div>
      <Modal2
        open={isOpen}
        setIsOpen={(v) => dispatch(toggleIsOpen(v))}
        mainStyle="!p-0"
        className="sm:max-w-xl"
      >
        <AuthModalController title="Sign up as a User" />
        {/* <AuthBox title="Sign up as a User" /> */}
      </Modal2>
    </div>
  );
}
