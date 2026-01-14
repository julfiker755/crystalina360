import { FormSelDropdown } from "@/components/reuseable/from-select@1";

export const LocationDroupDown = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <FormSelDropdown
          label="-Country-"
          name="country"
          options={[
            { label: "USA", value: "usa" },
            { label: "Canada", value: "canada" },
            { label: "Australia", value: "australia" },
          ]}
        />

        <FormSelDropdown
          label="-Region-"
          name="region"
          options={[
            { label: "California", value: "california" },
            { label: "Texas", value: "texas" },
            { label: "Ontario", value: "ontario" },
          ]}
        />

        <FormSelDropdown
          label="-Province-"
          name="province"
          options={[
            { label: "British Columbia", value: "bc" },
            { label: "Quebec", value: "quebec" },
            { label: "Victoria", value: "victoria" },
          ]}
        />

        <FormSelDropdown
          label="-City-"
          name="city"
          options={[
            { label: "Los Angeles", value: "la" },
            { label: "Toronto", value: "toronto" },
            { label: "Melbourne", value: "melbourne" },
          ]}
        />
      </div>
    </>
  );
};
