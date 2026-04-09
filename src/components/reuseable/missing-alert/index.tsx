"use client";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useEffect, useState } from "react";
import { helpers } from "@/lib";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui";
import { InfoIcon, X } from "lucide-react";
import Link from "next/link";

export default function MissingInfo({ path }: any) {
  const token = helpers.hasAuthToken();
  const router = useRouter();

  const { data: profile } = useGetProfileQuery({}, { skip: !token });

  const isProfileComplete =
    profile?.data?.user?.profile_status?.is_profile_complete;

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (!profile?.data?.user) return;

    if (isProfileComplete === false) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [profile, isProfileComplete]);

  const handleClose = () => {
    setIsShow(false);

    setTimeout(() => {
      if (!profile?.data?.user) return;

      // 2 min later, show alert again if still incomplete
      if (isProfileComplete === false) {
        setIsShow(true);
        if (path) {
          router.push(path);
        }
      }
    }, 2 * 60 * 1000);
  };

  if (!isShow) return null;

  return (
    <Alert className="relative rounded-none border-none bg-[#99796F]/50">
      <InfoIcon className="text-red-500" />

      <AlertTitle className="text-black">
        Profile Information Missing
      </AlertTitle>

      <AlertDescription className="flex items-center gap-1 text-black/70">
        Your profile is incomplete. Please go to your profile section and fill in
        all required information.

        <Link
          href={path || ""}
          className="text-sm font-medium text-black hover:underline"
        >
          Click here
        </Link>
      </AlertDescription>

      <X
        onClick={handleClose}
        size={17}
        className="absolute top-2 right-3 cursor-pointer text-black"
      />
    </Alert>
  );
}