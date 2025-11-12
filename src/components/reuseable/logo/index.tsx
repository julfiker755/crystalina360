import assets from "@/assets";
import { cn } from "@/lib";

export default function Logo({ className }: any) {
  return (
    <picture>
      <img src={assets.logo.src} alt="logo" className={cn("w-32", className)} />
    </picture>
  );
}
