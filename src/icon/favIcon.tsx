"use client";

import React, { useState } from "react";
import { favIcon } from "./list";
import { favIcon2 } from "./oparator";
import { favIcon3 } from "./admin";

const icons = { ...favIcon, ...favIcon2, ...favIcon3 } as const;

export type IconName = keyof typeof icons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  color?: string;
  stroke?: string;
  hoverColor?: string;
  activeColor?: string;
}

export default function FavIcon({
  name,
  className,
  color,
  stroke,
  hoverColor,
  activeColor,
  ...rest
}: IconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const iconTemplate = icons[name];

  if (!React.isValidElement<SVGSVGElement>(iconTemplate)) return null;

  const applyColors = (
    el: React.ReactElement<React.SVGProps<SVGSVGElement>>
  ): React.ReactElement<React.SVGProps<SVGSVGElement>> => {
    const { fill, stroke: elStroke, children, ...props } = el.props;

    const resolvedFill =
      isHovered && hoverColor
        ? hoverColor
        : activeColor
        ? activeColor
        : color || fill;

    const resolvedStroke = stroke || elStroke;

    return React.cloneElement(el, {
      ...props,
      fill: resolvedFill,
      stroke: resolvedStroke,
      children: React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? applyColors(
              child as React.ReactElement<React.SVGProps<SVGSVGElement>>
            )
          : child
      ),
    });
  };

  const coloredIcon = applyColors(iconTemplate as any);

  return React.cloneElement(coloredIcon, {
    id: name,
    className,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    ...rest,
  });
}
