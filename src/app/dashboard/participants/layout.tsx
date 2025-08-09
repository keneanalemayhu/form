// @/app/dashboard/participants/layout.tsx

import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participants | Church Form System",
  description:
    "Manage church participants and their training details efficiently with the Church Form System by JirehGroup.",
};

export default function ParticipantsLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
