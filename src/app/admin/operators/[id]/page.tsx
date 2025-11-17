"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import Modal from "@/components/reuseable/modal";
import NavTitle from "@/components/reuseable/nav-title";
import { Badge, Button } from "@/components/ui";
import OpEvtCd from "@/components/view/admin/reuse/op-event-cd";
import FavIcon from "@/icon/favIcon";
import { cn, RandomImg } from "@/lib";
import useConfirmation from "@/provider/confirmation";
import { useParams } from "next/navigation";
import { useState } from "react";

const item2 = [
  {
    title: "Total events",
    value: 16,
    icon: "events",
  },
  {
    title: "Ticket sold",
    value: 600,
    icon: "tiket",
  },
  {
    title: "Total revenue",
    value: 16000,
    currency: "$",
    icon: "price22",
  },
  {
    title: "Joined since",
    value: "16 Sep, 2024",
    icon: "ongoing_events",
  },
];

const events = [
  {
    title: "Event title goes here",
    mode: "Offline",
    status: "Ongoing",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lectus urna etiam imperdiet in amet sit tortor. Molestie quis mauris pellentesque.",
    location: "Event location goes here",
    link: null,
    dateTime: "10 Sep, 2025 at 05:00 PM - 09:00 PM",
    attendees: "153 / 300",
    price: "$15.00",
    thumbnail: "/img/event1.png",
    type: "live",
  },
  {
    title: "Event title goes here",
    mode: "Online",
    status: "Upcoming",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lectus urna etiam imperdiet in amet sit tortor. Molestie quis mauris pellentesque.",
    location: null,
    link: "http://zoom21.43234df...",
    dateTime: "10 Sep, 2025 at 05:00 PM - 09:00 PM",
    attendees: "153 / 300",
    price: "$15.00",
    thumbnail: "/img/event2.png",
    type: "live",
  },
  {
    title: "Event title goes here",
    mode: "Offline",
    status: "Ongoing",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lectus urna etiam imperdiet in amet sit tortor. Molestie quis mauris pellentesque.",
    location: "Event location goes here",
    link: null,
    dateTime: "10 Sep, 2025 at 05:00 PM - 09:00 PM",
    attendees: "153 / 300",
    price: "$15.00",
    thumbnail: "/img/event3.png",
    type: "live",
  },
  {
    title: "Event title goes here",
    mode: "On demand",
    status: "Upcoming",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lectus urna etiam imperdiet in amet sit tortor. Molestie quis mauris pellentesque.",
    location: "Event location goes here",
    link: null,
    dateTime: "10 Sep, 2025 at 05:00 PM - 09:00 PM",
    attendees: "153 / 300",
    price: "$15.00",
    thumbnail: "/img/event4.png",
    type: "recorded",
  },
  {
    title: "Event title goes here",
    mode: "Offline",
    status: "Ongoing",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lectus urna etiam imperdiet in amet sit tortor. Molestie quis mauris pellentesque.",
    location: "Event location goes here",
    link: null,
    dateTime: "10 Sep, 2025 at 05:00 PM - 09:00 PM",
    attendees: "153 / 300",
    price: "$15.00",
    thumbnail: "/img/event5.png",
    type: "live",
  },
  {
    title: "Event title goes here",
    mode: "On demand",
    status: "Upcoming",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lectus urna etiam imperdiet in amet sit tortor. Molestie quis mauris pellentesque.",
    location: "Event location goes here",
    link: null,
    dateTime: "10 Sep, 2025 at 05:00 PM - 09:00 PM",
    attendees: "153 / 300",
    price: "$15.00",
    thumbnail: "/img/event6.png",
    type: "recorded",
  },
];

export default function OperatorDetils() {
  const { confirm } = useConfirmation();
  const [isPreview, setIsPreview] = useState(false);
  const { id } = useParams();

  const handleOperatorDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Operator",
      title: "You are going to delete this operator",
      description:
        "After deleting, this operator will no longer available in your system",
    });
    if (confirmed) {
      console.log(id);
    }
  };

  const handleDeleteEvent = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Event",
      title: "You are going to delete this event",
      description:
        "After deleting, this event will no longer available in your system",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <NavTitle
        title="Operator Details"
        subTitle="Manage your system operators from this section"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-figma-sidebar p-4 h-fit rounded-xl">
          <BackBtn className="bg-white" iconStyle="text-primary" />
          <div className="space-y-7">
            <div>
              <ImgBox
                className="size-28 rounded-full mx-auto"
                src={RandomImg()}
                alt="img"
              />
              <ul className="mt-2">
                <li className="text-center font-medium text-xl">
                  Elizabeth Olson
                </li>
                <li className="text-center">example@gmail.com</li>
                <li className="flex items-center mt-1 mx-auto bg-white w-fit py-1 px-3 rounded-md">
                  {" "}
                  <FavIcon name="top_seller" />
                  <span className="font-semibold text-lg  ml-1">
                    {" "}
                    Top Seller
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur. Viverra pretium maecenas
                tortor odio interdum arcu sed gravida aliquam. Eros amet
                pulvinar amet sit. Viverra tortor auctor faucibus nulla sapien
                consequat ligula lectus in. Ut at quis dolor senectus turpis.
                Nunc at vitae duis quis ornare tempus. Et ornare erat molestie
                lacus. Iaculis sed metus vitae egestas adipiscing pulvinar{" "}
              </p>
              <div className="flex items-center justify-center gap-2">
                {["Skill 1", "Skill 2", "Skill 3"].map((skill) => (
                  <div
                    key={skill}
                    className="text-center w-fit bg-white px-3 rounded-full"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {item2.map((item, idx) => (
                <div
                  key={idx}
                  className="flex bg-white p-4 rounded-xl space-x-2 items-center"
                >
                  <FavIcon className="size-6" name={item.icon as any} />
                  <ul>
                    <li>{item.title}</li>
                    <li className="text-xl font-medium">{item.value}</li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => handleOperatorDelete("1234")}
                size="lg"
                className="w-fit bg-white mx-auto text-black"
              >
                <FavIcon name="delete_a" />
                Delete Operator
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
            {events.map((item, idx) => (
              <OpEvtCd key={idx} item={item}>
                <div
                  className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white 
                     opacity-0 group-hover:opacity-100 transition"
                >
                  <div className="flex items-center space-x-2 [&_button]:bg-[#FFFFFF]/20 [&_button]:cursor-pointer [&_button]:grid [&_button]:place-items-center [&_button]:size-11 [&_button]:backdrop-blur-[15px] [&_button]:rounded-md">
                    <button
                      onClick={() => setIsPreview(true)}
                      aria-label="View"
                    >
                      <FavIcon color="#fff" name="preview" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent("1234")}
                      aria-label="Delete"
                    >
                      <FavIcon color="#ff8080" name="delete_two" />
                    </button>
                  </div>
                </div>
              </OpEvtCd>
            ))}
          </div>
        </div>
      </div>
      {/* ============== preview events =========== */}
      <Modal
        open={isPreview}
        setIsOpen={setIsPreview}
        title="Event Details"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <div className="overflow-hidden col-span-1 lg:col-span-2 transition-shadow  rounded-lg p-2">
          {/* Event Image */}
          <div className="relative h-60 rounded-md bg-muted overflow-hidden">
            <img
              src={RandomImg()}
              alt={"title"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="pt-4 space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold  text-foreground">
                Event title goes here
              </h3>
              <Badge variant={"upcoming"}>Upcoming</Badge>
            </div>

            {/* Event Description */}
            <p className="text-muted-foreground line-clamp-2">
              Lorem ipsum dolor sit amet consectetur. Dignissim donec nunc
              tellus bibendum neque vel ut vulputate id. Aliquet quis enim
              tristique dictumst. Odio nec semper ornare maecenas eget diam
              tellus enim id. Mattis erat a dignissim mauris velit aliquam
              nulla. Auctor vestibulum id et risus in. Facilisi libero vitae
              neque feugiat volutpat risus eget. Vehicula nec morbi risus
              sodales tempor. Nibh sem diam dui gravida felis eu molestie
              euismod. In quisque viverra nisi facilisi tellus.
            </p>
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <ShowBox icon="tiket" name="Ticket sold" text="153 / 300" />
                <ShowBox icon="price22" name="Ticket price" text="$15.00" />
              </div>
              <ShowBox
                icon="location"
                name="Location"
                text="Event location goes here"
              />
              <ShowBox
                icon="ongoing_events"
                name="Date & Time"
                text="10 Sep, 2025 at 05:00 PM - 09:00 PM"
              />
              <ShowBox
                icon="price22"
                name="Total earned from this event"
                text="$2,295"
                className="bg-figma-delete px-2 py-2 rounded-md"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ShowBox({ icon, text, name, className }: any) {
  return (
    <div
      className={cn("flex items-center gap-2 text-muted-foreground", className)}
    >
      <FavIcon className="size-6" name={icon as any} />
      <div className="flex flex-col">
        <span className="text-base text-figma-black">{name}</span>
        <span className="text-lg text-figma-black font-medium">{text}</span>
      </div>
    </div>
  );
}
