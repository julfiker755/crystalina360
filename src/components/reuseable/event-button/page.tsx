import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Modal from "../modal";
import { Button, Label } from "@/components/ui";
import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib";
import { useRouter } from "next/navigation";

interface eventButtonProps {
  selectEvent: any;
  setSelectEvent: any;
  handleSubmitEvent?: any;
  icon?: boolean;
  className?: string;
  eventOptions?: any;
}

export default function EventButton({
  selectEvent,
  setSelectEvent,
  icon = false,
  className,
  eventOptions,
}: eventButtonProps) {
  const [isStore, setIsStore] = useState(false);
  const [isPath, setIsPath] = useState("");
  const router = useRouter();
  return (
    <div className="z-10">
      <Button
        onClick={() => setIsStore(!isStore)}
        className={cn("z-10! text-white mt-3 lg:mt-0", className)}
        size="lg"
      >
        {icon && <Plus />}
        Create New Event
      </Button>
      {/*  ============ modal =========== */}
      <Modal
        title="Select Event Type"
        titleStyle="text-center"
        open={isStore}
        setIsOpen={setIsStore}
      >
        <RadioGroup
          value={selectEvent}
          onValueChange={(v) => setSelectEvent(v)}
        >
          {eventOptions.map((option: any) => (
            <div
              key={option.id}
              onClick={() => {
                setIsPath(option.path);
              }}
              className="border rounded-lg"
            >
              <div className="flex items-center px-2 py-4 gap-4">
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="border-primary cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-primary border"
                />
                <Label
                  htmlFor={option.id}
                  className="cursor-pointer  flex flex-col items-start"
                >
                  <h3 className="text-lg leading-3 font-semibold text-foreground">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {option.description}
                  </p>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
        <Button
          className="w-full mt-4"
          onClick={() => {
            setIsStore(false);
            router.push(isPath);
          }}
          disabled={selectEvent === ""}
        >
          Next
        </Button>
      </Modal>
    </div>
  );
}
