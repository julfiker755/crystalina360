import FavIcon from "@/icon/favIcon";
import { ArrowUpRight } from "lucide-react";

// StatsCard
export function StatsCard({ icon, title, value }: any) {
  return (
    <ul className="bg-white p-4  rounded-xl">
      <li className="size-[50px]  grid rounded-xl place-items-center  bg-primary">
        <FavIcon color={icon == "t_ticket" ? "" : "#fff"} name={icon as any} />
      </li>
      <li className="text-figma-a_gray mt-2">{title}</li>
      <li className="font-bold text-xl leading-9 lg:text-[28px]">
        {value || 0}
      </li>
    </ul>
  );
}

// Recent card
export function RecentCard({ icon, title, timestamp }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-white  transition-colors cursor-pointer">
      <div className="flex items-center gap-4 flex-1">
        <div className="grid place-items-center size-[50px] rounded-full bg-white">
          <FavIcon name={icon as any} />
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-medium">{title}</h3>
          <p className=" text-figma-primary">{timestamp}</p>
        </div>
      </div>
      <div className="ml-4">
        <ArrowUpRight size={20} className="text-figma-black" />
      </div>
    </div>
  );
}
