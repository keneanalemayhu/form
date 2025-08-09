// @/components/common/forms/ParticipantForm.tsx

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Participant } from "@/types/tables/participant";
import { FormBaseProps } from "@/types/base";

type Props = FormBaseProps<Participant, { churches: { church_id: number; church_name: string }[] }>;

export function ParticipantForm({ onAdd, closeDialog, existing, churches }: Props) {
  const [name, setName] = useState(existing?.name ?? "");
  const [fathers_name, setFathersName] = useState(existing?.fathers_name ?? "");
  const [age, setAge] = useState(existing?.age?.toString() ?? "");
  const [gender, setGender] = useState(existing?.gender ?? "");
  const [phone_number, setPhoneNumber] = useState(existing?.phone_number ?? "");
  const [email, setEmail] = useState(existing?.email ?? "");
  const [church_id, setChurchId] = useState(existing?.church_id ?? null);

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newParticipant = {
      name,
      fathers_name: fathers_name || null,
      age: age ? Number(age) : null,
      gender: gender || null,
      phone_number: phone_number || null,
      email: email || null,
      church_id: church_id || null,
      ...(existing?.participant_id !== undefined && { participant_id: existing.participant_id }),
    };

    onAdd?.(newParticipant as Omit<Participant, "id" | "created_at" | "updated_at">);
    closeDialog?.();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="grid gap-3 py-2 px-1 text-sm max-w-lg"
    >
      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">
          Name <span className="text-red-500">*</span>
        </label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">Father&apos;s Name</label>
        <Input value={fathers_name} onChange={(e) => setFathersName(e.target.value)} placeholder="Enter father's name" />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">Age</label>
        <Input value={age} type="number" onChange={(e) => setAge(e.target.value)} placeholder="Enter age" />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">Gender</label>
        <Input value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Enter gender" />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">Phone Number</label>
        <Input value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter phone number" />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">Email</label>
        <Input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">Church</label>
        <select
          value={church_id ?? ""}
          onChange={(e) => setChurchId(e.target.value ? Number(e.target.value) : null)}
          className="w-full rounded border border-input px-3 py-2 text-sm"
        >
          <option value="">Select church</option>
          {churches.map((c) => (
            <option key={c.church_id} value={c.church_id}>
              {c.church_name}
            </option>
          ))}
        </select>
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
