import { ImgBox } from "@/components/reuseable/Img-box";
import FavIcon from "@/icon/favIcon";
import { useTitle } from "@/provider/title";
import { useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { Menu } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Navber({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const { title, subtitle } = useTitle();
  const user = useAppSelector((state: AppState) => state.auth.user);

  return (
    <div className="sticky top-0  flex w-full bg-[white] py-3 z-50! shadow-xs">
      <header className="w-full px-3">
        <div className="flex justify-between items-center">
          {/* left side*/}
          <div className="flex gap-4 items-center">
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
              className="z-99999 block  border rounded-md border-stroke cursor-pointer  p-1.5 lg:hidden"
            >
              <Menu className="cursor-pointer" size={20} />
            </button>
            <ul className="hidden lg:block">
              <li className="text-2xl font-semibold">{title}</li>
              {subtitle && (
                <li className="font-normal text-figma-a_gray">{subtitle}</li>
              )}
            </ul>
          </div>
          {/* right side */}
          <div>
            <div className="flex mr-6 items-center gap-2">
              <Link href={"/admin/notification"}>
                <div className="relative cursor-pointer bg-figma-sidebar size-11 2xl:size-12  grid place-items-center rounded-full">
                  <FavIcon name="noti" />
                </div>
              </Link>

              <Link href={"/admin/settings"}>
                <div className="relative flex items-center gap-2 rounded-full cursor-pointer">
                  <ImgBox
                    src={user?.avatar || "/avater.png"}
                    className="rounded-full size-11"
                    alt="User Icon"
                  />
                  <ul className="leading-5 mb-1">
                    <li className="font-semibold">{user?.name || "N/A"}</li>
                    <li className="text-figma-a_gray">
                      {user?.email || "N/A"}
                    </li>
                  </ul>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
