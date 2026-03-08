import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Users, Clock, Video, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import profileImage from "@/assets/byeongjin-profile.png";

const WebinarCTASection = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const isKo = language === 'ko';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: isKo ? "웨비나 신청 완료!" : "Webinar Registration Complete!",
      description: isKo
        ? "확인 이메일을 발송해드렸습니다."
        : "A confirmation email has been sent.",
    });
  };

  const benefits = [
    {
      icon: Video,
      titleKo: "라이브 데모",
      titleEn: "Live Demo",
      descKo: "실제 ECDB 플랫폼을 직접 시연",
      descEn: "See the actual ECDB platform in action",
    },
    {
      icon: Users,
      titleKo: "Q&A 세션",
      titleEn: "Q&A Session",
      descKo: "궁금한 점을 실시간으로 질문",
      descEn: "Ask your questions in real-time",
    },
    {
      icon: Clock,
      titleKo: "30분 소요",
      titleEn: "30 Minutes",
      descKo: "짧고 임팩트 있는 세션",
      descEn: "Short and impactful session",
    },
  ];

  return (
    <section id="webinar" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {isKo ? "무료 웨비나" : "Free Webinar"}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {isKo ? (
                  <>
                    ECDB 라이브 데모
                    <br />
                    <span className="text-primary">무료로 참석하세요</span>
                  </>
                ) : (
                  <>
                    ECDB Live Demo
                    <br />
                    <span className="text-primary">Join for Free</span>
                  </>
                )}
              </h2>

              <p className="text-muted-foreground text-lg mb-8">
                {isKo
                  ? "30분 동안 ECDB의 핵심 기능과 실제 활용 사례를 직접 확인하세요. 라이브 Q&A 시간도 포함되어 있습니다."
                  : "See ECDB's key features and real use cases in 30 minutes. Live Q&A session included."}
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {isKo ? benefit.titleKo : benefit.titleEn}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isKo ? benefit.descKo : benefit.descEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Manager Info */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                <img
                  src={profileImage}
                  alt="Byeongjin Jeong"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">Byeongjin Jeong</p>
                  <p className="text-sm text-muted-foreground">APAC Country Lead</p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {isKo ? "신청 완료!" : "Registration Complete!"}
                  </h3>
                  <p className="text-muted-foreground">
                    {isKo
                      ? "확인 이메일을 발송해드렸습니다. 곧 만나요!"
                      : "A confirmation email has been sent. See you soon!"}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-2">
                    {isKo ? "웨비나 신청" : "Register for Webinar"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {isKo
                      ? "아래 정보를 입력하시면 웨비나 참석 링크를 보내드립니다"
                      : "Fill in the form below and we'll send you the webinar link"}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          {isKo ? "이름" : "Name"} *
                        </label>
                        <Input
                          required
                          placeholder={isKo ? "홍길동" : "John Doe"}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          {isKo ? "회사명" : "Company"} *
                        </label>
                        <Input
                          required
                          placeholder={isKo ? "(주)회사명" : "Company Inc."}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {isKo ? "이메일" : "Email"} *
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="example@company.com"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {isKo ? "직함/포지션" : "Job Title"} *
                      </label>
                      <Input
                        required
                        placeholder={isKo ? "예: 전략기획팀 매니저" : "e.g., Strategy Manager"}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {isKo ? "관심 분야 (선택)" : "Area of Interest (Optional)"}
                      </label>
                      <Textarea
                        placeholder={isKo
                          ? "예: 동남아 시장 진출, 물류 파트너십 등"
                          : "e.g., Southeast Asia expansion, logistics partnerships"
                        }
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="gold"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          {isKo ? "신청 중..." : "Submitting..."}
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4 mr-2" />
                          {isKo ? "무료 웨비나 신청하기" : "Register for Free Webinar"}
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      {isKo
                        ? "신청 후 1영업일 내 일정 조율 이메일을 보내드립니다"
                        : "We'll send a scheduling email within 1 business day"}
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebinarCTASection;
