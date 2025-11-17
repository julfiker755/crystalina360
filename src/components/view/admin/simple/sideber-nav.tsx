"use client";
import { useState, type JSX } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import FavIcon from "@/icon/favIcon";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    label: string;
    to: string;
    icon: any;
    act_io: any;
  }[];
  defaultPath: string;
}

export default function SidebarNav({
  className,
  items,
  defaultPath,
  ...props
}: SidebarNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [val, setVal] = useState(pathname ?? defaultPath);

  const handleSelect = (e: string) => {
    setVal(e);
    router.push(e);
  };

  const isActive = (href: string) => {
    if (href === defaultPath) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Select Menu */}
      <div className="p-1  lg:hidden">
        <Select value={val} onValueChange={handleSelect}>
          <SelectTrigger className="h-12 py-5!  w-full rounded-md">
            <SelectValue placeholder="Select page" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.to} value={item.to}>
                <div className="flex items-center gap-x-4 px-2 py-0!">
                  <FavIcon
                    className="size-7"
                    name={isActive(item.to) ? item.act_io : item.icon}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Navigation */}
      <ScrollArea
        type="always"
        className="bg-background hidden w-[300px] px-1  lg:block"
      >
        <nav
          className={cn(
            "flex space-x-2 border px-2 py-4 rounded-xl lg:flex-col lg:space-y-2 lg:space-x-0",
            className
          )}
          {...props}
        >
          {items.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={`flex items-center space-x-1 py-2 hover:bg-figma-deletepy-1.5 px-2 rounded-full ${
                isActive(item.to) && "bg-figma-delete font-medium"
              }`}
            >
              <FavIcon
                className="size-7"
                name={isActive(item.to) ? item.act_io : item.icon}
              />
              <span className="text-primary"> {item.label}</span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </>
  );
}
