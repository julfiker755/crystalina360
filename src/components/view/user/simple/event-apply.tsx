"use client";
import { useState, useEffect } from "react";
import { Button, Input, Label } from "@/components/ui";
import { Minus, Plus, ChevronDown } from "lucide-react";
import { event_t, helpers } from "@/lib";
import { useCouponCheckMutation } from "@/redux/api/user/userCouponApi";
import { useFormFields } from "@/hooks";
import { usePurchaseStoreMutation } from "@/redux/api/user/userEventsApi";
import { useRouter } from "next/navigation";
import { usePaymentInitMutation } from "@/redux/api/user/paymetsApi";
import clsx from "clsx";

export default function EventApply({
  id,
  event_type,
  event_date,
  event_time,
  available_tickets,
  price,
  organizer,
}: any) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<any>([]);
  const [isDate, setIsDate] = useState(false);
  const [couponValid, setCouponValid] = useState<boolean>(false);
  const [couponCheck] = useCouponCheckMutation();
  const [purchaseStore, { isLoading: purchaseLoading }] =
    usePurchaseStoreMutation();
  // const [storeRoom, { isLoading: roomIsloading }] = useStoreRoomMutation();
  const from = useFormFields({
    coupon: "",
  });
  const [total, setTotal] = useState(0);
  const [isBooking, setIsBooking] = useState({
    date: "",
    coupon_code: "",
    quantity: 1,
  });

  //   ============== discount calculation =============
  const totalTaka = isBooking.quantity * price;
  useEffect(() => {
    setTotal(totalTaka);
  }, [isBooking.quantity, price]);

  //  =========== handleSubmitCoupon ==========
  const handleSubmitCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponValid(true);
    try {
      const isValid = from.validateFields({
        coupon: "Coupon is required",
      });
      if (!isValid) return;

      const data = helpers.fromData({
        coupon_code: from?.formData?.coupon,
      });
      const res = await couponCheck(data).unwrap();
      if (res.status) {
        const amount = res?.data?.price;
        const type = res?.data?.coupon_type;
        //  ===== Apply discount if coupon is present =======
        if (type === "flat" && amount) {
          setTotal(totalTaka - amount);
        } else if (type === "percentage" && amount) {
          setTotal(totalTaka - (totalTaka * amount) / 100);
        }
        setIsBooking((prev) => ({
          ...prev,
          coupon_code: res.data.coupon_code,
        }));
        from.reset();
        setCouponValid(true);
      }
    } catch (err: any) {
      from.setError("coupon", err?.data?.message);
      setCouponValid(false);
    }
  };

  useEffect(() => {
    if (event_type === event_t.onetoone || event_type === event_t.retreat) {
      setItems(event_time);
      setIsDate(false);
    } else if (event_type === event_t.group) {
      setItems(event_date);
      setIsDate(true);
    }
  }, [event_type, event_date, event_time]);

  const handleQuantity = (type: "plus" | "minus") => {
    setIsBooking((prev) => {
      if (type === "plus") {
        return {
          ...prev,
          quantity:
            prev.quantity < available_tickets
              ? prev.quantity + 1
              : prev.quantity,
        };
      }

      return {
        ...prev,
        quantity: prev.quantity > 1 ? prev.quantity - 1 : 1,
      };
    });
  };

  const [paymentInit] = usePaymentInitMutation();
  const [paymentLoading, setIsPaymentLoading] = useState(false);
  const handlePurchase = async () => {
    setIsPaymentLoading(true);
    try {
      const data = {
        event_id: id,
        ...(isDate
          ? { event_date: isBooking.date }
          : { event_time: isBooking.date }),
        coupon_id: isBooking?.coupon_code,
        quantity: isBooking.quantity,
      };

      const res = await purchaseStore(data).unwrap();
      if (res.status) {
        const res2 = await paymentInit({
          invoice_no: res?.data.invoice_no,
        }).unwrap();
        //  ========= link ========
        const paypalLink = res2.data?.link;
        window.location.href = paypalLink;
      }
    } finally {
      setIsPaymentLoading(false);
    }
  };
  // store room

  const handleStoreRoom = async (id: string) => {
    // console.log(id);
    // const data = helpers.fromData({
    //   user2: id,
    // });
    // const res = await storeRoom(data).unwrap();
    // if (res.status) {
    //   router.push("/conversation");
    // }
  };

  return (
    <div className="space-y-5 pt-10">
      <div className="w-full">
        <Label className="mb-2 block text-base">
          {isDate ? "Select Date" : "Select Time"}
        </Label>
        <div
          className={clsx(
            "relative bg-figma-input rounded-md p-3 cursor-pointer transition-all duration-200",
          )}
        >
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-foreground">
              {isBooking?.date?.includes(":")
                ? helpers.planTime(isBooking.date)
                : isBooking?.date || "Select here"}
            </span>
            <ChevronDown
              className={clsx(
                "w-5 h-5 text-muted-foreground transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </div>

          <div
            className={clsx(
              "overflow-hidden transition-all duration-300",
              isOpen ? "max-h-60 mt-3 border-t" : "max-h-0",
            )}
          >
            <ul className="space-y-2">
              {items &&
                items.map((item: any, index: number) => (
                  <li
                    key={index}
                    onClick={() => {
                      setIsBooking((prev) => ({
                        ...prev,
                        date: item,
                      }));
                      setIsOpen(false);
                    }}
                    className="p-2 rounded-md hover:bg-primary/10 cursor-pointer text-sm"
                  >
                    <span className="text-muted-foreground">
                      {isDate ? item : helpers.planTime(item)}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label className="mb-2 font-medium text-base">
            Quantity of Tickets
          </Label>
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
            <li className="text-lg mx-4 font-medium text-figma-black">
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
        <h5 className="font-medium text-base">Total:{total}</h5>
      </div>

      {/* Coupon */}
      <form onSubmit={handleSubmitCoupon} className="mb-10">
        <Label className="font-medium text-base">Coupon code</Label>
        <div className="flex items-center space-x-3">
          <div className="w-full relative">
            <Input
              placeholder="Enter Your Coupon code"
              className="bg-figma-input border-none"
              value={from.formData.coupon}
              onChange={(e) => from.handleChange("coupon", e.target.value)}
            />
            {from?.errors?.coupon && (
              <p className="text-red-500 absolute -bottom-5 text-sm left-2  flex justify-end items-center text-right">
                <span className="mr-1"> {from?.errors?.coupon}</span>{" "}
              </p>
            )}
          </div>
          <Button
            disabled={couponValid}
            className="bg-transparent border border-primary text-primary"
          >
            Apply
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Button
          type="button"
          onClick={() => handleStoreRoom(organizer?.id)}
          className="bg-transparent  w-full border border-[#ECE8E8] text-[#C4ACA4]"
        >
          Send Message
        </Button>

        <Button
          disabled={isBooking?.date?.length > 0 ? false : true}
          onClick={() => handlePurchase()}
          className="w-full"
        >
          {paymentLoading ? "Waiting for payment..." : "Purchase Now"}
        </Button>
      </div>
    </div>
  );
}
