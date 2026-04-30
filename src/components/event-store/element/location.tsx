"use client";
import { FormSelDropdown } from "@/components/reuseable/from-select@1";
import { cn } from "@/lib";
import {
  useGetRegionListQuery,
  useLazyGetItalyCityListQuery,
  useLazyGetProvinceListQuery,
} from "@/redux/api/city/cityApi";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const LocationDroupDown = ({ className }: { className?: string }) => {
  const t = useTranslations("oprator.evStoreAll.store");
  const { getValues } = useFormContext();
  const { data: regionItem } = useGetRegionListQuery({});
  const [getProvinceList, { data: provinceItem }] =
    useLazyGetProvinceListQuery();
  const [getItalyCityList, { data: cityItem }] = useLazyGetItalyCityListQuery();

  const defaultRegion = getValues("region");
  const defaultProvince = getValues("province");

  useEffect(() => {
    if (regionItem && defaultRegion) {
      getProvinceList({ region: defaultRegion });
    }
  }, [defaultRegion, getProvinceList, regionItem]);

  useEffect(() => {
    if (provinceItem && defaultProvince) {
      getItalyCityList({ province: defaultProvince });
    }
  }, [defaultProvince, getItalyCityList, provinceItem]);

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-4 gap-3", className)}>
      <FormSelDropdown
        label={t("location.country")}
        name="country"
        options={[{ label: "Italy", value: "Italy" }]}
      />

      <FormSelDropdown
        label={t("location.region")}
        name="region"
        options={regionItem?.data?.map((item: any) => ({
          label: item.region,
          value: item.region,
        }))}
        setSelectValue={(item) => {
          getProvinceList({ region: item.value });
        }}
      />

      <FormSelDropdown
        label={t("location.province")}
        name="province"
        options={provinceItem?.data?.map((item: any) => ({
          label: item.province,
          value: item.province,
        }))}
        setSelectValue={(item) => {
          getItalyCityList({ province: item.value });
        }}
        disabled={!provinceItem?.data?.length}
      />

      <FormSelDropdown
        label={t("location.city")}
        name="city"
        options={cityItem?.data?.map((item: any) => ({
          label: item.city,
          value: item.city,
        }))}
        disabled={!cityItem?.data?.length}
      />
    </div>
  );
};
