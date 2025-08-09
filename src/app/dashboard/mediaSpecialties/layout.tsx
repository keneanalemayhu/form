// @/app/dashboard/mediaSpecialties/layout.tsx

import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Specialties | Church Form System",
  description:
    "Manage media specialties and related church data efficiently with the Church Form System by JirehGroup.",
};

export default function MediaSpecialtiesLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
