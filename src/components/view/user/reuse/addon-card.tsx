"use client";
import Modal2 from "@/components/reuseable/modal2";
import { Button } from "@/components/ui";
import { CalendarDays, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CloseIcon } from "../../common/btn-modal";
import { useGlobalState } from "@/hooks";

interface AddOnCardProps<T> {
  item: T;
}

export default function AddOnCard<T extends Record<string, any>>({
  item,
}: AddOnCardProps<T>) {
  const { keyBenefits, title, price, bio, primaryColor, secondaryColor } =
    item || {};
  const [global, updateGlobal] = useGlobalState({ show: true, data: null });

  return (
    <>
      <div
        className="rounded-xl border-t-4  bg-white p-8 shadow-md"
        style={{
          borderColor: primaryColor,
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              style={{
                backgroundColor: secondaryColor,
              }}
              className="icon rounded-full"
            >
              <CalendarDays
                style={{
                  color: primaryColor,
                }}
                size={20}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{title}</p>
              <p className="text-lg font-bold text-[#E07856]">${price}</p>
            </div>
          </div>
          <Link href="/payment">
            <Button
              style={{
                backgroundColor: primaryColor,
              }}
              className="rounded-full text-white"
            >
              <Lock className="w-4 h-4 mr-2" />
              Buy now
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mb-6">{bio}</p>
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#E07856] mb-3">
            Key benefits
          </h3>
          <ul className="space-y-2">
            {keyBenefits?.map((item: any, index: any) => (
              <li
                key={item + index}
                className="flex gap-2 text-sm text-muted-foreground"
              >
                <span className="font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* More details link */}
        <div className="text-right">
          <Button
            onClick={() => setIsPreview(!isPreview)}
            style={{
              backgroundColor: secondaryColor,
              color: primaryColor,
            }}
            className="rounded-full"
          >
            More details
          </Button>
        </div>
      </div>
      {/* detials */}
      <Modal2 open={isPreview} setIsOpen={setIsPreview} className="sm:max-w-lg">
        <CloseIcon
          className="top-3 right-4"
          onClose={() => setIsPreview(!isPreview)}
        />
        <h2 className="font-bold text-center">More Details</h2>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              style={{
                backgroundColor: secondaryColor,
              }}
              className="icon rounded-full"
            >
              <CalendarDays
                style={{
                  color: primaryColor,
                }}
                size={20}
              />
            </div>
            <div>
              <p className="text-lg font-bold text-[#E07856]">${price}</p>
            </div>
          </div>
          <Link href="/payment">
            <Button
              style={{
                backgroundColor: primaryColor,
              }}
              className="rounded-full text-white"
            >
              <Lock className="w-4 h-4 mr-2" />
              Buy now
            </Button>
          </Link>
        </div>
      </Modal2>
    </>
  );
}
