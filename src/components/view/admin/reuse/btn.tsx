import FavIcon from "@/icon/favIcon";
import { cn } from "@/lib";

export function AEditbtn({ onClick, className, color = "#303030" }: any) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-full cursor-pointer  size-10 grid place-items-center border",
        className,
      )}
    >
      <FavIcon color={color} name="pencil00" />
    </div>
  );
}

export function ADeletebtn({ onClick, className }: any) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-full cursor-pointer size-10 grid place-items-center bg-figma-danger",
        className,
      )}
    >
      {" "}
      <FavIcon color="#ffff" className="size-4" name="delete_two" />
    </div>
  );
}
