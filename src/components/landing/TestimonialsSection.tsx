import { useLanguage } from "@/contexts/LanguageContext";
import { Quote, Building2 } from "lucide-react";

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

// 고객사 로고 플레이스홀더 - 나중에 실제 로고로 교체
const customerLogos = [
  { name: "Customer 1", placeholder: true },
  { name: "Customer 2", placeholder: true },
  { name: "Customer 3", placeholder: true },
  { name: "Customer 4", placeholder: true },
  { name: "Customer 5", placeholder: true },
  { name: "Customer 6", placeholder: true },
];

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const isKo = language === "ko";

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {isKo ? "고객 후기" : "Customer Stories"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isKo ? (
              <>
                <span className="text-gray-600">이미 많은 기업이</span>{" "}
                <span className="text-gray-900">ECDB와 함께합니다</span>
              </>
            ) : (
              <>
                <span className="text-gray-600">Leading companies</span>{" "}
                <span className="text-gray-900">trust ECDB</span>
              </>
            )}
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
              <blockquote className="text-lg mb-4 relative z-10">
                "{isKo ? testimonial.quoteKo : testimonial.quoteEn}"
              </blockquote>
              <p className="text-sm text-muted-foreground">
                — {isKo ? testimonial.roleKo : testimonial.roleEn}
              </p>
            </div>
          ))}
        </div>

        {/* Customer Logos */}
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-8">
            {isKo ? "ECDB를 신뢰하는 기업들" : "Trusted by leading companies"}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {customerLogos.map((logo, index) => (
              <div
                key={index}
                className="w-24 h-12 bg-gray-200/50 rounded-lg flex items-center justify-center text-xs text-muted-foreground"
              >
                {/* 실제 로고 이미지로 교체 예정 */}
                Logo {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
