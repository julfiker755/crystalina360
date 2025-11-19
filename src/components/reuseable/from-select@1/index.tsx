import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { cn } from "@/lib";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext, Controller, FieldValues } from "react-hook-form";

interface Option {
  value: string | number;
  label: string;
}

interface FormSelect2Props {
  className?: string;
  name: string;
  options?: Option[];
  placeholder?: string;
  setSelectValue?: (item: Option) => void;
  label?: string;
  isSearch?: boolean;
}

export const FormSelDropdown: React.FC<FormSelect2Props> = ({
  className,
  name,
  options = [],
  placeholder = "Search here",
  setSelectValue,
  label,
  isSearch = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FieldValues>();
  const [selectOpen, setSelectOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const popoverRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (options.length) setIsReady(true);
  }, [options]);

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedValue = field.value;
          const selectedLabel = selectedValue
            ? options.find((item) => item.value === selectedValue)?.label
            : label;

          const sortedOptions = options
            .map((item) => ({
              ...item,
              isSelected: item.value === selectedValue,
            }))
            .sort((a, b) => (a.isSelected ? -1 : b.isSelected ? 1 : 0));

          const handleSelect = (value: string | number, item: Option) => {
            field.onChange(value);
            setSelectValue && setSelectValue(item);
            setSelectOpen(false);
          };

          return (
            <Popover open={selectOpen} onOpenChange={setSelectOpen}>
              <PopoverTrigger asChild>
                <Button
                  ref={popoverRef}
                  variant="outline"
                  role="combobox"
                  aria-expanded={selectOpen}
                  className={cn(
                    `w-full h-10 hover:bg-transparent font-normal justify-between`,
                    className
                  )}
                  onClick={() => setSelectOpen(!selectOpen)}
                >
                  {selectedLabel || label}
                  <ChevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0"
                style={{
                  width: popoverRef.current
                    ? `${popoverRef.current.offsetWidth}px`
                    : "auto",
                }}
              >
                {isReady ? (
                  <Command>
                    {isSearch && <CommandInput placeholder={placeholder} />}
                    <CommandList>
                      <CommandEmpty>No Data Found</CommandEmpty>
                      <CommandGroup>
                        {sortedOptions.map((item) => (
                          <CommandItem
                            key={item.value}
                            onSelect={() => handleSelect(item.value, item)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedValue === item.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {item.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                ) : (
                  <div className="p-4">No Data Found</div>
                )}
              </PopoverContent>
            </Popover>
          );
        }}
      />
      {errors[name]?.message && (
        <h3 className="text-sm pt-px text-end text-red-400 flex gap-1 items-center justify-end">
          {errors[name]?.message as string}
          <Check size={14} className="text-red-400" />
        </h3>
      )}
    </div>
  );
};
