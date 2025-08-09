// @/components/common/tables/client/ParticipantsTableClient.tsx

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/common/tables/common/data-table";
import { useParticipantTable } from "@/hooks/tables/useParticipantTable";
import { useParticipantColumns } from "@/components/common/tables/columns/participant";
import { AddDialog } from "@/components/common/dialogs/AddDialog";
import { ParticipantForm } from "@/components/common/forms/ParticipantForm";
import { useChurchTable } from "@/hooks/tables/useChurchTable";
import { Participant } from "@/types";

export default function ParticipantsTableClient() {
  const { data: participants, addParticipant, updateParticipant, deleteParticipant } = useParticipantTable();
  const { data: churches } = useChurchTable();
  const columns = useParticipantColumns(churches, deleteParticipant, updateParticipant);
  const [search, setSearch] = useState("");

  const filtered = participants.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col items-start gap-1 mb-2 px-2 md:px-4">
        <h2 className="text-2xl font-bold">Participants</h2>
        <p className="text-muted-foreground text-sm">Manage participants.</p>
      </div>
      <div className="flex items-center justify-between px-2 md:px-4">
        <Input
          placeholder="Search participants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <AddDialog title="Add Participant">
          {(close) => <ParticipantForm
            churches={churches}
            onAdd={(p: Omit<Participant, "participant_id" | "created_at" | "updated_at">) => addParticipant(p)}
            closeDialog={close}
          />
          }
        </AddDialog>
      </div>
      <div className="px-2 md:px-4">
        <DataTable columns={columns} data={filtered} />
      </div>
    </>
  );
}
