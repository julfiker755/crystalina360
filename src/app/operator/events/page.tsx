"use client";
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
  const [isStore, setIsStore] = useState(false);
  const [selectValue, setIsSelect] = useState("");

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

  const handleSubmit = () => {
    router.push(`/operator/events/store/${selectValue}`);
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
          <Button
            onClick={() => setIsStore(!isStore)}
            className="z-10 text-white mt-3 lg:mt-0"
            size="lg"
          >
            Create New Event
          </Button>
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
      {/*  =============== event store ============== */}
      <Modal
        title="Select Event Type"
        titleStyle="text-center"
        open={isStore}
        setIsOpen={setIsStore}
      >
        <RadioGroup value={selectValue} onValueChange={(v) => setIsSelect(v)}>
          {eventOptions.map((option) => (
            <div key={option.id} className="border rounded-lg">
              <div className="flex items-center px-2 py-4 gap-4">
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="border-primary cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-primary border"
                />
                <Label
                  htmlFor={option.id}
                  className="cursor-pointer  flex flex-col items-start"
                >
                  <h3 className="text-lg leading-3 font-semibold text-foreground">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {option.description}
                  </p>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
        <Button
          className="w-full mt-4"
          onClick={() => handleSubmit()}
          disabled={selectValue === ""}
        >
          Next
        </Button>
      </Modal>
    </div>
  );
}
