// @/app/dashboard/participantSkills/layout.tsx

import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participant Skills | Church Form System",
  description:
    "Manage participant skills and church training data efficiently with the Church Form System by JirehGroup.",
};

export default function ParticipantSkillsLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
