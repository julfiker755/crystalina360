"use client";
import EventFrom from "@/components/reuseable/event-from";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import AlertDiscard from "@/components/view/oparator/simple/alert-discard";
import NavTitle from "@/components/reuseable/nav-title";
import { Button } from "@/components/ui";
import { X } from "lucide-react";
import { BackBtn } from "@/components/reuseable/back-btn";

export default function EventEdit() {
  const handleFormSubmit = () => {};

  return (
    <div>
      <NavTitle
        title="Manage events"
        subTitle="Manage all of the events from this section."
      />
      <SvgBox>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <BackBtn className="bg-white rounded-md" />
            <h2>Editing Event</h2>
          </div>
        </div>
      </SvgBox>

      <EventFrom handleFormSubmit={handleFormSubmit} />
    </div>
  );
}
