// @/components/common/tables/client/ParticipantSkillsTableClient.tsx

"use client";
import { useState } from "react";
import { DataTable } from "@/components/common/tables/common/data-table";
import { useParticipantSkillTable } from "@/hooks/tables/useParticipantSkillTable";
import { useParticipantSkillColumns } from "@/components/common/tables/columns/participantSkills";
import { AddDialog } from "@/components/common/dialogs/AddDialog";
import { ParticipantSkillForm } from "@/components/common/forms/ParticipantSkillForm";
import { useParticipantTable } from "@/hooks/tables/useParticipantTable";
import { useMediaSpecialtyTable } from "@/hooks/tables/useMediaSpecialtyTable";

export default function ParticipantSkillsTableClient() {
  const { data, addSkill, deleteSkill } = useParticipantSkillTable();
  const { data: participants } = useParticipantTable();
  const { data: specialties } = useMediaSpecialtyTable();

  const columns = useParticipantSkillColumns(participants, specialties, deleteSkill);
  const [search, setSearch] = useState("");

  const filtered = data.filter((skill) => {
    const participant = participants.find((p) => p.participant_id === skill.participant_id);
    const specialty = specialties.find((s) => s.specialty_id === skill.specialty_id);
    return (
      participant?.name.toLowerCase().includes(search.toLowerCase()) ||
      specialty?.specialty_name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <div className="flex flex-col items-start gap-1 mb-2 px-2 md:px-4">
        <h2 className="text-2xl font-bold">Participant Skills</h2>
        <p className="text-muted-foreground text-sm">Manage participant skills.</p>
      </div>
      <div className="flex items-center justify-between px-2 md:px-4">
        <input
          placeholder="Search participant skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm rounded border border-input px-3 py-2 text-sm"
        />
        <AddDialog title="Add Participant Skill">
          {(close) => (
            <ParticipantSkillForm participants={participants} specialties={specialties} onAdd={(s) => addSkill(s)} closeDialog={close} />
          )}
        </AddDialog>
      </div>
      <div className="px-2 md:px-4">
        <DataTable columns={columns} data={filtered} />
      </div>
    </>
  );
}
