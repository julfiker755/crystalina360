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
import { setSignupRole, toggleIsOpen } from "@/redux/features/authSlice";
import { cn, RandomImg, roleKey } from "@/lib";
import { AppState } from "@/redux/store";
import FavIcon from "@/icon/favIcon";
import { usePathname } from "next/navigation";
import Avatars from "@/components/reuseable/avater";
import { LanguageSwitcher2 } from "../../common/language";
import { useTranslations } from "next-intl";

export default function Navber({ className }: any) {
  const t = useTranslations("oprator.home.navber");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  const navNoUserItems = [
    { name: t("home"), href: "/operator" },
    { name: t("pricing"), href: "/operator/#pricing" },
    { name: t("add_on"), href: "/operator/#add-ons" },
    { name: t("faq"), href: "/operator/#faq" },
  ];
  const navUserItems = [
    { name: t("dashboard"), href: "/operator/dashboard" },
    { name: t("events"), href: "/operator/events" },
    { name: t("pricing"), href: "/operator/pricing" },
    { name: t("add_on"), href: "/operator/add-ons" },
    // { name: t("privacy_policy"), href: "/operator/privacy-policy" },
    // { name: t("faq"), href: "/operator/faq" },
  ];

  const navItems =
    user.role == roleKey.operator ? navUserItems : navNoUserItems;

  return (
    <>
      {/* Navbar */}
      <div className={`sticky top-0 left-0 bg-background z-50`}>
        <div
          className={cn(
            `w-[95%]  md:w-full container rounded-full   h-20 content-center`,
          )}
        >
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/operator">
              <picture>
                <img src={assets.logo.src} alt="logo" className="w-33" />
              </picture>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center  bg-figma-gray1   rounded-md">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  className={`py-2 text-base!  font-medium ${
                    pathname == item?.href ? "text-white! bg-primary" : ""
                  }   text-figma-black rounded-md  px-10`}
                >
                  <Link href={item.href} className="transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex items-center space-x-2">
              <LanguageSwitcher2 />
              <SignInButton />
              <Button
                size="icon-sm"
                className="rounded-full md:hidden bg-primary/30"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="text-figma-black" />
              </Button>
            </div>
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
                  <X className="text-figma-black" />
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
  const t = useTranslations("oprator.home.navber");
  const dispatch = useAppDispatch();
  const { isOpen, user } = useAppSelector((state: AppState) => state.auth);

  const handleOpenModal = () => {
    dispatch(toggleIsOpen());
    dispatch(setSignupRole("operator"));
  };

  return (
    <>
      {/* sign In User */}
      {user.role === roleKey.operator ? (
        <ul className="flex items-center space-x-3">
          <li className="icon bg-figma-gray1">
            <Link href="/operator/conversation">
              <FavIcon name="chat" />
            </Link>
          </li>
          <li className="icon bg-figma-gray1">
            <Link href="/operator/notification">
              <FavIcon name="noti" />
            </Link>
          </li>
          <li>
            <Link href="/operator/profile">
              <div className="flex space-x-1 items-center">
                <Avatars
                  fallback={user?.name || "Name"}
                  src={user?.avatar || "/avater.png"}
                  className="size-10! rounded-md!"
                  fallbackStyle="rounded-md"
                  alt="img"
                />
                <ul className="*:text-black hidden lg:block leading-5">
                  <li className="font-medium">{user?.name}</li>
                  <li>{user?.email}</li>
                </ul>
              </div>
            </Link>
          </li>
        </ul>
      ) : (
        // not Sign In User
        <>
          <Link href="/">
            <Button
              size="lg"
              className="hidden md:block border bg-white text-figma-black"
            >
              {t("continue_as_user")}
            </Button>
          </Link>
          <Button
            onClick={() => handleOpenModal()}
            size="lg"
            className="hidden md:block bg-primary"
          >
            {t("sign_as_operator")}
          </Button>
          <Button
            onClick={() => handleOpenModal()}
            size="icon-sm"
            className="rounded-full md:hidden grid place-items-center bg-primary/30"
          >
            <UserRound className="text-figma-black" />
          </Button>
          <Modal2
            open={isOpen}
            setIsOpen={(v) => dispatch(toggleIsOpen(v))}
            mainStyle="!p-0"
            className="sm:max-w-xl"
          >
            <AuthModalController title={t("sign_up_as_operator")} />
          </Modal2>
        </>
      )}
    </>
  );
}
