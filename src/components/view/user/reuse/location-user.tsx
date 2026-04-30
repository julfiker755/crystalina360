"use client";
import { FormSelDropdown } from "@/components/reuseable/from-select@1";
import { Label } from "@/components/ui";
import {
  useGetRegionListQuery,
  useLazyGetItalyCityListQuery,
  useLazyGetProvinceListQuery,
} from "@/redux/api/city/cityApi";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const LocationDroupDownUser = () => {
  const t = useTranslations("user.profile.edit_profile");
  const { getValues } = useFormContext();
  const { data: regionItem } = useGetRegionListQuery({});
  const [getProvinceList, { data: provinceItem }] =
    useLazyGetProvinceListQuery();
  const [getItalyCityList, { data: cityItem }] = useLazyGetItalyCityListQuery();

  const defaultRegion = getValues("residence_region");
  const defaultProvince = getValues("residence_province");

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
    <>
      <div>
        <Label className="text-blacks text-base font-medium  mb-1">
          {t("country")}
        </Label>
        <FormSelDropdown
          label={t("select_country")}
          name="residence_country"
          options={[{ label: "Italy", value: "Italy" }]}
          className="bg-[#F4F4F4] border-none rounded-md"
        />
      </div>
      <div>
        <Label className="text-blacks text-base font-medium  mb-1">
          {t("region")}
        </Label>
        <FormSelDropdown
          label={t("select_region")}
          name="residence_region"
          options={regionItem?.data?.map((item: any) => ({
            label: item.region,
            value: item.region,
          }))}
          setSelectValue={(item) => {
            getProvinceList({ region: item.value });
          }}
          className="bg-[#F4F4F4] border-none rounded-md"
        />
      </div>
      <div>
        <Label className="text-blacks text-base font-medium  mb-1">
          {t("province")}
        </Label>
        <FormSelDropdown
          label={t("select_province")}
          name="residence_province"
          options={provinceItem?.data?.map((item: any) => ({
            label: item.province,
            value: item.province,
          }))}
          setSelectValue={(item) => {
            getItalyCityList({ province: item.value });
          }}
          className="bg-[#F4F4F4] border-none rounded-md"
          disabled={!provinceItem?.data?.length}
        />
      </div>
      <div>
        <Label className="text-blacks text-base font-medium  mb-1">
          {t("city")}
        </Label>
        <FormSelDropdown
          label={t("select_city")}
          name="residence_city"
          options={cityItem?.data?.map((item: any) => ({
            label: item.city,
            value: item.city,
          }))}
          className="bg-[#F4F4F4] border-none rounded-md"
          disabled={!cityItem?.data?.length}
        />
      </div>
    </>
  );
};
