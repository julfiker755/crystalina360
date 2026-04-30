"use client";

import Modal2 from "@/components/reuseable/modal2";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { ArrowRight } from "lucide-react";
import AuthModalController from "../auth-controller";
import { toggleIsOpen } from "@/redux/features/authSlice";
import { useTranslations } from "next-intl";

function LockIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="7"
        y="15"
        width="18"
        height="13"
        rx="3"
        fill="white"
        fillOpacity="0.95"
      />
      <path
        d="M11 15V11C11 8.23858 13.2386 6 16 6C18.7614 6 21 8.23858 21 11V15"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="21.5" r="2" fill="#7F560D" />
      <line
        x1="16"
        y1="23.5"
        x2="16"
        y2="25.5"
        stroke="#7F560D"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function RestrictedAccessModal({
  open,
  setOpen,
  title,
  text,
}: any) {
  const t = useTranslations("oprator.home.navber");
  const dispatch = useAppDispatch();
  const { isOpen, user } = useAppSelector((state: AppState) => state.auth);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="p-0 border-0 bg-white sm:max-w-xl overflow-hidden [&>button]:hidden"
          style={{
            width: "400px",
            maxWidth: "400px",
            borderRadius: "20px",
            boxShadow:
              "0 32px 64px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,255,255,0.12)",
          }}
        >
          <DialogHeader className="text-white px-4 pt-4 sr-only">
            <DialogTitle className={"text-black font-semibold mt-2"}>
              rr
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="hidden sr-only"></DialogDescription>
          <div className="flex flex-col items-center text-center px-6 pt-10 pb-8">
            <div className="w-18 h-18 bg-figma-primary rounded-md flex items-center justify-center mb-6">
              <LockIcon />
            </div>

            <h2 className="text-[20px] font-bold text-gray-900 tracking-tight mb-2.5">
              {t("restricted.title")}
            </h2>

            <p className="text-[14px] text-gray-400 leading-relaxed mb-7 max-w-70">
              {t("restricted.description")}
            </p>

            <div className="w-full flex flex-col gap-2.5">
              <Button
                onClick={() => {
                  setOpen(!open);
                  dispatch(toggleIsOpen());
                }}
                className="h-10 cursor-pointer"
              >
                {" "}
                <ArrowRight size={16} strokeWidth={2.5} />
                {t("restricted.sign_in")}
              </Button>
              <Button
                onClick={() => setOpen(!open)}
                variant={"none"}
                style={{
                  boxShadow:
                    "0 0 12px rgba(153, 121, 111, 0.25), 0 0 24px rgba(153, 121, 111, 0.15), 0 0 4px rgba(153, 121, 111, 0.3)",
                }}
                className="h-10 bg-white cursor-pointer text-black"
              >
                {" "}
                {t("restricted.cancel")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* ============ */}

      <Modal2
        open={isOpen}
        setIsOpen={(v) => dispatch(toggleIsOpen(v))}
        mainStyle="!p-0"
        className="sm:max-w-xl"
      >
        <AuthModalController title={t("sign_up_as_operator")} />
      </Modal2>
    </div>
  );
}
