"use client";
import EventCard, {
  SkeletonEventCard,
} from "@/components/reuseable/event-card";
import { Button } from "@/components/ui";
import { useGetPublicEventsQuery } from "@/redux/api/user/userEventsApi";
import { Repeat } from "@/components/reuseable/repeat";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ExploreEvents() {
  const t = useTranslations("user.home");
  const { data: eventsItem, isLoading } = useGetPublicEventsQuery({});

  return (
    <div id="explore" className="pt-17  container">
      <h1 className="mb-10">{t("ex_events.title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading ? (
          <Repeat count={6}>
            <SkeletonEventCard />
          </Repeat>
        ) : (
          eventsItem?.data?.slice(0, 6)?.map((item: any) => (
            <Link key={item.id} href={`/events/${item?.id}`}>
              <EventCard key={item.id} wish={false} item={item} />
            </Link>
          ))
        )}
      </div>
      <div className="flex justify-center">
        <Link href="/events">
          <Button size="lg" className="mt-10">
            {t("ex_events.btn_more")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
