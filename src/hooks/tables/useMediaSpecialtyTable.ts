// @/hooks/tables/useMediaSpecialtyTable.ts

"use client";
import { useState } from "react";
import { MediaSpecialty } from "@/types/tables/mediaSpecialty";

const initialSpecialties: MediaSpecialty[] = [
  { specialty_id: 1, specialty_name: "Photography", description: "Photo shooting and editing" },
  { specialty_id: 2, specialty_name: "Video Production", description: "Video recording and editing" },
];

export function useMediaSpecialtyTable() {
  const [data, setData] = useState<MediaSpecialty[]>(initialSpecialties);

  const addSpecialty = (specialty: Omit<MediaSpecialty, "specialty_id">) => {
    setData((prev) => [
      ...prev,
      {
        ...specialty,
        specialty_id: prev.length + 1,
      },
    ]);
  };

  const updateSpecialty = (updated: MediaSpecialty) => {
    setData((prev) =>
      prev.map((s) => (s.specialty_id === updated.specialty_id ? updated : s))
    );
  };

  const deleteSpecialty = (id: number) => {
    setData((prev) => prev.filter((s) => s.specialty_id !== id));
  };

  return { data, addSpecialty, updateSpecialty, deleteSpecialty };
}
