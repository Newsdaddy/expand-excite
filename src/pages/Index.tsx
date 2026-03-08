import Header from "@/components/landing/Header";
import PainPointHero from "@/components/landing/PainPointHero";
import BeforeAfterSection from "@/components/landing/BeforeAfterSection";
import SolutionSection from "@/components/landing/SolutionSection";
import SolutionDetailSection from "@/components/landing/SolutionDetailSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ROISection from "@/components/landing/ROISection";
import PricingSection from "@/components/landing/PricingSection";
import WebinarCTASection from "@/components/landing/WebinarCTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Pain Point Hero - "어? 내 문제네?" */}
        <PainPointHero />

        {/* Before/After - "오? 이게 되네?" */}
        <BeforeAfterSection />

        {/* Solution Overview */}
        <SolutionSection />

        {/* Solution Details - PPT 기반 상세 */}
        <SolutionDetailSection />

        {/* Features - ECDB 상세 기능 */}
        <FeaturesSection />

        {/* ROI - 비용 절감/매출 창출 */}
        <ROISection />

        {/* Pricing */}
        <PricingSection />

        {/* Webinar CTA */}
        <WebinarCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
