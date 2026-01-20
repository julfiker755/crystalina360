import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { cn } from "@/lib";

interface DeleteBtnProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

//  =========  DeleteBtn ========
export function DeleteBtn({
  onClick,
  className,
  disabled = false,
}: DeleteBtnProps) {
  return (
    <Button
      className={cn("bg-figma-delete size-10", className)}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <FavIcon className="size-4" name="delete_a" />
    </Button>
  );
}

// =======  EditBtn =======
export function EditBtn({ onClick, className }: DeleteBtnProps) {
  return (
    <Button
      className={cn("bg-figma-delete size-10", className)}
      onClick={onClick}
    >
      <FavIcon name="pencil00" />
    </Button>
  );
}
// =======  previewbtn =======
export function PreviewBtn({ onClick, className }: DeleteBtnProps) {
  return (
    <Button
      className={cn("bg-figma-delete size-10", className)}
      onClick={onClick}
    >
      <FavIcon className="size-5" name="preview" />
    </Button>
  );
}

export function UploadBtn({ className }: any) {
  return (
    <div
      className={cn(
        "size-10 grid place-items-center cursor-pointer absolute rounded-md bg-white/20 backdrop-blur-[20px] right-4 top-4",
        className,
      )}
    >
      <FavIcon name="upload22" />
    </div>
  );
}
