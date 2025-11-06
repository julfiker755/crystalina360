import Navber from "@/components/view/oparator/shared/navber";
import { childrenProps } from "@/types";

export default function OperatorLayout({ children }: childrenProps) {
  return (
    <>
      <Navber />
      {children}
    </>
  );
}
