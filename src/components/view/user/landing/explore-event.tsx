"use client";
import Modal2 from "@/components/reuseable/modal2";
import { toggleIsOpen } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AuthModalController from "../../common/auth-controller";
import EventCard from "@/components/reuseable/event-card";
import { Button } from "@/components/ui";
import { AppState } from "@/redux/store";
import Link from "next/link";
import { roleKey } from "@/lib";

export const eventsData = [
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
  const { isOpen, user } = useAppSelector((state: AppState) => state.auth);
  return (
    <div id="explore" className="py-10 container">
      <h1 className="mb-10">Explore Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {eventsData.map((event) => (
          <EventCard key={event.id} item={event} />
        ))}
      </div>
      <div className="flex justify-center">
        {user.role == roleKey.user ? (
          <Link href="/events-all">
            <Button size="lg" className="mt-10">
              Explore More
            </Button>
          </Link>
        ) : (
          <Button
            onClick={() => dispatch(toggleIsOpen())}
            size="lg"
            className="mt-10"
          >
            Create account to get access
          </Button>
        )}
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
