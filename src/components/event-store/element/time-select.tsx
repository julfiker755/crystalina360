"use client";
import { Button, Input } from "@/components/ui";
import { helpers } from "@/lib";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export default function TimeSelect({
  selectedTimes,
  setSelectedTimes,
  setState,
  from,
}: any) {
  const t = useTranslations("oprator.evStoreAll.store");
  const [newTime, setNewTime] = useState("12:00");
  const [error, setError] = useState("");

  const formatTime = (time24: string) => {
    return helpers.planTime(time24);
  };

  // new Date().toISOString

  const handleAddTime = () => {
    if (!newTime) {
      setError(t("please_select_time"));
      return;
    }

    if (selectedTimes.includes(newTime)) {
      setError(t("time_is_already_selected"));
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
    from.setValue("event_time", selectedTimes);
    console.log(selectedTimes);
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
          {t("selected_times")} ({selectedTimes.length})
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
          <p className="text-slate-500 text-sm italic">
            {t("no_times_selected_yet")}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Button
          onClick={() => setState("istime", false)}
          className="bg-[#ededed] text-figma-black"
        >
          {" "}
          {t("cancel")}
        </Button>
        <Button onClick={handleSave}>{t("save")}</Button>
      </div>
    </div>
  );
}
