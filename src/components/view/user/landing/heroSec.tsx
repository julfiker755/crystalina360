import { Button } from "@/components/ui";

export default function HeroSec() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8">
      <h1>Plan Your Next Experience</h1>

      <p className="text-center max-w-2xl mb-12 text-pretty">
        Stay connected to the events that matter most to you. Easily search and
        filter by type, location, or price range. Book tickets in seconds with a
        smooth, reliable system. Track your bookings, invoices, and event
        updates effortlessly.
      </p>

      <Button size="lg" className="!bg-white">
        {" "}
        Find Events
      </Button>
    </div>
  );
}
