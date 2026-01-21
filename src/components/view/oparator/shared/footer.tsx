"use client";
import assets from "@/assets";
import AppStore from "@/components/reuseable/app-store/app-store";
import FavIcon from "@/icon/favIcon";
import { helpers } from "@/lib";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [token, setToken] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = helpers.hasAuthToken();
    setToken(auth);
  }, []);

  const socialMedia = [
    { name: "facebook", icon: "facebook" },
    { name: "youtube", icon: "youtube" },
    { name: "instagram", icon: "instagram" },
  ];
  return (
    <div className="bg-figma-black py-16 *:text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-50">
          <div className="space-y-4">
            <div>
              <picture>
                <img src={assets.logoWhite.src} alt="logo" className="w-50" />
              </picture>
            </div>
            <div>
              <h5 className="text-xl mb-2">
                Manage your all events in one place
              </h5>
              <p>
                The operator dashboard lets event managers create, manage, and
                track events with ease, offering full control and clear insights
                for smooth execution.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Quick links
            </h3>
            {}
            {token ? (
              <ul className="space-y-1">
                <li>
                  <Link href={"/operator/add-on"}>Add On</Link>
                </li>
                <li>
                  <Link href={"/operator/pricing"}>Pricing</Link>
                </li>
                <li>
                  <Link href={"/operator/events"}>Events</Link>
                </li>
                <li>
                  <Link href={"/operator/privacy-policy"}>Privacy Policy</Link>
                </li>
                <li>
                  <Link href={"/operator/faq"}>FQA</Link>
                </li>
              </ul>
            ) : (
              <ul className="space-y-1">
                <li>
                  <Link href="operator">Home</Link>
                </li>
                <li>
                  <Link href="/operator#pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/operator#add-on">Add On</Link>
                </li>
                <li>
                  <Link href="/operator#privacy-Policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/operator#faq">FQA</Link>
                </li>
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Follow us on
            </h3>
            <div className="space-y-4">
              <ul className="flex items-center  space-x-3">
                {socialMedia &&
                  socialMedia.map((item) => (
                    <li
                      key={item.name}
                      className="bg-[#FFFFFF]/20 size-12 rounded-md grid place-items-center"
                    >
                      <FavIcon name={item.icon as any} className="size-6" />
                    </li>
                  ))}
              </ul>
              <AppStore />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
