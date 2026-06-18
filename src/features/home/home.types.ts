import type { ReactElement } from "react";

export interface HeroStat {
  label: string;
  value: string;
  icon: ReactElement;
}

export interface QuickFilter {
  label: string;
  type?: string;
  listingType?: string;
  icon: ReactElement;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  desc: string;
  colorKey: "primary" | "secondary" | "success";
}