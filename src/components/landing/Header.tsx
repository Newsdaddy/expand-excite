import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            ECDB
          </span>
        </div>
        
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t('nav.features')}
          </a>
          <a href="#solutions" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t('nav.solutions')}
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t('nav.pricing')}
          </a>
          <a href="#why-ecdb" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t('nav.whyEcdb')}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Button variant="ghost" size="sm">
            {t('nav.login')}
          </Button>
          <Button variant="gold" size="sm">
            {t('nav.contact')}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
