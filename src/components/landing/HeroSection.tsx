import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Globe, TrendingUp, Users } from "lucide-react";
const HeroSection = () => {
  return <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{
      background: 'var(--gradient-glow)'
    }} />
      
      <div className="container relative mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-20 text-center">
        {/* Badge */}
        <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
          <span className="text-gradient-gold font-medium">NEW</span>
          <span className="text-muted-foreground">APAC 기업을 위한 글로벌 커머스 인텔리전스</span>
        </div>

        {/* Main headline */}
        <h1 className="animate-slide-up font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">글로벌 이커머스 시장의</span>
          <span className="text-gradient-primary mt-2 block">의사결정 + 세일즈</span>
          <span className="block">종합솔루션</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-slide-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl" style={{
        animationDelay: '0.1s'
      }}>
          <span className="inline-block">어디에 진출할지</span>{" · "}
          <span className="inline-block">어떤 플랫폼과 협업할지</span>{" · "}
          <span className="inline-block">누구에게 먼저 영업할지</span>
          <br />
          <span className="text-foreground">데이터로 결정하세요.</span>
        </p>

        {/* CTA Buttons */}
        <div className="animate-slide-up mt-10 flex flex-col items-center gap-4 sm:flex-row" style={{
        animationDelay: '0.2s'
      }}>
          <Button variant="gold" size="xl">
            <Calendar className="mr-2 h-5 w-5" />
            데모 예약하기
          </Button>
          <Button variant="heroOutline" size="xl">
            구독 상담하기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="animate-slide-up mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3" style={{
        animationDelay: '0.3s'
      }}>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <span className="font-display text-3xl font-bold">50+</span>
            </div>
            <span className="mt-1 text-sm text-muted-foreground">글로벌 시장 커버리지</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              <span className="font-display text-3xl font-bold">10K+</span>
            </div>
            <span className="mt-1 text-sm text-muted-foreground">마켓플레이스 & 스토어 데이터</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="font-display text-3xl font-bold">100K+</span>
            </div>
            <span className="mt-1 text-sm text-muted-foreground">의사결정자 리드</span>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;