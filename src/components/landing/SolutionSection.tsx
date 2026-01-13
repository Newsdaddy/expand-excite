import { BarChart3, Building2, Globe2, LineChart, Map, Users2 } from "lucide-react";

const SolutionSection = () => {
  const track1Features = [
    {
      icon: Globe2,
      title: "국가·지역 간 일관 비교",
      description: "시장 규모, 성장률, 경쟁 밀도를 일관된 기준으로 비교",
    },
    {
      icon: Map,
      title: "플랫폼 구조 분석",
      description: "카테고리 특성과 플랫폼별 진입 전략 도출",
    },
    {
      icon: BarChart3,
      title: "확장 우선순위",
      description: "데이터 기반 시장 진입 우선순위 명확화",
    },
  ];

  const track2Features = [
    {
      icon: LineChart,
      title: "성장 기업 포착",
      description: "지금 빠르게 성장 중인 마켓플레이스와 온라인스토어 식별",
    },
    {
      icon: Building2,
      title: "니즈 급증 기업",
      description: "물류/결제 니즈가 급증하는 기업 선제 파악",
    },
    {
      icon: Users2,
      title: "의사결정자 리드",
      description: "Partnership / Ops / Strategy 리드 직접 연결",
    },
  ];

  return (
    <section id="solutions" className="relative py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            Solution
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            두 가지 트랙으로 완벽한 솔루션
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Track 1 */}
          <div className="card-elevated rounded-3xl border border-border/50 p-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-primary">Track 1</span>
            </div>
            
            <h3 className="font-display text-2xl font-bold">
              Expansion Decision Intelligence
            </h3>
            <p className="mt-2 text-muted-foreground">
              전략팀을 위한 시장 확장 의사결정 인텔리전스
            </p>

            <div className="mt-8 space-y-6">
              {track1Features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track 2 */}
          <div className="card-elevated rounded-3xl border border-secondary/30 p-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-sm font-medium text-secondary">Track 2</span>
            </div>
            
            <h3 className="font-display text-2xl font-bold">
              Partnership & Sales Intelligence
            </h3>
            <p className="mt-2 text-muted-foreground">
              로지스틱/인프라 기업을 위한 파트너십 & 세일즈 리드
            </p>

            <div className="mt-8 space-y-6">
              {track2Features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <feature.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
