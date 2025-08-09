// @/components/common/tables/client/ParticipantTrainingDetailsTableClient.tsx

"use client";
import { useState } from "react";
import { DataTable } from "@/components/common/tables/common/data-table";
import { useParticipantTrainingDetailTable } from "@/hooks/tables/useParticipantTrainingDetailTable";
import { useParticipantTrainingDetailColumns } from "@/components/common/tables/columns/participantTrainingDetails";
import { AddDialog } from "@/components/common/dialogs/AddDialog";
import { ParticipantTrainingDetailForm } from "@/components/common/forms/ParticipantTrainingDetailForm";
import { useParticipantTable } from "@/hooks/tables/useParticipantTable";
import { ParticipantTrainingDetail } from "@/types";

export default function ParticipantTrainingDetailsTableClient() {
    const { data, addDetail, updateDetail, deleteDetail } = useParticipantTrainingDetailTable();
    const { data: participants } = useParticipantTable();

    const columns = useParticipantTrainingDetailColumns(participants, deleteDetail, updateDetail);
    const [search, setSearch] = useState("");

    const filtered = data.filter((detail) => {
        const participant = participants.find((p) => p.participant_id === detail.participant_id);
        return participant?.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <div className="flex flex-col items-start gap-1 mb-2 px-2 md:px-4">
                <h2 className="text-2xl font-bold">Participant Training Details</h2>
                <p className="text-muted-foreground text-sm">Manage participant training details.</p>
            </div>
            <div className="flex items-center justify-between px-2 md:px-4">
                <input
                    placeholder="Search training details..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm rounded border border-input px-3 py-2 text-sm"
                />
                <AddDialog title="Add Training Detail">
                    {(close) =>
                        <ParticipantTrainingDetailForm
                            participants={participants}
                            onAdd={(d: Omit<ParticipantTrainingDetail, "detail_id" | "created_at" | "updated_at">) => addDetail(d)}
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
