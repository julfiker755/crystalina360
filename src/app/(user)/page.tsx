"use client";
import Advertise from "@/components/view/user/landing/advertise";
import Business from "@/components/view/user/landing/business";
import ContactUs from "@/components/view/user/landing/contact-us";
import ExploreEvents from "@/components/view/user/landing/explore-event";
import HeroSec from "@/components/view/user/landing/heroSec";
import HowWorks from "@/components/view/user/landing/how-works";
import KeyFeature from "@/components/view/user/landing/key-features";
import PrivacyPolicy from "@/components/view/user/landing/privacy-policy";
import Testimonial from "@/components/view/user/landing/testimonial";
import { useAppSelector } from "@/redux/hooks";
import { roleKey } from "@/lib";
import { AppState } from "@/redux/store";

export default function UserHome() {
  const { user } = useAppSelector((state: AppState) => state.auth);
  return (
    <>
      <HeroSec role={user?.role} />
      <ExploreEvents />
      <KeyFeature role={user?.role} />
      {user.role == roleKey.user ? (
        <>
          <Advertise />
        </>
      ) : (
        <>
          <Testimonial />
          <PrivacyPolicy />
          <HowWorks />
          <ContactUs />
          <Business />
        </>
      )}
    </>
  );
}
