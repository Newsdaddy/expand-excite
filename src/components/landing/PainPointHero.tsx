import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, TrendingUp, Users, Building2, CreditCard, Package, ChevronRight } from "lucide-react";

const personas = [
  {
    id: "strategy",
    icon: TrendingUp,
    titleKo: "리테일 전략기획",
    titleEn: "Retail Strategy",
    painKo: "신시장 진출 결정에 항상 근거가 부족해요",
    painEn: "I never have enough data to justify new market expansion",
    detailKo: "경쟁사 매출, 시장 규모, 성장률... 여기저기서 데이터 긁어모아도 비교 기준이 제각각이라 결국 감으로 결정하게 됩니다.",
    detailEn: "I scrape data from everywhere - competitor revenue, market size, growth rates - but comparison standards are all different. I end up deciding by gut feeling.",
    resultKo: "3주 걸리던 시장 분석이 3시간으로",
    resultEn: "3 weeks of market analysis → 3 hours",
  },
  {
    id: "logistics",
    icon: Package,
    titleKo: "물류/배송 BD",
    titleEn: "Logistics BD",
    painKo: "어떤 이커머스 기업에 먼저 연락해야 할지 모르겠어요",
    painEn: "I don't know which ecommerce companies to contact first",
    detailKo: "성장하는 회사를 미리 알아서 먼저 연락하면 좋은데, 누가 지금 급성장 중인지 알 방법이 없습니다. 뉴스 나오면 이미 늦었어요.",
    detailEn: "It would be great to contact growing companies early, but there's no way to know who's rapidly growing right now. By the time it's in the news, it's too late.",
    resultKo: "영업 타깃팅 정확도 3배 향상",
    resultEn: "3x improvement in sales targeting accuracy",
  },
  {
    id: "payment",
    icon: CreditCard,
    titleKo: "결제/핀테크 BD",
    titleEn: "Payment/Fintech BD",
    painKo: "결제 니즈가 급증하는 기업을 선제 파악하고 싶어요",
    painEn: "I want to identify companies with surging payment needs early",
    detailKo: "트랜잭션 볼륨이 폭발하는 시점에 맞춰 제안해야 하는데, 그 타이밍을 포착하기가 너무 어렵습니다.",
    detailEn: "I need to pitch at the right moment when transaction volumes explode, but catching that timing is incredibly difficult.",
    resultKo: "고성장 기업 선제 발굴 월 15건 이상",
    resultEn: "15+ high-growth companies identified per month",
  },
  {
    id: "d2c",
    icon: Building2,
    titleKo: "브랜드 D2C",
    titleEn: "Brand D2C",
    painKo: "어떤 마켓플레이스에 입점해야 할지 감으로 결정해요",
    painEn: "I decide which marketplace to enter by gut feeling",
    detailKo: "카테고리별로 어떤 플랫폼이 강한지, 수수료 대비 실제 전환율이 얼마인지 정량 데이터가 없습니다.",
    detailEn: "I don't have quantitative data on which platforms are strong by category, or what the actual conversion rates are versus fees.",
    resultKo: "채널별 ROI 비교로 진입 비용 30% 절감",
    resultEn: "30% cost reduction through channel ROI comparison",
  },
  {
    id: "agency",
    icon: Users,
    titleKo: "에이전시/컨설팅",
    titleEn: "Agency/Consulting",
    painKo: "클라이언트에게 줄 데이터를 매번 손으로 수집해요",
    painEn: "I manually collect data for clients every single time",
    detailKo: "제안서 마감은 다가오는데, 신뢰할 만한 시장 데이터 찾는 데만 며칠씩 걸립니다. 반복 작업에 지쳤어요.",
    detailEn: "Deadlines are approaching, but finding reliable market data takes days. I'm exhausted from repetitive work.",
    resultKo: "제안서 준비 시간 70% 단축",
    resultEn: "70% reduction in proposal preparation time",
  },
];

const PainPointHero = () => {
  const { language } = useLanguage();
  const [activePersona, setActivePersona] = useState(personas[0]);
  const isKo = language === 'ko';

  return (
    <section className="relative pt-24 pb-20 overflow-hidden bg-white">
      {/* Background - subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      <div className="container relative mx-auto px-6">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-xs font-medium text-primary">
              {isKo ? "이 문제, 당신만 겪는 게 아닙니다" : "You're not alone in this struggle"}
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="text-gray-600">
            {isKo ? "혹시 이런 고민," : "Do you face"}
          </span>
          <br />
          <span className="text-gray-900">
            {isKo ? "하고 계신가요?" : "these challenges?"}
          </span>
        </h1>

        {/* Persona Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-12 mb-10">
          {personas.map((persona) => {
            const Icon = persona.icon;
            const isActive = activePersona.id === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setActivePersona(persona)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {isKo ? persona.titleKo : persona.titleEn}
              </button>
            );
          })}
        </div>

        {/* Pain Point Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
            {/* Pain Point */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-2">
                {isKo ? "자주 하는 말" : "Common complaint"}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                "{isKo ? activePersona.painKo : activePersona.painEn}"
              </h2>
            </div>

            {/* Detail */}
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {isKo ? activePersona.detailKo : activePersona.detailEn}
            </p>

            {/* Result with ECDB */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {isKo ? "ECDB 도입 후" : "After ECDB"}
                </p>
                <p className="text-lg font-semibold text-primary">
                  {isKo ? activePersona.resultKo : activePersona.resultEn}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Button size="lg" variant="gold" className="gap-2" asChild>
            <a href="#webinar">
              <Calendar className="h-5 w-5" />
              {isKo ? "웨비나 신청하기" : "Register for Webinar"}
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href="#solution">
              {isKo ? "어떻게 해결하나요?" : "How does it work?"}
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-10 border-t border-gray-200">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">150+</p>
            <p className="text-sm text-muted-foreground mt-1">
              {isKo ? "국가 커버리지" : "Countries Covered"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">10K+</p>
            <p className="text-sm text-muted-foreground mt-1">
              {isKo ? "스토어 데이터" : "Store Data"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">1B+</p>
            <p className="text-sm text-muted-foreground mt-1">
              {isKo ? "월간 트랜잭션 분석" : "Monthly Transactions"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">100K+</p>
            <p className="text-sm text-muted-foreground mt-1">
              {isKo ? "의사결정자 리드" : "Decision-Maker Leads"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPointHero;
