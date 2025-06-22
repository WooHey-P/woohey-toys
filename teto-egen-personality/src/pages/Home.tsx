import { useEffect } from "react";
import { Moon, Sun, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { PersonalityTest } from "@/components/PersonalityTest";
import { Footer } from "@/components/Footer";
import "../lib/i18n";

export default function Home() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header with Controls */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">🧠</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{t("app.title")}</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <Select value={language} onValueChange={(value: any) => changeLanguage(value)}>
              <SelectTrigger className="w-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">🇰🇷 한국어</SelectItem>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                <SelectItem value="zh">🇨🇳 中文</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Dark Mode Toggle */}
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleTheme}
              className="bg-gray-100 dark:bg-slate-700"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <PersonalityTest />
      </main>

      <Footer />
    </div>
  );
}
