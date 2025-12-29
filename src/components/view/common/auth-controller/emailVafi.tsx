import { Button, Input } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { ArrowLeft } from "lucide-react";
import {
  clearOtpInfo,
  controlkey,
  setActiveModal,
} from "@/redux/features/authSlice";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useOtpVarifyMutation } from "@/redux/api/authApi";
import sonner from "@/components/reuseable/sonner";
import { helpers } from "@/lib";

export default function EmailVarifyOtp() {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otpInfo = useAppSelector((state) => state.auth.otpInfo);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const { value } = e.target;
    // Allow only single digit numbers
    if (!/^\d?$/.test(value)) return;

    const updated = [...code];
    updated[i] = value;
    setCode(updated);

    // Auto-focus next input
    if (value && i < 6) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
    // Backspace focuses previous input if current is empty
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (!/^\d{6}$/.test(pastedData)) {
      setError("Please paste a 6-digit number.");
      return;
    }
    setError("");
    setCode(pastedData.split(""));
  };

  const [otpVarify, { isLoading }] = useOtpVarifyMutation();

  const handleVerify = async () => {
    setIsError("");
    try {
      const joinedCode = code.join("");
      if (joinedCode.length < 6) {
        setError("Please enter all 6 digits.");
      } else {
        const value = { email: otpInfo.email, otp: joinedCode };
        const data = helpers.fromData(value);
        const res = await otpVarify(data).unwrap();

        if (res.status) {
          dispatch(setActiveModal(controlkey.signIn));
          sonner.success(
            "Email Varify Successfull",
            "Please log in to continue"
          );
          dispatch(clearOtpInfo());
          setCode([]);
        }

        setError("");
      }
    } catch (err: any) {
      if (err?.data?.message) {
        setIsError(err?.data?.message);
      }
    }
  };

  return (
    <>
      <div className="bg-[#EDEDED]  text-xl font-bold w-full h-12 content-center text-center top-0 left-0">
        <ul className="flex justify-between items-center">
          <li onClick={() => dispatch(setActiveModal(controlkey.signIn))}>
            {" "}
            <ArrowLeft
              size={20}
              className="text-figma-black ml-2 cursor-pointer"
            />{" "}
          </li>
          <li className="text-xl font-bold">Verification</li>
          <li className="opacity-0">0</li>
        </ul>
      </div>
      <div className="p-4">
        <div className="pb-5">
          <h5 className="size-12 rounded-md mx-auto border grid place-items-center">
            <FavIcon name="varify" className="size-6" />
          </h5>
          <p className="text-center px-10 pt-2">
            {`  We've sent a 6-digit code to ${otpInfo.email}. Please verify your email using this code`}
          </p>
        </div>
        <div>
          <div className="flex justify-center space-x-3 mb-2">
            {code.map((digit, i) => (
              <Input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                className="w-12 h-12 text-center text-lg font-medium"
              />
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          {isError && (
            <p className="text-red-500 text-sm text-center mb-4">{isError}</p>
          )}
          <div className="flex justify-center mt-5">
            <Button
              disabled={isLoading}
              type="button"
              className="w-full"
              onClick={handleVerify}
            >
              Verify
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
