import React from "react";
import { TableCell, TableRow } from "@/components/ui";
import { cn } from "@/lib/utils";
import FavIcon from "@/icon/favIcon";

interface itemProps {
  title?: string;
  colSpan: number;
  className?: string;
  tdStyle?: string;
}

export function TableNoItem({
  title = "No Data Found",
  colSpan,
  className,
  tdStyle,
}: itemProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className={cn("text-center", tdStyle)}>
        <div className={cn("py-24 2xl:py-40 text-center", className)}>
          <div className="flex bg-figma-sidebar w-fit mx-auto p-3 rounded-md justify-center">
            <SvgIcon />
          </div>
          <h3 className="text-sm font-medium  text-figma-a_gray mt-2">
            {title}
          </h3>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function NoItemData({ title = "No Data Found", className }: any) {
  return (
    <div
      className={cn(
        "py-24 2xl:py-40 text-center flex flex-col justify-center",
        className,
      )}
    >
      <div className="flex bg-figma-sidebar w-fit mx-auto p-3 rounded-md justify-center">
        <SvgIcon />
      </div>
      <h3 className="text-sm font-medium  text-figma-a_gray mt-2">{title}</h3>
    </div>
  );
}

function SvgIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke=" #364153"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-folder-code"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 19h-6a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v4" />
      <path d="M20 21l2 -2l-2 -2" />
      <path d="M17 17l-2 2l2 2" />
    </svg>
  );
}
