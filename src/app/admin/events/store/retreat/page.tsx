"use client";
import RetreatStore from "@/components/event-store/retreat";
import NavTitle from "@/components/reuseable/nav-title";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import AlertDiscard from "@/components/view/oparator/simple/alert-discard";
import { Button } from "@/components/ui";
import { X } from "lucide-react";
import React from "react";
import { BackBtn } from "@/components/reuseable/back-btn";

export default function Retreat() {
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
            <h2>Creating Retreat event</h2>
          </div>
          <AlertDiscard>
            <Button className="z-10" variant="destructive">
              <X />
              Discard
            </Button>
          </AlertDiscard>
        </div>
      </SvgBox>

      <RetreatStore />
    </div>
  );
}
