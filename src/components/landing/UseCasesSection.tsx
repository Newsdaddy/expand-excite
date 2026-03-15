import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Store,
  Factory,
  Megaphone,
  Briefcase,
  Code,
  Truck,
  CreditCard,
  GraduationCap,
  TrendingUp,
  Building2,
  ChevronRight,
  Check,
} from "lucide-react";

// Use case images (300 DPI, cropped - no header/footer)

const useCases = [
  {
    id: "retail",
    icon: Store,
    labelEn: "Retail",
    labelKo: "리테일",
    imageKo: "/images/usecase_42_cropped.png",
    imageEn: "/images/usecase_en_42_cropped.png",
    titleEn: "Your Retail Needs, Solved With Data",
    titleKo: "리테일 니즈, 데이터로 해결",
    subtitleEn: "Access all your market and competitor data in one place.",
    subtitleKo: "모든 시장 및 경쟁사 데이터를 한 곳에서 접근하세요.",
    clientsEn: "Alibaba, IKEA, eBay, The Home Depot, MediaMarkt, SHEIN",
    clientsKo: "Alibaba, IKEA, eBay, The Home Depot, MediaMarkt, SHEIN",
    benefits: [
      { titleKo: "모든 데이터를 한 곳에", titleEn: "All Your Data in One Place", descKo: "시장, 경쟁사, 성과 데이터를 한 곳에서 관리", descEn: "Stop juggling sources—get all your market, competitor, and performance data in one place." },
      { titleKo: "시장 & 성과 벤치마크", titleEn: "Benchmark Your Market & Performance", descKo: "트렌드를 추적하고, 경쟁사를 분석하며, 신뢰할 수 있는 벤치마킹 데이터로 성과 측정", descEn: "Track trends, analyze competitors, and measure your performance with reliable benchmarking data." },
      { titleKo: "고객 파악 & 전략 최적화", titleEn: "Know Your Customers, Optimize Strategy", descKo: "이커머스 쇼핑객에 대한 인사이트로 메시지 개선, 전환율 향상", descEn: "Gain insights into e-commerce shoppers to refine messaging, boost conversions, and stay ahead." },
      { titleKo: "경쟁사 추적 & 스마트 확장", titleEn: "Track Competitors & Expand Smartly", descKo: "경쟁사 모니터링, 시장 갭 발견, 성장 기회 식별", descEn: "Monitor competitors, spot market gaps, and identify the best opportunities for growth." },
    ],
  },
  {
    id: "manufacturing",
    icon: Factory,
    labelEn: "Manufacturing",
    labelKo: "제조",
    imageKo: "/images/usecase_43_cropped.png",
    imageEn: "/images/usecase_en_43_cropped.png",
    titleEn: "Retail & Market Data at Your Fingertips",
    titleKo: "손끝에서 만나는 리테일 & 시장 데이터",
    subtitleEn: "Access all your retail partner and market data in one platform.",
    subtitleKo: "모든 리테일 파트너 및 시장 데이터를 하나의 플랫폼에서 접근하세요.",
    clientsEn: "Apple, Coca-Cola, L'Oréal, Nike, LVMH",
    clientsKo: "Apple, Coca-Cola, L'Oréal, Nike, LVMH",
    benefits: [
      { titleKo: "스마트한 주요 거래처 관리", titleEn: "Smarter Key Account Planning", descKo: "데이터 기반 전략으로 주요 리테일러 관계 관리, 협상 최적화, 파트너십 강화", descEn: "Manage key retailer relationships with data-driven strategies, optimized negotiations, and stronger partnerships." },
      { titleKo: "빠른 실행 가능 인사이트", titleEn: "Fast, Actionable Insights", descKo: "실시간 신뢰할 수 있는 데이터로 정보에 기반한 결정 및 전략적 성장 추진", descEn: "Access real-time, reliable data to make informed decisions and drive strategic growth." },
      { titleKo: "시장 트렌드 & 수요 예측", titleEn: "Market Trends & Demand Forecasting", descKo: "산업 트렌드 추적, 경쟁 분석, 더 나은 계획을 위한 수요 예측", descEn: "Track industry trends, analyze competition, and forecast demand for better planning." },
      { titleKo: "신시장 진출", titleEn: "Expand into New Markets", descKo: "심층 마켓 인사이트와 타깃 전략으로 새로운 시장 및 리테일 채널 발굴", descEn: "Uncover new markets and retail channels with deep market insights and targeted strategies." },
    ],
  },
  {
    id: "agency",
    icon: Megaphone,
    labelEn: "Agency",
    labelKo: "에이전시",
    imageKo: "/images/usecase_44_cropped.png",
    imageEn: "/images/usecase_en_44_cropped.png",
    titleEn: "Drive Your Agency's Success with Data",
    titleKo: "데이터로 에이전시 성공을 이끄세요",
    subtitleEn: "Equip your team with reliable data for real-time problem-solving and impactful strategies.",
    subtitleKo: "실시간 문제 해결과 임팩트 있는 전략을 위한 신뢰할 수 있는 데이터로 팀을 무장하세요.",
    clientsEn: "Wunderman, Omnicom Group, Dentsu, HAVAS, BBDO",
    clientsKo: "Wunderman, Omnicom Group, Dentsu, HAVAS, BBDO",
    benefits: [
      { titleKo: "세분화된 시장 인사이트", titleEn: "Granular Market Insights by Product Segment", descKo: "월간 분석으로 트렌드 추적, 수요 변화 모니터링, 새로운 기회 발굴", descEn: "Use monthly analysis to track trends, monitor demand shifts, and uncover new opportunities." },
      { titleKo: "카테고리별 리더 & 도전자", titleEn: "Leaders and Challengers in Each Category", descKo: "최고 성과자를 식별하여 효과적인 벤치마킹 및 시장 포지셔닝 강화", descEn: "Identify top performers to benchmark effectively and sharpen your market positioning." },
      { titleKo: "이커머스 트렌드 기반 전략", titleEn: "Strategy Development Based on e-commerce Trends", descKo: "이커머스 발전 동향을 활용하여 전략 개선 및 경쟁 우위 확보", descEn: "Leverage e-commerce developments to refine strategies and stay ahead of the curve." },
      { titleKo: "핵심 마케팅 KPI 벤치마킹", titleEn: "Benchmarking Key Marketing KPIs", descKo: "SEA 예산, SEO 가시성, 트래픽, AOV, 전환율 비교로 갭 식별 및 성과 향상", descEn: "Compare SEA budgets, SEO visibility, traffic, AOV, and conversion rates to identify gaps and boost performance." },
    ],
  },
  {
    id: "consultancy",
    icon: Briefcase,
    labelEn: "Consultancy",
    labelKo: "컨설팅",
    imageKo: "/images/usecase_45_cropped.png",
    imageEn: "/images/usecase_en_45_cropped.png",
    titleEn: "Gain Industry Expertise with Trusted Data",
    titleKo: "실거래 데이터 기반 커머스 시장 CDD",
    subtitleEn: "Gain industry expertise quickly with reliable, easy-to-use market intelligence, trusted by Stanford and McKinsey.",
    subtitleKo: "Stanford와 McKinsey가 신뢰하는 사용하기 쉬운 시장 인텔리전스로 빠르게 산업 전문성을 확보하세요.",
    clientsEn: "Deloitte, Accenture, BCG, EY, GroupM",
    clientsKo: "Deloitte, Accenture, BCG, EY, GroupM",
    benefits: [
      { titleKo: "고객 문제 해결 & 전문성 강화", titleEn: "Solving Customer Problems & Gaining Expertise", descKo: "고객사 커머스 시장 대응 과제와 솔루션에 데이터 즉시 활용", descEn: "Instantly leverage data for client commerce market challenges and solutions." },
      { titleKo: "전략 모듈 & 기업 모듈 실무", titleEn: "Strategy Module & Company Module Practice", descKo: "생성형AI로 접근 불가능한 실거래 기반 데이터를 CDD, 밸류에이션 작업에 즉시 삽입", descEn: "Instantly insert transaction-based data unavailable via GenAI into project workflows." },
      { titleKo: "효율적인 시장 대응", titleEn: "Efficient Market Response", descKo: "리포트, 백서로 글로벌 이커머스 시장 트렌드 분석하고 핵심 플레이어 식별해 대응 전략 컨설팅", descEn: "Analyze global ecommerce market trends with reports and whitepapers, identify key players for strategic consulting." },
      { titleKo: "데이터 기반 전략 솔루션", titleEn: "Data-Driven Strategic Solutions", descKo: "ECDB 고품질 데이터를 보유 데이터와 통합, 컨설팅사 만의 맞춤 인사이트 도출해 고객 성공 견인", descEn: "Integrate ECDB high-quality data with your own data to derive unique consulting insights and drive client success." },
    ],
  },
  {
    id: "software",
    icon: Code,
    labelEn: "Software & Tech",
    labelKo: "소프트웨어 & 테크",
    imageKo: "/images/usecase_46_cropped.png",
    imageEn: "/images/usecase_en_46_cropped.png",
    titleEn: "Unlock High-Potential Leads & Markets",
    titleKo: "고잠재력 리드 & 시장 발굴",
    subtitleEn: "ECDB's retailer rankings and filtering features help you easily identify high-potential leads and markets.",
    subtitleKo: "ECDB의 리테일러 랭킹 및 필터링 기능으로 고잠재력 리드와 시장을 쉽게 식별하세요.",
    clientsEn: "Shopify, AWS, Heureka Group, Mirakl, Tradebyte",
    clientsKo: "Shopify, AWS, Heureka Group, Mirakl, Tradebyte",
    benefits: [
      { titleKo: "리드 발굴 & 파트너 식별", titleEn: "Lead Generation & Partner Identification", descKo: "양질의 리드와 핵심 연락처 및 잠재 파트너를 정확히 찾아 비즈니스 개발 가속화", descEn: "Generate quality leads and pinpoint key contacts and potential partners to accelerate business development." },
      { titleKo: "시장 인사이트로 피칭 강화", titleEn: "Enhance Pitches with Market Insights", descKo: "관련 시장 인사이트와 맥락을 통합하여 제안의 설득력 향상", descEn: "Add value to your pitches by integrating relevant market insights and context to make your proposals more compelling." },
      { titleKo: "효율적인 시장 이해", titleEn: "Efficient Market Understanding", descKo: "시장 역학을 빠르게 분석하고, 신흥 트렌드 파악, 새로운 성장 기회 발굴", descEn: "Quickly analyze market dynamics to stay ahead, spot emerging trends, and uncover new growth opportunities." },
      { titleKo: "성장을 위한 파트너십 확장", titleEn: "Expand Partnerships for Growth", descKo: "새로운 시장 세그먼트와 전략적 파트너를 식별하여 확장 촉진 및 지속 가능한 성장 추진", descEn: "Identify new market segments and strategic partners to fuel expansion and drive sustainable growth." },
    ],
  },
  {
    id: "logistics",
    icon: Truck,
    labelEn: "Shipping & Logistics",
    labelKo: "배송 & 물류",
    imageKo: "/images/usecase_47_cropped.png",
    imageEn: "/images/usecase_en_47_cropped.png",
    titleEn: "Optimize Your Shipping & Logistics Operations",
    titleKo: "배송 & 물류 운영 최적화",
    subtitleEn: "Our market intelligence helps you identify key contacts, analyze provider networks, and plan for demand fluctuations.",
    subtitleKo: "시장 인텔리전스로 핵심 연락처 식별, 공급자 네트워크 분석, 수요 변동 계획 수립을 지원합니다.",
    clientsEn: "DHL, Deutsche Post, MAERSK, Hermes, FedEx",
    clientsKo: "DHL, Deutsche Post, MAERSK, Hermes, FedEx",
    benefits: [
      { titleKo: "리드 발굴 & 거래처 계획", titleEn: "Lead Generation & Account Planning", descKo: "거래처 리드 발굴, 주요 거래처 관리 시 데이터 기반 전략 수립", descEn: "Generate account leads and establish data-driven strategies for key account management." },
      { titleKo: "거래처 관리 및 실행용 데이터", titleEn: "Data for Account Management & Execution", descKo: "실거래 데이터 기반 주요 거래처 동향 파악 및 향후 전망", descEn: "Understand key account trends and future outlook based on transaction data." },
      { titleKo: "시장 & 파트너 확장", titleEn: "Market & Partner Expansion", descKo: "새로운 시장과 잠재 파트너를 식별하여 성장 및 전략적 파트너십 촉진", descEn: "Identify new markets and potential partners to fuel growth and strategic partnerships." },
      { titleKo: "성장 & 해외 확장 전략", titleEn: "Growth & Global Expansion Strategy", descKo: "글로벌 국가별 커머스 시장 성장 섹터, 기업 및 마켓플레이스 종횡 분석해 GTM 전략 수립 및 수행", descEn: "Analyze global commerce market growth sectors, companies, and marketplaces by country to establish and execute GTM strategies." },
    ],
  },
  {
    id: "payment",
    icon: CreditCard,
    labelEn: "Payment",
    labelKo: "결제",
    imageKo: "/images/usecase_48_cropped.png",
    imageEn: "/images/usecase_en_48_cropped.png",
    titleEn: "Accelerate Growth in Your Payment Business",
    titleKo: "결제 비즈니스 성장 가속화",
    subtitleEn: "Gain insights into payment trends, identify growth opportunities, and find the right leads with filterable rankings.",
    subtitleKo: "결제 트렌드 인사이트 확보, 성장 기회 식별, 필터링 가능한 랭킹으로 적합한 리드 발굴.",
    clientsEn: "Alipay, PayPal, Adyen, Worldpay",
    clientsKo: "Alipay, PayPal, Adyen, Worldpay",
    benefits: [
      { titleKo: "고객 확보 & 타겟팅", titleEn: "Customer Acquisition & Targeting", descKo: "타겟 리스트 생성 및 풍부한 데이터 기반 피칭으로 고객 확보 및 전환 촉진", descEn: "Acquire customers by creating targeted lists and crafting enriched, data-backed pitches to drive conversions." },
      { titleKo: "고객 유지 & 서비스", titleEn: "Customer Retention & Service", descKo: "고객 관계 강화 및 맞춤 인사이트로 기존 고객 서비스 제공, 만족도 향상", descEn: "Enhance customer relationships and service existing clients with tailored insights for improved satisfaction." },
      { titleKo: "경쟁사 분석 & 시장 성장", titleEn: "Competitor Analysis & Market Growth", descKo: "경쟁사 이해 및 지속 가능한 장기 성장 전략 구축을 위한 시장 성장 예측", descEn: "Understand competitors and project market growth to build a sustainable, long-term growth strategy." },
      { titleKo: "성장을 위한 데이터 기반 전략", titleEn: "Data-Driven Strategy for Growth", descKo: "데이터를 활용하여 고객 확보, 유지, 장기 성공을 지원하는 효과적인 전략 수립", descEn: "Use data to create effective strategies that support customer acquisition, retention, and long-term success." },
    ],
  },
  {
    id: "university",
    icon: GraduationCap,
    labelEn: "University & Institution",
    labelKo: "대학 & 기관",
    imageKo: "/images/usecase_49_cropped.png",
    imageEn: "/images/usecase_en_49_cropped.png",
    titleEn: "Boost Academic Research with Data",
    titleKo: "데이터로 학술 연구 강화",
    subtitleEn: "Equip your students with a top-tier platform for analyzing online transactions and e-commerce.",
    subtitleKo: "온라인 거래 및 이커머스 분석 글로벌 No.1 데이터로 연구자들을 지원하세요.",
    clientsEn: "Stanford, MIT, University of St. Gallen, Yale University, University of Exeter",
    clientsKo: "Stanford, MIT, University of St. Gallen, Yale University, University of Exeter",
    benefits: [
      { titleKo: "학제 간 유연한 활용", titleEn: "Flexible Use Cases Across Disciplines", descKo: "광범위한 학문 분야와 연구 주제에 맞는 데이터로 다양한 연구 니즈 지원", descEn: "Support diverse research needs with data that fits a wide range of academic fields and study focuses." },
      { titleKo: "쉽고 편리한 데이터 접근", titleEn: "Easy & Convenient Data Access", descKo: "XLS 형식의 다운로드 가능한 데이터셋에 언제 어디서나 바로 접근", descEn: "Access ready-to-use, downloadable datasets in XLS format—anytime, from anywhere." },
      { titleKo: "정교한 모델링", titleEn: "Sophisticated Modeling", descKo: "학술 및 과학 기준에 따라 준비된 투명하고 검증된 데이터로 연구 수행", descEn: "Work with transparent, verified data prepared according to academic and scientific standards." },
      { titleKo: "원활한 접근 & 사용권", titleEn: "Seamless Access & Usage Rights", descKo: "IP, EZproxy, Shibboleth 접근을 통한 전체 출판 권한 및 원활한 통합", descEn: "Benefit from full publication rights and smooth integration via IP, EZproxy, or Shibboleth access." },
    ],
  },
  {
    id: "finance",
    icon: TrendingUp,
    labelEn: "Finance & Investment",
    labelKo: "금융 & 투자",
    imageKo: "/images/usecase_50_cropped.png",
    imageEn: "/images/usecase_en_50_cropped.png",
    titleEn: "Spot High-Value Investments with Data",
    titleKo: "검증된 데이터 기반 밸류에이션",
    subtitleEn: "Leverage our monthly updated e-commerce data to track market trends, evaluate companies, and uncover high-potential investment opportunities.",
    subtitleKo: "월간 업데이트되는 이커머스 데이터로 시장 트렌드 추적, 기업 평가, 고잠재력 투자 기회 발굴.",
    clientsEn: "Goldman Sachs, Wells Fargo, BNP Paribas, PIF, Santander",
    clientsKo: "Goldman Sachs, Wells Fargo, BNP Paribas, PIF, Santander",
    benefits: [
      { titleKo: "투자 기회 식별", titleEn: "Identifying Investment Opportunities", descKo: "가치 있는 투자 기회를 발굴하고 시장보다 앞서 나가도록 지원", descEn: "We help you spot valuable investment opportunities and stay ahead of the market." },
      { titleKo: "성장 & 투자에 대한 스타트업 자문", titleEn: "Consulting Startups on Growth and Investment", descKo: "성장 전략 및 투자 준비에 대한 스타트업 자문 지원", descEn: "Our features assist in advising startups on strategies for growth and preparing for investment." },
      { titleKo: "잠재 투자 사례 분석 & 평가", titleEn: "Analyzing and Evaluating Potential Investment Cases", descKo: "투자 사례에 대한 심층 성과 및 시장 잠재력 분석 제공", descEn: "We provide in-depth performance and market potential analysis for investment cases." },
      { titleKo: "빠른 시장 인사이트 & 파트너 발굴", titleEn: "Fast Market Insights & Partner Discovery", descKo: "시장 인사이트를 빠르게 확보하고 핵심 파트너 및 투자 기회 식별", descEn: "Quickly gain market insights and identify key partners and investment opportunities." },
    ],
  },
];

const UseCasesSection = () => {
  const { language } = useLanguage();
  const isKo = language === "ko";
  const [activeUseCase, setActiveUseCase] = useState(useCases[0]);

  // Korean version: PDF 슬라이드 이미지 그대로 표시
  if (isKo) {
    return (
      <section id="use-cases" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                산업별 활용 사례
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gray-600">이커머스 데이터 솔루션 하나로,</span>
              <br />
              <span className="text-primary">커머스 전략 무제한 활용</span>
            </h2>
          </div>

          {/* Industry Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              const isActive = activeUseCase.id === useCase.id;
              return (
                <button
                  key={useCase.id}
                  onClick={() => setActiveUseCase(useCase)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {useCase.labelKo}
                </button>
              );
            })}
          </div>

          {/* PDF 슬라이드 이미지 표시 */}
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <img
                src={activeUseCase.imageKo}
                alt={`${activeUseCase.labelKo} 활용 사례`}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button variant="gold" size="lg" className="gap-2" asChild>
              <a href="#webinar">
                온라인 컨설팅에서 자세히 보기
                <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // English version: Tab-based with PPT images
  return (
    <section id="use-cases" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Use Cases by Industry
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gray-600">One Source of Market Intelligence —</span>
            <br />
            <span className="text-primary">Countless Use Cases Across Industries</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Different industries have different needs. ECDB delivers the market intelligence to meet them all.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            const isActive = activeUseCase.id === useCase.id;
            return (
              <button
                key={useCase.id}
                onClick={() => setActiveUseCase(useCase)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {useCase.labelEn}
              </button>
            );
          })}
        </div>

        {/* PPT Image Display */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <img
              src={activeUseCase.imageEn}
              alt={`${activeUseCase.labelEn} Use Case`}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="gold" size="lg" className="gap-2" asChild>
            <a href="#webinar">
              See Details in Webinar
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
