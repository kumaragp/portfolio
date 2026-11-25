"use client";

import { Icon } from "@iconify/react";
import { icons } from "@/data/icon";

type AppIconProps = {
  name: keyof typeof icons;
  className?: string;
};

export function AppIcon({ name, className }: AppIconProps) {
  return <Icon icon={icons[name]} className={className} />;
}