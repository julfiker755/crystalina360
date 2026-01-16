import { FormSelDropdown } from "@/components/reuseable/from-select@1";

export const LocationDroupDown = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      <FormSelDropdown
        label="-Country-"
        name="country"
        options={[
          { label: "USA", value: "United States of America" },
          { label: "Canada", value: "Canada" },
          { label: "Australia", value: "Australia" },
          { label: "United Kingdom", value: "United Kingdom" },
          { label: "Germany", value: "Germany" },
          { label: "France", value: "France" },
          { label: "India", value: "India" },
          { label: "Japan", value: "Japan" },
          { label: "South Korea", value: "South Korea" },
          { label: "Brazil", value: "Brazil" },
        ]}
      />

      <FormSelDropdown
        label="-Region-"
        name="region"
        options={[
          { label: "California", value: "California" },
          { label: "Texas", value: "Texas" },
          { label: "Ontario", value: "Ontario" },
          { label: "Quebec", value: "Quebec" },
          { label: "New York", value: "New York" },
          { label: "Florida", value: "Florida" },
          { label: "London", value: "London" },
          { label: "Bavaria", value: "Bavaria" },
          { label: "Tokyo", value: "Tokyo" },
          { label: "São Paulo", value: "São Paulo" },
        ]}
      />

      <FormSelDropdown
        label="-Province-"
        name="province"
        options={[
          { label: "British Columbia", value: "British Columbia" },
          { label: "Quebec", value: "Quebec" },
          { label: "Victoria", value: "Victoria" },
          { label: "Ontario", value: "Ontario" },
          { label: "Alberta", value: "Alberta" },
          { label: "Nova Scotia", value: "Nova Scotia" },
          { label: "Manitoba", value: "Manitoba" },
          { label: "Sichuan", value: "Sichuan" },
          { label: "Fujian", value: "Fujian" },
          { label: "State of São Paulo", value: "State of São Paulo" },
        ]}
      />

      <FormSelDropdown
        label="-City-"
        name="city"
        options={[
          { label: "Los Angeles", value: "Los Angeles" },
          { label: "Toronto", value: "Toronto" },
          { label: "Melbourne", value: "Melbourne" },
          { label: "Vancouver", value: "Vancouver" },
          { label: "Paris", value: "Paris" },
          { label: "Berlin", value: "Berlin" },
          { label: "New York City", value: "New York City" },
          { label: "Tokyo", value: "Tokyo" },
          { label: "São Paulo", value: "São Paulo" },
          { label: "Seoul", value: "Seoul" },
        ]}
      />
    </div>
  );
};
