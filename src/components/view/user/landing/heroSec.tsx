import { buttonVariants } from "@/components/ui";
import Navber from "../shared/navber";
import { roleKey } from "@/lib";
import Link from "next/link";

export default function HeroSec({ role }: any) {
  return (
    <div className="flex relative h-[600px] lg:h-[calc(100vh-2rem)] m-4 rounded-xl flex-col  bg-[url('/img/bg1.png')] bg-cover bg-no-repeat bg-center items-center justify-center px-8">
      {/* =========== navber ========= */}
      <Navber />
      <h5 className="text-center text-3xl lg:text-5xl font-bold text-figma-black mb-5">
        Plan Your Next Experience
      </h5>

      <p className="text-center text-base text-article max-w-2xl mb-12  text-pretty">
        Stay connected to the events that matter most to you. Easily search and
        filter by type, location, or price range. Book tickets in seconds with a
        smooth, reliable system. Track your bookings, invoices, and event
        updates effortlessly
      </p>
      {role == roleKey.user ? (
        <Link
          className={buttonVariants({
            className: "text-primary bg-white",
            size: "lg",
          })}
          href="/events"
        >
          Find Events
        </Link>
      ) : (
        <Link
          className={buttonVariants({
            className: "text-primary bg-white",
            size: "lg",
          })}
          href="#explore"
        >
          Explore Events
        </Link>
      )}
    </div>
  );
}
