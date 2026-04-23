"use client";
import { childrenProps } from "@/types";
import { Toaster } from "sonner";
import { Provider as ReduxProvider } from "react-redux";
import { ConfirmDialogProvider } from "./confirmation";
import { SuccessDialogProvider } from "./success";
import { store } from "@/redux/store";
import { initAuth } from "@/redux/features/authSlice";
import { useEffect } from "react";


export default function Provider({ children }: childrenProps) {
  return (
    <ReduxProvider store={store}>
      <AuthInit />
      <SuccessDialogProvider>
        <ConfirmDialogProvider>
          {children}
          <Toaster
            toastOptions={{
              style: {
                background: "rgba(153, 121, 111, 0.90)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "white",
              },
              classNames: {
                description: "!text-white",
                icon: "!text-green-300",
              },
            }}
            position="bottom-right"
          />
        </ConfirmDialogProvider>
      </SuccessDialogProvider>

    </ReduxProvider>
  );
}

//  =========== profiel referch kora =========
function AuthInit() {
  const dispatch = store.dispatch;

  useEffect(() => {
    initAuth(dispatch, store.getState);
  }, [dispatch]);

  return null;
}
