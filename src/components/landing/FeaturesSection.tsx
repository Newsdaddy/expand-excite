import { BarChart2, Database, Download, Filter, LineChart, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Database,
      title: t('features.f1.title'),
      description: t('features.f1.desc'),
      metrics: ["Revenue", "Traffic", "Market Share"],
    },
    {
      icon: BarChart2,
      title: t('features.f2.title'),
      description: t('features.f2.desc'),
      metrics: ["Competitor Analysis", "Transaction KPIs", "Marketing"],
    },
    {
      icon: LineChart,
      title: t('features.f3.title'),
      description: t('features.f3.desc'),
      metrics: ["Growth Rate", "Trend Analysis", "Alerts"],
    },
    {
      icon: Users,
      title: t('features.f4.title'),
      description: t('features.f4.desc'),
      metrics: ["100K+ Contacts", "Role-based", "Verified"],
    },
    {
      icon: Filter,
      title: t('features.f5.title'),
      description: t('features.f5.desc'),
      metrics: ["Priority Score", "Custom Filters", "Saved Views"],
    },
    {
      icon: Download,
      title: t('features.f6.title'),
      description: t('features.f6.desc'),
      metrics: ["CSV Export", "CRM Sync", "API Access"],
    },
  ];

  return (
    <section id="features" className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            {t('features.label')}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            {t('features.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            <span className="inline-block">{t('features.subtitle1')}</span>{" "}
            <span className="inline-block">{t('features.subtitle2')}</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t('features.detailPrefix')}{" "}
            <a
              href="https://ecdb.com/features"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              ecdb.com/features
            </a>{" "}
            {t('features.detailLink')}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group card-elevated rounded-2xl border border-border/50 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="mt-4 font-display text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {feature.metrics.map((metric, mIndex) => (
                  <span
                    key={mIndex}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
