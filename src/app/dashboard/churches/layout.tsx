// @/app/dashboard/churches/layout.tsx

import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Churches | Church Form System",
  description:
    "Manage churches and their participants efficiently with the Church Form System by JirehGroup.",
};

export default function ChurchesLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
