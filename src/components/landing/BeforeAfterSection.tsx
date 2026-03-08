import { useLanguage } from "@/contexts/LanguageContext";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";

const comparisons = [
  {
    beforeKo: "여러 리포트에서 데이터 수집 → 3주",
    afterKo: "ECDB에서 한 번에 → 3시간",
    beforeEn: "Collecting data from multiple reports → 3 weeks",
    afterEn: "All in ECDB → 3 hours",
    category: "time",
  },
  {
    beforeKo: "시장 비교 기준이 제각각 → 감으로 결정",
    afterKo: "일관된 기준으로 비교 → 데이터로 결정",
    beforeEn: "Different standards for comparison → Gut decision",
    afterEn: "Consistent benchmarks → Data-driven decision",
    category: "quality",
  },
  {
    beforeKo: "LinkedIn으로 리드 찾기 → 맥락 없음",
    afterKo: "성장 데이터 + 리드 → '왜 이 회사인지' 설명 가능",
    beforeEn: "Finding leads on LinkedIn → No context",
    afterEn: "Growth data + leads → 'Why this company' explained",
    category: "context",
  },
  {
    beforeKo: "뉴스 보고 나서 연락 → 이미 늦음",
    afterKo: "성장 기업 선제 포착 → 타이밍 확보",
    beforeEn: "Contacting after news → Already late",
    afterEn: "Early growth detection → Perfect timing",
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
            {isKo ? "달라진 업무 방식" : "Transformed Workflows"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isKo
              ? "ECDB 도입 전후, 실제 사용자들의 변화입니다"
              : "Real changes experienced by actual users before and after ECDB"}
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
