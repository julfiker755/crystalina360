"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Avatars from "@/components/reuseable/avater";
import { envs, helpers } from "@/lib";
import { useTicketDetailsQuery } from "@/redux/api/user/userEventsApi";
import { useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { IdParams } from "@/types";
import { ChevronLeft } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui";
// import { usePaymentInitQuery } from "@/redux/api/user/paymetsApi";

export default function Payments({ params }: IdParams) {
  const { id } = use(params);
  const token = helpers.hasAuthToken();
  const { user } = useAppSelector((state: AppState) => state.auth);
  const router = useRouter();
  const { data: ticketData } = useTicketDetailsQuery(id);
  // const { data: paymentInfo } = usePaymentInitQuery(id);

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
            {/* <a href={paymentInfo?.data?.link}>
              <Button>PayPal</Button>
            </a> */}

            {/* <PayPalScriptProvider
              options={{
                clientId: envs.paypal_client_id as string,
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical", shape: "rect" }}
                fundingSource="paypal"
              />
            </PayPalScriptProvider> */}

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
