// @/hooks/tables/useParticipantTable.ts

"use client";
import { useState } from "react";
import { Participant } from "@/types/tables/participant";

const initialParticipants: Participant[] = [
  {
    participant_id: 1,
    name: "Alemu Tesfaye",
    fathers_name: "Meles Alemu",
    age: 25,
    gender: "Male",
    phone_number: "251912345678",
    email: "alemu@example.com",
    church_id: 1,
    created_at: new Date().toISOString(),
  },
];

export function useParticipantTable() {
  const [data, setData] = useState<Participant[]>(initialParticipants);

  const addParticipant = (participant: Omit<Participant, "participant_id" | "created_at">) => {
    setData((prev) => [
      ...prev,
      {
        ...participant,
        participant_id: prev.length + 1,
        created_at: new Date().toISOString(),
      },
    ]);
  };

  const updateParticipant = (updated: Participant) => {
    setData((prev) =>
      prev.map((p) => (p.participant_id === updated.participant_id ? updated : p))
    );
  };

  const deleteParticipant = (id: number) => {
    setData((prev) => prev.filter((p) => p.participant_id !== id));
  };

  return { data, addParticipant, updateParticipant, deleteParticipant };
}
