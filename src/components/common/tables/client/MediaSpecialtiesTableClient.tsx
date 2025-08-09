// @/components/common/tables/client/MediaSpecialtiesTableClient.tsx

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/common/tables/common/data-table";
import { useMediaSpecialtyTable } from "@/hooks/tables/useMediaSpecialtyTable";
import { useMediaSpecialtyColumns } from "@/components/common/tables/columns/mediaSpecialties";
import { AddDialog } from "@/components/common/dialogs/AddDialog";
import { MediaSpecialtyForm } from "@/components/common/forms/MediaSpecialtyForm";

export default function MediaSpecialtiesTableClient() {
  const { data, addSpecialty, updateSpecialty, deleteSpecialty } = useMediaSpecialtyTable();
  const columns = useMediaSpecialtyColumns(deleteSpecialty, updateSpecialty);
  const [search, setSearch] = useState("");

  const filtered = data.filter((s) =>
    s.specialty_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col items-start gap-1 mb-2 px-2 md:px-4">
        <h2 className="text-2xl font-bold">Media Specialties</h2>
        <p className="text-muted-foreground text-sm">Manage media specialties.</p>
      </div>
      <div className="flex items-center justify-between px-2 md:px-4">
        <Input
          placeholder="Search specialties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <AddDialog title="Add Specialty">
          {(close) => <MediaSpecialtyForm onAdd={(c) => addSpecialty(c)} closeDialog={close} />}
        </AddDialog>
      </div>
      <div className="px-2 md:px-4">
        <DataTable columns={columns} data={filtered} />
      </div>
    </>
  );
}
