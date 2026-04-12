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
  ColorPickerSelection,
} from "@/components/ui";

type Props = {
  label?: string;
  color?: string;
  setColor: (color: string) => void;
  defaultColor?: string;
};

export default function FromColorPicker({
  label = "Color",
  color,
  setColor,
  defaultColor = "#A68B7C", // ✅ fallback default
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [width, setWidth] = useState<number>(0);

  // ✅ internal state (always valid color)
  const [internalColor, setInternalColor] = useState(
    color || defaultColor
  );

  // ✅ sync when parent changes
  useEffect(() => {
    if (color) {
      setInternalColor(color);
    }
  }, [color]);

  // ✅ dynamic width
  useEffect(() => {
    const updateWidth = () => {
      if (buttonRef.current) {
        setWidth(buttonRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // ✅ handle color change
  const handleChange = (newColor: string) => {
    setInternalColor(newColor);
    setColor(newColor);
  };

  return (
    <div className="space-y-2">
      <h5 className="text-base font-medium">{label}</h5>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            variant="outline"
            className="w-full h-10 flex items-center justify-between px-3 rounded-md border"
            style={{ backgroundColor: internalColor }}
          >
            {/* ✅ HEX preview */}
            <span className="text-xs font-mono text-white/90 mix-blend-difference">
              {internalColor}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="overflow-hidden p-3" style={{ width }}>
          <ColorPicker
            value={internalColor} // ✅ controlled
            onChange={(c) => handleChange(c as string)}
            className="h-[300px] w-full"
          >
            <ColorPickerSelection />

            <div className="flex items-center gap-4 mt-2">
              <ColorPickerEyeDropper />
              <div className="grid w-full gap-1">
                <ColorPickerHue />
                <ColorPickerAlpha />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <ColorPickerFormat />
            </div>
          </ColorPicker>
        </PopoverContent>
      </Popover>
    </div>
  );
}