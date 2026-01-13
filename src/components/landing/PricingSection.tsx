import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const plans = [
    {
      name: "Corporate",
      price: "€810",
      period: "/월",
      description: "팀 최대 5명",
      features: [
        "연간 데이터",
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
      period: "/월",
      description: "팀 최대 5명",
      features: [
        "연간 데이터 + 월간 데이터",
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
      price: "맞춤 가격",
      period: "",
      description: "전사 단위 접근",
      features: [
        "연간 데이터",
        "Retailer Profiles",
        "Leads & Contacts",
        "Markets (Product Categories & Countries)",
        "Transaction KPIs Reports",
        "Rankings",
        "API 및 특별 분석 맞춤 솔루션",
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
            Pricing
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            비즈니스에 맞는 플랜을 선택하세요
          </h2>
          <p className="mt-4 text-muted-foreground">
            *연간 결제 기준 · 신용카드 및 현금 송금 결제 가능
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
                    추천
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
                구독 상담하기
              </Button>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            제공 데이터 상세 내용은{" "}
            <a
              href="https://ecdb.com/features"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              ecdb.com/features
            </a>
            에서 확인하세요
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
