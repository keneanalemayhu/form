// @/app/providers.tsx

"use client";
import { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as CustomThemeProvider } from "@/components/context/ThemeContext";
import { LanguageProvider } from "@/components/context/LanguageContext";
import { type ThemeProviderProps } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

export function Providers({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="jireh-theme"
      themes={["light", "dark", "system"]}
      value={{
        light: "light",
        dark: "dark",
        system: "system",
      }}
      {...props}
    >
      <CustomThemeProvider>
        <LanguageProvider>
          {children}
          <SonnerToaster
            position="bottom-right"
            expand={false}
            richColors
            closeButton
          />
        </LanguageProvider>
      </CustomThemeProvider>
    </NextThemesProvider>
  );
}
