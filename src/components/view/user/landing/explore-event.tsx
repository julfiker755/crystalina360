"use client";
import Modal2 from "@/components/reuseable/modal2";
import { toggleIsOpen } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AuthModalController from "../../common/auth-controller";
import EventCard, {
  SkeletonEventCard,
} from "@/components/reuseable/event-card";
import { Button } from "@/components/ui";
import { useGetPublicEventsQuery } from "@/redux/api/user/userEventsApi";
import { Repeat } from "@/components/reuseable/repeat";
import { AppState } from "@/redux/store";
import Link from "next/link";
import { roleKey } from "@/lib";

export default function ExploreEvents() {
  const dispatch = useAppDispatch();
  const { isOpen, user } = useAppSelector((state: AppState) => state.auth);
  const { data: eventsItem, isLoading } = useGetPublicEventsQuery({});

  return (
    <div id="explore" className="pt-17  container">
      <h1 className="mb-10">Explore Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading ? (
          <Repeat count={6}>
            <SkeletonEventCard />
          </Repeat>
        ) : (
          eventsItem?.data
            ?.slice(0, 6)
            ?.map((item: any) => (
              <EventCard key={item.id} wish={false} item={item} />
            ))
        )}
      </div>
      <div className="flex justify-center">
        {user.role == roleKey.user ? (
          <Link href="/events">
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
      {/*  ==============  sign up form ============== */}
      <Modal2
        open={isOpen}
        setIsOpen={(v) => dispatch(toggleIsOpen(v))}
        mainStyle="!p-0"
        className="sm:max-w-xl"
      >
        <AuthModalController title="Sign up as a User" />
      </Modal2>
    </div>
  );
}
