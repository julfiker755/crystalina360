"use client";
import { FromInput } from "@/components/reuseable/form-input";
import { FromInput2 } from "@/components/reuseable/form-input2";
import Form from "@/components/reuseable/from";
import { FromSelect2 } from "@/components/reuseable/from-select2";
import { FromTagInput } from "@/components/reuseable/from-tag";
import { FromTextarea2 } from "@/components/reuseable/from-textarea2";
import Modal from "@/components/reuseable/modal";
import SearchBox from "@/components/reuseable/search-box";
import { SingleCalendar } from "@/components/reuseable/single-date";
import { Button, Checkbox, Input } from "@/components/ui";
import { disciplineItem } from "@/components/view/oparator/dummy-json";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import AlertDiscard from "@/components/view/oparator/simple/alert-discard";
import { useModalState } from "@/hooks";
import { useFileUpload } from "@/hooks/useFileUpload";
import FavIcon from "@/icon/favIcon";
import { helpers } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowRight, ChevronRight, Clock, Upload, X } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const initialState = {
  holistic: false,
  istime: false,
};

export default function EventStore() {
  const [searchText, setSearchText] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [accessibility, setAccessibility] = useState(false);
  const [state, setState] = useModalState(initialState);
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
    },
  });
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });
  const [tags, setTags] = useState([
    "Tag 1",
    "Tag 1",
    "Tag 1",
    "Tag 1",
    "Tag 1",
  ]);

  const [attendees, setAttendees] = useState([
    "example@gmail.com",
    "example@gmail.com",
  ]);

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values: FieldValues) => {
    // quantity 3
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

  console.log(selectedTimes);

  return (
    <div className="container py-10">
      <SvgBox>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <h2>Creating One to one event</h2>
          </div>
          <AlertDiscard>
            <Button className="z-10" variant="destructive">
              <X />
              Discard
            </Button>
          </AlertDiscard>
        </div>
      </SvgBox>
      <Form className="py-15" from={from} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* Image Upload */}
            <div className="border-2 border-dashed border-primary rounded-lg p-12 flex flex-col items-center justify-center min-h-64 ">
              <FavIcon name="upload2" />
              <p className="text-center mt-2 text-figma-black">
                Upload event banner image
              </p>
            </div>

            {/* === Delivery Type ==*/}
            <div>
              <label className="block text-lg mb-2 font-semibold">
                Select Delivery Type
              </label>
              <div className="flex gap-3">
                {[
                  { value: "offline", label: "Offline", icon: "offline" },
                  { value: "online", label: "Online", icon: "online" },
                  { value: "ondemand", label: "On demand", icon: "ondemand" },
                ].map((item) => (
                  <Button
                    key={item.value}
                    onClick={() => {
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

            {/* Location Dropdowns */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700">
                <option>-select country-</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700">
                <option>-region-</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700">
                <option>-province-</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700">
                <option>-city-</option>
              </select>
            </div>

            {/* Date and Time Slot */}
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

            {/* Person Limits */}
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

            {/* Ticket Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-10 flex items-center justify-between px-2 border rounded-md">
                <span className="flex items-center">
                  <FavIcon className="size-5" name="tiket" />
                  <span className="ml-1"> Ticket quantity</span>
                </span>
                <span>2</span>
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

            {/* Event Duration */}
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
                { label: "More than one week", value: "more_than_one_week" },
              ]}
              name="duration"
              placeholder="-Select duration-"
              className="rounded-md"
            />

            {/* Accessibility */}
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold">Accessibilities</label>
              <div className="flex items-center gap-3">
                <span className="text-gray-600">No</span>
                <button
                  onClick={() => setAccessibility(!accessibility)}
                  className={`relative inline-flex cursor-pointer h-6 w-11 items-center rounded-full transition-colors ${
                    accessibility ? "bg-primary" : "bg-[#79747E]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      accessibility ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className=" text-figma-black">Yes</span>
              </div>
            </div>
            <FromTagInput name="tags" label="Tags" className="py-2" />

            {/* Attendees */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Attendees
              </label>
              <div className="flex items-center gap-3 mb-4">
                {attendees.map((email, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white text-xs font-medium">
                      {email[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-600">{email}</span>
                  </div>
                ))}
                <Button className="ml-auto bg-amber-700 hover:bg-amber-800 text-white rounded-lg px-6">
                  Invite
                </Button>
              </div>
            </div>

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
          time={10}
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
