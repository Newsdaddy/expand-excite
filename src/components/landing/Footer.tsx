import { useLanguage } from "@/contexts/LanguageContext";
import ECDBLogo from "@/components/ECDBLogo";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <ECDBLogo size="md" />

          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
