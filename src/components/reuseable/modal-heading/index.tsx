import { CloseIcon } from "@/components/view/common/btn-modal";
import { cn } from "@/lib";

interface ModalHeadingProps {
  title: string;
  onClose: () => void;
  className?: string;
  iconStyle?: string;
  mainStyle?: string;
}

export default function ModalHeading({
  title,
  onClose,
  className,
  iconStyle,
  mainStyle,
}: ModalHeadingProps) {
  return (
    <div className={cn("mb-11", mainStyle)}>
      <div
        className={cn(
          "bg-primary absolute flex flex-col items-center justify-center top-0 h-12 w-full left-0  text-white",
          className,
        )}
      >
        <h5 className="text-lg font-medium leading-0 text-center">{title}</h5>
        <CloseIcon
          className={cn("top-3 right-3", iconStyle)}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
