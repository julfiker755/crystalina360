import { childrenProps } from "@/types";
import React from "react";

interface couponProps extends childrenProps {
  offer: string;
  code: string;
  expiry: string;
}

export default function CouponCad({
  offer,
  code,
  expiry,
  children,
}: couponProps) {
  return (
    <div className="flex rounded-2xl  overflow-hidden coupons-shadow  bg-white">
      <div className="w-24 bg-[#5D37C5] flex items-center justify-center relative">
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-figma-gray! rounded-full shadow-lg" />
        <span className="text-white text-xl font-bold lg:text-2xl  transform -rotate-90 whitespace-nowrap">
          Discount
        </span>
      </div>

      {/* Right White Section with Details */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h4 className="text-gray-500 text-base lg:text-lg font-semibold">
            {offer}
          </h4>
          <h2 className="text-xl lg:text-[28px] font-bold text-figma-black">
            {code}
          </h2>
          <h4 className="text-article mt-1">Expiry: {expiry}</h4>
        </div>
        {children}
      </div>
    </div>
  );
}
