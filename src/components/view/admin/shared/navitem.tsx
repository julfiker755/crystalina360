"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import FavIcon from "@/icon/favIcon";

interface SubmenuItem {
  to?: string;
  label: string;
  icon?: any;
  act_io?: any;
}

interface MenuItem {
  to?: string;
  label: string;
  icon?: any;
  act_io?: any;
  submenu?: SubmenuItem[];
}

interface NavItemProps {
  item: MenuItem[];
}

export default function NavItem({ item }: NavItemProps) {
  const pathname = usePathname();
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLUListElement | null)[]>([]);

  useEffect(() => {
    menuRefs.current.forEach((menu, index) => {
      if (menu) {
        menu.style.maxHeight =
          activeSubmenu === index ? `${menu.scrollHeight}px` : "0px";
      }
    });
  }, [activeSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setActiveSubmenu((prev) => (prev === index ? null : index));
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <ul className="space-y-2 mr-5">
      {item.map(({ to, label, icon, act_io, submenu }, parentIndex) => (
        <li key={parentIndex} className="group">
          {to ? (
            <Link
              className={`flex px-3 ${
                isActive(to) &&
                "border-l-5! border-figma-primary! font-medium bg-white"
              } hover:bg-white   rounded-r-md  transition-colors  hover:border-figma-primary  border-l-5   py-2 items-center  text-base gap-x-2 text-figma-primary`}
              href={to}
            >
              <FavIcon name={isActive(to) ? act_io : icon} /> {label}
            </Link>
          ) : (
            <div
              onClick={() => handleSubmenuToggle(parentIndex)}
              className="flex items-center px-3 py-2 justify-between cursor-pointer"
            >
              <span className="flex items-center gap-x-2 text-primary font-medium">
                {icon && <FavIcon name={icon} />} {label}
              </span>
              {activeSubmenu === parentIndex ? (
                <ChevronUp className="size-5 font-extrabold" />
              ) : (
                <ChevronDown className="size-5 font-extrabold" />
              )}
            </div>
          )}

          {submenu && (
            <ul
              ref={(el) => {
                menuRefs.current[parentIndex] = el;
              }}
              className="overflow-hidden transition-all duration-300 ease-out max-h-0 space-y-1"
            >
              {submenu.map(({ to, label, act_io, icon }, subIndex) => (
                <li
                  key={subIndex}
                  className={`${
                    isActive(to as any) &&
                    "border-l-5! border-figma-primary! font-medium bg-white"
                  } rounded-r-md pl-6 hover:bg-white font-medium border-l-5 border-transparent  py-2`}
                >
                  {to && (
                    <Link className="flex items-center gap-x-2" href={to}>
                      <FavIcon name={isActive(to) ? icon : act_io} /> {label}{" "}
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
