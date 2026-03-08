import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Store,
  Building2,
  Globe,
  Trophy,
  Users,
  BarChart3,
  ChevronRight,
  Check,
  Database,
  TrendingUp,
  CreditCard,
  Truck,
  LineChart,
} from "lucide-react";

const features = [
  {
    id: "retailer",
    icon: Store,
    titleKo: "Retailer Profiles",
    titleEn: "Retailer Profiles",
    subtitleKo: "리테일러 심층 분석",
    subtitleEn: "In-depth retailer analysis",
    descKo: "10,000+ 글로벌 리테일러의 매출, GMV, 트래픽, 트랜잭션 KPI를 한눈에 파악하세요.",
    descEn: "View revenue, GMV, traffic, and transaction KPIs for 10,000+ global retailers at a glance.",
    dataPoints: [
      { ko: "연간/월간 GMV", en: "Annual/Monthly GMV" },
      { ko: "1P/3P 매출 구분", en: "1P/3P Revenue Split" },
      { ko: "트래픽 & 전환율", en: "Traffic & Conversion" },
      { ko: "카테고리별 매출 분포", en: "Revenue by Category" },
      { ko: "국가별 매출 분포", en: "Revenue by Country" },
      { ko: "YoY 성장률", en: "YoY Growth Rate" },
    ],
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    id: "store",
    icon: Database,
    titleKo: "Store Profiles",
    titleEn: "Store Profiles",
    subtitleKo: "온라인 스토어 상세 데이터",
    subtitleEn: "Online store detailed data",
    descKo: "개별 온라인 스토어의 결제, 배송, 기술 스택까지 상세하게 분석합니다.",
    descEn: "Analyze individual online stores including payments, shipping, and tech stack.",
    dataPoints: [
      { ko: "결제 수단 현황", en: "Payment Methods" },
      { ko: "배송 파트너사", en: "Shipping Partners" },
      { ko: "쇼핑몰 플랫폼 (Shopify 등)", en: "Shop Platform (Shopify, etc.)" },
      { ko: "모바일 앱 리뷰/평점", en: "Mobile App Reviews/Ratings" },
      { ko: "트래픽 소스 분석", en: "Traffic Source Analysis" },
      { ko: "전환 퍼널 KPI", en: "Conversion Funnel KPIs" },
    ],
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    id: "market",
    icon: Globe,
    titleKo: "Market Intelligence",
    titleEn: "Market Intelligence",
    subtitleKo: "30,000+ 글로벌 마켓 분석",
    subtitleEn: "30,000+ global market analysis",
    descKo: "150+ 국가, 250+ 카테고리 조합으로 30,000개 이상의 개별 시장을 분석합니다.",
    descEn: "Analyze 30,000+ individual markets across 150+ countries and 250+ categories.",
    dataPoints: [
      { ko: "국가별 이커머스 규모", en: "Ecommerce Size by Country" },
      { ko: "카테고리별 성장률", en: "Growth by Category" },
      { ko: "시장 점유율 분석", en: "Market Share Analysis" },
      { ko: "경쟁 밀도 지표", en: "Competition Density Index" },
      { ko: "진입 장벽 평가", en: "Entry Barrier Assessment" },
      { ko: "트렌드 예측", en: "Trend Forecasting" },
    ],
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  {
    id: "ranking",
    icon: Trophy,
    titleKo: "Rankings",
    titleEn: "Rankings",
    subtitleKo: "맞춤형 랭킹 시스템",
    subtitleEn: "Customizable ranking system",
    descKo: "국가, 카테고리, 비즈니스 모델(1P/3P/Hybrid)별로 필터링하여 나만의 랭킹을 생성하세요.",
    descEn: "Create custom rankings filtered by country, category, and business model (1P/3P/Hybrid).",
    dataPoints: [
      { ko: "국가별 Top 100", en: "Top 100 by Country" },
      { ko: "카테고리별 리더", en: "Category Leaders" },
      { ko: "1P/3P/Hybrid 필터", en: "1P/3P/Hybrid Filter" },
      { ko: "성장률 기준 정렬", en: "Sort by Growth Rate" },
      { ko: "월간 업데이트", en: "Monthly Updates" },
      { ko: "Excel 다운로드", en: "Excel Download" },
    ],
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
  },
  {
    id: "leads",
    icon: Users,
    titleKo: "Leads & Contacts",
    titleEn: "Leads & Contacts",
    subtitleKo: "100K+ 의사결정자 DB",
    subtitleEn: "100K+ decision-maker database",
    descKo: "Partnership, Operations, Strategy 담당자 연락처를 직접 확보하세요.",
    descEn: "Get direct contacts for Partnership, Operations, and Strategy decision-makers.",
    dataPoints: [
      { ko: "직함 기반 필터링", en: "Title-based Filtering" },
      { ko: "이메일 + LinkedIn", en: "Email + LinkedIn" },
      { ko: "검증된 연락처", en: "Verified Contacts" },
      { ko: "회사 규모별 필터", en: "Filter by Company Size" },
      { ko: "국가/지역별 필터", en: "Filter by Country/Region" },
      { ko: "CRM 연동 Export", en: "CRM Integration Export" },
    ],
    color: "from-red-500/20 to-rose-500/20",
    borderColor: "border-red-500/30",
  },
  {
    id: "compare",
    icon: BarChart3,
    titleKo: "Analyze & Compare",
    titleEn: "Analyze & Compare",
    subtitleKo: "맞춤형 비교 분석",
    subtitleEn: "Custom comparison analysis",
    descKo: "최대 4개 스토어/마켓을 선택하여 나만의 비교 차트와 테이블을 생성하세요.",
    descEn: "Select up to 4 stores/markets to create custom comparison charts and tables.",
    dataPoints: [
      { ko: "시계열 비교 차트", en: "Time-series Comparison" },
      { ko: "벤치마크 분석", en: "Benchmark Analysis" },
      { ko: "PDF/PNG 내보내기", en: "PDF/PNG Export" },
      { ko: "Excel 데이터 추출", en: "Excel Data Export" },
      { ko: "커스텀 지표 선택", en: "Custom Metric Selection" },
      { ko: "보고서 자동 생성", en: "Auto Report Generation" },
    ],
    color: "from-indigo-500/20 to-violet-500/20",
    borderColor: "border-indigo-500/30",
  },
];

const SolutionDetailSection = () => {
  const { language } = useLanguage();
  const isKo = language === "ko";
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section id="features-detail" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Database className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {isKo ? "ECDB 데이터 상세" : "ECDB Data Details"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isKo ? (
              <>
                <span className="text-gray-600">10억+ 트랜잭션 기반</span>
                <br />
                <span className="text-gray-900">프리미엄 이커머스 인텔리전스</span>
              </>
            ) : (
              <>
                <span className="text-gray-600">Built on 1B+ Transactions</span>
                <br />
                <span className="text-gray-900">Premium Ecommerce Intelligence</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isKo
              ? "마스터카드 등 글로벌 결제사 데이터를 기반으로 한 신뢰할 수 있는 시장 인텔리전스"
              : "Reliable market intelligence based on data from global payment companies like Mastercard"}
          </p>
        </div>

        {/* Feature Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = activeFeature.id === feature.id;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {feature.titleKo}
              </button>
            );
          })}
        </div>

        {/* Feature Detail Card */}
        <div className="max-w-5xl mx-auto">
          <div
            className={`relative bg-gradient-to-br ${activeFeature.color} border ${activeFeature.borderColor} rounded-2xl p-8 md:p-12`}
          >
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Left: Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const Icon = activeFeature.icon;
                    return (
                      <div className="w-12 h-12 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="text-2xl font-bold">{activeFeature.titleKo}</h3>
                    <p className="text-sm text-muted-foreground">
                      {isKo ? activeFeature.subtitleKo : activeFeature.subtitleEn}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-foreground/80 mb-8">
                  {isKo ? activeFeature.descKo : activeFeature.descEn}
                </p>

                <Button variant="gold" className="gap-2" asChild>
                  <a href="#webinar">
                    {isKo ? "웨비나에서 자세히 보기" : "See Details in Webinar"}
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              {/* Right: Data Points */}
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-6">
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  {isKo ? "제공 데이터" : "Available Data"}
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {activeFeature.dataPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">{isKo ? point.ko : point.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Source Badge */}
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {isKo ? "월간 업데이트" : "Monthly Updates"}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-16 pt-12 border-t border-border/50">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {isKo ? "마스터카드 데이터 파트너" : "Mastercard Data Partner"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {isKo ? "월 10억+ 트랜잭션 분석" : "1B+ Monthly Transactions"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {isKo ? "150+ 국가 커버리지" : "150+ Countries Coverage"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionDetailSection;
