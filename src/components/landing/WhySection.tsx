import { ArrowRight, Check, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhySection = () => {
  const { t } = useLanguage();

  const comparisons = [
    {
      old: t('why.old1'),
      new: t('why.new1'),
    },
    {
      old: t('why.old2'),
      new: t('why.new2'),
    },
    {
      old: t('why.old3'),
      new: t('why.new3'),
    },
  ];

  return (
    <section id="why-ecdb" className="relative py-24">
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--gradient-glow)' }}
      />
      
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-secondary">
            {t('why.label')}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            {t('why.title')}
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-4">
            {comparisons.map((comparison, index) => (
              <div
                key={index}
                className="group grid items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-6 md:grid-cols-[1fr,auto,1fr]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <X className="h-4 w-4 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{comparison.old}</span>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span className="font-medium">{comparison.new}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-primary/30 bg-primary/5 p-8 text-center">
            <p className="font-display text-xl font-semibold text-primary sm:text-2xl">
              {t('why.bottom.title')}
            </p>
            <p className="mt-2 text-muted-foreground">
              <span className="inline-block">{t('why.bottom.desc1')}</span>{" "}
              <span className="inline-block">{t('why.bottom.desc2')}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
