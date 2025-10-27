import { Button } from "@/components/ui";
import Navber from "../shared/navber";

export default function HeroSec() {
  return (
    <div className="flex relative h-[calc(100vh-2rem)] m-4 rounded-xl flex-col  bg-[url('/img/bg1.png')] bg-cover bg-no-repeat bg-center items-center justify-center px-8">
      <h5 className="text-center text-3xl lg:text-5xl font-bold text-figma-black mb-5">
        Plan Your Next Experience
      </h5>

      <p className="text-center max-w-2xl mb-12 text-pretty">
        Stay connected to the events that matter most to you. Easily search and
        filter by type, location, or price range. Book tickets in seconds with a
        smooth, reliable system. Track your bookings, invoices, and event
        updates effortlessly.
      </p>

      <Button size="lg" className="text-primary bg-white">
        {" "}
        Find Events
      </Button>
      <Navber />
    </div>
  );
}
