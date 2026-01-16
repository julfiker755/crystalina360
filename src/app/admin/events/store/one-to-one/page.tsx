"use client";
import OnetoOneStore from "@/components/event-store/one-to-one";
import { BackBtn } from "@/components/reuseable/back-btn";
import NavTitle from "@/components/reuseable/nav-title";
import { Button } from "@/components/ui";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import AlertDiscard from "@/components/view/oparator/simple/alert-discard";
import { X } from "lucide-react";
import React from "react";

export default function OnetoOne() {
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

      <OnetoOneStore />
    </div>
  );
}
