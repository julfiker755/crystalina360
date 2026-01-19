import { useEffect } from "react";

export const useScrollToTop = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);
};
