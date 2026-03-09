import { useLanguage } from "@/contexts/LanguageContext";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";

const comparisons = [
  {
    beforeKo: "생성형AI에서 데이터 수집 및 검증 → 최대 3주",
    afterKo: "ECDB에서 한 번에 → 5분 이내",
    beforeEn: "Collecting & verifying data from GenAI → Up to 3 weeks",
    afterEn: "All in ECDB → Under 5 minutes",
    category: "time",
  },
  {
    beforeKo: "시장 분석 기준 제각각 → 감으로 결정",
    afterKo: "검증된 기준으로 분석 → 데이터 기반 의사결정",
    beforeEn: "Inconsistent market analysis standards → Gut decision",
    afterEn: "Verified benchmarks → Data-driven decision",
    category: "quality",
  },
  {
    beforeKo: "DB 없이 리드 찾기 → 시간 소진",
    afterKo: "검증된 데이터 + 리드 → 왜 이 회사인지, 누가 결정권자인지 분석 가능",
    beforeEn: "Finding leads without DB → Time wasted",
    afterEn: "Verified data + leads → Know why this company and who decides",
    category: "context",
  },
  {
    beforeKo: "어떤 셀러가 급성장 중인지 모름 → 뉴스 나오면 이미 늦음",
    afterKo: "스토어별 트래픽·매출 추적 → 성장 기업 선제 발굴",
    beforeEn: "No way to know which sellers are growing → Too late when it's news",
    afterEn: "Track store traffic & sales → Discover growth companies early",
    category: "timing",
  },
];

const testimonials = [
  {
    quoteKo: "ECDB 덕분에 베트남 진출 타당성 분석을 2주 → 2일로 줄였습니다.",
    quoteEn: "With ECDB, we reduced Vietnam market entry analysis from 2 weeks to 2 days.",
    roleKo: "글로벌 물류사 전략기획팀",
    roleEn: "Strategy Team, Global Logistics Company",
  },
  {
    quoteKo: "고성장 기업 리드를 먼저 확보하니 미팅 성사율이 2배로 올랐어요.",
    quoteEn: "Securing high-growth leads early doubled our meeting success rate.",
    roleKo: "핀테크 스타트업 BD팀",
    roleEn: "BD Team, Fintech Startup",
  },
];

const BeforeAfterSection = () => {
  const { language } = useLanguage();
  const isKo = language === 'ko';

  return (
    <section id="solution" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <Sparkles className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">
              {isKo ? "오? 이게 되네?" : "Wait, this actually works?"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isKo ? "지금 즉시 바꾸세요" : "Change It Now"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isKo
              ? "AI 시대, 데이터가 능률 올리고 매출 만듭니다"
              : "In the AI era, data drives efficiency and revenue"}
          </p>
        </div>

        {/* Before/After Comparisons */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid gap-4">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary/50 transition-colors shadow-sm"
              >
                <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
                  {/* Before */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mt-0.5">
                      <X className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Before</p>
                      <p className="text-foreground">
                        {isKo ? item.beforeKo : item.beforeEn}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>

                  {/* After */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">After ECDB</p>
                      <p className="text-foreground font-medium">
                        {isKo ? item.afterKo : item.afterEn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <blockquote className="text-lg mb-4">
                "{isKo ? testimonial.quoteKo : testimonial.quoteEn}"
              </blockquote>
              <p className="text-sm text-muted-foreground">
                — {isKo ? testimonial.roleKo : testimonial.roleEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
