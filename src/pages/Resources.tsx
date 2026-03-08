import { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FileText,
  Download,
  Lock,
  ChevronRight,
  Mail,
  CheckCircle2,
  TrendingUp,
  Globe,
  BarChart3,
  Users,
} from "lucide-react";

const resources = [
  {
    id: 1,
    titleKo: "2026 동남아 이커머스 시장 보고서",
    titleEn: "2026 Southeast Asia Ecommerce Market Report",
    descKo: "인도네시아, 베트남, 필리핀 등 주요 시장의 성장 전망과 트렌드 분석",
    descEn: "Growth outlook and trend analysis for key markets including Indonesia, Vietnam, Philippines",
    type: "PDF Report",
    pages: 32,
    icon: BarChart3,
    premium: false,
  },
  {
    id: 2,
    titleKo: "글로벌 마켓플레이스 플랫폼 비교 가이드",
    titleEn: "Global Marketplace Platform Comparison Guide",
    descKo: "아마존, 쇼피, 라자다 등 주요 플랫폼의 수수료, 기능, 진입 전략 비교",
    descEn: "Comparison of fees, features, and entry strategies for Amazon, Shopee, Lazada, etc.",
    type: "PDF Guide",
    pages: 18,
    icon: Globe,
    premium: false,
  },
  {
    id: 3,
    titleKo: "이커머스 성장 기업 발굴 체크리스트",
    titleEn: "Ecommerce Growth Company Discovery Checklist",
    descKo: "빠르게 성장하는 이커머스 기업을 찾는 10가지 핵심 지표",
    descEn: "10 key indicators for finding fast-growing ecommerce companies",
    type: "Checklist",
    pages: 5,
    icon: TrendingUp,
    premium: false,
  },
  {
    id: 4,
    titleKo: "APAC 물류 파트너십 리드 템플릿",
    titleEn: "APAC Logistics Partnership Lead Template",
    descKo: "물류/결제 기업이 활용할 수 있는 아웃바운드 세일즈 메시지 템플릿",
    descEn: "Outbound sales message templates for logistics/payment companies",
    type: "Template",
    pages: 8,
    icon: Users,
    premium: true,
  },
  {
    id: 5,
    titleKo: "ECDB 활용 가이드북",
    titleEn: "ECDB User Guidebook",
    descKo: "ECDB 플랫폼 기능별 상세 사용법과 활용 팁",
    descEn: "Detailed usage guide and tips for each ECDB platform feature",
    type: "PDF Guide",
    pages: 24,
    icon: FileText,
    premium: true,
  },
];

const Resources = () => {
  const { language } = useLanguage();
  const isKo = language === 'ko';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  const handleDownload = (resource: typeof resources[0]) => {
    // In production, this would trigger actual download
    alert(isKo
      ? `"${resource.titleKo}" 다운로드가 시작됩니다.`
      : `Starting download for "${resource.titleEn}"`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isKo ? "무료 리소스" : "Free Resources"}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {isKo
                ? "이커머스 시장 인텔리전스에 필요한 자료를 무료로 다운로드하세요"
                : "Download free resources for ecommerce market intelligence"}
            </p>
          </div>

          {/* Login Gate */}
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto">
              <div className="bg-card border border-border/50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">
                    {isKo ? "이메일로 로그인" : "Login with Email"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {isKo
                      ? "이메일을 입력하면 모든 자료를 다운로드할 수 있습니다"
                      : "Enter your email to access all downloadable resources"}
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {isKo ? "업무용 이메일" : "Work Email"}
                    </label>
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@company.com"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      isKo ? "확인 중..." : "Verifying..."
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        {isKo ? "자료 열람하기" : "Access Resources"}
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  {isKo
                    ? "입력하신 이메일로 뉴스레터가 발송될 수 있습니다"
                    : "You may receive newsletters at this email address"}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Logged In State */}
              <div className="flex items-center justify-center gap-2 mb-8 p-3 rounded-lg bg-green-500/10 border border-green-500/20 max-w-md mx-auto">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm">
                  {isKo ? `${email}로 로그인됨` : `Logged in as ${email}`}
                </span>
              </div>

              {/* Resources Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {resources.map((resource) => {
                  const Icon = resource.icon;
                  return (
                    <div
                      key={resource.id}
                      className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {resource.premium && (
                          <span className="px-2 py-1 text-xs font-medium bg-amber-500/10 text-amber-500 rounded">
                            Premium
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-lg mb-2">
                        {isKo ? resource.titleKo : resource.titleEn}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {isKo ? resource.descKo : resource.descEn}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {resource.type} · {resource.pages} {isKo ? "페이지" : "pages"}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(resource)}
                          className="gap-1"
                        >
                          <Download className="h-4 w-4" />
                          {isKo ? "다운로드" : "Download"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="text-center mt-16">
                <p className="text-muted-foreground mb-4">
                  {isKo
                    ? "더 많은 인사이트가 필요하신가요?"
                    : "Need more insights?"}
                </p>
                <Button variant="gold" size="lg" asChild>
                  <a href="/#webinar" className="gap-2">
                    {isKo ? "무료 웨비나 신청하기" : "Register for Free Webinar"}
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
