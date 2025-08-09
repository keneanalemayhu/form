// @/components/common/forms/MediaSpecialtyForm.tsx

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MediaSpecialty } from "@/types/tables/mediaSpecialty";
import { FormBaseProps } from "@/types/base";

type Props = FormBaseProps<MediaSpecialty>;

export function MediaSpecialtyForm({ onAdd, closeDialog, existing }: Props) {
    const [specialty_name, setName] = useState(existing?.specialty_name ?? "");
    const [description, setDescription] = useState(existing?.description ?? "");

    const handleSubmit = () => {
        if (!specialty_name.trim()) return;

        const newSpecialty = {
            specialty_name,
            description: description || null,
            ...(existing?.specialty_id !== undefined && { specialty_id: existing.specialty_id }),
        };

        onAdd?.(newSpecialty as Omit<MediaSpecialty, "specialty_id" | "created_at" | "updated_at">);
        closeDialog?.();
        setName("");
        setDescription("");
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="grid gap-3 py-2 px-1 text-sm max-w-md"
        >
            <div className="flex items-center gap-4">
                <label className="w-36 text-sm font-medium text-right">
                    Specialty Name <span className="text-red-500">*</span>
                </label>
                <Input
                    className="w-full"
                    value={specialty_name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter specialty name"
                />
            </div>
            <div className="flex items-center gap-4">
                <label className="w-36 text-sm font-medium text-right">Description</label>
                <Textarea
                    className="w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional description"
                    rows={3}
                />
            </div>
            <div className="flex justify-end gap-4 pt-1 pb-1">
                <Button variant="outline" type="button" onClick={closeDialog}>
                    Cancel
                </Button>
                <Button type="submit">{existing ? "Update" : "Add"}</Button>
            </div>
        </form>
    );
}
