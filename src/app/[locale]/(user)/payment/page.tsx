"use client";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { AppAlert } from "@/components/view/user/reuse";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { helpers } from "@/lib";
export default function Payment() {
  return (
    <div className="container">
      <BackBtn2 className="mt-10 mb-2" label="Payment Procedure" />

      <div className="w-11/12 lg:max-w-md mx-auto space-y-5 py-10 lg:py-20">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Card information</h3>
          <div className="space-y-0 border rounded-md">
            <div className="relative">
              <Label htmlFor="card-number" className="sr-only">
                Card number
              </Label>
              <Input
                id="card-number"
                placeholder="Card number"
                className="pr-20 border-b rounded-none border-t-0 border-x-0"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Image
                  src="/visa.png"
                  alt="Visa logo"
                  width={50}
                  height={40}
                  className="h-9 w-auto mr-1"
                />
                <Image
                  src="/mistercard.png"
                  alt="Mastercard logo"
                  width={50}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mm-yy" className="sr-only">
                  MM/YY
                </Label>
                <Input
                  id="mm-yy"
                  placeholder="MM/YY"
                  className="border-y-0 border-l-0 rounded-none border-r"
                />
              </div>
              <div className="relative">
                <Label htmlFor="cvc" className="sr-only">
                  CVC
                </Label>
                <Input
                  id="cvc"
                  placeholder="CVC"
                  className="pr-10 border-none"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Billing address</h3>
          <div className="space-y-0 border rounded-md">
            <div>
              <Label htmlFor="country" className="sr-only">
                Country
              </Label>
              <Select defaultValue="US">
                <SelectTrigger
                  id="country"
                  className="w-full rounded-none border-x-0 border-t-0 cursor-pointer shadow-none"
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="rounded-none p-0">
                  <SelectItem value="US" className="border-b pl-4 rounded-none">
                    United States
                  </SelectItem>
                  <SelectItem value="CA" className="border-b pl-4 rounded-none">
                    Canada
                  </SelectItem>
                  <SelectItem value="GB" className="pl-4 rounded-none">
                    United Kingdom
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="zip" className="sr-only">
                ZIP
              </Label>
              <Input id="zip" placeholder="ZIP" className="border-none" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Button
            variant="outline"
            className="bg-transparent hover:bg-transparent w-full"
          >
            Cancel
          </Button>
          <Button className="w-full">Pay now</Button>
        </div>
      </div>
      <AppAlert className="mb-10" />
    </div>
  );
}
