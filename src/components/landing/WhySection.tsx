import { ArrowRight, Check, X } from "lucide-react";

const WhySection = () => {
  const comparisons = [
    {
      old: "시장 리포트 → 전략팀만 사용",
      new: "전략과 영업을 같은 데이터로 연결",
    },
    {
      old: "LinkedIn Sales Navigator → 맥락 없음",
      new: "시장 성장 데이터 + 세일즈 리드 결합",
    },
    {
      old: "내부 리드 DB → 최신성/우선순위 부족",
      new: "'왜 이 회사인가'가 설명된다",
    },
  ];

  return (
    <section id="why-ecdb" className="relative py-24">
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--gradient-glow)' }}
      />
      
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-secondary">
            Why ECDB
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            기존 방식 vs ECDB
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-4">
            {comparisons.map((comparison, index) => (
              <div
                key={index}
                className="group grid items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-6 md:grid-cols-[1fr,auto,1fr]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <X className="h-4 w-4 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{comparison.old}</span>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <span className="font-medium">{comparison.new}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-primary/30 bg-primary/5 p-8 text-center">
            <p className="font-display text-xl font-semibold text-primary sm:text-2xl">
              ECDB = Market Intelligence + Partnership Targeting
            </p>
            <p className="mt-2 text-muted-foreground">
              <span className="inline-block">'시장 리서치 툴' 뿐만 아니라</span>{" "}
              <span className="inline-block">'파트너십 & 세일즈 인텔리전스'로도 작동</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
