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
import MissingInfo from "@/components/reuseable/missing-alert";




export default function UserHome() {
  const { user } = useAppSelector((state: any) => state.auth);
  return (
    <>
      <MissingInfo />
      <HeroSec role={user?.role} />
      <KeyFeature role={user?.role} />
      <ExploreEvents />
      {user.role == roleKey.user ? (
        <>
          <Advertise />
          {/* <Subscription /> */}
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
