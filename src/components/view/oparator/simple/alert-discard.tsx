import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { childrenProps } from "@/types";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AlertDiscard({ children }: childrenProps) {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-xs py-6">
        <AlertDialogHeader>
          <div className="size-14 bg-figma-danger rounded-full mx-auto grid place-items-center">
            <X className="text-white" />
          </div>
          <AlertDialogTitle className="text-center text-2xl">
            Are you sure to discard ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            No changes will be saved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-center">
          <AlertDialogCancel className="bg-figma-delete hover:bg-figma-delete h-10">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => router.back()}
            className="bg-figma-danger text-white h-10"
          >
            Discard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
