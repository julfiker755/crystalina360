"use client";
import { Button, Input } from "@/components/ui";
import { X } from "lucide-react";
import React, { useState } from "react";

export default function TimeSelect({
  selectedTimes,
  setSelectedTimes,
  setState,
  from,
}: any) {
  const [newTime, setNewTime] = useState("12:00");
  const [error, setError] = useState("");

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  };

  const convertToRomeTime = (time: string) => {
    const date = new Date();
    const [hours, minutes] = time.split(":");
    date.setHours(parseInt(hours), parseInt(minutes));

    // Fixed: Added hour12: true to explicitly show AM/PM
    const options: any = {
      timeZone: "Europe/Rome",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // This ensures AM/PM is displayed
    };
    const romeTime = new Intl.DateTimeFormat("en-US", options).format(date);

    return romeTime;
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

    setSelectedTimes((prev: any) => [...prev, newTime]);
    setNewTime("12:00");
    setError("");
  };

  const handleRemoveTime = (time: string) => {
    setSelectedTimes((prev: any) => prev.filter((t: any) => t !== time));
  };

  const handleSave = () => {
    from.setValue("event_time", selectedTimes.map(convertToRomeTime));
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
}
