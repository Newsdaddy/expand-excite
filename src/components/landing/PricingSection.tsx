import { Check, Users, Zap, Database, BarChart3, Bot, Headphones, Globe, Puzzle, Download, Server, Plus, ShoppingCart, Layers, UserSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSection = () => {
  const { language } = useLanguage();
  const isKo = language === "ko";

  const features = [
    {
      category: isKo ? "데이터 종류" : "Data Types",
      items: [
        { icon: Database, label: isKo ? "리테일 데이터" : "Retail Data" },
        { icon: Database, label: isKo ? "마켓 데이터" : "Market Data" },
        { icon: BarChart3, label: isKo ? "실거래 데이터" : "Transaction Data" },
        { icon: BarChart3, label: isKo ? "연간 + 월간 데이터" : "Annual + Monthly Data" },
      ],
    },
    {
      category: isKo ? "시트 & 크레딧" : "Seats & Credits",
      items: [
        { icon: Users, label: isKo ? "5 시트" : "5 Seats" },
        { icon: Zap, label: isKo ? "월 10,000 크레딧" : "10,000 Monthly Credits" },
      ],
    },
    {
      category: isKo ? "기능" : "Tools & Capabilities",
      items: [
        { icon: BarChart3, label: isKo ? "프로필 분석" : "Profiles" },
        { icon: BarChart3, label: isKo ? "분석 & 비교" : "Analyze & Compare" },
        { icon: BarChart3, label: isKo ? "랭킹" : "Rankings" },
        { icon: Bot, label: isKo ? "AI 어시스턴트" : "AI Assistant" },
      ],
    },
    {
      category: isKo ? "Add-on" : "Add-ons",
      items: [
        { icon: Layers, label: isKo ? "카테고리 세분화 도구" : "Category Breakdown Tool" },
        { icon: ShoppingCart, label: isKo ? "아마존 세분화 분석 도구" : "Amazon Breakdown Analysis Tool" },
        { icon: UserSearch, label: isKo ? "임직원 DB 탐색 도구" : "Employee DB Explorer Tool" },
      ],
    },
    {
      category: isKo ? "서포트" : "Support",
      items: [
        { icon: Headphones, label: isKo ? "전담 어카운트 매니저" : "Dedicated Account Manager" },
      ],
    },
    {
      category: isKo ? "접근 & 연동" : "Access & Integrations",
      items: [
        { icon: Globe, label: isKo ? "웹 앱" : "Web App" },
        { icon: Puzzle, label: isKo ? "브라우저 확장 프로그램" : "Browser Extension" },
        { icon: Download, label: isKo ? "다운로드" : "Downloads" },
        { icon: Server, label: isKo ? "API 접근" : "API Access" },
        { icon: Server, label: "MCP Server" },
      ],
    },
  ];

  return (
    <section id="pricing" className="relative py-16 bg-white">
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-secondary">
            {isKo ? "플랜" : "Plan"}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            {isKo ? "Enterprise" : "Enterprise"}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {isKo
              ? "API 연동과 맞춤형 분석이 필요한 대기업을 위한 올인원 솔루션"
              : "All-in-one solution for large enterprises needing API integration and custom analysis"}
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-4xl">
          <div className="rounded-2xl border border-primary bg-primary/5 p-8 shadow-lg">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    {section.category}
                  </h4>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-primary/20 text-center">
              <Button
                variant="gold"
                size="lg"
                className="px-12"
                asChild
              >
                <a href="#webinar">
                  {isKo ? "상담 신청하기" : "Request Consultation"}
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">
            {isKo ? "전체 플랜 비교는" : "For full plan comparison, visit"}{" "}
            <a
              href="https://ecdb.com/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              ecdb.com/pricing
            </a>{" "}
            {isKo ? "에서 확인하세요" : ""}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
