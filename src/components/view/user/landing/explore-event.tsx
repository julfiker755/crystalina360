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
import { eventsData } from "../dummy-json";

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
