// @/components/common/Header.tsx

"use client";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

const Header: React.FC = () => {
  return (
    <div className="w-full flex justify-end items-start p-4 absolute top-0 right-0 z-50">
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </div>
  );
};

export default Header;
