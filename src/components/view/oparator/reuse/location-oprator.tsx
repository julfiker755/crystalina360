"use client";
import { SelectDropdownOprator } from "@/components/reuseable/from-select@1/select-droup-profile";
import {
  useGetRegionListQuery,
  useLazyGetItalyCityListQuery,
  useLazyGetProvinceListQuery,
} from "@/redux/api/city/cityApi";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const LocationDroupDownOprator = () => {
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
      <SelectDropdownOprator
        label="Country"
        name="residence_country"
        options={[{ label: "Italy", value: "Italy" }]}
      />
      <SelectDropdownOprator
        label="Region"
        name="residence_region"
        options={regionItem?.data?.map((item: any) => ({
          label: item.region,
          value: item.region,
        }))}
        setSelectValue={(item) => {
          getProvinceList({ region: item.value });
        }}
      />
      <SelectDropdownOprator
        label="Province"
        name="residence_province"
        options={provinceItem?.data?.map((item: any) => ({
          label: item.province,
          value: item.province,
        }))}
        setSelectValue={(item) => {
          getItalyCityList({ province: item.value });
        }}
        disabled={!provinceItem?.data?.length}
      />

      <SelectDropdownOprator
        label="City"
        name="residence_city"
        options={cityItem?.data?.map((item: any) => ({
          label: item.city,
          value: item.city,
        }))}
        disabled={!cityItem?.data?.length}
      />

      {/* <div>
        <Label className="text-blacks text-base font-medium  mb-1">
          Country
        </Label>
        <FormSelDropdown
          label="select country"
          name="residence_country"
          options={[
            { label: "Italy", value: "Italy" },
          ]}
          className="bg-[#F4F4F4] border-none rounded-md"
        />
      </div>
      <div>
        <Label className="text-blacks text-base font-medium  mb-1">
          Region
        </Label>
        <FormSelDropdown
          label="select region"
          name="residence_region"
          options={regionItem?.data?.map((item: any) => ({
            label: item.region, value: item.region
          }))}
          setSelectValue={(item) => {
            getProvinceList({ region: item.value })
          }}
          className="bg-[#F4F4F4] border-none rounded-md"
        />
      </div>
      <div>
        <Label className="text-blacks text-base font-medium  mb-1">
          Province
        </Label>
        <FormSelDropdown
          label="select province"
          name="residence_province"
          options={provinceItem?.data?.map((item: any) => ({
            label: item.province, value: item.province
          }))}
          setSelectValue={(item) => {
            getItalyCityList({ province: item.value })
          }}
          className="bg-[#F4F4F4] border-none rounded-md"
          disabled={!provinceItem?.data?.length}
        />
      </div>
      <div>
        <Label className="text-blacks text-base font-medium  mb-1">
          City
        </Label>
        <FormSelDropdown
          label="select city"
          name="residence_city"
          options={cityItem?.data?.map((item: any) => ({
            label: item.city, value: item.city
          }))}

          className="bg-[#F4F4F4] border-none rounded-md"
          disabled={!cityItem?.data?.length}
        />
      </div> */}
    </>
  );
};
