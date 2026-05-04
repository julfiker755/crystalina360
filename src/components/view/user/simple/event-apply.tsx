// "use client";
// import { useState, useEffect } from "react";
// import { Button, Input, Label } from "@/components/ui";
// import { Minus, Plus, ChevronDown } from "lucide-react";
// import { event_t, helpers } from "@/lib";
// import { useCouponCheckMutation } from "@/redux/api/user/userCouponApi";
// import { useFormFields } from "@/hooks";
// import { usePurchaseStoreMutation } from "@/redux/api/user/userEventsApi";
// import { usePaymentInitMutation } from "@/redux/api/user/paymetsApi";
// import clsx from "clsx";
// import Link from "next/link";
// import { useTranslations } from "next-intl";

// export default function EventApply({
//   id,
//   event_type,
//   event_date,
//   event_time,
//   available_tickets,
//   price,
// }: any) {
//   const t = useTranslations("user.details");
//   const [isOpen, setIsOpen] = useState(false);
//   const [items, setItems] = useState<any>([]);
//   const [isDate, setIsDate] = useState(false);
//   const [couponValid, setCouponValid] = useState<boolean>(false);
//   const [couponCheck] = useCouponCheckMutation();
//   const [purchaseStore, { isLoading: purchaseLoading }] =
//     usePurchaseStoreMutation();
//   const from = useFormFields({
//     coupon: "",
//   });
//   const [total, setTotal] = useState(0);
//   const [isBooking, setIsBooking] = useState({
//     date: "",
//     coupon_code: "",
//     quantity: 1,
//   });

//   //   ============== discount calculation =============
//   const totalTaka = isBooking.quantity * price;
//   useEffect(() => {
//     setTotal(totalTaka);
//   }, [isBooking.quantity, price]);

//   //  =========== handleSubmitCoupon ==========
//   const handleSubmitCoupon = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setCouponValid(true);
//     try {
//       const isValid = from.validateFields({
//         coupon: t("coupon_is_required"),
//       });
//       if (!isValid) return;

//       const data = helpers.fromData({
//         coupon_code: from?.formData?.coupon,
//       });
//       const res = await couponCheck(data).unwrap();
//       if (res.status) {
//         const amount = res?.data?.price;
//         const type = res?.data?.coupon_type;
//         //  ===== Apply discount if coupon is present =======
//         if (type === "flat" && amount) {
//           setTotal(totalTaka - amount);
//         } else if (type === "percentage" && amount) {
//           setTotal(totalTaka - (totalTaka * amount) / 100);
//         }
//         setIsBooking((prev) => ({
//           ...prev,
//           coupon_code: res.data.coupon_code,
//         }));
//         from.reset();
//         setCouponValid(true);
//       }
//     } catch (err: any) {
//       from.setError("coupon", err?.data?.message);
//       setCouponValid(false);
//     }
//   };

//   useEffect(() => {
//     if (event_type === event_t.onetoone || event_type === event_t.retreat) {
//       setItems(event_time);
//       setIsDate(false);
//     } else if (event_type === event_t.group) {
//       setItems(event_date);
//       setIsDate(true);
//     }
//   }, [event_type, event_date, event_time]);

//   const handleQuantity = (type: "plus" | "minus") => {
//     setIsBooking((prev) => {
//       if (type === "plus") {
//         return {
//           ...prev,
//           quantity:
//             prev.quantity < available_tickets
//               ? prev.quantity + 1
//               : prev.quantity,
//         };
//       }

//       return {
//         ...prev,
//         quantity: prev.quantity > 1 ? prev.quantity - 1 : 1,
//       };
//     });
//   };

//   // ================ payment apply ==================

//   const [paymentInit] = usePaymentInitMutation();
//   const [paymentLoading, setIsPaymentLoading] = useState(false);
//   const handlePurchase = async () => {
//     setIsPaymentLoading(true);
//     try {
//       const data = {
//         event_id: id,
//         ...(isDate
//           ? { event_date: isBooking.date }
//           : { event_time: isBooking.date }),
//         coupon_id: isBooking?.coupon_code,
//         quantity: isBooking.quantity,
//       };

//       const res = await purchaseStore(data).unwrap();
//       if (res.status) {
//         const res2 = await paymentInit({
//           invoice_no: res?.data.invoice_no,
//         }).unwrap();
//         //  ========= link ========
//         const paypalLink = res2.data?.link;
//         window.location.href = paypalLink;
//       }
//     } finally {
//       setIsPaymentLoading(false);
//     }
//   };



//   return (
//     <div className="space-y-5 pt-10">
//       <div className="w-full">
//         <Label className="mb-2 block text-base">
//           {isDate ? t("select_date") : t("select_time")}
//         </Label>
//         <div
//           className={clsx(
//             "relative bg-figma-input rounded-md p-3 cursor-pointer transition-all duration-200",
//           )}
//         >
//           <div
//             onClick={() => setIsOpen(!isOpen)}
//             className="flex items-center justify-between"
//           >
//             <span className="text-sm text-foreground">
//               {isBooking?.date?.includes(":")
//                 ? helpers.planTime(isBooking.date)
//                 : isBooking?.date || t("select_here")}
//             </span>
//             <ChevronDown
//               className={clsx(
//                 "w-5 h-5 text-muted-foreground transition-transform",
//                 isOpen && "rotate-180",
//               )}
//             />
//           </div>

//           <div
//             className={clsx(
//               "overflow-hidden transition-all duration-300",
//               isOpen ? "max-h-60 mt-3 border-t" : "max-h-0",
//             )}
//           >
//             <ul className="space-y-2">
//               {items &&
//                 items.map((item: any, index: number) => (
//                   <li
//                     key={index}
//                     onClick={() => {
//                       setIsBooking((prev) => ({
//                         ...prev,
//                         date: item,
//                       }));
//                       setIsOpen(false);
//                     }}
//                     className="p-2 rounded-md hover:bg-primary/10 cursor-pointer text-sm"
//                   >
//                     <span className="text-muted-foreground">
//                       {isDate ? item : helpers.planTime(item)}
//                     </span>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between">
//         <div>
//           <Label className="mb-2 font-medium text-base">
//             {t("quantity_of_tickets")}
//           </Label>
//           <ul className="flex items-center">
//             <li>
//               <Button
//                 size="icon-sm"
//                 className="bg-transparent btn-shadow1"
//                 onClick={() => handleQuantity("minus")}
//               >
//                 <Minus size={25} className="text-primary" />
//               </Button>
//             </li>
//             <li className="text-lg mx-4 font-medium text-figma-black">
//               {isBooking.quantity}
//             </li>
//             <li>
//               <Button
//                 size="icon-sm"
//                 className="bg-transparent btn-shadow1"
//                 onClick={() => handleQuantity("plus")}
//               >
//                 <Plus size={25} className="text-primary" />
//               </Button>
//             </li>
//           </ul>
//         </div>
//         <h5 className="font-medium text-base">
//           {t("total_price")}: €{total}
//         </h5>
//       </div>

//       {/* Coupon */}
//       <form onSubmit={handleSubmitCoupon} className="mb-10">
//         <Label className="font-medium text-base">{t("coupon_code")}</Label>
//         <div className="flex items-center space-x-3">
//           <div className="w-full relative">
//             <Input
//               placeholder={t("coupon_code_placeholder")}
//               className="bg-figma-input border-none"
//               value={from.formData.coupon}
//               onChange={(e) => from.handleChange("coupon", e.target.value)}
//             />
//             {from?.errors?.coupon && (
//               <p className="text-red-500 absolute -bottom-5 text-sm left-2  flex justify-end items-center text-right">
//                 <span className="mr-1"> {from?.errors?.coupon}</span>{" "}
//               </p>
//             )}
//           </div>
//           <Button
//             disabled={couponValid}
//             className="bg-transparent border border-primary text-primary"
//           >
//             {t("apply")}
//           </Button>
//         </div>
//       </form>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         <Link href={"/conversation"}>
//           <Button
//             type="button"
//             className="bg-transparent  w-full border border-[#ECE8E8] text-[#C4ACA4]"
//           >
//             {t("send_message")}
//           </Button>
//         </Link>

//         <Button
//           disabled={isBooking?.date?.length > 0 ? false : true}
//           onClick={() => handlePurchase()}
//           className="w-full"
//         >
//           {paymentLoading ? t("waiting_for_payment") : t("purchase_now")}
//         </Button>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { Button, Input, Label } from "@/components/ui";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { event_t, helpers } from "@/lib";
import { useCouponCheckMutation } from "@/redux/api/user/userCouponApi";
import { useFormFields } from "@/hooks";
import { usePurchaseStoreMutation } from "@/redux/api/user/userEventsApi";
import { usePaymentInitMutation } from "@/redux/api/user/paymetsApi";
import clsx from "clsx";
import Link from "next/link";
import { useTranslations } from "next-intl";


const calcBreakdown = (unitPrice: number, quantity: number) => {
  const basePrice = Math.round(unitPrice * quantity * 100) / 100;
  const platformFee = Math.round((basePrice * 0.025 + 0.79) * 100) / 100;
  const taxAmount = Math.round((basePrice + platformFee) * 0.22 * 100) / 100;
  const totalPrice = Math.round((basePrice + platformFee + taxAmount) * 100) / 100;
  return { basePrice, platformFee, taxAmount, totalPrice };
};

export default function EventApply({
  id,
  event_type,
  event_date,
  event_time,
  available_tickets,
  price,
}: any) {
  const t = useTranslations("user.details");

  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<any>([]);
  const [isDate, setIsDate] = useState(false);
  const [couponValid, setCouponValid] = useState(false);
  const [discountedBase, setDiscountedBase] = useState<number | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [couponCheck] = useCouponCheckMutation();
  const [purchaseStore] = usePurchaseStoreMutation();
  const [paymentInit] = usePaymentInitMutation();
  const from = useFormFields({ coupon: "" });

  const [isBooking, setIsBooking] = useState({
    date: "",
    coupon_code: "",
    quantity: 1,
  });

  // ── Derived price breakdown ────────────────────────────────────
  const unitPrice = discountedBase !== null ? discountedBase : parseFloat(price);
  const { basePrice, platformFee, taxAmount, totalPrice } = calcBreakdown(
    unitPrice,
    isBooking.quantity
  );

  // ── Populate date/time items by event type ─────────────────────
  useEffect(() => {
    if (event_type === event_t.onetoone || event_type === event_t.retreat) {
      setItems(event_time);
      setIsDate(false);
    } else if (event_type === event_t.group) {
      setItems(event_date);
      setIsDate(true);
    }
  }, [event_type, event_date, event_time]);

  // ── Quantity ───────────────────────────────────────────────────
  const handleQuantity = (type: "plus" | "minus") => {
    setIsBooking((prev) => ({
      ...prev,
      quantity:
        type === "plus"
          ? prev.quantity < available_tickets ? prev.quantity + 1 : prev.quantity
          : prev.quantity > 1 ? prev.quantity - 1 : 1,
    }));
  };

  // ── Coupon ─────────────────────────────────────────────────────
  const handleSubmitCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isValid = from.validateFields({ coupon: t("coupon_is_required") });
      if (!isValid) return;

      const data = helpers.fromData({ coupon_code: from?.formData?.coupon });
      const res = await couponCheck(data).unwrap();

      if (res.status) {
        const amount = res?.data?.price;
        const type = res?.data?.coupon_type;
        const unit = parseFloat(price);

        if (type === "flat" && amount) {
          setDiscountedBase(unit - amount / isBooking.quantity);
        } else if (type === "percentage" && amount) {
          setDiscountedBase(unit - (unit * amount) / 100);
        }

        setIsBooking((prev) => ({ ...prev, coupon_code: res.data.coupon_code }));
        from.reset();
        setCouponValid(true);
      }
    } catch (err: any) {
      from.setError("coupon", err?.data?.message);
      setCouponValid(false);
    }
  };

  // ── Purchase ───────────────────────────────────────────────────
  const handlePurchase = async () => {
    setPaymentLoading(true);
    try {
      const data = {
        event_id: id,
        ...(isDate ? { event_date: isBooking.date } : { event_time: isBooking.date }),
        coupon_id: isBooking?.coupon_code,
        quantity: isBooking.quantity,
      };
      const res = await purchaseStore(data).unwrap();
      if (res.status) {
        const res2 = await paymentInit({ invoice_no: res?.data.invoice_no }).unwrap();
        window.location.href = res2.data?.link;
      }
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="space-y-5 pt-10">

      {/* ── Date / Time selector ────────────────────────────────── */}
      <div className="w-full">
        <Label className="mb-2 block text-base">
          {isDate ? t("select_date") : t("select_time")}
        </Label>
        <div className="relative bg-figma-input rounded-md p-3 cursor-pointer transition-all duration-200">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-foreground">
              {isBooking?.date?.includes(":")
                ? helpers.planTime(isBooking.date)
                : isBooking?.date || t("select_here")}
            </span>
            <ChevronDown
              className={clsx(
                "w-5 h-5 text-muted-foreground transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>
          <div
            className={clsx(
              "overflow-hidden transition-all duration-300",
              isOpen ? "max-h-60 mt-3 border-t" : "max-h-0"
            )}
          >
            <ul className="space-y-2">
              {items?.map((item: any, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setIsBooking((prev) => ({ ...prev, date: item }));
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

      {/* ── Quantity ─────────────────────────────────────────────── */}
      <div>
        <Label className="mb-2 font-medium text-base">
          {t("quantity_of_tickets")}
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

      {/* ── Price Breakdown ──────────────────────────────────────── */}
      <div className="rounded-md  overflow-hidden text-sm">

        <div className="space-y-2 pb-2">

          {/* Ticket Quantity */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-figma-black">{t("ticket_quantity")}</span>
            <span className="font-medium text-figma-black">{isBooking.quantity}</span>
          </div>

          {/* Sub Total / Base Price */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-figma-black">
              {t("sub_total")}
            </span>
            <span className="font-medium text-figma-black">€{basePrice.toFixed(2)}</span>
          </div>

          {/* Platform / Booking Fee — 2.5% + €0.79 */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-figma-black">
              {t("booking_fee")}(2.5% + €0.79)
            </span>
            <span className="font-medium text-figma-black">€{platformFee.toFixed(2)}</span>
          </div>

          {/* VAT */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-figma-black">{t("tax")}(22% VAT)
            </span>
            <span className="font-medium text-figma-black">€{taxAmount.toFixed(2)}</span>
          </div>

        </div>

        {/* Total footer */}
        <div className="py-3  border-t border-border/60 flex items-center justify-between">
          <span className="font-semibold text-base text-figma-black">{t("total_price")}</span>
          <span className="font-bold text-base text-primary">€{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* ── Coupon ───────────────────────────────────────────────── */}
      <form onSubmit={handleSubmitCoupon} className="mb-10">
        <Label className="font-medium text-base">{t("coupon_code")}</Label>
        <div className="flex items-center space-x-3">
          <div className="w-full relative">
            <Input
              placeholder={t("coupon_code_placeholder")}
              className="bg-figma-input border-none"
              value={from.formData.coupon}
              onChange={(e) => from.handleChange("coupon", e.target.value)}
            />
            {from?.errors?.coupon && (
              <p className="text-red-500 absolute -bottom-5 text-sm left-2 flex items-center">
                <span className="mr-1">{from?.errors?.coupon}</span>
              </p>
            )}
          </div>
          <Button
            disabled={couponValid}
            className="bg-transparent border border-primary text-primary"
          >
            {t("apply")}
          </Button>
        </div>
      </form>

      {/* ── Action Buttons ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Link href={"/conversation"}>
          <Button
            type="button"
            className="bg-transparent w-full border border-[#ECE8E8] text-[#C4ACA4]"
          >
            {t("send_message")}
          </Button>
        </Link>
        <Button
          disabled={!isBooking?.date?.length}
          onClick={handlePurchase}
          className="w-full"
        >
          {paymentLoading ? t("waiting_for_payment") : t("purchase_now")}
        </Button>
      </div>

    </div>
  );
}