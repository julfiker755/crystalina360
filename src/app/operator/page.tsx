import AddOn from "@/components/view/oparator/landing/add-on";
import FlowStep from "@/components/view/oparator/landing/flow-step";
import Fqa from "@/components/view/oparator/landing/fqa";
import HomeSec from "@/components/view/oparator/landing/homeSec";
import Manage from "@/components/view/oparator/landing/manage";
import Pricing from "@/components/view/oparator/landing/pricing";
import PrivacyPolicy from "@/components/view/oparator/landing/privacy-policy";

export default function RootOperator() {
  return (
    <>
      <HomeSec />
      <FlowStep />
      <Pricing />
      <AddOn />
      <PrivacyPolicy />
      <Fqa />
      <Manage />
    </>
  );
}
