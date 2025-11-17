"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui";
import { useRef, useState, useEffect } from "react";
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "@/components/ui";

export default function FromColorPicker({ label, defaultColor = "" }: any) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [color, setColor] = useState<string>(defaultColor);

  // Dynamically get button width
  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (buttonRef.current) {
        setWidth(buttonRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <h5 className="text-blacks text-base font-medium ml-2">{label}</h5>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            variant="outline"
            style={{
              backgroundColor: color,
            }}
            className="w-full rounded-md border"
          ></Button>
        </PopoverTrigger>
        <PopoverContent className="overflow-hidden" style={{ width }}>
          <ColorPicker
            onChange={(color) => setColor(color as any)}
            className="h-[300px] w-full"
            defaultValue="#6366F1"
          >
            <ColorPickerSelection />
            <div className="flex items-center gap-4">
              <ColorPickerEyeDropper />
              <div className="grid w-full gap-1">
                <ColorPickerHue />
                <ColorPickerAlpha />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ColorPickerFormat />
            </div>
          </ColorPicker>
        </PopoverContent>
      </Popover>
    </div>
  );
}
