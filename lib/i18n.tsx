"use client";

import { DirectionProvider } from "@radix-ui/react-direction";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Dictionary, type Lang } from "./translations";

type LangContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

/**
 * Holds the current language. Switching to Arabic sets <html lang="ar" dir="rtl">,
 * which flips every logical property (ms-, pe-, start-, end-...) and the
 * Radix keyboard navigation (via DirectionProvider) in one go.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const dir = lang === "ar" ? "rtl" : "ltr";

  // Sync the document root so portals (the cart drawer) and :lang() CSS follow.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
  }, [lang, dir]);

  const value = useMemo(() => ({ lang, dir, t: translations[lang], setLang }) as const, [lang, dir]);

  return (
    <LangContext.Provider value={value}>
      <DirectionProvider dir={dir}>{children}</DirectionProvider>
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
