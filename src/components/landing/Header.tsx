import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import ECDBLogo from "@/components/ECDBLogo";

const Header = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#features", label: t('nav.features') },
    { href: "#solutions", label: t('nav.solutions') },
    { href: "#pricing", label: t('nav.pricing') },
    { href: "#why-ecdb", label: t('nav.whyEcdb') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <ECDBLogo size="lg" />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <Button variant="ghost" size="sm">
            {t('nav.login')}
          </Button>
          <Button variant="gold" size="sm">
            {t('nav.contact')}
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
              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-6 flex flex-col gap-3">
                  <Button variant="ghost" className="justify-start">
                    {t('nav.login')}
                  </Button>
                  <Button variant="gold">
                    {t('nav.contact')}
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
