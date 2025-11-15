"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui";
import ColorPicker from "react-best-gradient-color-picker";
import { useRef, useState, useEffect } from "react";
import tinycolor from "tinycolor2";

export default function FromColorPicker() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [color, setColor] = useState("");
  const [width, setWidth] = useState<number>(0);

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
    <Popover>
      <PopoverTrigger asChild>
        <Button ref={buttonRef} variant="outline" className="w-full">
          {/* Open popover */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-hidden" style={{ width }}>
        <ColorPicker
          hideInputs
          hideControls
          hideColorTypeBtns
          hidePresets
          hideAdvancedSliders
          hideColorGuide
          hideInputType
          hideGradientType
          hideGradientAngle
          hideGradientStop
          hideGradientControls
          width={width}
          height={200}
          value={color}
          onChange={(color) => {
            const hexValue = tinycolor(color).toHexString();
            setColor(hexValue);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
