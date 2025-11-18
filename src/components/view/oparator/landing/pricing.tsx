"use client";
import { AppState } from "@/redux/store";
import PricingBox from "../simple/pricing-box";
import { Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal2 from "@/components/reuseable/modal2";
import AuthModalController from "@/components/view/common/auth-controller";
import { toggleIsOpen } from "@/redux/features/authSlice";

export default function Pricing() {
  const dispatch = useAppDispatch();
  const { isOpen, user } = useAppSelector((state: AppState) => state.auth);
  return (
    <div id="pricing">
      <PricingBox />
      <div className="text-center space-y-3 pt-6">
        <p>
          Purchase a plan and enjoy the freedom of managing events of whatever
          it's offline or online
        </p>
        <Button
          onClick={() => dispatch(toggleIsOpen())}
          size="lg"
          className="text-white rounded-full"
        >
          {" "}
          Sign in as operator
        </Button>
      </div>

      <Modal2
        open={isOpen}
        setIsOpen={(v) => dispatch(toggleIsOpen(v))}
        mainStyle="!p-0"
        className="sm:max-w-xl"
      >
        <AuthModalController title="Sign up as a operator" />
      </Modal2>
    </div>
  );
}
