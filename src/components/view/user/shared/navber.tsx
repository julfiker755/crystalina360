"use client";
import assets from "@/assets";
import { Button } from "@/components/ui";
import { Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal2 from "@/components/reuseable/modal2";
import AuthModalController from "../../common/auth-controller";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleIsOpen } from "@/redux/features/authSlice";
import { cn, roleKey } from "@/lib";
import { AppState } from "@/redux/store";
import FavIcon from "@/icon/favIcon";
import { usePathname } from "next/navigation";
import Logo from "@/components/reuseable/logo";

export default function Navber({ className }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user } = useAppSelector((state: AppState) => state.auth);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  const navNoUserItems = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "#explore" },
    { name: "Privacy Policy", href: "#privacy-Policy" },
    { name: "Contact Us", href: "#contact-us" },
  ];
  const navUserItems = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/events-all" },
    { name: "Booking", href: "/booking" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Resources", href: "/resources" },
    { name: "Profile", href: "/profile" },
  ];

  const navItems = user.role == roleKey.user ? navUserItems : navNoUserItems;

  return (
    <>
      {/* Navbar */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: scrolled ? -4 : 0,
          opacity: scrolled ? 0.95 : 1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          `w-[95%] absolute top-5 md:w-full h-13 container rounded-full px-3 content-center bg-[#000000]/10 backdrop-blur-xl z-50 ${
            scrolled && "fixed! top-4 left-1/2 -translate-x-1/2"
          }`,
          className
        )}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-lg text-article hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex items-center space-x-2">
            <SignInButton />
            <Button
              size="icon-sm"
              className="rounded-full md:hidden bg-primary/30"
              onClick={() => setIsOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dim Background */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Shaped Sidebar */}
            <motion.div
              className="fixed top-0 left-0 h-full w-[70%] sm:w-[60%] bg-background backdrop-blur-2xl text-white z-50 shadow-2xl flex flex-col p-6"
              initial={{
                clipPath: "circle(0% at 0% 0%)",
              }}
              animate={{
                clipPath: "circle(150% at 0% 0%)",
              }}
              exit={{
                clipPath: "circle(0% at 0% 0%)",
              }}
              transition={{
                duration: 0.45,
                ease: "easeInOut",
              }}
            >
              {/* Top Header */}
              <div className="flex justify-between items-center mb-10">
                <picture>
                  <img src={assets.logo.src} alt="logo" className="w-35" />
                </picture>
                <Button
                  className="rounded-full bg-primary/30"
                  size="icon-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X />
                </Button>
              </div>

              {/* Nav Links */}
              <ul className="flex flex-col space-y-6 text-lg font-medium">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-figma-black transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SignInButton() {
  const dispatch = useAppDispatch();
  const { isOpen, user } = useAppSelector((state: AppState) => state.auth);
  return (
    <>
      {/* sign In User */}
      {user.role === roleKey.user ? (
        <ul className="flex items-center space-x-3">
          <li>
            <Link href="/favorite-events">
              {" "}
              <FavIcon className="size-[26px] lg:size-7" name="nv_love" />
            </Link>
          </li>
          <li>
            <Link href="/conversation">
              <FavIcon className="size-5 lg:size-6" name="nv_coment" />
            </Link>
          </li>
          <li>
            <Link href="/notification">
              <FavIcon className="size-6 lg:size-7" name="nv_notification" />
            </Link>
          </li>
        </ul>
      ) : (
        // not Sign In User
        <>
          <Button
            onClick={() => dispatch(toggleIsOpen())}
            className="rounded-full bg-primary/30 hidden md:block"
          >
            Sign in as User
          </Button>
          <Button
            onClick={() => dispatch(toggleIsOpen())}
            size="icon-sm"
            className="rounded-full md:hidden grid place-items-center bg-primary/30"
          >
            <UserRound />
          </Button>
          <Modal2
            open={isOpen}
            setIsOpen={(v) => dispatch(toggleIsOpen(v))}
            mainStyle="!p-0"
            className="sm:max-w-xl"
          >
            <AuthModalController title="Sign up as a User" />
          </Modal2>
        </>
      )}
    </>
  );
}
