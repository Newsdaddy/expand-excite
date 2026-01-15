import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Gift, FileCheck, Users, ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import managerPhoto from "@/assets/byeongjin-jeong.jpg";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "상담 신청이 완료되었습니다",
      description: "담당 매니저가 빠른 시일 내에 연락드리겠습니다.",
    });
    
    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-primary/50 shadow-lg">
                <img 
                  src={managerPhoto} 
                  alt="Byeongjin Jeong - APAC Country Manager" 
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">담당 매니저</p>
              <p className="mt-1 font-display text-xl font-bold">Byeongjin Jeong</p>
              <p className="text-sm text-primary">APAC Country Manager</p>
            </div>

            {/* Contact Form */}
            <div className="mt-10 rounded-2xl border border-border/30 bg-muted/20 p-6 md:p-8">
              <h3 className="mb-6 text-center font-display text-xl font-bold">
                구독 상담 신청
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름 *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">회사명 *</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="(주)회사명"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>
                
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일 주소 *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">전화번호 *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">상담 의뢰 내용 *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="궁금하신 점이나 상담받고 싶은 내용을 자유롭게 작성해 주세요."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="bg-background/50 resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="gold" 
                  size="xl" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "전송 중..."
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      상담 신청하기
                    </>
                  )}
                </Button>
                
                <p className="text-center text-xs text-muted-foreground">
                  신청하신 내용은 담당 매니저에게 직접 전달되며,<br />
                  영업일 기준 1~2일 내 연락드립니다.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
