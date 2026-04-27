"use client";
import { eventItem } from "@/components/dummy-data";
import { BackBtn } from "@/components/reuseable/back-btn";
import EventCard from "@/components/view/oparator/reuse/event-card";
import { Button, ButtonGroup, Skeleton } from "@/components/ui";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import { usePendingEventOpertorQuery } from "@/redux/api/operator/opratorApi";
import { NoItemData } from "@/components/reuseable/table-no-item";
import { Repeat } from "@/components/reuseable/repeat";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

export default function PendingEvents() {
  const t = useTranslations("oprator.dashboard.events");
  const [activeButton, setActiveButton] = useState<string>("");
  const { data: pendingEvent, isLoading } = usePendingEventOpertorQuery({
    search: activeButton,
  });

  return (
    <div className="container mx-auto mb-20">
      <SvgBox className="mt-6">
        <div className="flex items-center space-x-2">
          <BackBtn className="bg-white rounded-md" />
          <h2>{t("event_requests")}</h2>
        </div>
      </SvgBox>
      <div className="my-4 flex justify-end">
        <ButtonGroup>
          {eventItem?.map((btn) => (
            <Button
              key={btn.value}
              size="sm"
              variant="outline"
              className={
                activeButton === btn.value
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
                  : ""
              }
              onClick={() => setActiveButton(btn.value)}
            >
              {t(`filter.${btn.key}`)}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <Repeat count={10}>
              <Skeleton className="w-full h-[420px]" />
            </Repeat>
          ) : pendingEvent?.data?.length > 0 ? (
            pendingEvent?.data?.map((item: any, idx: any) => (
              <EventCard key={idx} item={item} />
            ))
          ) : (
            <NoItemData
              className="col-span-1 lg:col-span-3"
              title={t("no_events")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
