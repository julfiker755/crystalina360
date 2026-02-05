import MissingInfo from "@/components/reuseable/missing-alert";
import Footer from "@/components/view/oparator/shared/footer";
import Navber from "@/components/view/oparator/shared/navber";
import { childrenProps } from "@/types";

export default function OperatorLayout({ children }: childrenProps) {
  return (
    <>
      <MissingInfo />
      <Navber />
      {children}
      <Footer />
    </>
  );
}
