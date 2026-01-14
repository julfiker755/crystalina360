"use client";
import { Button } from "@/components/ui";
import React, { useState } from "react";
import { helpers } from "@/lib";
import { X } from "lucide-react";
import { SingleCalendar } from "@/components/reuseable/single-date";

export default function MultiDate({
  selectDate,
  setSelectDate,
  from,
  setState,
}: any) {
  const [error, setError] = useState<string>("");
  const [newDate, setNewDate] = useState<string>();

  const handleAddDate = () => {
    if (!newDate) {
      setError("Please select a date");
      return;
    }

    if (selectDate.includes(newDate)) {
      setError("This date is already selected");
      return;
    }

    setSelectDate((prev: string[]) => [...prev, newDate].sort());
    setError("");
  };

  const handleRemoveDate = (date: string) => {
    setSelectDate((prev: string[]) => prev.filter((d) => d !== date));
  };

  const handleSave = () => {
    setState("isDate", false);
    from.setValue("event_date", selectDate);
  };

  const handleDateChange = (value: any) => {
    const formattedDate = helpers.formatDate(value, "YYYY-MM-DD");
    setNewDate(formattedDate);
    setError(""); // Clear error if date is selected
  };
  return (
    <div>
      <div className="mb-8">
        <div>
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <SingleCalendar
                onChange={handleDateChange}
                className="h-10 text-black"
              />
            </div>
            <Button onClick={handleAddDate}>Add</Button>
          </div>
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-sm font-medium text-black mb-4">
          Selected dates ({selectDate.length})
        </h2>
        {selectDate.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {selectDate.map((date: string) => (
              <div
                key={date}
                className="flex items-center gap-3 bg-figma-delete px-4 py-2 rounded-full border"
              >
                <span className="text-sm font-medium text-article">{date}</span>
                <button
                  onClick={() => handleRemoveDate(date)}
                  className="text-figma-black cursor-pointer transition-colors p-0.5"
                  aria-label={`Remove ${date}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm italic">No dates selected yet</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Button
          onClick={() => setState("isDate", false)}
          className="bg-[#ededed] text-figma-black"
        >
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}
