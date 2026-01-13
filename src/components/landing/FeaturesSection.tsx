import { BarChart2, Database, Download, Filter, LineChart, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Database,
      title: "Market & Platform Intelligence",
      description: "50+ 글로벌 시장의 마켓플레이스, 온라인스토어 매출, 랭킹, 트래픽 데이터",
      metrics: ["Revenue", "Traffic", "Market Share"],
    },
    {
      icon: BarChart2,
      title: "Competitive Landscape",
      description: "경쟁사 분석, 트랜잭션 KPI, 마케팅 분석으로 시장 구조 파악",
      metrics: ["Competitor Analysis", "Transaction KPIs", "Marketing"],
    },
    {
      icon: LineChart,
      title: "Growth Tracking",
      description: "성장 중인 기업을 사전에 포착하여 선제적 영업 기회 확보",
      metrics: ["Growth Rate", "Trend Analysis", "Alerts"],
    },
    {
      icon: Users,
      title: "Lead Database",
      description: "직함 기반 의사결정자 연락처 - Partnership, Ops, Strategy 리드",
      metrics: ["100K+ Contacts", "Role-based", "Verified"],
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description: "국가, 플랫폼 유형, 성장 지표 기반 세일즈 우선순위 필터링",
      metrics: ["Priority Score", "Custom Filters", "Saved Views"],
    },
    {
      icon: Download,
      title: "Export & Integration",
      description: "리드 Export, CRM 연계로 바로 영업에 활용",
      metrics: ["CSV Export", "CRM Sync", "API Access"],
    },
  ];

  return (
    <section id="features" className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            Features
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            ECDB가 제공하는 것
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            <span className="inline-block">❌ 무작위 데이터 수집 →</span>{" "}
            <span className="inline-block">✅ 지금 반드시 알아야 할 커머스 기업 KPI와 리스트</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            제공 데이터 상세 내용은{" "}
            <a
              href="https://ecdb.com/features"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              ecdb.com/features
            </a>
            에서 확인하세요
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group card-elevated rounded-2xl border border-border/50 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="mt-4 font-display text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {feature.metrics.map((metric, mIndex) => (
                  <span
                    key={mIndex}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
