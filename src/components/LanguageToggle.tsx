import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-border/50 bg-muted/50 p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
          language === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        ENG
      </button>
      <button
        onClick={() => setLanguage('ko')}
        className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
          language === 'ko'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        KOR
      </button>
    </div>
  );
};

export default LanguageToggle;
