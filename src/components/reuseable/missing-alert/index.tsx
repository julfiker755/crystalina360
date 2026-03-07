"use client";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useEffect } from "react";
import { helpers } from "@/lib";
import { useRouter } from "next/navigation";

export default function MissingInfo({ path }: any) {
  const token = helpers.hasAuthToken();
  const router = useRouter();
  const { data: profile } = useGetProfileQuery({}, { skip: !token });

  useEffect(() => {
    if (profile?.data?.user) {
      const {
        gender,
        residence_city,
        residence_province,
        residence_region,
        residence_country,
      } = profile.data.user || {};

      const isMissing =
        !gender ||
        !residence_city ||
        !residence_province ||
        !residence_region ||
        !residence_country;

      if (isMissing) {
        const timer = setTimeout(
          () => {
            router.push(path);
          },
          3 * 60 * 1000,
        ); // 3 minutes

        return () => clearTimeout(timer);
      }
    }
  }, [profile, router]);

  return null; // ✅ MUST RETURN SOMETHING
}
