"use client";
import assets from "@/assets";
import { Button } from "@/components/ui";
import { Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal2 from "@/components/reuseable/modal2";
import AuthBox from "../../common/auth-box";
import { CloseIcon } from "../../common/btn-modal";

export default function Navber() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Privacy Policy", href: "/privacy-Policy" },
    { name: "Contact Us", href: "/contact-us" },
  ];
  const navUserItems = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Booking", href: "/booking" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Resources", href: "/resources" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <>
      {/* Navbar */}
      <div className="absolute top-5 w-[95%] md:w-full h-13 container rounded-full px-3 content-center bg-[#000000]/10 backdrop-blur-xl z-50">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <picture>
            <img src={assets.logo.src} alt="logo" className="w-32" />
          </picture>

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
      </div>

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
  const [isSign, setIsSign] = useState(false);
  return (
    <>
      <Button
        onClick={() => setIsSign(!isSign)}
        className="rounded-full bg-primary/30 hidden md:block"
      >
        Sign in as User
      </Button>
      <Button
        onClick={() => setIsSign(!isSign)}
        size="icon-sm"
        className="rounded-full md:hidden grid place-items-center bg-primary/30"
      >
        <UserRound />
      </Button>
      <Modal2
        open={isSign}
        setIsOpen={setIsSign}
        mainStyle="!p-0"
        className="sm:max-w-xl"
      >
        <AuthBox title="Sign up as a User" />
        <CloseIcon className="top-3 right-4" onClose={() => setIsSign(false)} />
      </Modal2>
    </>
  );
}
