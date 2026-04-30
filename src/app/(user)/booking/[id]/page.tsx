"use client";
import Avatars from "@/components/reuseable/avater";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import CopyBox from "@/components/reuseable/copy-box";
import Modal2 from "@/components/reuseable/modal2";
import VideoPlayer from "@/components/reuseable/player";
import { RatingScore } from "@/components/reuseable/rating";
import sonner from "@/components/reuseable/sonner";
import { OlistamiLabel, StarBadge } from "@/components/reuseable/star-badge";
import { Button, Textarea } from "@/components/ui";
import { CloseIcon } from "@/components/view/common/btn-modal";
import { AppAlert } from "@/components/view/user/reuse";
import FavIcon from "@/icon/favIcon";
import { delivary_t, envs, event_t, helpers } from "@/lib";
import {
  useBookingsDetailsQuery,
  useStoreRatingMutation,
} from "@/redux/api/user/bookingApi";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const intRathing = {
  rating: 0,
  comment: "",
};
export default function BookingDetails() {
  const t = useTranslations("user.details");
  const { id } = useParams();
  const { data: bookings } = useBookingsDetailsQuery(id);
  const [isReview, setIsReview] = useState(false);
  const [downlaodLoading, setdownlaodLoading] = useState(false);
  const [storeRating, { isLoading: rathingLoading }] = useStoreRatingMutation();
  const [rathingItem, setIsRathingItem] = useState(intRathing);

  const {
    id: ids,
    img,
    event_title,
    event_description,
    event_type,
    delivery_type,
    city,
    province,
    region,
    country,
    event_date,
    event_time,
    organizer,
    available_tickets,
    link,
    status,
    ratings,
    is_rated,
    organizer_label,
  } = bookings?.data?.events || {};

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = {
      ...rathingItem,
      event_id: ids,
    };
    const data = helpers.fromData(value);
    const res = await storeRating(data).unwrap();
    if (res.status) {
      setIsRathingItem((prev) => ({
        ...prev,
        rating: 0,
        comment: "",
      }));
      setIsReview(false);
      sonner.success(
        t("rating_successfully_added"),
        t("thank_you"),
        "bottom-right",
      );
    }
  };

  // ===== handleDownload  invoice ============
  const invoice_id = bookings?.data?.payment?.invoice_no;
  const handleDownload = async () => {
    const url = `${envs.api_url}/invoice/${invoice_id}`;
    try {
      setdownlaodLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        sonner.error(
          "Invoice download failed",
          "Please try clicking the download button again",
          "bottom-right",
        );
      }
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${invoice_id}.pdf`;
      link.click();
      setdownlaodLoading(false);
    } catch (error) {}
  };

  const NotOnDemand = (item: any) => {
    return delivery_type === delivary_t.ondemand ? null : item;
  };

  let elementShow: any;
  if (event_type === event_t.onetoone || event_type == event_t.retreat) {
    elementShow = (
      <>
        <div className="flex  gap-2  items-center text-muted-foreground">
          <Calendar className="text-figma-black" size={22} />
          <span className="text-base">{event_date?.[0]}</span>
        </div>
        <div className="flex gap-2 items-center text-muted-foreground">
          <Clock className="text-figma-black" size={20} />
          <span className="text-base">{bookings?.data?.event_time}</span>
        </div>
      </>
    );
  } else if (event_type === event_t.group) {
    elementShow = (
      <>
        <div className="flex gap-2 items-center text-muted-foreground">
          <Clock className="text-figma-black" size={20} />
          <span className="text-base">{helpers.planTime(event_time?.[0])}</span>
        </div>
        <div className="flex  gap-2  items-center text-muted-foreground">
          <Calendar className="text-figma-black" size={22} />
          <span className="text-base">
            {helpers.formatDate(bookings?.data?.event_date, "DD-MM-YYYY")}
          </span>
        </div>
      </>
    );
  }

  return (
    <div className="container">
      <BackBtn2 label={t("back")} className="my-6" />
      <div className="bg-[#FBFBFB] p-3 rounded-xs">
        <div>
          {delivery_type == delivary_t.ondemand ? (
            <VideoPlayer
              className="sm:w-full mx-auto xl:w-[60%]"
              key={ids}
              src={img}
            />
          ) : (
            <div className="relative h-100 max-w-4xl mx-auto overflow-hidden rounded-md ">
              <img
                src={img || "/not.png"}
                alt={event_title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <ul className="flex-between flex-wrap mb-5 mt-10">
          <li className="flex items-center space-x-2">
            {organizer_label ? (
              <OlistamiLabel />
            ) : (
              <>
                <Avatars
                  src={organizer?.img || "/avater.png"}
                  fallback={organizer?.name}
                  alt="event organizer"
                />
                <span className="text-lg items-center flex space-x-1 font-bold text-foreground">
                  <h5>{organizer?.name}</h5>
                  {
                    <StarBadge
                      is_subscribed={organizer?.is_subscribed}
                      is_top_seller={organizer?.is_top_sellerF}
                    />
                  }
                </span>
              </>
            )}
          </li>

          <li className="mt-2 md:mt-0">
            <div className="border rounded-md w-fit h-fit bg-[#F2F2F2] font-medium py-1 px-3">
              {event_type === event_t.onetoone
                ? "1.1"
                : helpers.capitalize(event_type)}
            </div>
          </li>
        </ul>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">{event_title}</h2>
        </div>
        <p className="text-muted-foreground">{event_description}</p>
        <div className="space-y-2 text-sm mt-5 *:text-figma-black *:font-medium">
          {NotOnDemand(
            <div className="flex gap-2 items-center text-muted-foreground">
              <Tag className="text-figma-black" size={23} />
              <span className="text-base text-[#A6A996] font-medium">
                {bookings?.data?.payment?.amount}
              </span>
            </div>,
          )}
          {bookings?.data?.events?.delivery_type != "online" && (
            <div className="flex gap-2 items-center  text-muted-foreground">
              <MapPin className="text-figma-black" size={23} />
              <span className="text-base font-medium">{`${city}, ${province}, ${region}, ${country}`}</span>
            </div>
          )}
          {NotOnDemand(elementShow)}
          {NotOnDemand(
            parseInt(available_tickets) > 0 && (
              <div className="flex gap-2 items-center text-muted-foreground">
                <FavIcon className="size-5" name="user_ticket_sold" />
                <span className="text-base">
                  Available:{" "}
                  {
                    <span className="font-medium text-primary">
                      {available_tickets}
                    </span>
                  }
                </span>
              </div>
            ),
          )}
          {delivery_type === delivary_t.online && (
            <CopyBox icon={true} value={link} valueStyle="text-base" />
          )}

          {NotOnDemand(
            <div>
              <h5 className="text-xl font-medium">
                {t("quantity_of_tickets")}
              </h5>
              <h5 className="text-[#A6A996] text-xl ml-2">
                {bookings?.data?.ticket_quantity}
              </h5>
            </div>,
          )}
        </div>

        {status === "complete" ? (
          <div className="mt-20 mb-10">
            <ul className="flex items-center flex-wrap w-full justify-between mb-2">
              <li className="text-xl font-medium">{t("rating")}</li>
              <li>
                <div className="flex items-center space-x-2">
                  <Link href={`/conversation?group=${ids}`}>
                    <Button className="bg-transparent  w-full border border-[#ECE8E8] text-[#C4ACA4]">
                      {t("send_message")}
                    </Button>
                  </Link>
                  {!is_rated && (
                    <Button
                      className="w-fit"
                      onClick={() => setIsReview(!isReview)}
                    >
                      {t("review_rating")}
                    </Button>
                  )}
                </div>
              </li>
            </ul>
            {ratings?.length > 0 ? (
              <div className="space-y-3">
                {ratings?.map((item: any, idx: any) => (
                  <div key={idx}>
                    <RatingScore width={100} readOnly={true} />
                    <div className="text-article mt-1">{item.comment}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-figma-a_gray">{t("no_rating_found")}</div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
            <div className="opacity-0">tt</div>
            <Link href={`/conversation?group=${ids}`}>
              <Button className="bg-transparent  w-full border border-[#ECE8E8] text-[#C4ACA4]">
                {t("send_message")}
              </Button>
            </Link>
            {/* <Button
              className="w-full"
              onClick={() => handleDownload()}
              disabled={downlaodLoading}
            >
              {t("download_invoice")}
            </Button> */}
          </div>
        )}
      </div>
      {/* modal box */}
      <Modal2 open={isReview} setIsOpen={setIsReview}>
        <CloseIcon
          className="top-4 right-4"
          onClose={() => setIsReview(false)}
        />
        <div className="mb-5">
          <h2 className="text-center text-xl lg:text-2xl text-figma-black font-bold">
            {t("review_rating")}
          </h2>
          <p className="text-center">{t("please_share_experience")}</p>
        </div>
        <form onSubmit={handleSubmitRating} className="space-y-5">
          <div>
            <h4 className="text-lg font-medium mb-1">{t("rating")}</h4>
            <RatingScore
              width={160}
              onChange={(v: any) =>
                setIsRathingItem((prev) => ({
                  ...prev,
                  rating: v,
                }))
              }
              readOnly={false}
            />
          </div>
          <div>
            <h4 className="text-lg font-medium mb-1 text-figma-black">
              {t("additional_review")}
            </h4>
            <Textarea
              placeholder="Any additional sentence for the event...."
              className="border-none bg-figma-input resize-none rounded-md min-h-30"
              onChange={(e) =>
                setIsRathingItem((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
              required={true}
            />
          </div>
          <div className="space-y-2">
            <Button disabled={rathingLoading} className="w-full">
              {t("submit")}
            </Button>
            <Button
              onClick={() => setIsReview(false)}
              className="w-full bg-transparent border"
              type="button"
            >
              {t("cancel")}
            </Button>
          </div>
        </form>
      </Modal2>
      <AppAlert />
    </div>
  );
}
