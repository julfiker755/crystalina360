"use client";
import { useState } from "react";
import { ScrollArea } from "@/components/ui";
import { cn } from "@/lib";
import { DeleteBtn } from "../btn";
import { useAllBenefitsQuery } from "@/redux/api/admin/addonApi";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function FromBenefits({
  onChange,
  scroll = true,
  className,
  label,
}: {
  onChange: (newService: string[]) => void;
  scroll?: boolean;
  className?: string;
  label: string;
}) {
  const { data: benefits } = useAllBenefitsQuery({});
  const options = benefits?.data || [];

  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);

  const handleSelectBenefit = (benefit: string) => {
    if (selectedBenefits.includes(benefit)) {
      setSelectedBenefits(selectedBenefits.filter((item) => item !== benefit));
    } else {
      setSelectedBenefits([...selectedBenefits, benefit]);
    }
    onChange(selectedBenefits);
  };

  const handleDeleteOptions = (index: number) => {
    const updated = selectedBenefits.filter((_, i) => i !== index);
    setSelectedBenefits(updated);
    onChange(updated);
  };

  console.log(selectedBenefits);

  return (
    <div className={`${className}`}>
      <div className="flex space-x-2 relative">
        <div className="text-blacks text-base font-medium bg-background absolute -top-3 left-5 px-3">
          {label}
        </div>
      </div>

      <ScrollArea className={scroll && selectedBenefits.length > 2 ? "h-[100px] mt-3" : ""}>
        <div className={`mt-3 ${scroll && selectedBenefits.length > 2 ? "space-y-2 mr-4" : "space-y-2"}`}>
          {/* Select Dropdown instead of checkboxes */}
          <Select
            value={selectedBenefits}
            onValueChange={(value) => {
              setSelectedBenefits(value);
              onChange(value); // Make sure to update the parent component
            }}
            multiple // Allow multiple selection
          >
            <SelectTrigger className="w-full items-center rounded-xl py-5 cursor-pointer shadow-none">
              <SelectValue placeholder="Select Benefits" />
            </SelectTrigger>
            <SelectContent className="rounded-md p-0">
              <SelectGroup className="p-0 m-0">
                {options?.map((benefit: any, index: any) => (
                  <SelectItem
                    className={cn("border-b last:border-b-0 cursor-pointer py-2 pl-4 rounded-none")}
                    key={index}
                    value={benefit.id}
                  >
                    <span className="flex justify-center items-center">
                      {benefit.title}
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </ScrollArea>

      {/* Display selected benefits below the dropdown */}
      {selectedBenefits?.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedBenefits?.map((benefit, index) => {
            const selectedBenefit = options?.find(option => option.id === benefit);
            return selectedBenefit ? (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <span>{selectedBenefit.title}</span>
                <DeleteBtn onClick={() => handleDeleteOptions(index)} />
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}
