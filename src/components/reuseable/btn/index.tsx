import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { cn } from "@/lib";

interface DeleteBtnProps {
  onClick?: () => void;
  className?: string;
}

//  =========  DeleteBtn ========
export function DeleteBtn({ onClick, className }: DeleteBtnProps) {
  return (
    <Button
      className={cn("bg-figma-delete size-10", className)}
      onClick={onClick}
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
