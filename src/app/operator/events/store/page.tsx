"use client";
import Form from "@/components/reuseable/from";
import { Button } from "@/components/ui";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import AlertDiscard from "@/components/view/oparator/simple/alert-discard";
import { useFileUpload } from "@/hooks/useFileUpload";
import FavIcon from "@/icon/favIcon";
import { zodResolver } from "@hookform/resolvers/zod";

import { Clock, Upload, X } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function EventStore() {
  const from = useForm({
    // resolver: zodResolver(sign_In),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });
  const [deliveryType, setDeliveryType] = useState("offline");
  const [eventPurpose, setEventPurpose] = useState("experiential");
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [tags, setTags] = useState([
    "Tag 1",
    "Tag 1",
    "Tag 1",
    "Tag 1",
    "Tag 1",
  ]);
  const [accessibility, setAccessibility] = useState(false);
  const [attendees, setAttendees] = useState([
    "example@gmail.com",
    "example@gmail.com",
  ]);

  const toggleDiscipline = (discipline: string) => {
    setDisciplines((prev) =>
      prev.includes(discipline)
        ? prev.filter((d) => d !== discipline)
        : [...prev, discipline]
    );
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };
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
        <div className="grid grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* Image Upload */}
            <div className="border-2 border-dashed border-primary rounded-lg p-12 flex flex-col items-center justify-center min-h-64 ">
              <FavIcon name="upload2" />
              <p className="text-center mt-2 text-figma-black">
                Upload event banner image
              </p>
            </div>

            {/* Delivery Type */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Select delivery type
              </label>
              <div className="flex gap-3">
                {[
                  { id: "offline", label: "Offline", icon: "offline" },
                  { id: "online", label: "Online", icon: "online" },
                  { id: "ondemand", label: "On demand", icon: "ondemand" },
                ].map((type) => (
                  <Button
                    key={type.id}
                    onClick={() => setDeliveryType(type.id)}
                    className={`font-normal ${
                      type.id == deliveryType
                        ? "bg-primary text-white"
                        : "bg-transparent border"
                    }`}
                  >
                    <FavIcon
                      color={type.id == deliveryType ? "#fff" : undefined}
                      name={type.icon as any}
                    />
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Event Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-4">
                Select event purpose
              </label>
              <div className="flex gap-3">
                {[
                  { id: "educational", label: "Educational" },
                  { id: "experiential", label: "Experiential" },
                  { id: "mixed", label: "Mixed" },
                ].map((purpose) => (
                  <button
                    key={purpose.id}
                    onClick={() => setEventPurpose(purpose.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      eventPurpose === purpose.id
                        ? "bg-amber-700 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {purpose.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Holistic Discipline */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Holistic Discipline
                </label>
                <button className="text-sm text-amber-700 hover:text-amber-800">
                  Select 1 or more
                </button>
              </div>
              <div className="space-y-3">
                {[
                  "13th Octave LaHoChi",
                  "Aboriginal Brush Medicine",
                  "Access Bars Therapy",
                  "Access Body Processes",
                  "Acupressure",
                  "Acupuncture",
                  "Akashic Healing",
                  "Akashic Records",
                  "Alexander Technique",
                  "Alternative Medicine",
                  "Angelic Light",
                  "Animal Healing",
                ].map((discipline) => (
                  <label key={discipline} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={disciplines.includes(discipline)}
                      onChange={() => toggleDiscipline(discipline)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{discipline}</span>
                  </label>
                ))}
                <button className="text-sm text-amber-700 hover:text-amber-800 font-medium">
                  +more
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Event title
              </label>
              <input
                type="text"
                placeholder="Enter your event title here"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter your event description here"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 resize-none"
              />
            </div>

            {/* Location Dropdowns */}
            <div className="grid grid-cols-4 gap-3">
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Select date
                </label>
                <input
                  type="text"
                  placeholder="Select date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Create time slot
                </label>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center justify-between">
                  <span className="text-gray-600">Time slot</span>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>

            {/* Person Limits */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  1{" "}
                  <span className="text-gray-500">-minimum person limit-</span>
                </label>
                <input
                  type="number"
                  defaultValue="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  2{" "}
                  <span className="text-gray-500">-maximum person limit-</span>
                </label>
                <input
                  type="number"
                  defaultValue="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>
            </div>

            {/* Ticket Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-lg">🎫</span> Ticket quantity
                </label>
                <input
                  type="number"
                  defaultValue="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-lg">💰</span> Ticket Price
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>
            </div>

            {/* Event Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" /> -Select event duration-
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700">
                <option>Select duration</option>
              </select>
            </div>

            {/* Accessibility */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-900">
                Accessibilities
              </label>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">No</span>
                <button
                  onClick={() => setAccessibility(!accessibility)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    accessibility ? "bg-amber-700" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      accessibility ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-600">Yes</span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(index)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Type & hit enter"
                  className="px-3 py-1 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>
            </div>

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
            <Button className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-lg font-medium">
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
