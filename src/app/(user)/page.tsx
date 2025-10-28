import ExploreEvents from "@/components/view/user/landing/explore-event";
import HeroSec from "@/components/view/user/landing/heroSec";
import HowWorks from "@/components/view/user/landing/how-works";
import KeyFeature from "@/components/view/user/landing/key-features";
import PrivacyPolicy from "@/components/view/user/landing/privacy-policy";
import Testimonial from "@/components/view/user/landing/testimonial";

export default function UserHome() {
  return (
    <>
      <HeroSec />
      <KeyFeature />
      <ExploreEvents />
      <Testimonial />
      <PrivacyPolicy />
      <HowWorks />
    </>
  );
}
