import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSection = () => {
  const { t, language } = useLanguage();

  const plans = [
    {
      name: "Corporate",
      price: "€810",
      period: t('pricing.perMonth'),
      description: t('pricing.corporate.desc'),
      features: [
        t('pricing.f1'),
        "Retailer Profiles",
        "Leads & Contacts",
        "Markets (Product Categories & Countries)",
        "Transaction KPIs Reports",
        "Comparisons",
      ],
      highlighted: false,
    },
    {
      name: "Corporate+",
      price: "€1,050",
      period: t('pricing.perMonth'),
      description: t('pricing.corporatePlus.desc'),
      features: [
        t('pricing.f2'),
        "Retailer Profiles",
        "Leads & Contacts",
        "Markets (Product Categories & Countries)",
        "Transaction KPIs Reports",
        "Rankings",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: t('pricing.enterprise.price'),
      period: "",
      description: t('pricing.enterprise.desc'),
      features: [
        t('pricing.f1'),
        "Retailer Profiles",
        "Leads & Contacts",
        "Markets (Product Categories & Countries)",
        "Transaction KPIs Reports",
        "Rankings",
        t('pricing.f7'),
      ],
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-secondary">
            {t('pricing.label')}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            {t('pricing.title')}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t('pricing.note')}
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl border p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "border-secondary bg-secondary/5 shadow-lg shadow-secondary/10"
                  : "border-border/50 bg-card/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    <Star className="h-3 w-3" />
                    {t('pricing.recommended')}
                  </span>
                </div>
              )}
              
              <h3 className="font-display text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              
              <div className="mt-6">
                <span className="font-display text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "gold" : "heroOutline"}
                size="lg"
                className="mt-8 w-full"
                onClick={() => window.location.href = '#contact'}
              >
                {t('pricing.consultBtn')}
              </Button>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            {t('pricing.detailPrefix')}{" "}
            <a
              href="https://ecdb.com/features"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              ecdb.com/features
            </a>{" "}
            {t('pricing.detailLink')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
