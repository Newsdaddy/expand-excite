import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Target,
  ChevronRight,
  Calculator,
  Zap,
} from "lucide-react";

const metrics = [
  {
    icon: Clock,
    valueKo: "90%",
    valueEn: "90%",
    labelKo: "시간 절감",
    labelEn: "Time Saved",
    descKo: "2주 → 5분으로 데이터 확보 시간 단축",
    descEn: "Data acquisition time reduced from 2 weeks to 5 minutes",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: DollarSign,
    valueKo: "€50K+",
    valueEn: "€50K+",
    labelKo: "연간 비용 절감",
    labelEn: "Annual Cost Savings",
    descKo: "외부 리서치 및 컨설팅 비용 대체",
    descEn: "Replacing external research & consulting costs",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Target,
    valueKo: "3x",
    valueEn: "3x",
    labelKo: "리드 전환율",
    labelEn: "Lead Conversion",
    descKo: "데이터 기반 타겟팅으로 전환율 향상",
    descEn: "Higher conversion with data-driven targeting",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    valueKo: "30%",
    valueEn: "30%",
    labelKo: "매출 성장",
    labelEn: "Revenue Growth",
    descKo: "신시장 발굴 및 파트너십 확대 효과",
    descEn: "New market discovery & partnership expansion",
    color: "from-amber-500 to-orange-500",
  },
];

const calculations = [
  {
    titleKo: "시장 조사 시간",
    titleEn: "Market Research Time",
    beforeKo: "주 40시간 x 인건비",
    beforeEn: "40 hrs/week x labor cost",
    afterKo: "주 4시간 x 인건비",
    afterEn: "4 hrs/week x labor cost",
    savingsKo: "36시간/주 절약",
    savingsEn: "36 hrs/week saved",
  },
  {
    titleKo: "외부 리서치 비용",
    titleEn: "External Research Cost",
    beforeKo: "€30,000 - €100,000/년",
    beforeEn: "€30,000 - €100,000/year",
    afterKo: "€0",
    afterEn: "€0",
    savingsKo: "€30K - €100K/년 절약",
    savingsEn: "€30K - €100K/year saved",
  },
  {
    titleKo: "영업 기회 비용",
    titleEn: "Sales Opportunity Cost",
    beforeKo: "2주 지연 → 경쟁사 선점",
    beforeEn: "2-week delay → competitors win",
    afterKo: "실시간 대응 → 선점 기회",
    afterEn: "Real-time response → first-mover advantage",
    savingsKo: "기회비용 최소화",
    savingsEn: "Opportunity cost minimized",
  },
];

const ROISection = () => {
  const { language } = useLanguage();
  const isKo = language === "ko";

  return (
    <section id="roi" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <Calculator className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">
              {isKo ? "ROI 분석" : "ROI Analysis"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isKo ? (
              <>
                <span className="text-gray-600">구독 기업들의</span>{" "}
                <span className="text-gray-900">실제 성과</span>
              </>
            ) : (
              <>
                <span className="text-gray-600">Real Results from</span>{" "}
                <span className="text-gray-900">Our Subscribers</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isKo
              ? "실제 성과를 바탕으로 계산한 ROI입니다"
              : "ROI calculated based on actual results"}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-2xl p-6 text-center group hover:border-primary/50 transition-all shadow-sm"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {isKo ? metric.valueKo : metric.valueEn}
                </div>
                <div className="text-sm font-medium mb-2">
                  {isKo ? metric.labelKo : metric.labelEn}
                </div>
                <p className="text-xs text-muted-foreground">
                  {isKo ? metric.descKo : metric.descEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* ROI Calculator Preview */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-muted/50 px-6 py-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-bold">
                  {isKo ? "비용 절감 시뮬레이션" : "Cost Savings Simulation"}
                </h3>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                      {isKo ? "항목" : "Category"}
                    </th>
                    <th className="text-center px-4 py-4 text-sm font-medium text-red-400">
                      Before
                    </th>
                    <th className="text-center px-4 py-4 text-sm font-medium text-green-400">
                      After
                    </th>
                    <th className="text-center px-4 py-4 text-sm font-medium text-primary">
                      {isKo ? "절감 효과" : "Savings"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.map((calc, index) => (
                    <tr
                      key={index}
                      className="border-b border-border/30 last:border-0"
                    >
                      <td className="px-6 py-4 font-medium">
                        {isKo ? calc.titleKo : calc.titleEn}
                      </td>
                      <td className="text-center px-4 py-4 text-sm text-muted-foreground">
                        {isKo ? calc.beforeKo : calc.beforeEn}
                      </td>
                      <td className="text-center px-4 py-4 text-sm text-green-400">
                        {isKo ? calc.afterKo : calc.afterEn}
                      </td>
                      <td className="text-center px-4 py-4 text-sm font-medium text-primary">
                        {isKo ? calc.savingsKo : calc.savingsEn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="bg-primary/5 px-6 py-6 border-t border-border/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {isKo ? "연간 비용 대비 예상 ROI" : "Expected ROI vs. Annual Cost"}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">500%+</span>
                    <span className="text-sm text-muted-foreground">
                      {isKo ? "첫 해 ROI" : "First Year ROI"}
                    </span>
                  </div>
                </div>
                <Button variant="gold" size="lg" className="gap-2" asChild>
                  <a href="#webinar">
                    {isKo ? "ROI 상세 분석 받기" : "Get Detailed ROI Analysis"}
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <Users className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isKo
              ? "전세계 500+ 기업이 비용을 절감하고 있습니다"
              : "500+ companies worldwide are saving costs"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ROISection;
