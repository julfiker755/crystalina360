"use client";
import { childrenProps } from "@/types";
import { Toaster } from "sonner";
import { Provider as ReduxProvider } from "react-redux";
import { ConfirmDialogProvider } from "./confirmation";
import { SuccessDialogProvider } from "./success";
import { store } from "@/redux/store";

export default function Provider({ children }: childrenProps) {
  return (
    <SuccessDialogProvider>
      <ConfirmDialogProvider>
        <ReduxProvider store={store}>
          {children}
          <Toaster
            toastOptions={{
              style: {
                background: "rgba(29, 29, 29, 0.20)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "white",
                backdropFilter: "blur(48px)",
              },
              classNames: {
                description: "!text-white",
                icon: "!text-green-300",
              },
            }}
            position="top-right"
          />
        </ReduxProvider>
      </ConfirmDialogProvider>
    </SuccessDialogProvider>
  );
}
