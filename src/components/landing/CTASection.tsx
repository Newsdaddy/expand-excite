import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-muted/30 to-card p-12 text-center md:p-16">
          {/* Decorative elements */}
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
          
          <div className="relative">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              {t('cta.title1')}
              <br />
              <span className="text-gradient-gold">{t('cta.title2')}</span>
            </h2>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              <span className="inline-block">{t('cta.desc1')}</span>{" "}
              <span className="inline-block">{t('cta.desc2')}</span>{" "}
              <span className="inline-block">{t('cta.desc3')}</span>
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="gold" size="xl">
                <Calendar className="mr-2 h-5 w-5" />
                {t('cta.demoBtn')}
              </Button>
              <Button variant="heroOutline" size="xl">
                {t('cta.consultBtn')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <p className="mt-6 text-sm text-muted-foreground">
              {t('cta.paymentNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
