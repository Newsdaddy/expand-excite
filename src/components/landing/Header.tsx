import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ExternalLink } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import ECDBLogo from "@/components/ECDBLogo";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const mainTabs = [
    { path: "/", label: t('nav.sales') },
    { path: "/resources", label: t('nav.resources') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <ECDBLogo size="lg" />

          {/* Main Tabs */}
          <nav className="hidden items-center gap-1 md:flex">
            {mainTabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(tab.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {tab.label}
              </Link>
            ))}
            <a
              href="https://ecdb.com/about-us"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              About ECDB
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/resources">{t('nav.login')}</Link>
          </Button>
          <Button variant="gold" size="sm" asChild>
            <a href="#webinar">{t('nav.webinar')}</a>
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background">
              <nav className="mt-8 flex flex-col gap-2">
                {mainTabs.map((tab) => (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 text-lg rounded-lg transition-colors ${
                      isActive(tab.path)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </Link>
                ))}
                <a
                  href="https://ecdb.com/about-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-lg text-muted-foreground hover:text-foreground rounded-lg transition-colors flex items-center gap-2"
                >
                  About ECDB
                  <ExternalLink className="h-4 w-4" />
                </a>
                <div className="mt-6 flex flex-col gap-3 px-4">
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/resources" onClick={() => setIsOpen(false)}>
                      {t('nav.login')}
                    </Link>
                  </Button>
                  <Button variant="gold" asChild>
                    <a href="#webinar" onClick={() => setIsOpen(false)}>
                      {t('nav.webinar')}
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
