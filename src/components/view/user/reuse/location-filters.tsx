"use client"
import { FormSelDropdown } from "@/components/reuseable/from-select@1";
import { Label } from "@/components/ui";
import { useGetRegionListQuery, useLazyGetItalyCityListQuery, useLazyGetProvinceListQuery } from "@/redux/api/city/cityApi";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const LocationDroupDownFiters = () => {
  const t = useTranslations("user.explore.filter");
  const { getValues } = useFormContext();
  const { data: regionItem } = useGetRegionListQuery({})
  const [getProvinceList, { data: provinceItem }] = useLazyGetProvinceListQuery()
  const [getItalyCityList, { data: cityItem }] = useLazyGetItalyCityListQuery()

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
    <>
      <div>
        <Label className="text-blacks text-base mb-2 font-medium">
          {t("select_country")}
        </Label>
        <FormSelDropdown
          label={t("select_here")}
          name="country"
          className="border-none bg-[#F4F4F4] rounded-md"
          options={[
            { label: "Italy", value: "Italy" },
          ]}
        />
      </div>
      <div>
        <Label className="text-blacks text-base mb-2 font-medium">
          {t("select_region")}
        </Label>
        <FormSelDropdown
          label={t("select_here")}
          name="region"
          className="border-none bg-[#F4F4F4] rounded-md"
          options={regionItem?.data?.map((item: any) => ({
            label: item.region, value: item.region
          }))}
          setSelectValue={(item) => {
            getProvinceList({ region: item.value })
          }}
        />
      </div>
      <div>
        <Label className="text-blacks text-base mb-2 font-medium">
          {t("select_province")}
        </Label>
        <FormSelDropdown
          label={t("select_here")}
          name="province"
          className="border-none bg-[#F4F4F4] rounded-md"
          options={provinceItem?.data?.map((item: any) => ({
            label: item.province, value: item.province
          }))}
          setSelectValue={(item) => {
            getItalyCityList({ province: item.value })
          }}
          disabled={!provinceItem?.data?.length}
        />
      </div>

      <div>
        <Label className="text-blacks text-base mb-2 font-medium">
          {t("select_city")}
        </Label>

        <FormSelDropdown
          label={t("select_here")}
          name="city"
          className="border-none bg-[#F4F4F4] rounded-md"
          options={cityItem?.data?.map((item: any) => ({
            label: item.city, value: item.city
          }))}
          disabled={!cityItem?.data?.length}
        />
      </div>

    </>
  );
};
