import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Users, Clock, Video, CheckCircle2, Loader2, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import profileImage from "@/assets/byeongjin-profile.png";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const WebinarCTASection = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const isKo = language === 'ko';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    jobTitle: "",
    interest: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/submit-consultation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: null,
          message: `[컨설팅 신청] 직함: ${formData.jobTitle}${formData.interest ? `, 관심분야: ${formData.interest}` : ""}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setIsSubmitted(true);
      toast({
        title: isKo ? "접수 완료!" : "Request received!",
        description: isKo
          ? "곧 연락드리겠습니다."
          : "We'll be in touch shortly.",
      });
    } catch (error) {
      toast({
        title: isKo ? "오류가 발생했습니다" : "An error occurred",
        description: isKo ? "잠시 후 다시 시도해주세요." : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const benefits = [
    {
      icon: Video,
      titleKo: "라이브 시연",
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
      titleKo: "30분 이내",
      titleEn: "30 Minutes",
      descKo: "짧고 임팩트 있는 세션",
      descEn: "Short and impactful session",
    },
  ];

  return (
    <section id="webinar" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Left: Info */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {isKo ? "무료 온라인 컨설팅" : "Free Online Consulting"}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {isKo ? (
                  <>
                    맞춤 컨설팅
                    <br />
                    <span className="text-primary">지금 신청하세요</span>
                  </>
                ) : (
                  <>
                    Custom Consulting
                    <br />
                    <span className="text-primary">Apply Now</span>
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
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm mt-auto">
                <div className="flex items-center gap-4">
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
                <a
                  href="https://www.linkedin.com/in/valueforyourbiz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="hidden sm:inline">LinkedIn Connect</span>
                  <span className="sm:hidden">Connect</span>
                </a>
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
                    {isKo ? "비즈니스 성공을 위한 여정, 이미 절반은 성공하셨습니다." : "You're halfway to success!"}
                  </h3>
                  <p className="text-muted-foreground">
                    {isKo
                      ? "접수 완료됐으며 곧 연락드리겠습니다."
                      : "Request received - we'll be in touch shortly."}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-2">
                    {isKo ? "컨설팅 신청" : "Register for Consulting"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {isKo
                      ? "아래 정보를 입력하시면 온라인 컨설팅 초대를 보내드립니다"
                      : "Fill in the form below and we'll send you the webinar link"}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          {isKo ? "이름" : "Name"} *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder={isKo ? "홍길동" : "John Doe"}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          {isKo ? "회사명" : "Company"} *
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
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
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@company.com"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {isKo ? "직함/포지션" : "Job Title"} *
                      </label>
                      <Input
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                        placeholder={isKo ? "예: 전략기획팀 매니저" : "e.g., Strategy Manager"}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {isKo ? "관심 분야 (선택)" : "Area of Interest (Optional)"}
                      </label>
                      <Textarea
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
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
                          {isKo ? "무료 컨설팅 신청하기" : "Register for Free Consulting"}
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
