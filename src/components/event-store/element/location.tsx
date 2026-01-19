import {
  cityOptions,
  countryOptions,
  provinceOptions,
  regionOptions,
} from "@/components/dummy-data";
import { FormSelDropdown } from "@/components/reuseable/from-select@1";

export const LocationDroupDown = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      <FormSelDropdown
        label="-Country-"
        name="country"
        options={countryOptions}
      />

      <FormSelDropdown label="-Region-" name="region" options={regionOptions} />

      <FormSelDropdown
        label="-Province-"
        name="province"
        options={provinceOptions}
      />

      <FormSelDropdown label="-City-" name="city" options={cityOptions} />
    </div>
  );
};
