import type { ReactElement } from "react";

export interface IHeroStat {
  label: string;
  value: string;
  icon: ReactElement;
}

export interface IQuickFilter {
  label: string;
  type?: string;
  listingType?: string;
  icon: ReactElement;
}

export interface IHowItWorksStep {
  step: string;
  title: string;
  desc: string;
  colorKey: "primary" | "secondary" | "success";
}