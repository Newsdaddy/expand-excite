import { AlertCircle, HelpCircle, Clock, Target } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: HelpCircle,
      title: "국가 간 비교 기준 부재",
      description: "글로벌 커머스 시장 비교 시 기준이 중구난방입니다.",
      track: "Strategy",
    },
    {
      icon: AlertCircle,
      title: "플랫폼 선택이 감에 의존",
      description: "정량화되고 신뢰할 만한 플랫폼 KPI 데이터가 부재합니다.",
      track: "Strategy",
    },
    {
      icon: Target,
      title: "파트너십 타겟 불명확",
      description: "어느 마켓플레이스, 온라인스토어와 먼저 파트너십을 맺어야 하는지 모릅니다.",
      track: "Sales",
    },
    {
      icon: Clock,
      title: "세일즈 타이밍 부재",
      description: "리드는 있는데 우선순위와 타이밍이 없습니다. 성장 기업을 사전에 포착하기 어렵습니다.",
      track: "Sales",
    },
  ];

  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            <span className="inline-block">시장 · 플랫폼 · 기업 정보는</span>{" "}
            <span className="inline-block">흩어져 있다</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            의사결정도, 영업도 느립니다
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group card-elevated rounded-2xl border border-border/50 p-6 transition-all duration-300 hover:border-primary/30"
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  problem.track === "Strategy" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-secondary/10 text-secondary"
                }`}>
                  <problem.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      problem.track === "Strategy"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    }`}>
                      {problem.track}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold">{problem.title}</h3>
                  <p className="mt-2 text-muted-foreground">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border/50 bg-muted/30 p-6 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            <span className="inline-block">한 줄 요약:</span>{" "}
            <span className="inline-block text-foreground">'누가 곧 커질지, 누구에게 지금 연락해야 하는지 모른다.'</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
