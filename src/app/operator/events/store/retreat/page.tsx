"use client";
import RetreatStore from "@/components/event-store/retreat";
import { Button } from "@/components/ui";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import AlertDiscard from "@/components/view/oparator/simple/alert-discard";
import { X } from "lucide-react";
import React from "react";

export default function Retreat() {
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

      <RetreatStore />
    </div>
  );
}
