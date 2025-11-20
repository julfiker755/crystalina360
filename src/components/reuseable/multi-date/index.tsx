"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, helpers } from "@/lib";
import { CalendarDays } from "lucide-react";

export function MultipleCalendar({ onChange, className }: any) {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    let newStartDate = startDate;
    let newEndDate = endDate;

    if (!startDate) {
      // If no start date is selected, set the start date
      newStartDate = selectedDate;
      newEndDate = undefined; // Reset end date when selecting new start
    } else if (!endDate) {
      // If there's a start date but no end date
      if (selectedDate > startDate) {
        // Selected date is after start date, set as end date
        newEndDate = selectedDate;
        setOpen(false); // Close popover after selecting end date
      } else {
        // Selected date is before or same as start date, reset range
        newStartDate = selectedDate;
        newEndDate = undefined;
      }
    } else {
      // Both dates are selected, start a new range
      newStartDate = selectedDate;
      newEndDate = undefined;
    }

    // Update the state
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    // Log the selected dates with proper formatting

    // Update the parent component with the selected dates
    onChange({ startDate: newStartDate, endDate: newEndDate });
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn(
              "bg-white justify-between text-primary px-2! font-normal border",
              className
            )}
          >
            {startDate ? `${helpers.formatDate(startDate)}` : "Start Date"} -{" "}
            {endDate ? `${helpers.formatDate(endDate)}` : "End Date"}
            <span className="p-1.5  rounded-full ml-2 lg:ml-10">
              <CalendarDays className="text-primary size-5" />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden bg-figma-gray p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={startDate}
            numberOfMonths={2}
            onSelect={handleSelectDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
