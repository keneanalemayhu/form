// @/hooks/tables/useParticipantTrainingDetailTable.ts

"use client";
import { useState } from "react";
import { ParticipantTrainingDetail } from "@/types/tables/participantTrainingDetail";

const initialDetails: ParticipantTrainingDetail[] = [
  { detail_id: 1, participant_id: 1, current_skill_level: "Beginner", expectations_from_training: "Learn video editing" },
];

export function useParticipantTrainingDetailTable() {
  const [data, setData] = useState<ParticipantTrainingDetail[]>(initialDetails);

  const addDetail = (detail: Omit<ParticipantTrainingDetail, "detail_id">) => {
    setData((prev) => [
      ...prev,
      { ...detail, detail_id: prev.length + 1 },
    ]);
  };

  const updateDetail = (updated: ParticipantTrainingDetail) => {
    setData((prev) =>
      prev.map((d) => (d.detail_id === updated.detail_id ? updated : d))
    );
  };

  const deleteDetail = (id: number) => {
    setData((prev) => prev.filter((d) => d.detail_id !== id));
  };

  return { data, addDetail, updateDetail, deleteDetail };
}
