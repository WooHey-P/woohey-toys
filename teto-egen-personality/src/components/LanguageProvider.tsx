import { createContext, useContext, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Language = "ko" | "en" | "ja" | "zh";

type LanguageProviderContextType = {
  language: Language;
  changeLanguage: (lang: Language) => void;
};

const LanguageProviderContext = createContext<LanguageProviderContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>("ko");

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageProviderContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageProviderContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
