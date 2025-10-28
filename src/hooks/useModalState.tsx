import { useState } from "react";

type BooleanState = Record<string, boolean>;
type BooleanStateUpdater<T extends BooleanState> = <K extends keyof T>(
  key: K,
  value: boolean
) => void;

export function useModalState<T extends BooleanState>(
  initialState: T
): [T, BooleanStateUpdater<T>] {
  const [state, set_State] = useState<T>(initialState);

  const setState: BooleanStateUpdater<T> = (key, value) => {
    set_State((prev) => ({ ...prev, [key]: value }));
  };

  return [state, setState];
}
