"use client";
import NavItem from "./navitem";
import { adminLinks } from "./navdata";
import Logo from "@/components/reuseable/logo";
import FavIcon from "@/icon/favIcon";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const links = adminLinks;

  return (
    <div className="flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`absolute left-0 top-0 z-20 bg-reds flex h-screen bg-figma-sidebar text-primary transition-transform transform duration-300 ease-linear flex-col overflow-y-hidden  w-60 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-screen relative">
          <div className="flex items-center justify-center my-5  rounded-md py-1">
            <Logo className="w-40" />
          </div>
          <div className="h-[calc(100vh-80px)] flex flex-col justify-between overflow-y-scroll scrollbar-hide">
            <nav>
              <NavItem item={links} />
            </nav>
            <div className="w-full my-3 px-4 flex justify-start">
              <h2 className="text-base flex items-center  font-medium text-figma-danger">
                <FavIcon className="mr-2" name="lagout" />
                Sign Out
              </h2>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
