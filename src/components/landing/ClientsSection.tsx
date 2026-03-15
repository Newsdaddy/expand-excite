import { useLanguage } from "@/contexts/LanguageContext";

const ClientsSection = () => {
  const { language } = useLanguage();
  const isKo = language === "ko";

  return (
    <section id="clients" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* PDF 기반 구독 기업 이미지 - 한글 52페이지 / 영문 51페이지 */}
        <img
          src={isKo ? "/images/clients_section.png" : "/images/clients_section_en.png"}
          alt={isKo ? "커머스 유관 전 산업에 걸쳐 리딩 기업들이 구독합니다" : "Trusted by Leaders Across All Industries"}
          className="w-full max-w-6xl mx-auto rounded-lg"
        />
      </div>
    </section>
  );
};

export default ClientsSection;
