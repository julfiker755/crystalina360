"use client";
import RetreatStore from "@/components/event-store/retreat";
import { BackBtn } from "@/components/reuseable/back-btn";
import { Button } from "@/components/ui";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import AlertDiscard from "@/components/view/oparator/simple/alert-discard";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function Retreat() {
  const t = useTranslations("oprator.evStoreAll");
  return (
    <div className="container py-10">
      <SvgBox>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <BackBtn className="bg-white rounded-md" />
            <h2>{t("retreat")}</h2>
          </div>

          <AlertDiscard>
            <Button className="z-10" variant="destructive">
              <X />
              {t("discard.discard_btn")}
            </Button>
          </AlertDiscard>
        </div>
      </SvgBox>

      <RetreatStore msg={t("event_approval_message")} />
    </div>
  );
}
