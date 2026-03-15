import { Check, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSection = () => {
  const { t, language } = useLanguage();
  const isKo = language === "ko";

  const categories = [
    { key: "granularity", ko: "데이터 수준", en: "Data Granularity" },
    { key: "data", ko: "데이터", en: "Data" },
    { key: "features", ko: "기능", en: "Features" },
  ];

  const allFeatures = {
    granularity: [
      { id: "annual", ko: "연간", en: "Annual" },
      { id: "monthly", ko: "월간", en: "Monthly" },
    ],
    data: [
      { id: "retailer", ko: "리테일러 프로필", en: "Retailer Profiles" },
      { id: "leads", ko: "리드 & 연락처", en: "Leads & Contacts" },
      { id: "markets", ko: "마켓 (제품 카테고리 & 국가)", en: "Markets (Product Categories & Countries)" },
      { id: "kpis", ko: "거래 KPI", en: "Transaction KPIs" },
    ],
    features: [
      { id: "reports", ko: "리포트", en: "Reports" },
      { id: "xls", ko: "XLS 다운로드", en: "XLS Downloads" },
      { id: "comparisons", ko: "비교 분석", en: "Comparisons" },
      { id: "rankings", ko: "랭킹", en: "Rankings" },
      { id: "ai", ko: "AI 어시스턴트", en: "AI Assistant" },
      { id: "api", ko: "맞춤형 솔루션 (API/특별 분석)", en: "Customizable Solutions (API/Special Analysis)" },
    ],
  };

  const plans = [
    {
      name: "Corporate",
      description: isKo
        ? "이커머스 시장 분석을 시작하는 기업"
        : "For companies starting e-commerce market analysis",
      included: {
        granularity: ["annual"],
        data: ["retailer", "leads", "markets", "kpis"],
        features: ["reports", "xls", "comparisons", "rankings"],
      },
      highlighted: false,
    },
    {
      name: "Corporate+",
      description: isKo
        ? "월간 트렌드와 AI 기능이 필요한 기업"
        : "For companies needing monthly trends and AI features",
      included: {
        granularity: ["annual", "monthly"],
        data: ["retailer", "leads", "markets", "kpis"],
        features: ["reports", "ai", "xls", "comparisons", "rankings"],
      },
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: isKo
        ? "API 연동과 맞춤형 분석이 필요한 대기업"
        : "For large enterprises needing API and custom analysis",
      included: {
        granularity: ["annual", "monthly"],
        data: ["retailer", "leads", "markets", "kpis"],
        features: ["reports", "ai", "xls", "comparisons", "rankings", "api"],
      },
      highlighted: false,
    },
  ];

  const isIncluded = (planIncluded: Record<string, string[]>, category: string, featureId: string) => {
    return planIncluded[category]?.includes(featureId) || false;
  };

  return (
    <section id="pricing" className="relative py-16 bg-white">
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

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border p-6 transition-all duration-300 flex flex-col ${
                plan.highlighted
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 bg-white shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                    <Star className="h-3 w-3" />
                    {t('pricing.recommended')}
                  </span>
                </div>
              )}

              <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

              <div className="mt-5 flex-grow space-y-4">
                {categories.map((category) => (
                  <div key={category.key}>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      {isKo ? category.ko : category.en}
                    </h4>
                    <ul className="space-y-1.5">
                      {allFeatures[category.key as keyof typeof allFeatures].map((feature) => {
                        const included = isIncluded(plan.included, category.key, feature.id);
                        return (
                          <li key={feature.id} className="flex items-start gap-2">
                            {included ? (
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            ) : (
                              <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" />
                            )}
                            <span className={`text-sm ${included ? "" : "text-gray-400"}`}>
                              {isKo ? feature.ko : feature.en}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.highlighted ? "gold" : "heroOutline"}
                size="lg"
                className="mt-6 w-full"
                asChild
              >
                <a href="#webinar">{t('pricing.consultBtn')}</a>
              </Button>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            {t('pricing.detailPrefix')}{" "}
            <a
              href="https://ecdb.com/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              ecdb.com/pricing
            </a>{" "}
            {t('pricing.detailLink')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
