import { useLanguage } from "@/contexts/LanguageContext";
import { Quote, Users } from "lucide-react";

// 로고 이미지 import (PDF 53페이지 스타일)
import shoptalkLogo from "@/assets/logos/shoptalk_final.png";
import sprykerLogo from "@/assets/logos/spryker_final.png";
import ehiLogo from "@/assets/logos/ehi_final.png";
import kauflandLogo from "@/assets/logos/kaufland_final.png";
import flaconiLogo from "@/assets/logos/flaconi_final.png";
import bcgLogo from "@/assets/logos/bcg_final.png";

// PDF 53페이지 기반 실제 고객 증언
const testimonials = [
  {
    name: "Ben Miller",
    roleKo: "부사장",
    roleEn: "Vice President",
    company: "SHOPTALK",
    logo: shoptalkLogo,
    quoteKo: "ECDB는 유럽 이커머스 시장의 성과와 전망을 측정하는 독자적인 방법론을 개발했습니다",
    quoteEn: "ECDB has developed a unique, proprietary methodology to measure the performance and outlook of the European ecommerce market.",
  },
  {
    name: "Alexander Graf",
    roleKo: "CEO",
    roleEn: "CEO",
    company: "Spryker",
    logo: sprykerLogo,
    quoteKo: "거의 20년간 이커머스 데이터를 다뤄왔는데, ECDB 덕분에 드디어 진실을 볼 수 있게 되었습니다",
    quoteEn: "I've been working with e-commerce data for almost 20 years, and thanks to ECDB, I can finally see the truth.",
  },
  {
    name: "Michael Gerling",
    roleKo: "CEO",
    roleEn: "CEO",
    company: "EHI Retail Institute",
    logo: ehiLogo,
    quoteKo: "ECDB와 EHI는 강력한 파트너십을 공유하고 있습니다. 이커머스 시장에 대한 공동 분석은 업계에서 트렌드를 선도하고 있습니다",
    quoteEn: "ECDB and EHI share a strong partnership. The joint analyses of the e-commerce market are trend-setting in the industry.",
  },
  {
    name: "Michael Lüttgen",
    roleKo: "상무이사",
    roleEn: "Managing Director",
    company: "Kaufland",
    logo: kauflandLogo,
    quoteKo: "전략적 의사결정에 있어 ECDB의 마켓 데이터를 전적으로 신뢰합니다",
    quoteEn: "We fully trust ECDB's market data for strategic decision-making.",
  },
  {
    name: "David Rissmann",
    roleKo: "전략 담당 헤드",
    roleEn: "Head of Strategy",
    company: "Flaconi",
    logo: flaconiLogo,
    quoteKo: "ECDB 데이터는 우리의 경쟁사 분석에 큰 도움이 됩니다",
    quoteEn: "ECDB data is a great help for our competitive analysis.",
  },
  {
    name: "Antonella Mei-Pochler",
    roleKo: "선임 고문",
    roleEn: "Senior Advisor",
    company: "BCG",
    logo: bcgLogo,
    quoteKo: "ECDB로 인터넷상의 모든 '거래 기반 비즈니스 모델'을 최적의 방식으로 빠르게 이해할 수 있습니다",
    quoteEn: "With ECDB, you can quickly understand all 'transaction-based business models' on the internet in the most optimal way.",
  },
];

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const isKo = language === "ko";

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {isKo ? "고객 증언" : "Customer Testimonials"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isKo ? (
              <>
                <span className="text-primary">글로벌 커머스 산업 리더</span>
                <span className="text-gray-900">들이 구독합니다</span>
              </>
            ) : (
              <>
                <span className="text-primary">Global Commerce Leaders</span>
                <span className="text-gray-900"> Trust ECDB</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isKo
              ? "산업 전반에 걸쳐 의사결정자들은 복잡한 이커머스 시장에 명확성을 가져다주기 위해 ECDB에 의존합니다."
              : "Decision-makers across industries rely on ECDB to bring clarity to the complex e-commerce market."}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col h-full"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

              {/* Quote - flex-grow로 남은 공간 차지 */}
              <blockquote className="text-gray-700 relative z-10 leading-relaxed flex-grow">
                "{isKo ? testimonial.quoteKo : testimonial.quoteEn}"
              </blockquote>

              {/* 하단 고정: 로고 + 이름/직함 */}
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-100">
                {/* 회사 로고 (실제 이미지) - PDF 53페이지 스타일 */}
                <div className="flex-shrink-0 h-10 w-24 flex items-center justify-center overflow-hidden">
                  <img
                    src={testimonial.logo}
                    alt={`${testimonial.company} logo`}
                    className="max-h-8 max-w-full object-contain"
                  />
                </div>
                {/* 이름 & 직함 */}
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {isKo ? testimonial.roleKo : testimonial.roleEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
