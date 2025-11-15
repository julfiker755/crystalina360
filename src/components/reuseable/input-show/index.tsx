import { Label } from "@/components/ui";
import { cn } from "@/lib";

interface InputShowProps {
  stylelabel?: string;
  label: string;
  value?: string;
  items?: any;
  className?: string;
}

//  ========== InputShow ===========
export function InputShow({
  stylelabel,
  label,
  value,
  className,
}: InputShowProps) {
  return (
    <div className="relative">
      <div
        className={cn(
          "h-12 flex text-figma-a_gray items-center px-4 w-full  border rounded-md",
          className
        )}
      >
        {value}
      </div>
      <Label
        className={cn(
          "text-blacks text-base font-medium bg-background absolute -top-3 left-5 px-3",
          stylelabel
        )}
      >
        {label}
      </Label>
    </div>
  );
}

// ====== TextAreaShow ========
export function TextAreaShow({ stylelabel, label, value }: InputShowProps) {
  return (
    <div className="relative">
      <div className="h-auto text-figma-a_gray py-2 flex items-center px-4 w-full  border rounded-md">
        {value}
      </div>
      <Label
        className={cn(
          "text-blacks text-base font-medium bg-background absolute -top-3 left-5 px-3",
          stylelabel
        )}
      >
        {label}
      </Label>
    </div>
  );
}
// ====== TextAreaShow ========
export function BadgeShow({ stylelabel, label, items }: InputShowProps) {
  return (
    <div className="relative">
      <div className="h-12 text-figma-a_gray space-x-3 py-2 flex items-center px-4 w-full  border rounded-md">
        {items?.map((item: any, idx: any) => (
          <div key={idx} className="bg-figma-delete px-3 text-sm rounded-full">
            {item}
          </div>
        ))}
      </div>
      <Label
        className={cn(
          "text-blacks text-base font-medium bg-background absolute -top-3 left-5 px-3",
          stylelabel
        )}
      >
        {label}
      </Label>
    </div>
  );
}
