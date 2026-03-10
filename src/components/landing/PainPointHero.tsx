import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, TrendingUp, Users, Building2, CreditCard, Package, ChevronRight, Banknote } from "lucide-react";

const personas = [
  {
    id: "strategy",
    icon: TrendingUp,
    titleKo: "리테일 전략기획",
    titleEn: "Retail Strategy",
    painKo: "커머스 GTM 전략 수립 시 항상 근거 찾기가 어려워요",
    painEn: "It's always hard to find data to support commerce GTM strategy",
    detailKo: "경쟁사 매출, 시장 규모, 성장률... 여기저기서 데이터 긁어모아도 비교 기준이 제각각이라 결국 감으로 결정하게 됩니다.",
    detailEn: "I scrape data from everywhere - competitor revenue, market size, growth rates - but comparison standards are all different. I end up deciding by gut feeling.",
    resultKo: "2주 걸리던 시장 분석이 5분으로",
    resultEn: "2 weeks of market analysis → 5 minutes",
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
    titleKo: "컨설팅/에이전시",
    titleEn: "Consulting/Agency",
    painKo: "클라이언트에게 줄 데이터를 매번 손으로 수집해요",
    painEn: "I manually collect data for clients every single time",
    detailKo: "곧 클라이언트 미팅인데, 신뢰할 만한 데이터셋 확보가 어려워 늘 골치 아픕니다.",
    detailEn: "Deadlines are approaching, but finding reliable market data takes days. I'm exhausted from repetitive work.",
    resultKo: "제안서 준비 시간 70% 단축",
    resultEn: "70% reduction in proposal preparation time",
  },
  {
    id: "payment",
    icon: CreditCard,
    titleKo: "결제/핀테크",
    titleEn: "Payment/Fintech",
    painKo: "결제 니즈가 급증하는 기업을 선제 파악하고 싶어요",
    painEn: "I want to identify companies with surging payment needs early",
    detailKo: "온라인 스토어, 마켓플레이스의 결제 수요가 급증하는 시점에 맞춰 제안해야 하는데, 타이밍 포착이 힘듭니다.",
    detailEn: "I need to pitch at the right moment when transaction volumes explode, but catching that timing is incredibly difficult.",
    resultKo: "고성장 기업 선제 발굴 월 15건 이상",
    resultEn: "15+ high-growth companies identified per month",
  },
  {
    id: "logistics",
    icon: Package,
    titleKo: "물류/배송",
    titleEn: "Logistics",
    painKo: "어떤 이커머스 기업에 먼저 연락해야 할지 모르겠어요",
    painEn: "I don't know which ecommerce companies to contact first",
    detailKo: "타깃으로 분석할 해외 커머스 기업을 데이터 기반 선별하고 싶은데, 이런저런 데이터가 너무 많아 시장 현실에 가까운 데이터가 무엇인지 잘 모르겠어요.",
    detailEn: "It would be great to contact growing companies early, but there's no way to know who's rapidly growing right now. By the time it's in the news, it's too late.",
    resultKo: "영업 타깃팅 정확도 3배 향상",
    resultEn: "3x improvement in sales targeting accuracy",
  },
  {
    id: "finance",
    icon: Banknote,
    titleKo: "투자/금융",
    titleEn: "Finance & Investment",
    painKo: "투자 대상 커머스 기업의 실제 성과를 검증할 데이터가 없어요",
    painEn: "I have no data to verify the actual performance of commerce companies I'm evaluating",
    detailKo: "IR 자료만으로는 실제 트랜잭션 규모나 성장률을 검증하기 어렵습니다. CDD, 밸류에이션에 활용할 신뢰할 수 있는 제3자 데이터가 필요해요.",
    detailEn: "IR materials alone can't verify actual transaction volumes or growth rates. I need reliable third-party data for CDD and valuation.",
    resultKo: "투자 심사 기간 50% 단축, CDD 정확도 향상",
    resultEn: "50% faster due diligence, improved CDD accuracy",
  },
];

const PainPointHero = () => {
  const { language } = useLanguage();
  const [activePersona, setActivePersona] = useState(personas[0]);
  const isKo = language === 'ko';

  return (
    <section className="relative pt-24 pb-12 overflow-hidden bg-white">
      {/* Background - subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      <div className="container relative mx-auto px-6">
        {/* Main Title */}
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="text-primary text-lg md:text-xl tracking-normal font-semibold block mb-2">
            eCommerce Market Intelligence
          </span>
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
      </div>
    </section>
  );
};

export default PainPointHero;
