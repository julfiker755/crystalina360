import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Modal from "../modal";
import { Button, Label } from "@/components/ui";
import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib";

const eventOptions = [
  {
    id: "onetoone",
    title: "One to One",
    description:
      "A private event designed for personal interaction and focused discussion between two individuals.",
  },
  {
    id: "group",
    title: "Group",
    description:
      "An exclusive gathering with a set number of participants, ensuring closer connections and meaningful engagement.",
  },
  {
    id: "retreat",
    title: "Retreat",
    description:
      "An immersive event. It can only be o line (therefore, it cannot be online or on demand). ",
  },
];

interface eventButtonProps {
  selectEvent: any;
  setSelectEvent: any;
  handleSubmitEvent: any;
  icon?: boolean;
  className?: string;
}

export default function EventButton({
  selectEvent,
  setSelectEvent,
  handleSubmitEvent,
  icon = false,
  className,
}: eventButtonProps) {
  const [isStore, setIsStore] = useState(false);
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
          {eventOptions.map((option) => (
            <div key={option.id} className="border rounded-lg">
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
            handleSubmitEvent();
          }}
          disabled={selectEvent === ""}
        >
          Next
        </Button>
      </Modal>
    </div>
  );
}
