import { useLanguage } from "@/contexts/LanguageContext";
import ECDBLogo from "@/components/ECDBLogo";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/50 bg-card/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <ECDBLogo size="md" />
          
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="transition-colors hover:text-foreground">{t('footer.features')}</a>
            <a href="#solutions" className="transition-colors hover:text-foreground">{t('footer.solutions')}</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">{t('footer.pricing')}</a>
            <a href="#contact" className="transition-colors hover:text-foreground">{t('footer.contact')}</a>
            <a href="#" className="transition-colors hover:text-foreground">{t('footer.privacy')}</a>
            <a href="#" className="transition-colors hover:text-foreground">{t('footer.terms')}</a>
          </nav>
          
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
