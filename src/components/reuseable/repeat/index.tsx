import { ReactNode, Fragment } from "react";

interface RepeatProps {
  count: number;
  children: ReactNode;
}

export const Repeat = ({ count, children }: RepeatProps) =>
  Array.from({ length: count }, (_, i) => (
    <Fragment key={i}>{children}</Fragment>
  ));
