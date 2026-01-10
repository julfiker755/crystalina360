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
import { cn, helpers, RandomImg } from "@/lib";
import { useState } from "react";
import Avatars from "@/components/reuseable/avater";
import { FormSelDropdown } from "@/components/reuseable/from-select@1";
import { UploadBtn } from "@/components/reuseable/btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import { useParams } from "next/navigation";
import { accessibilityItem } from "@/components/dummy-data";

const initialState = {
  holistic: false,
  istime: false,
};

export default function EventFrom({ handleFormSubmit }: any) {
  const { slug } = useParams();
  const isOne = slug === "one-to-one";
  const [searchText, setSearchText] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [state, setState] = useModalState(initialState);
  const [selAccbility, setSelAccbility] = useState<string[]>([]);
  const from = useForm({
    // resolver: zodResolver(sign_In),
    defaultValues: {
      delivery_type: "offline",
      event_purpose: "experiential",
      holistic: [],
      event_title: "",
      description: "",
      date: "",
      timeSlot: [],
      minilimit: 1,
      maxlimit: 1,
      price: "",
      duration: "",
      tags: [],
      city: "",
      province: "",
      region: "",
      country: "",
      image: "",
      tiket: isOne ? 2 : 200,
      //
    },
  });
  // accept: "video/*",
  //   multiple: false
  const deliType = from.watch("delivery_type") === "ondemand";
  const [{ files }, { getInputProps, clearFiles }] = useFileUpload({
    accept: deliType ? "video/*" : "image/*",
  });

  console.log(files);

  const handleSubmit = async (values: FieldValues) => {
    // quantity 3
    handleFormSubmit(values);
    console.log(files[0]?.file);
    console.log(values);
  };

  const toggleHolistic = (value: any) => {
    const current = from.getValues("holistic") || [];
    if (current.includes(value as never)) {
      from.setValue(
        "holistic",
        current.filter((v) => v !== value)
      );
    } else {
      from.setValue("holistic", [...current, value] as any);
    }
  };

  //  Delivery Type Options
  const options =
    slug === "retreat"
      ? [{ value: "offline", label: "Offline", icon: "offline" }]
      : [
          { value: "offline", label: "Offline", icon: "offline" },
          { value: "online", label: "Online", icon: "online" },
          { value: "ondemand", label: "On demand", icon: "ondemand" },
        ];

  return (
    <div>
      <Form className="py-15" from={from} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* image / video uplaod example */}
            {deliType ? (
              <VideoBannerBox files={files} getInputProps={getInputProps} />
            ) : (
              <ImageBannerBox files={files} getInputProps={getInputProps} />
            )}

            {/* === Delivery Type ==*/}
            <div>
              <label className="block text-lg mb-2 font-semibold">
                Select Delivery Type
              </label>
              <div className="flex gap-3">
                {options.map((item) => (
                  <Button
                    key={item.value}
                    onClick={() => {
                      clearFiles();
                      from.setValue("delivery_type", item.value);
                    }}
                    className={`font-normal transition-colors trans border bg-transparent text-figma-black ${
                      item.value == from.watch("delivery_type") &&
                      "bg-primary text-white"
                    }`}
                  >
                    <FavIcon
                      color={
                        item.value == from.watch("delivery_type")
                          ? "#fff"
                          : undefined
                      }
                      name={item.icon as any}
                    />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Event Purpose */}
            <div>
              <label className="block text-lg mb-2 font-semibold">
                Select Event Purpose
              </label>
              <div className="flex gap-3">
                {[
                  { value: "educational", label: "Educational" },
                  { value: "experiential", label: "Experiential" },
                  { value: "mixed", label: "Mixed" },
                ].map((item) => (
                  <Button
                    key={item.value}
                    onClick={() => {
                      from.setValue("event_purpose", item.value);
                    }}
                    className={`font-normal transition-colors trans border bg-transparent text-figma-black ${
                      item.value == from.watch("event_purpose") &&
                      "bg-primary text-white"
                    }`}
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
              <div className="border p-3 flex items-center flex-wrap gap-3 rounded-md">
                {disciplineItem.slice(0, 10).map((item, idx) => (
                  <label key={idx} className="flex items-center gap-3">
                    <Checkbox
                      checked={from
                        .watch("holistic")
                        ?.includes(item.value as never)}
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
              name="description"
              label="Description"
              placeholder="Enter your description"
              className="min-h-30"
            />
            {from.watch("delivery_type") === "offline" ? (
              //  ===================== offline ==========================
              <>
                <LocationDroupDown />
                <DateAndtime from={from} setState={setState} />
                <PersonLimit />
                <TicketQuantity isOne={isOne} />
                <FromSelect2
                  items={[
                    {
                      label: "Less than 30 minutes",
                      value: "less_than_30_minutes",
                    },
                    { label: "30-60 minutes", value: "30_60_minutes" },
                    { label: "Half day", value: "half_day" },
                    { label: "One day", value: "one_day" },
                    { label: "Two days", value: "two_days" },
                    { label: "One week", value: "one_week" },
                    {
                      label: "More than one week",
                      value: "more_than_one_week",
                    },
                  ]}
                  name="duration"
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
                <DateAndtime from={from} setState={setState} />
                <PersonLimit />
                <TicketQuantity isOne={isOne} />
                <FromTagInput name="tags" label="Tags" className="py-2" />
              </>
            ) : (
              from.watch("delivery_type") === "ondemand" && (
                <>
                  <LocationDroupDown />
                  <DateAndtime from={from} setState={setState} />
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
                .includes(helpers.lowerCase(searchText))
            )
            ?.map((item, idx) => (
              <label key={idx} className="flex items-center gap-3">
                <Checkbox
                  checked={from
                    .watch("holistic")
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
        />
      </Modal>
    </div>
  );
}
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
const TimeSelect = ({ selectedTimes, setSelectedTimes, setState }: any) => {
  const [newTime, setNewTime] = useState("12:00");
  const [error, setError] = useState("");

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  };

  const handleAddTime = () => {
    if (!newTime) {
      setError("Please select a time");
      return;
    }

    if (selectedTimes.includes(newTime)) {
      setError("This time is already selected");
      return;
    }

    setSelectedTimes((prev: any) => [...prev, newTime].sort());
    setNewTime("12:00");
    setError("");
  };

  const handleRemoveTime = (time: string) => {
    setSelectedTimes((prev: any) => prev.filter((t: any) => t !== time));
  };

  const handleSave = () => {
    selectedTimes.map(formatTime);
    setState("istime", false);
  };

  return (
    <div>
      <div className="mb-8">
        <div>
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="h-10"
              />
            </div>
            <Button onClick={handleAddTime}>Add</Button>
          </div>
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-sm font-medium text-black mb-4">
          Selected times ({selectedTimes.length})
        </h2>
        {selectedTimes.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {selectedTimes.map((time: any) => (
              <div
                key={time}
                className="flex items-center gap-3 bg-figma-delete px-4 py-2 rounded-full border"
              >
                <span className="text-sm font-medium text-article">
                  {formatTime(time)}
                </span>
                <button
                  onClick={() => handleRemoveTime(time)}
                  className="text-figma-black cursor-pointer transition-colors p-0.5"
                  aria-label={`Remove ${formatTime(time)}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm italic">No times selected yet</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Button
          onClick={() => setState("istime", false)}
          className="bg-[#ededed] text-figma-black"
        >
          {" "}
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
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

// ----------------- date otp -------------------
const DateAndtime = ({ from, setState }: any) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SingleCalendar
        onChange={(value: any) => {
          from.setValue("date", value);
        }}
        className="h-10 text-black"
      />
      <Button
        onClick={() => setState("istime", true)}
        type="button"
        className="flex h-10   bg-transparent border text-black font-normal justify-between items-center"
      >
        <span>Create time slot</span> <ChevronRight />
      </Button>
    </div>
  );
};

// --------------- person limit ---------------------
const PersonLimit = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="h-10 flex items-center justify-between px-2 border rounded-md">
        <FromInput
          name="minilimit"
          className="w-[100px] h-10 bg-transparent p-0"
          type="number"
        />
        <span>-minimum person limit-</span>
      </div>
      <div className="h-10 flex items-center justify-between px-2 border rounded-md">
        <FromInput
          name="maxlimit"
          className="w-[100px] h-10 bg-transparent p-0"
          type="number"
        />
        <span>-maximum person limit-</span>
      </div>
    </div>
  );
};

// -------------- ticket quantity ---------------
const TicketQuantity = ({ isOne }: any) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="h-10 flex items-center justify-between px-2 border rounded-md">
        <span className="flex items-center">
          <FavIcon className="size-5" name="tiket" />
          <span className="ml-1"> Ticket quantity</span>
        </span>
        <FromInput
          name="tiket"
          className="w-[100px] h-10 text-end bg-transparent p-0"
          type="number"
          placeholder="quantity hare"
          readOnly={isOne}
        />
      </div>
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
        />
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
        : [...prev, option]
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
