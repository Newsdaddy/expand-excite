import { Button } from "@/components/ui/button";
import { Calendar, Gift, FileCheck, Users, ArrowRight } from "lucide-react";

const ContactSection = () => {
  const benefits = [
    {
      icon: Users,
      title: "기업 맞춤 컨설팅",
      description: "비즈니스 목표에 맞는 최적의 플랜과 활용 방안 제안",
    },
    {
      icon: FileCheck,
      title: "계약 프로세스 밀착 관리",
      description: "계약 및 결제에 필요한 서류 구비, 모든 프로세스 밀착 지원",
    },
    {
      icon: Gift,
      title: "첫 계약 기업 단독 혜택",
      description: "정병진 매니저 통해 계약 시 특별 할인 쿠폰 적용",
    },
  ];

  return (
    <section id="contact" className="relative py-24">
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--gradient-glow)' }}
      />
      
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-border/50 bg-card/80 p-8 backdrop-blur-sm md:p-12">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                <Gift className="h-4 w-4" />
                매니저 직접 상담 시 특별 혜택
              </span>
              
              <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl">
                지금 상담받고 <span className="text-gradient-gold">단독 혜택</span> 받으세요
              </h2>
              
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                ECDB 공식 파트너 매니저를 통해 상담 및 계약하시면<br className="hidden sm:block" />
                특별 할인 쿠폰이 적용됩니다
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border/30 bg-muted/30 p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <benefit.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mt-4 font-display font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
              <p className="text-sm text-muted-foreground">담당 매니저</p>
              <p className="mt-1 font-display text-xl font-bold">Byeongjin Jeong</p>
              <p className="text-sm text-primary">APAC Country Manager</p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="gold" size="xl">
                <Calendar className="mr-2 h-5 w-5" />
                데모 예약하기
              </Button>
              <Button variant="heroOutline" size="xl">
                구독 상담하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
