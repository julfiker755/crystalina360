"use client";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import { FromInput } from "@/components/reuseable/form-input";
import Form from "@/components/reuseable/from";
import { FormSelDropdown } from "@/components/reuseable/from-select@1";
import { MultiSelectGrid } from "@/components/reuseable/mul-select-grid/page";
import { MultipleCalendar } from "@/components/reuseable/multi-date";
import { Button, Checkbox, Label } from "@/components/ui";
import { AppAlert } from "@/components/view/user/reuse";
import { FieldValues, useForm } from "react-hook-form";

const holisticItem = [
  "Yin Yoga",
  "Yoga Therapy",
  "Woman's Health Coaching",
  "Access Bars Therapy",
  "Access Body Processes",
  "Aura Healing",
  "Lightfield",
  "Magnetic therapy",
  "Light language",
  "Lama fera",
  "Pilates",
  "Prenatal Yoga",
  "Radionics",
  "Osteopathy",
  "Past life regression",
];

const accessibilityItem = [
  "Wheelchair accessible",
  "Quiet environment",
  "Guide dog allowed",
  "Reserved parking for disabled",
  "Visual support available",
  "Braille materials",
  "Hearing support",
  "Accessible toilets",
  "Sign language interpreter",
  "High readability materials",
  "Cognitive support",
  "Elevator available",
  "Other",
];

const tagsItem = [
  "Stress relief",
  "Emotional healing",
  "Creativity",
  "Self Discovery",
  "Women's wellness",
  "Spiritual growth",
  "Sleep improvement",
  "Inner child healing",
  "Energy balancing",
  "Physical recovery",
  "Detox",
  "Men's wellness",
  "Grief support",
  "Chakra balancing",
  "Burnout recovery",
];

export default function EventFilter() {
  const from = useForm({
    // resolver: zodResolver(sign_In.partial()),
    defaultValues: {
      name: "",
      holistic: [],
      accessibility: [],
      tags: [],
      event_type: "",
      delivery_mode: "",
      purpose: "",
      event_duration: "",
      max_price: "",
      min_price: "",
      city: "",
      province: "",
      region: "",
      country: "",
      date: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
    // dispatch(setActiveModal("verify"));
    // dispatch(
    //   setOtpInfo({
    //     email: values.email,
    //   })
    // );
  };
  return (
    <div className="container">
      <div className="mt-10 mb-5">
        <BackBtn2
          label="Filter for Events"
          labelStyle="font-semibold text-xl"
          className="relative -left-5"
        />
      </div>
      <Form className="space-y-5" from={from} onSubmit={handleSubmit}>
        <MultiSelectGrid
          label="Holistic Discipline"
          name="holistic"
          options={holisticItem}
        />
        <FromInput
          className="h-10"
          name="name"
          label="Name"
          placeholder="Enter your name"
        />
        <div className="flex flex-wrap items-center space-x-15">
          {/*   Event Type */}
          <div>
            <Label className="text-blacks text-base mb-2 font-medium">
              Event Type
            </Label>
            <div className="space-y-2 lg:space-y-0 space-x-2">
              {["1:1", "Group", "Retreat"].map((item, idx) => (
                <Button
                  size="lg"
                  variant="secondary"
                  type="button"
                  className={`${
                    from.watch("event_type") == item && "shadow-filter bg-white"
                  }`}
                  key={idx}
                  onClick={() => from.setValue("event_type", item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          {/*   Delivery Mode */}
          <div>
            <Label className="text-blacks text-base mb-2 font-medium">
              Delivery Mode
            </Label>
            <div className="space-y-2 lg:space-y-0 space-x-2">
              {["Online", "In Person", "On Demand"].map((item, idx) => (
                <Button
                  size="lg"
                  variant="secondary"
                  type="button"
                  className={`${
                    from.watch("delivery_mode") == item &&
                    "shadow-filter bg-white"
                  }`}
                  key={idx}
                  onClick={() => from.setValue("delivery_mode", item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          {/* Purpose */}
          <div>
            <Label className="text-blacks text-base mb-2 font-medium">
              Purpose
            </Label>
            <div className="space-y-2 lg:space-y-0 space-x-2">
              {["Educational", "Experiential", "Mixed"].map((item, idx) => (
                <Button
                  size="lg"
                  variant="secondary"
                  type="button"
                  className={`${
                    from.watch("purpose") == item && "shadow-filter bg-white"
                  }`}
                  key={idx}
                  onClick={() => from.setValue("purpose", item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Label className="text-blacks text-base mb-2 font-medium">
            Event Duration
          </Label>
          <div className="flex flex-wrap gap-2 items-center space-x-6">
            {[
              "Less than 30 minutes",
              "30-60 minutes",
              "Half day",
              "One day",
              "Two days",
              "More than one week",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center  space-x-2">
                <Checkbox
                  id={item}
                  checked={from.watch("event_duration").includes(item)}
                  onCheckedChange={() => from.setValue("event_duration", item)}
                />
                <label
                  htmlFor={item}
                  className="text-sm font-normal leading-none text-article cursor-pointer"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FromInput
            className="h-10"
            name="max_price"
            label="Max Price"
            placeholder="Enter your max price"
            type="number"
          />
          <FromInput
            className="h-10"
            name="min_price"
            label="Min Price"
            placeholder="Enter your min price"
            type="number"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          <div>
            <Label className="text-blacks text-base mb-2 font-medium">
              Select Country
            </Label>
            <FormSelDropdown
              label="select"
              name="country"
              className="border-none bg-[#F4F4F4] rounded-md"
              options={[
                { label: "USA", value: "usa" },
                { label: "Canada", value: "canada" },
                { label: "Australia", value: "australia" },
              ]}
            />
          </div>

          <div>
            <Label className="text-blacks text-base mb-2 font-medium">
              Select Region
            </Label>
            <FormSelDropdown
              label="select"
              name="region"
              className="border-none bg-[#F4F4F4] rounded-md"
              options={[
                { label: "California", value: "california" },
                { label: "Texas", value: "texas" },
                { label: "Ontario", value: "ontario" },
              ]}
            />
          </div>

          <div>
            <Label className="text-blacks text-base mb-2 font-medium">
              Select Province
            </Label>
            <FormSelDropdown
              label="select"
              name="province"
              className="border-none bg-[#F4F4F4] rounded-md"
              options={[
                { label: "British Columbia", value: "bc" },
                { label: "Quebec", value: "quebec" },
                { label: "Victoria", value: "victoria" },
              ]}
            />
          </div>
          <div>
            <Label className="text-blacks text-base mb-2 font-medium">
              Select City
            </Label>

            <FormSelDropdown
              label="seelct"
              name="city"
              className="border-none bg-[#F4F4F4] rounded-md"
              options={[
                { label: "Los Angeles", value: "la" },
                { label: "Toronto", value: "toronto" },
                { label: "Melbourne", value: "melbourne" },
              ]}
            />
          </div>
        </div>
        <div>
          <Label className="text-blacks text-base mb-2 font-medium">
            Date Range
          </Label>
          <MultipleCalendar
            className="border-none bg-[#F4F4F4] text-figma-black hover:text-figma-black rounded-md"
            onChange={(date: any) => from.setValue("date", date)}
          />
        </div>

        <MultiSelectGrid
          label="Accessibility "
          name="accessibility"
          options={accessibilityItem}
        />
        <MultiSelectGrid label="Tags" name="tags" options={tagsItem} />

        <Button className="w-full">Apply gilters</Button>
      </Form>
      <AppAlert />
    </div>
  );
}
