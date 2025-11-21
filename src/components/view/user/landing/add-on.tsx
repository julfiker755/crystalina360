import { Button } from "@/components/ui";
import { addOns } from "../dummy-json";
import AddOnCard from "../reuse/addon-card";
import Link from "next/link";

export default function AddOn() {
  return (
    <div className="py-16 container">
      <h1 className="mb-10">Add on services</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 2xl:gap-20">
        {addOns.slice(0, 3).map((item, index) => (
          <AddOnCard item={item} key={index} />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Link href="/add-ons">
          <Button size="lg">See all</Button>
        </Link>
      </div>
    </div>
  );
}
