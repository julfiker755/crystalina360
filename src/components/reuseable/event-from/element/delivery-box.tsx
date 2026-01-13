"use client";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";

const getOptions = (value: string): any[] => {
  switch (value) {
    case "retreat":
      return [{ value: "offline", label: "Offline", icon: "offline" }];
    default:
      return [
        { value: "offline", label: "Offline", icon: "offline" },
        { value: "online", label: "Online", icon: "online" },
        { value: "ondemand", label: "On demand", icon: "ondemand" },
      ];
  }
};

export const DeliveryBox = ({ slug, from, onClick }: any) => {
  const options = getOptions(slug);

  return (
    <div>
      <label className="block text-lg mb-2 font-semibold">
        Select Delivery Type
      </label>
      <div className="flex gap-3">
        {options?.map((item) => (
          <Button
            key={item.value}
            onClick={(v) => onClick(v)}
            type="button"
            className={`font-normal transition-colors border bg-transparent text-figma-black ${
              item.value === from.watch("delivery_type") &&
              "bg-primary text-white"
            }`}
          >
            <FavIcon
              color={
                item.value === from.watch("delivery_type") ? "#fff" : undefined
              }
              name={item.icon as any}
            />
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
