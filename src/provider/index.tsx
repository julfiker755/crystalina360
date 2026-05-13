"use client";
import { childrenProps } from "@/types";
import { Toaster } from "sonner";
import { Provider as ReduxProvider } from "react-redux";
import { ConfirmDialogProvider } from "./confirmation";
import { SuccessDialogProvider } from "./success";
import { store } from "@/redux/store";
import { initAuth } from "@/redux/features/authSlice";
import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

export default function Provider({ children }: childrenProps) {
  const pathname = usePathname();
  const loadedRef = useRef(false);

  const applyWidget = () => {
    const widget = document.querySelector(
      "#snn-accessibility-widget-container"
    ) as HTMLElement;

    if (!widget) return;


    const isAdminOrOperator = pathname.startsWith("/admin") || pathname.startsWith("/operator");

    widget.style.setProperty("display", "block", "important");

    const button = widget?.shadowRoot?.querySelector(
      "#snn-accessibility-fixed-button"
    ) as HTMLElement;

    if (pathname.startsWith("/olistami")) {
      widget.style.setProperty("display", "none", "important");
      return;
    }


    if (isAdminOrOperator) {
      button?.style.setProperty("bottom", "20px", "important");
      button?.style.setProperty("right", "20px", "important");
    } else {
      button?.style.setProperty("bottom", "90px", "important");
      button?.style.setProperty("right", "20px", "important");
    }
  };

  useEffect(() => {
    if (!loadedRef.current) return;
    applyWidget();
  }, [pathname]);
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
      <Script
        key={pathname}
        src="https://cdn.jsdelivr.net/npm/accessibility-widgets@latest/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          loadedRef.current = true;
          applyWidget();
        }}
      />
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
