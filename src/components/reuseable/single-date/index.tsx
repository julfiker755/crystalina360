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

export function SingleCalendar({ onChange, className, defaultDate }: any) {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    setStartDate(selectedDate);
    setOpen(false); // Close popover after selecting

    // Pass selected date to parent
    onChange?.(selectedDate);
  };


  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            className={cn(
              "bg-white justify-between text-primary px-2! font-normal border",
              className
            )}
          >
            <span>
              {startDate
                ? helpers.formatDate(startDate, "YYYY-MM-DD")
                : defaultDate || "-Select Date-"}
            </span>
            <span className="bg-white p-1.5  rounded-full ml-2 lg:ml-10">
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
            // className="in-data-[slot=popover-content]:bg-background text-white"
            // classNames={{
            //   button_previous:
            //     "cursor-pointer size-8 grid place-items-center rounded-md bg-[#575757]/20 text-white",
            //   button_next:
            //     "cursor-pointer size-8 grid place-items-center rounded-md bg-[#575757]/20 text-white",
            // }}
            onSelect={handleSelectDate}
            disabled={(date: Date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
