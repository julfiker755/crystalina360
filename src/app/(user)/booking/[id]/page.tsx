"use client";
import Avatars from "@/components/reuseable/avater";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import CopyBox from "@/components/reuseable/copy-box";
import Modal2 from "@/components/reuseable/modal2";
import VideoPlayer from "@/components/reuseable/player";
import { RatingScore } from "@/components/reuseable/rating";
import sonner from "@/components/reuseable/sonner";
import { Button, Textarea } from "@/components/ui";
import { CloseIcon } from "@/components/view/common/btn-modal";
import { AppAlert } from "@/components/view/user/reuse";
import FavIcon from "@/icon/favIcon";
import { delivary_t, envs, event_t, helpers, } from "@/lib";
import { useBookingsDetailsQuery, useStoreRatingMutation } from "@/redux/api/user/bookingApi";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function BookingDetails() {
  const { id } = useParams()
  const { data: bookings } = useBookingsDetailsQuery(id)
  const [isReview, setIsReview] = useState(false);
  const [downlaodLoading, setdownlaodLoading] = useState(false)

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
    link
  } = bookings?.data?.events || {};

  const invoice_id = bookings?.data?.payment?.invoice_no
  // ===== handleDownload  invoice ============
  const handleDownload = async () => {
    const url = `${envs.api_url}/invoice/${invoice_id}`;
    try {
      setdownlaodLoading(true)
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        }
      });

      if (!response.ok) {
        sonner.error("Invoice download failed", "Please try clicking the download button again", "bottom-right")
      }
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${invoice_id}.pdf`;
      link.click();
      setdownlaodLoading(false)

    } catch (error) {

    }
  };



  const [storeRating] = useStoreRatingMutation()

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
          <span className="text-base">{event_time?.[0]}</span>
        </div>
        <div className="flex  gap-2  items-center text-muted-foreground">
          <Calendar className="text-figma-black" size={22} />
          <span className="text-base">{bookings?.data?.event_date}</span>
        </div>
      </>
    );
  }



  return (
    <div className="container">
      <BackBtn2 className="my-6" />
      <div className="bg-[#FBFBFB] p-3 rounded-xs overflow-clip">
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

        <ul className="flex-between mb-5 mt-10">
          <li className="flex items-center space-x-2">
            <Avatars
              src={organizer?.img || "/avater.png"}
              fallback={organizer?.name}
              alt="event organizer"
            />
            <span className="text-lg items-center flex space-x-1 font-bold text-foreground">
              <h5>{organizer?.name}</h5>
              {organizer?.is_top_seller === true ? (
                <FavIcon className="size-5" name="top_seller" />
              ) : (
                <FavIcon className="size-5" name="verified" />
              )}
            </span>
          </li>

          <li>
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
          <div className="flex gap-2 items-center  text-muted-foreground">
            <MapPin className="text-figma-black" size={23} />
            <span className="text-base font-medium">{`${city}, ${province}, ${region}, ${country}`}</span>
          </div>
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
          {delivery_type === delivary_t.ondemand && (
            <CopyBox value={link} />
          )}

          {NotOnDemand(
            <div>
              <h5 className="text-xl font-medium">Quantity of tickets</h5>
              <h5 className="text-[#A6A996] text-xl ml-2">{bookings?.data?.ticket_quantity}</h5>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          <Link href="/conversation">
            <Button className="bg-transparent  w-full border border-[#ECE8E8] text-[#C4ACA4]">
              Send Message
            </Button>
          </Link>

          <Button
            className="w-full"
            onClick={() => handleDownload()}
            disabled={downlaodLoading}
          >
            Download Invoice
          </Button>
        </div>

      </div>
      {/* modal box */}
      <Modal2 open={isReview} setIsOpen={setIsReview}>
        <CloseIcon
          className="top-4 right-4"
          onClose={() => setIsReview(false)}
        />
        <div className="mb-5">
          <h2 className="text-center text-xl lg:text-2xl text-figma-black font-bold">
            Rating & Review
          </h2>
          <p className="text-center">Please share your experience</p>
        </div>
        <div className="space-y-5">
          <div>
            <h4 className="text-lg font-medium mb-1">Rating</h4>
            <RatingScore
              width={160}
              onChange={(v: any) => console.log(v)}
              readOnly={false}
            />
          </div>
          <div>
            <h4 className="text-lg font-medium mb-1">Additional Review</h4>
            <Textarea
              placeholder="Any additional sentence for the event...."
              className="border-none bg-figma-input resize-none rounded-md min-h-30"
            />
          </div>
          <div className="space-y-2">
            <Button className="w-full">Submit</Button>
            <Button
              onClick={() => setIsReview(false)}
              className="w-full bg-transparent border"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal2>
      <AppAlert />
    </div>
  );
}
