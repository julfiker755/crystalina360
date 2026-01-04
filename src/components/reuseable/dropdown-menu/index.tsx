import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib";

interface DropdownBoxProps {
  label: string;
  menuItems: any[];
  onChange?: (item: string) => void;
  btnStyle?: string;
  className?: string;
}

export function DropdownBox({
  label,
  menuItems,
  onChange,
  btnStyle,
  className,
}: DropdownBoxProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "bg-white font-medium text-figma-black border rounded-full",
            btnStyle
          )}
        >
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn("w-40 mr-5", className)} align="start">
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => onChange?.(item?.toLocaleLowerCase())}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
