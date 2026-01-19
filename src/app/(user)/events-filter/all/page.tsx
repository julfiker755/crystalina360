"use client";
import {
  accessibilityItem,
  cityOptions,
  countryOptions,
  dateOption,
  delivaryOptions,
  disciplineOptions,
  durationOptions,
  eventItem,
  provinceOptions,
  purposeItem,
  regionOptions,
  tagsOptions,
} from "@/components/dummy-data";
import { BackBtn2 } from "@/components/reuseable/back-btn";
import EventCard from "@/components/reuseable/event-card";
import { FromInput } from "@/components/reuseable/form-input";
import Form from "@/components/reuseable/from";
import { FormSelDropdown } from "@/components/reuseable/from-select@1";
import Modal from "@/components/reuseable/modal";
import { MultiSelectGrid } from "@/components/reuseable/mul-select-grid/page";
import { MultipleCalendar } from "@/components/reuseable/multi-date";
import SearchBox from "@/components/reuseable/search-box";
import { NoItemData } from "@/components/reuseable/table-no-item";
import { Badge, Button, Checkbox, Label } from "@/components/ui";
import { AppAlert } from "@/components/view/user/reuse";
import { helpers } from "@/lib";
import { useFilterEventsMutation } from "@/redux/api/user/userEventsApi";
import { ChevronDown, ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function EventFilter() {
  const [searchText, setSearchText] = useState("");
  const [isHolistic, setIsHolistic] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [filterEvents, { isLoading }] = useFilterEventsMutation();
  const [allEvent, setAllEvent] = useState([]);
  const from = useForm({
    defaultValues: {
      name: "",
      event_type: "",
      delivery_type: "",
      event_purpose: "",
      event_duration: "",
      max_price: "",
      min_price: "",
      city: "",
      province: "",
      region: "",
      country: "",
      to_date: "",
      from_date: "",
      date_filter: "",
      nearMe: "0",
      holistic_discipline: [],
      accessibility: [],
      tags: [],
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    try {
      const data = helpers.fromData(values);
      const res = await filterEvents(data).unwrap();
      if (res.status) {
        setAllEvent(res?.data?.data);
      }
    } finally {
      setShowEvent(true);
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    }
  };

  const get = (v: any) => from.watch(v);

  const toggleHolistic = (value: string) => {
    const current = get("holistic_discipline");
    const updated = current.includes(value)
      ? current.filter((item: string) => item !== value)
      : [...current, value];
    from.setValue("holistic_discipline", updated);
  };

  const handleRemove = (item: string) => {
    const updated = get("holistic_discipline").filter(
      (i: string) => i !== item,
    );
    from.setValue("holistic_discipline", updated);
  };

  return (
    <div className="container">
      {showEvent ? (
        <div>
          <div className="flex items-center space-x-2 mt-12">
            <div
              onClick={() => {
                setShowEvent(!showEvent);
              }}
              className="size-10  cursor-pointer bg-[#000000]/5  rounded-md grid place-items-center"
            >
              <ChevronLeft />
            </div>

            <span className="text-xl font-medium">
              {" "}
              Explore OLISTAMI Events
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            {allEvent?.length > 0 ? (
              allEvent?.map((item: any) => (
                <Link key={item.id} href={`/events/${item?.id}`}>
                  <EventCard wish={false} item={item} />
                </Link>
              ))
            ) : (
              <NoItemData
                className="col-span-1 md:col-span-2 lg:col-span-3"
                title="No events found. Try adjusting your search or filters"
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="mt-10 mb-5">
            <BackBtn2
              label="Filter for Events"
              labelStyle="font-semibold text-xl"
              className="relative -left-5"
            />
          </div>
          <Form className="space-y-5" from={from} onSubmit={handleSubmit}>
            <FromInput
              className="h-10"
              name="name"
              label="Partitioner's Name"
              placeholder="Write the name of partitioner's"
            />
            <div className="flex flex-wrap items-center space-x-15">
              <div>
                <Label className="text-blacks text-base mb-2 font-medium">
                  Event Type
                </Label>
                <div className="space-y-2 lg:space-y-0 space-x-2">
                  {eventItem.map((item, idx) => (
                    <Button
                      size="lg"
                      variant="secondary"
                      type="button"
                      className={`${
                        get("event_type") == item.value &&
                        "shadow-filter bg-white"
                      }`}
                      key={idx}
                      onClick={() => from.setValue("event_type", item.value)}
                    >
                      {item.label}
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
                  {delivaryOptions?.map((item, idx) => (
                    <Button
                      size="lg"
                      variant="secondary"
                      type="button"
                      className={`${
                        get("delivery_type") == item.value &&
                        "shadow-filter bg-white"
                      }`}
                      key={idx}
                      onClick={() => from.setValue("delivery_type", item.value)}
                    >
                      {item.label}
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
                  {purposeItem.map((item, idx) => (
                    <Button
                      size="lg"
                      variant="secondary"
                      type="button"
                      className={`${
                        get("event_purpose") == item.value &&
                        "shadow-filter bg-white"
                      }`}
                      key={idx}
                      onClick={() => from.setValue("event_purpose", item.value)}
                    >
                      {item.label}
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
                {durationOptions.map((item, idx) => (
                  <div key={idx} className="flex items-center  space-x-2">
                    <Checkbox
                      id={item.value}
                      checked={from
                        .watch("event_duration")
                        .includes(item.value)}
                      onCheckedChange={() =>
                        from.setValue("event_duration", item.value)
                      }
                    />
                    <label
                      htmlFor={item.value}
                      className="text-sm font-normal leading-none text-article cursor-pointer"
                    >
                      {item.label}
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
            <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <div>
                <Label className="text-blacks text-base mb-2 font-medium">
                  Select Country
                </Label>
                <FormSelDropdown
                  label="Select here"
                  name="country"
                  className="border-none bg-[#F4F4F4] rounded-md"
                  options={countryOptions}
                />
              </div>

              <div>
                <Label className="text-blacks text-base mb-2 font-medium">
                  Select Region
                </Label>
                <FormSelDropdown
                  label="Select here"
                  name="region"
                  className="border-none bg-[#F4F4F4] rounded-md"
                  options={regionOptions}
                />
              </div>

              <div>
                <Label className="text-blacks text-base mb-2 font-medium">
                  Select Province
                </Label>
                <FormSelDropdown
                  label="Select here"
                  name="province"
                  className="border-none bg-[#F4F4F4] rounded-md"
                  options={provinceOptions}
                />
              </div>
              <div>
                <Label className="text-blacks text-base mb-2 font-medium">
                  Select City
                </Label>

                <FormSelDropdown
                  label="Select here"
                  name="city"
                  className="border-none bg-[#F4F4F4] rounded-md"
                  options={cityOptions}
                />
              </div>
              <div>
                <h1 className="sr-only">fff</h1>
                <h5 className="mt-10 ml-10">
                  {" "}
                  <Checkbox
                    onCheckedChange={() => {
                      if (get("nearMe") === "0") {
                        from.setValue("nearMe", "1");
                      }
                      from.setValue("nearMe", "0");
                    }}
                  />{" "}
                  Near me
                </h5>
              </div>
            </div>
            <div>
              <Label className="text-blacks text-base mb-2 font-medium">
                Date Range
              </Label>
              <MultipleCalendar
                className="border-none bg-[#F4F4F4] text-figma-black hover:text-figma-black rounded-md"
                onChange={(date: any) => {
                  from.setValue(
                    "to_date",
                    helpers.formatDate(date?.startDate, "YYYY-MM-DD"),
                  );
                  from.setValue(
                    "from_date",
                    helpers.formatDate(date?.endDate, "YYYY-MM-DD"),
                  );
                }}
              />
              <div className="flex flex-wrap gap-4 mt-2">
                {dateOption.map((item, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <Checkbox
                      checked={get("date_filter") === item.value}
                      onCheckedChange={() =>
                        from.setValue("date_filter", item.value)
                      }
                    />
                    <span className="text-sm text-article">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-blacks text-base mb-1 font-medium">
                Holistic Discipline{" "}
              </Label>
              <div
                onClick={() => {
                  setIsHolistic(!isHolistic);
                }}
                className="h-10 px-3 py-[5px] w-full bg-[#F4F4F4] rounded-md cursor-pointer flex justify-between items-center"
              >
                <div className="flex-1 overflow-hidden">
                  {get("holistic_discipline").length === 0 ? (
                    <span className="text-muted-foreground py-1 block">
                      Select
                    </span>
                  ) : (
                    <div className="flex overflow-hidden truncate gap-2 py-1">
                      {get("holistic_discipline").map((item: any) => (
                        <Badge
                          key={item}
                          className="bg-white text-sm px-2 py-px flex items-center gap-1 font-normal"
                        >
                          {item}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleRemove(item);
                            }}
                            className="ml-1 rounded-full"
                          >
                            <X className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground mt-1 ml-5 transition-transform duration-300 ${isHolistic && "rotate-180"}`}
                />
              </div>
            </div>

            <MultiSelectGrid
              label="Accessibility "
              name="accessibility"
              options={accessibilityItem}
            />
            <MultiSelectGrid label="Tags" name="tags" options={tagsOptions} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <Button
                type="button"
                className="w-full bg-white text-figma-black border"
                onClick={() => from.reset()}
              >
                Reset filters
              </Button>
              <Button disabled={isLoading} className="w-full">
                Apply filters
              </Button>
            </div>
          </Form>
          {/* ============= modal holistic ======== */}
          <Modal
            open={isHolistic}
            setIsOpen={setIsHolistic}
            title="Select Holistic Discipline"
            className="sm:max-w-4xl"
            titleStyle="text-center"
          >
            <SearchBox className="mx-auto" onChange={setSearchText} />
            <div className="flex items-center flex-wrap gap-3 pt-5 pb-6">
              {disciplineOptions
                .filter((item) =>
                  helpers
                    .lowerCase(item.label)
                    .includes(helpers.lowerCase(searchText)),
                )
                .map((item, idx) => (
                  <label key={idx} className="flex items-center gap-3">
                    <Checkbox
                      checked={get("holistic_discipline").includes(item.value)}
                      onCheckedChange={() => toggleHolistic(item.value)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
            </div>
          </Modal>
        </>
      )}
      <AppAlert />
    </div>
  );
}
