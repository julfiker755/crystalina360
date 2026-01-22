"use client"
import AddOnCard from "../reuse/addon-card";
import { Repeat } from "@/components/reuseable/repeat";
import { useGetAddonQuery } from "@/redux/api/admin/addonApi";
import { Skeleton } from "@/components/ui";

export default function AddOn() {
  const { data: addon, isLoading } = useGetAddonQuery({});
  return (
    <div id="add-on" className="py-16 container px-10">
      <h1 className="mb-10">Add on services</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {isLoading ? (
          <Repeat count={3}>
            <Skeleton className="w-full h-[400px]" />
          </Repeat>
        ) : (
          addon?.data?.slice(0, 3).map((item: any, index: any) => (
            <AddOnCard item={item} key={index} />
          ))
        )}
      </div>
    </div>
  );
}
