"use client";
import Avatars from "@/components/reuseable/avater";
import { authKey, helpers, roleKey } from "@/lib";
import { useTicketDetailsQuery } from "@/redux/api/user/userEventsApi";
import { useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { IdParams } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

export default function Payments({ params }: IdParams) {
  const { id } = use(params);
  const [isLoading, setIsLoading] = useState(false);
  const token = helpers.hasAuthToken();
  const { user } = useAppSelector((state: AppState) => state.auth);
  const router = useRouter();
  const { data: ticketData } = useTicketDetailsQuery(id);

  const handleSwipe = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (!token || !id) {
      redirect("/");
    }
  }, [token, id]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl  shadow-2xl overflow-hidden border-8 border-primary backdrop-blur-sm">
          <div className="bg-[#000000]/5 px-6 py-4 flex items-center justify-between">
            <div
              onClick={() => router.back()}
              className="size-10 2xl:size-11 bg-white cursor-pointer rounded-md grid place-items-center"
            >
              <ChevronLeft />
            </div>
            <span className="text-black text-xs font-semibold">
              {helpers.formatTime(new Date())}
            </span>
          </div>

          <div className="p-8 flex flex-col items-center gap-6">
            <p className="text-center text-slate-600 text-sm font-medium">
              Sending Payment to {user?.name} via PayPal
            </p>
            <Avatars
              className="size-20 2xl:size-25"
              src={user?.avatar || "/avater.png"}
              fallback={user?.name}
              alt="avater"
            />

            {/* Amount */}
            <div className="text-center">
              <p className="text-5xl font-black text-slate-900 tracking-tight">
                € {Math.floor(ticketData?.data?.amount) || 0}
              </p>
            </div>

            {/* Swipe Button */}
            <button
              onClick={handleSwipe}
              disabled={isLoading}
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 active:scale-95 disabled:opacity-50 transition-all duration-200 text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-3 shadow-lg hover:shadow-xl group"
            >
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg">
                {isLoading ? "Processing..." : "Swipe to pay"}
              </span>
            </button>

            {/* Security Info */}
            <p className="text-center text-xs text-gray-400 mt-2">
              Secure transaction • Encrypted
            </p>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center">
            <p className="text-xs text-gray-500">
              Your payment is protected by PayPal's Buyer Protection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
