import { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Minus, Plus, ChevronDown } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

const dates = [
  { date: "Oct 9, 2025", time: "07:00 AM" },
  { date: "Oct 10, 2025", time: "07:00 AM" },
  { date: "Oct 11, 2025", time: "07:00 AM" },
  { date: "Oct 12, 2025", time: "07:00 AM" },
];

export default function EventApply() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooking, setIsBooking] = useState({
    date: "",
    coupon_code: "",
    quantity: 1,
  });

  // handle quantity change
  const handleQuantity = (type: "plus" | "minus") => {
    setIsBooking((prev) => ({
      ...prev,
      quantity:
        type === "plus"
          ? prev.quantity + 1
          : prev.quantity > 1
          ? prev.quantity - 1
          : 1,
    }));
  };
  return (
    <div className="space-y-5 pt-10">
      {/* Accordion Select */}
      <div className="w-full">
        <Label className="mb-2 block">Select Date</Label>
        <div
          className={clsx(
            "relative bg-figma-input rounded-md p-3 cursor-pointer transition-all duration-200"
          )}
        >
          {/* Trigger */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-foreground">
              {isBooking.date || "Select here"}
            </span>
            <ChevronDown
              className={clsx(
                "w-5 h-5 text-muted-foreground transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>

          {/* Accordion Content */}
          <div
            className={clsx(
              "overflow-hidden transition-all duration-300",
              isOpen ? "max-h-60 mt-3 border-t" : "max-h-0"
            )}
          >
            <ul className="space-y-2">
              {dates.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setIsBooking((prev) => ({
                      ...prev,
                      date: `${item.date} · ${item.time}`,
                    }));
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-md hover:bg-primary/10 cursor-pointer text-sm"
                >
                  {item.date} ·{" "}
                  <span className="text-muted-foreground">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div>
        <Label className="mb-2">Quantity of Tickets</Label>
        <ul className="flex items-center">
          <li>
            <Button
              size="icon-sm"
              className="bg-transparent btn-shadow1"
              onClick={() => handleQuantity("minus")}
            >
              <Minus size={25} className="text-primary" />
            </Button>
          </li>
          <li className="text-lg mx-4 text-figma-black">
            {isBooking.quantity}
          </li>
          <li>
            <Button
              size="icon-sm"
              className="bg-transparent btn-shadow1"
              onClick={() => handleQuantity("plus")}
            >
              <Plus size={25} className="text-primary" />
            </Button>
          </li>
        </ul>
      </div>

      {/* Coupon */}
      <div>
        <Label>Coupon code</Label>
        <div className="flex items-center space-x-3 mt-3">
          <Input
            placeholder="Enter Your Coupon code"
            className="bg-figma-input border-none"
            value={isBooking.coupon_code}
            onChange={(e) =>
              setIsBooking((prev) => ({
                ...prev,
                coupon_code: e.target.value,
              }))
            }
          />
          <Button
            className="bg-transparent border border-primary text-primary"
            onClick={() => console.log("Coupon:", isBooking.coupon_code)}
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Link href="/conversation">
          <Button className="bg-transparent border border-primary text-primary">
            Send Message
          </Button>
        </Link>

        <Link href="/payment">
          <Button className="w-full">Purchase</Button>
        </Link>
      </div>
    </div>
  );
}
