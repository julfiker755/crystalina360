"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  Button,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState, ReactNode } from "react";
import sucessImg from "@/assets/sucess.gif";
import { ImgBox } from "@/components/reuseable/Img-box";

/* =======================
   ✅ Types
======================= */

interface SuccessDialogState {
  open: boolean;
  title: string;
  subTitle?: string;
  description: string;
  className?: string;
  titleStyle?: string;
  descriptionStyle?: string;
}

type SuccessDialogOptions = Partial<Omit<SuccessDialogState, "open">>;

interface SuccessDialogContextType {
  open: (options?: SuccessDialogOptions) => Promise<boolean>;
}

interface SuccessDialogProviderProps {
  children: ReactNode;
}

/* =======================
   ✅ Default State
======================= */

const initialDialogState: SuccessDialogState = {
  open: false,
  title: "Successful!",
  description: "Operation completed successfully.",
  className: "",
  titleStyle: "",
  descriptionStyle: "",
};

/* =======================
   ✅ Context
======================= */

const SuccessDialogContext = createContext<
  SuccessDialogContextType | undefined
>(undefined);

/* =======================
   ✅ Provider
======================= */

export const SuccessDialogProvider = ({
  children,
}: SuccessDialogProviderProps) => {
  const [modalState, setModalState] =
    useState<SuccessDialogState>(initialDialogState);

  const open = (options: SuccessDialogOptions = {}): Promise<boolean> => {
    return new Promise((resolve) => {
      setModalState({ ...initialDialogState, ...options, open: true });
    });
  };

  const close = () =>
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));

  return (
    <SuccessDialogContext.Provider value={{ open }}>
      {children}

      <Dialog open={modalState.open} onOpenChange={close}>
        <DialogContent
          showCloseButton={false}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className={cn(
            "sm:max-w-xs p-4 gap-0 pb-5 bg-background modal-shadow1 rounded-2xl overflow-hidden border-none",
            modalState.className,
          )}
        >
          <DialogHeader className="hidden">
            <DialogTitle className="text-lg">{modalState.title}</DialogTitle>
          </DialogHeader>

          <DialogDescription className="hidden">
            {modalState.description}
          </DialogDescription>

          <div className="space-y-2">
            <ImgBox
              src={sucessImg}
              alt="sucessImg"
              className="w-[110px] h-[100px] mx-auto"
            />

            <h1
              className={cn(
                "text-xl font-semibold text-center",
                modalState.titleStyle,
              )}
            >
              {modalState.title}
            </h1>

            <h2
              className={cn(
                "text-center text-sm font-normal px-10",
                modalState.descriptionStyle,
              )}
            >
              {modalState.description}
            </h2>
            <Button onClick={() => close()} className="w-full mt-3">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SuccessDialogContext.Provider>
  );
};

/* =======================
   ✅ Hook
======================= */

export default function useSuccessDialog(): SuccessDialogContextType {
  const context = useContext(SuccessDialogContext);
  if (!context) {
    throw new Error(
      "useSuccessDialog must be used within a SuccessDialogProvider",
    );
  }
  return context;
}
