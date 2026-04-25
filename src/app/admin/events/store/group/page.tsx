"use client";
import GroupStore from "@/components/event-store/group";
import { BackBtn } from "@/components/reuseable/back-btn";
import NavTitle from "@/components/reuseable/nav-title";
import { Button } from "@/components/ui";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import AlertDiscard from "@/components/view/oparator/simple/alert-discard";
import { X } from "lucide-react";
import React from "react";

export default function GroupStoreBox() {
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
            <h2>Creating Group event</h2>
          </div>
          <AlertDiscard>
            <Button className="z-10" variant="destructive">
              <X />
              Discard
            </Button>
          </AlertDiscard>
        </div>
      </SvgBox>

      <GroupStore role="admin" msg="Your event has been added successfully" />
    </div>
  );
}
