"use client";
import EventFrom from "@/components/reuseable/event-from";
import { Button } from "@/components/ui";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import AlertDiscard from "@/components/view/oparator/simple/alert-discard";
import { X } from "lucide-react";
import { useParams } from "next/navigation";

export default function EventStore() {
  const handleFormSubmit = () => {};

  return (
    <div className="container py-10">
      <SvgBox>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <h2>Creating One to one event</h2>
          </div>
          <AlertDiscard>
            <Button className="z-10" variant="destructive">
              <X />
              Discard
            </Button>
          </AlertDiscard>
        </div>
      </SvgBox>

      <EventFrom handleFormSubmit={handleFormSubmit} />
    </div>
  );
}
