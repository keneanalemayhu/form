// @/app/dashboard/participantTrainingDetails/layout.tsx

import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participant Training Details | Church Form System",
  description:
    "Manage participant training details and church data efficiently with the Church Form System by JirehGroup.",
};

export default function ParticipantTrainingDetailsLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
