import assets from "@/assets";
import Image from "next/image";

const howItem = [
  {
    id: 1,
    title: "Create an account",
    text: "Sign up in minutes and set up your profile.",
    img: assets.works.account,
  },
  {
    id: 2,
    title: "Discover Events",
    text: "Search and filter to find the perfect event for you.",
    img: assets.works.events,
  },
  {
    id: 3,
    title: "Book Your Tickets",
    text: "Secure your spot with simple, safe checkout.",
    img: assets.works.book,
  },
  {
    id: 4,
    title: "Get Invoices",
    text: "Receive instant confirmations, reminders, and invoices.",
    img: assets.works.get,
  },
];

export default function HowWorks() {
  return (
    <div className="pt-16 container">
      <h1 className="mb-10">How it Works</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {howItem.map((item, index) => (
          <div key={index} className="bg-figma-gray rounded-2xl">
            <div className="relative w-full h-56">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-figma-black">
                {item.title}
              </h2>
              <p className="mt-1">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
