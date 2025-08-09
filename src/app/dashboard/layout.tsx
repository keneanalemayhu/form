// @/app/dashboard/layout.tsx

import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Bakery Management System",
    description: "Login or register to access the Bakery Management System by JirehGroup.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}