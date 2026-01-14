"use client";
import EventButton from "@/components/reuseable/event-button/page";
import Modal from "@/components/reuseable/modal";
import { Button, ButtonGroup, Label } from "@/components/ui";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import EventCard from "@/components/view/oparator/reuse/event-card";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const eventOptions = [
  {
    id: "one-to-one",
    title: "One to One",
    description:
      "A private event designed for personal interaction and focused discussion between two individuals.",
  },
  {
    id: "group",
    title: "Group",
    description:
      "An exclusive gathering with a set number of participants, ensuring closer connections and meaningful engagement.",
  },
  {
    id: "retreat",
    title: "Retreat",
    description:
      "An immersive event. It can only be o line (therefore, it cannot be online or on demand). ",
  },
];

const ongoingItem = [
  {
    title: "Event title goes here",
    status: "Ongoing",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lectus urna etiam imperdiet in amet sit tortor. Molestie quis mauris pellentesque.",
    location: "Event location goes here",
    dateTime: "10 Sep, 2025 at 05:00 PM - 09:00 PM",
    price: 15.0,
    attendees: "1/2",
  },
  {
    title: "Event title goes here",
    status: "Ongoing",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lectus urna etiam imperdiet in amet sit tortor. Molestie quis mauris pellentesque.",
    location: "Event location goes here",
    dateTime: "10 Sep, 2025 at 05:00 PM - 09:00 PM",
    price: 15.0,
    attendees: "1/2",
  },
];

const upcomingItem = [
  {
    title: "Event title goes here",
    status: "Upcoming",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lectus urna etiam imperdiet in amet sit tortor. Molestie quis mauris pellentesque.",
    location: "Event location goes here",
    dateTime: "10 Sep, 2025 at 05:00 PM - 09:00 PM",
    price: 15.0,
    attendees: "1/2",
  },
  {
    title: "Event title goes here",
    status: "Upcoming",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lectus urna etiam imperdiet in amet sit tortor. Molestie quis mauris pellentesque.",
    location: "Event location goes here",
    dateTime: "10 Sep, 2025 at 05:00 PM - 09:00 PM",
    price: 15.0,
    attendees: "1/2",
  },
  {
    title: "Event title goes here",
    status: "Upcoming",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lectus urna etiam imperdiet in amet sit tortor. Molestie quis mauris pellentesque.",
    location: "Event location goes here",
    dateTime: "10 Sep, 2025 at 05:00 PM - 09:00 PM",
    price: 15.0,
    attendees: "1/2",
  },
];

export default function EventAll() {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string>("1:1");
  const [selectEvent, setSelectEvent] = useState("");

  const overviewItem = [
    {
      icon: "events",
      title: "Total events",
      count: "12",
    },
    {
      icon: "ongoing_events",
      title: "Ongoing events",
      count: "02",
    },
    {
      icon: "up_events",
      title: "Upcoming events",
      count: "15",
    },
  ];

  const eventOptions = [
    {
      id: "onetoone",
      title: "One to One",
      description:
        "A private event designed for personal interaction and focused discussion between two individuals.",
      path: "",
    },
    {
      id: "group",
      title: "Group",
      description:
        "An exclusive gathering with a set number of participants, ensuring closer connections and meaningful engagement.",
    },
    {
      id: "retreat",
      title: "Retreat",
      description:
        "An immersive event. It can only be o line (therefore, it cannot be online or on demand). ",
    },
  ];

  const handleSubmitEvent = () => {
    router.push(`/operator/events/store/${selectEvent}`);
  };

  return (
    <div className="container pb-10">
      <SvgBox className="mt-6">
        <div className="flex items-center flex-wrap justify-between">
          <div className="flex items-center  gap-4 flex-wrap  space-x-5">
            {overviewItem?.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <h1 className="size-13 grid place-items-center rounded-md bg-white">
                  <FavIcon className="size-6" name={item.icon as any} />
                </h1>
                <div>
                  <h4 className="text-black font-normal">{item.title}</h4>
                  <h2>{item.count}</h2>
                </div>
              </div>
            ))}
          </div>
          <EventButton
            eventOptions={eventOptions}
            selectEvent={selectEvent}
            setSelectEvent={setSelectEvent}
            handleSubmitEvent={handleSubmitEvent}
          />
        </div>
      </SvgBox>
      {/* filter group item */}
      <div className="my-7 flex justify-end">
        <ButtonGroup>
          {["1:1", "Group", "Retreat"].map((btn) => (
            <Button
              key={btn}
              size="sm"
              variant="outline"
              className={
                activeButton === btn
                  ? "bg-primary text-white hover:bg-primary hover:text-white"
                  : ""
              }
              onClick={() => setActiveButton(btn)}
            >
              {btn}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="space-y-3">
        <div>
          <h2 className="text-2xl text-black">Ongoing Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ongoingItem.map((item, idx) => (
              <Link key={idx} href={`/operator/events/3`}>
                <EventCard item={item} />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl text-black">Upcoming Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {upcomingItem.map((item, idx) => (
              <Link key={idx} href={`/operator/events/3`}>
                <EventCard item={item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
