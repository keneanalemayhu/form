// @/hooks/tables/useParticipantSkillTable.ts

"use client";
import { useState } from "react";
import { ParticipantSkill } from "@/types/tables/participantSkill";

const initialSkills: ParticipantSkill[] = [
  { participant_id: 1, specialty_id: 1 },
];

export function useParticipantSkillTable() {
  const [data, setData] = useState<ParticipantSkill[]>(initialSkills);

  const addSkill = (skill: ParticipantSkill) => {
    setData((prev) => [...prev, skill]);
  };

  const deleteSkill = (skill: ParticipantSkill) => {
    setData((prev) =>
      prev.filter(
        (s) =>
          !(
            s.participant_id === skill.participant_id &&
            s.specialty_id === skill.specialty_id
          )
      )
    );
  };

  return { data, addSkill, deleteSkill };
}
