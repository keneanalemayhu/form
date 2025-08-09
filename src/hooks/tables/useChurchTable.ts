// @/hooks/useChurchTable.ts

"use client";
import { useState } from "react";
import { Church } from "@/types";

const initialChurches: Church[] = [
  { church_id: 1, church_name: "St. George Church" },
  { church_id: 2, church_name: "Holy Trinity Cathedral" },
];

export function useChurchTable() {
  const [data, setData] = useState<Church[]>(initialChurches);

  const addChurch = (church: Omit<Church, "church_id">) => {
    setData((prev) => [
      ...prev,
      { ...church, church_id: prev.length + 1 },
    ]);
  };

  const updateChurch = (updated: Church) => {
    setData((prev) =>
      prev.map((c) => (c.church_id === updated.church_id ? updated : c))
    );
  };

  const deleteChurch = (id: number) => {
    setData((prev) => prev.filter((c) => c.church_id !== id));
  };

  return {
    data,
    rawChurches: data,
    addChurch,
    updateChurch,
    deleteChurch,
  };
}
