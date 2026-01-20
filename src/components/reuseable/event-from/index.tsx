"use client";
import { FromInput } from "@/components/reuseable/form-input";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { FromSelect2 } from "@/components/reuseable/from-select2";
import { FromTagInput } from "@/components/reuseable/from-tag";
import { FromTextarea2 } from "@/components/reuseable/from-textarea2";
import SearchBox from "@/components/reuseable/search-box";
import { SingleCalendar } from "@/components/reuseable/single-date";
import { Button, Checkbox, Input, Label } from "@/components/ui";
import { disciplineItem } from "@/components/view/oparator/dummy-json";
import { useFileUpload } from "@/hooks/useFileUpload";
import { FieldValues, useForm } from "react-hook-form";
import { ChevronRight, X } from "lucide-react";
import Form from "@/components/reuseable/from";
import Modal from "@/components/reuseable/modal";
import { useModalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import { helpers, RandomImg } from "@/lib";
import { useEffect, useState } from "react";
import Avatars from "@/components/reuseable/avater";
import { FormSelDropdown } from "@/components/reuseable/from-select@1";
import { UploadBtn } from "@/components/reuseable/btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import { useParams } from "next/navigation";
import { accessibilityItem } from "@/components/dummy-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorInput } from "../error";
import { InputTime } from "../timeInput";
import {
  delivary,
  durationItem,
  getDefaultValues,
  getDelivery,
  getSchema,
  purposeItem,
} from "./element/default";
import TimeSelect from "./element/time-select";
import MultiDate from "./element/multi-date";

const initialState = {
  holistic: false,
  istime: false,
  isDate: false,
};

export default function EventFrom({ handleFormSubmit }: any) {
  const { slug } = useParams();
  const isOne = slug === "onetoone";
  const [searchText, setSearchText] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [state, setState] = useModalState(initialState);
  const [selAccbility, setSelAccbility] = useState<string[]>([]);
  const [isDelivery, setIsDelivery] = useState<any>("offline");
  const [selectDate, setSelectDate] = useState<any>([]);

  const defaultValues = getDefaultValues(isDelivery, isOne) as any;
  const defaultSchema = getSchema(isDelivery) as any;

  const from = useForm({
    // resolver: zodResolver(defaultSchema),
    defaultValues: defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // accept: "video/*",
  //   multiple: false
  const get = (v: any) => from.watch(v);
  const delivaryType = get("delivery_type") == delivary.ondemand;
  const [{ files }, { getInputProps, clearFiles }] = useFileUpload({
    accept: delivaryType ? "video/*" : "image/*",
  });

  useEffect(() => {
    from.setValue("img", files[0]?.file);
  }, [files]);

  const resetFrom = () => {
    from.reset();
    setSelAccbility([]);
    setSelectDate([]);
    setIsDelivery("offline");
    setSelectedTimes([]);
    clearFiles();
  };

  const handleSubmit = async (values: FieldValues) => {
    const data = {
      event_type: isOne,
    };
    console.log(values);
  };

  const toggleHolistic = (value: any) => {
    const current = from.getValues("holistic_discipline") || [];
    if (current.includes(value as never)) {
      from.setValue(
        "holistic_discipline",
        current.filter((v: any) => v !== value),
      );
    } else {
      from.setValue("holistic_discipline", [...current, value] as any);
    }
  };

  return (
    <div>
      <Form className="py-15" from={from} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {delivaryType ? (
              <div>
                <VideoBannerBox files={files} getInputProps={getInputProps} />
                {from?.formState?.errors?.img && (
                  <ErrorInput
                    error={from?.formState?.errors?.img?.message as string}
                  />
                )}
              </div>
            ) : (
              <div>
                <ImageBannerBox files={files} getInputProps={getInputProps} />
                {!get("img") && (
                  <ErrorInput
                    error={from?.formState?.errors?.img?.message as string}
                  />
                )}
              </div>
            )}
            {/*  ------ Select Delivery Type --------  */}
            <div>
              <label className="block text-lg mb-2 font-semibold">
                Select Delivery Type
              </label>
              <div className="flex gap-3">
                {getDelivery(slug)?.map((item) => (
                  <Button
                    key={item.value}
                    onClick={() => {
                      resetFrom();
                      setIsDelivery(item.value);
                      from.setValue("delivery_type", item.value);
                    }}
                    type="button"
                    className={`font-normal transition-colors border bg-transparent text-figma-black ${
                      item.value === get("delivery_type") &&
                      "bg-primary text-white"
                    }`}
                  >
                    <FavIcon
                      color={
                        item.value === get("delivery_type") ? "#fff" : undefined
                      }
                      name={item.icon as any}
                    />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
            {/* --------  Select Event Purpose --------- */}
            <div>
              <label className="block text-lg mb-2 font-semibold">
                Select Event Purpose
              </label>
              <div className="flex gap-3">
                {purposeItem?.map((item) => (
                  <Button
                    key={item.value}
                    onClick={() => {
                      from.setValue("event_purpose", item.value);
                    }}
                    className={`font-normal transition-colors trans border bg-transparent text-figma-black ${
                      item.value == get("event_purpose") &&
                      "bg-primary text-white"
                    }`}
                    type="button"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Holistic Discipline */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-lg font-semibold">
                  Holistic Discipline
                </label>
                <button className="text-sm text-primary">
                  Select 1 or more
                </button>
              </div>
              <div>
                <div className="border p-3 flex items-center flex-wrap gap-3 rounded-md">
                  {disciplineItem.slice(0, 10).map((item, idx) => (
                    <label key={idx} className="flex items-center gap-3">
                      <Checkbox
                        checked={get("holistic_discipline")?.includes(
                          item.value as never,
                        )}
                        onCheckedChange={() => toggleHolistic(item.value)}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                  <h5
                    onClick={() => setState("holistic", true)}
                    className="font-semibold cursor-pointer"
                  >
                    ...more
                  </h5>
                </div>

                {get("holistic_discipline")?.length == 0 && (
                  <ErrorInput
                    error={
                      from?.formState?.errors?.holistic_discipline
                        ?.message as string
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <FromInput2
              name="event_title"
              label="Event Title"
              placeholder="Enter your title"
              className="h-10"
            />

            <FromTextarea2
              name="event_description"
              label="Description"
              placeholder="Enter your description"
              className="min-h-30"
            />
            {/*  type  ------------ */}
            {get("delivery_type") === delivary.offline ? (
              //  ===================== offline ==========================
              <>
                <LocationDroupDown />
                {slug == "onetoone" ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <SingleDateBox from={from} />
                    <MultipleTime from={from} setState={setState} />
                  </div>
                ) : slug === "group" ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <MultipleDate from={from} setState={setState} />
                    <InputTime name="time" placeholder="select time" />
                  </div>
                ) : (
                  slug === "retreat" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <SingleDateBox from={from} />
                      <InputTime name="time" placeholder="select time" />
                    </div>
                  )
                )}

                <PersonLimit isOne={isOne} />
                <TicketQuantity from={from} isOne={isOne} />
                <FromSelect2
                  items={durationItem}
                  name="event_duration"
                  placeholder="-Select duration-"
                  className="rounded-md"
                />

                {/* Accessibility */}
                <AccessibilityBox
                  selAccbility={selAccbility}
                  setSelAccbility={setSelAccbility}
                />
                <FromTagInput name="tags" label="Tags" className="py-2" />

                {/* Attendees */}
                <div className="border rounded-md h-10 flex items-center">
                  <div className="flex items-center space-x-1 px-2">
                    <Avatars
                      className="size-8!"
                      src={RandomImg(50, 50)}
                      alt="Attendees"
                      fallback="A"
                    />
                    <span>example@gmail.com</span>
                    <span>
                      <X className="size-4 cursor-pointer" />
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 px-2">
                    <Avatars
                      className="size-8!"
                      src={RandomImg(50, 50)}
                      alt="Attendees"
                      fallback="A"
                    />
                    <span>example@gmail.com</span>
                    <span>
                      <X className="size-4 cursor-pointer" />
                    </span>
                  </div>
                  <Input
                    type="email"
                    className="border-none"
                    placeholder="Type recipients email here"
                  />
                </div>
              </>
            ) : from.watch("delivery_type") === "online" ? (
              //  ============================= online =====================
              <>
                <div className="flex items-center gap-4">
                  <div className="border w-full h-10 flex items-center rounded-md px-3">
                    <FavIcon name="link" />
                    <span className="text-primary ml-2 text-sm">
                      Click generate link button to create a new link...
                    </span>
                  </div>
                  <Button className="w-fit h-10">
                    <FavIcon name="generate" />
                    Generate Link
                  </Button>
                </div>
                {slug == "onetoone" ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <SingleDateBox from={from} />
                    <MultipleTime from={from} setState={setState} />
                  </div>
                ) : (
                  slug === "group" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <MultipleDate from={from} setState={setState} />
                      <InputTime name="event_time" placeholder="select time" />
                    </div>
                  )
                )}
                <PersonLimit />
                <TicketQuantity from={from} isOne={isOne} />
                <FromTagInput name="tags" label="Tags" className="py-2" />
              </>
            ) : (
              from.watch("delivery_type") === "ondemand" && (
                <>
                  <LocationDroupDown />
                  <div>
                    {slug == "onetoone" ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <SingleDateBox from={from} />
                        <InputTime
                          name="event_time"
                          placeholder="select time"
                        />
                      </div>
                    ) : (
                      slug === "group" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <SingleDateBox from={from} />
                          <InputTime
                            name="event_time"
                            placeholder="select time"
                          />
                        </div>
                      )
                    )}
                  </div>
                  <FromTagInput name="tags" label="Tags" className="py-2" />
                </>
              )
            )}

            {/* Submit Button */}
            <Button className="w-full">Submit</Button>
          </div>
        </div>
      </Form>
      {/*  =============== Select holistic descipline Modal =================== */}
      <Modal
        open={state.holistic}
        setIsOpen={(v) => setState("holistic", v)}
        title="Select Holistic Descipline"
        className="sm:max-w-xl"
        titleStyle="text-center"
      >
        <SearchBox
          className="w-full"
          onChange={(value) => setSearchText(value)}
        />
        <div className="flex items-center flex-wrap gap-3 pt-5 pb-6">
          {disciplineItem
            ?.filter((item) =>
              helpers
                .lowerCase(item?.label)
                .includes(helpers.lowerCase(searchText)),
            )
            ?.map((item, idx) => (
              <label key={idx} className="flex items-center gap-3">
                <Checkbox
                  checked={from
                    .watch("holistic_discipline")
                    ?.includes(item.value as never)}
                  onCheckedChange={() => toggleHolistic(item.value)}
                />
                <span>{item.label}</span>
              </label>
            ))}
        </div>
      </Modal>
      {/*  =============== Select time slot Modal =================== */}
      <Modal
        open={state.istime}
        setIsOpen={(v) => setState("istime", v)}
        title="Create Time Slot"
        className="sm:max-w-xl"
        titleStyle="text-center"
      >
        <TimeSelect
          selectedTimes={selectedTimes}
          setSelectedTimes={setSelectedTimes}
          setState={setState}
          from={from}
        />
      </Modal>
      {/*  === date === */}
      <Modal
        open={state.isDate}
        setIsOpen={(v) => setState("isDate", v)}
        title="Create Date Slot"
        className="sm:max-w-xl"
        titleStyle="text-center"
      >
        <MultiDate
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          from={from}
          setState={setState}
        />
      </Modal>
    </div>
  );
}
//  -------------------------------------------------------------- X ----------------------------------------------------------
//  ================= image box ================
const ImageBannerBox = ({ files, getInputProps }: any) => {
  return (
    <Label
      htmlFor="image"
      className="border-2 p-1 cursor-pointer border-dashed border-primary rounded-lg flex flex-col items-center justify-center h-60 overflow-hidden"
    >
      {files[0]?.preview ? (
        <ImgBox
          src={files[0].preview}
          alt="img"
          className="w-full h-full object-cover rounded-md"
        >
          <UploadBtn />
        </ImgBox>
      ) : (
        <>
          <FavIcon name="upload2" />
          <p className="text-center mt-2 text-figma-black">
            Upload event banner image
          </p>
        </>
      )}
      <input
        {...getInputProps()}
        className="sr-only"
        aria-label="Upload image file"
        id="image"
      />
    </Label>
  );
};
//  ================= video box ================
const VideoBannerBox = ({ files, getInputProps }: any) => {
  return (
    <Label
      htmlFor="image"
      className="border-2 p-1 cursor-pointer border-dashed border-primary rounded-lg flex flex-col items-center justify-center h-60 overflow-hidden"
    >
      {files[0]?.preview ? (
        <div className="relative w-full">
          <video
            key={files[0]?.preview}
            autoPlay
            loop
            playsInline
            muted
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          >
            <source src={files[0]?.preview} />
            Your browser does not support the video tag.
          </video>
          <UploadBtn />
        </div>
      ) : (
        <>
          <FavIcon name="upload2" />
          <p className="text-center mt-2 text-figma-black">
            Upload pre recorded video
          </p>
        </>
      )}
      <input
        {...getInputProps()}
        className="sr-only"
        aria-label="Upload image file"
        id="image"
      />
    </Label>
  );
};

//  ================== time select ========

const MultipleDate = ({ from, setState }: any) => {
  const val = from.watch("event_date");
  console.log(val);
  return (
    <div className="w-full">
      <Button
        onClick={() => setState("isDate", true)}
        type="button"
        className="flex h-10 w-full  bg-transparent border text-black font-normal justify-between items-center"
      >
        <span>Create date slot</span> <ChevronRight />
      </Button>
      {val.length === 0 && (
        <ErrorInput
          className="text-xs"
          error={from?.formState?.errors?.event_date?.message}
        />
      )}
    </div>
  );
};

//  --------------------  Location Dropdowns ------------------
const LocationDroupDown = () => {
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

//  ----------------------single date --------------------
const SingleDateBox = ({ from }: any) => {
  const val = from.watch("event_date");
  return (
    <div>
      <SingleCalendar
        onChange={(value: any) => {
          from.setValue("event_date", helpers.formatDate(value, "YYYY-MM-DD"));
        }}
        className="h-10 text-black"
      />
      {!val && (
        <ErrorInput error={from?.formState?.errors?.event_date?.message} />
      )}
    </div>
  );
};

//  ------------------- multiple time -------------------------
const MultipleTime = ({ from, setState }: any) => {
  const val = from.watch("event_time");
  return (
    <div className="w-full">
      <Button
        onClick={() => setState("istime", true)}
        type="button"
        className="flex h-10 w-full  bg-transparent border text-black font-normal justify-between items-center"
      >
        <span>Create time slot</span> <ChevronRight />
      </Button>
      {val?.length == 0 && (
        <ErrorInput error={from?.formState?.errors?.event_time?.message} />
      )}
    </div>
  );
};

// --------------- person limit ---------------------
const PersonLimit = ({ isOne }: any) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="h-10 flex items-center justify-between px-2 border rounded-md">
        <FromInput
          name="min_person"
          className="w-[100px] h-10 bg-transparent p-0"
          type="number"
          readOnly={isOne}
        />
        <span>-minimum person limit-</span>
      </div>
      <div className="h-10 flex items-center justify-between px-2 border rounded-md">
        <FromInput
          name="max_person"
          className="w-[100px] h-10 bg-transparent p-0"
          type="number"
          readOnly={isOne}
        />
        <span>-maximum person limit-</span>
      </div>
    </div>
  );
};

// -------------- ticket quantity ---------------
const TicketQuantity = ({ from, isOne }: any) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="h-10 flex items-center justify-between px-2 border rounded-md">
        <span className="flex items-center">
          <FavIcon className="size-5" name="tiket" />
          <span className="ml-1"> Ticket quantity</span>
        </span>
        <FromInput
          name="ticket_quantity"
          className="w-[100px] h-10 text-end bg-transparent p-0"
          type="number"
          placeholder="quantity hare"
          readOnly={isOne}
        />
      </div>
      <div>
        <div className="h-10 flex items-center justify-between px-2 border rounded-md">
          <span className="flex items-center">
            <FavIcon className="size-5" name="price22" />
            <span className="ml-1">Ticket Price</span>
          </span>
          <FromInput
            name="price"
            className="w-[100px] h-10 bg-transparent p-0"
            type="number"
            placeholder="price hare"
            err={false}
          />
        </div>
        <ErrorInput error={from?.formState?.errors?.price?.message} />
      </div>
    </div>
  );
};

// -----------------Accessibility ---------------
interface accessibilityProps {
  selAccbility: string[];
  setSelAccbility: React.Dispatch<React.SetStateAction<string[]>>;
}
const AccessibilityBox = ({
  selAccbility,
  setSelAccbility,
}: accessibilityProps) => {
  const [accessibility, setAccessibility] = useState(false);

  const handleToggle = (option: string) => {
    setSelAccbility((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-lg font-semibold">Accessibilities</label>
        <div className="flex items-center gap-3">
          <span className="text-gray-600">No</span>
          <button
            onClick={() => setAccessibility(!accessibility)}
            className={`relative inline-flex cursor-pointer h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              accessibility ? "bg-primary" : "bg-[#79747E]"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                accessibility ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-figma-black">Yes</span>
        </div>
      </div>

      {accessibility && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-100">
          <h5 className="col-span-1 lg:col-span-2 text-primary text-end mb-1 text-sm">
            Select 1 or more
          </h5>
          <div className="overflow-hidden rounded-lg border bg-card p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {accessibilityItem.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={selAccbility.includes(option)}
                    onCheckedChange={() => handleToggle(option)}
                  />
                  <label
                    htmlFor={option}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---  Delivery Box --
