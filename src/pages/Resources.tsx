import { useState, useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, Resource } from "@/lib/supabase";
import {
  FileText,
  Download,
  Lock,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  Globe,
  BarChart3,
  Users,
  LogOut,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Default resources (used if database is empty)
const defaultResources = [
  {
    id: "1",
    title: "2026 Southeast Asia Ecommerce Market Report",
    titleKo: "2026 동남아 이커머스 시장 보고서",
    description: "Growth outlook and trend analysis for key markets including Indonesia, Vietnam, Philippines",
    descKo: "인도네시아, 베트남, 필리핀 등 주요 시장의 성장 전망과 트렌드 분석",
    file_type: "PDF Report",
    pages: 32,
    icon: BarChart3,
    thumbnail_url: "",
    file_path: "",
  },
  {
    id: "2",
    title: "Global Marketplace Platform Comparison Guide",
    titleKo: "글로벌 마켓플레이스 플랫폼 비교 가이드",
    description: "Comparison of fees, features, and entry strategies for Amazon, Shopee, Lazada, etc.",
    descKo: "아마존, 쇼피, 라자다 등 주요 플랫폼의 수수료, 기능, 진입 전략 비교",
    file_type: "PDF Guide",
    pages: 18,
    icon: Globe,
    thumbnail_url: "",
    file_path: "",
  },
  {
    id: "3",
    title: "Ecommerce Growth Company Discovery Checklist",
    titleKo: "이커머스 성장 기업 발굴 체크리스트",
    description: "10 key indicators for finding fast-growing ecommerce companies",
    descKo: "빠르게 성장하는 이커머스 기업을 찾는 10가지 핵심 지표",
    file_type: "Checklist",
    pages: 5,
    icon: TrendingUp,
    thumbnail_url: "",
    file_path: "",
  },
  {
    id: "4",
    title: "APAC Logistics Partnership Lead Template",
    titleKo: "APAC 물류 파트너십 리드 템플릿",
    description: "Outbound sales message templates for logistics/payment companies",
    descKo: "물류/결제 기업이 활용할 수 있는 아웃바운드 세일즈 메시지 템플릿",
    file_type: "Template",
    pages: 8,
    icon: Users,
    thumbnail_url: "",
    file_path: "",
  },
  {
    id: "5",
    title: "ECDB User Guidebook",
    titleKo: "ECDB 활용 가이드북",
    description: "Detailed usage guide and tips for each ECDB platform feature",
    descKo: "ECDB 플랫폼 기능별 상세 사용법과 활용 팁",
    file_type: "PDF Guide",
    pages: 24,
    icon: FileText,
    thumbnail_url: "",
    file_path: "",
  },
];

const iconMap: { [key: string]: any } = {
  BarChart3,
  Globe,
  TrendingUp,
  Users,
  FileText,
};

const Resources = () => {
  const { language } = useLanguage();
  const isKo = language === 'ko';
  const { toast } = useToast();
  const { user, profile, signOut, setShowAuthModal, setAuthModalMode } = useAuth();
  const [resources, setResources] = useState(defaultResources);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setResources(data.map(r => ({
        ...r,
        icon: iconMap[r.icon_name] || FileText,
      })));
    }
  };

  const handleDownload = async (resource: typeof defaultResources[0]) => {
    if (!user) {
      setAuthModalMode('login');
      setShowAuthModal(true);
      return;
    }

    if (!resource.file_path) {
      toast({
        title: isKo ? '준비 중' : 'Coming Soon',
        description: isKo
          ? '이 자료는 곧 업로드될 예정입니다.'
          : 'This resource will be available soon.',
      });
      return;
    }

    setDownloading(resource.id);

    try {
      const { data, error } = await supabase.storage
        .from('resources')
        .download(resource.file_path);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.file_path.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: isKo ? '다운로드 완료!' : 'Download Complete!',
        description: isKo ? resource.titleKo : resource.title,
      });
    } catch (error) {
      toast({
        title: isKo ? '다운로드 실패' : 'Download Failed',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setDownloading(null);
    }
  };

  const handleLoginClick = () => {
    setAuthModalMode('login');
    setShowAuthModal(true);
  };

  const handleSignupClick = () => {
    setAuthModalMode('signup');
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isKo ? "무료 자료" : "Free Resources"}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {isKo
                ? "이커머스 시장 인텔리전스에 필요한 자료를 무료로 다운로드하세요"
                : "Download free resources for ecommerce market intelligence"}
            </p>
          </div>

          {/* User Status Bar */}
          {user ? (
            <div className="flex items-center justify-center gap-4 mb-8 p-4 rounded-lg bg-green-500/10 border border-green-500/20 max-w-lg mx-auto">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {profile?.name || user.email}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {profile?.company} · {profile?.job_title}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={signOut} className="flex-shrink-0">
                <LogOut className="h-4 w-4 mr-1" />
                {isKo ? '로그아웃' : 'Logout'}
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4 mb-8 p-4 rounded-lg bg-muted/50 border border-border max-w-lg mx-auto">
              <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground flex-1">
                {isKo
                  ? '자료를 다운로드하려면 로그인이 필요합니다'
                  : 'Login required to download resources'}
              </p>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={handleLoginClick}>
                  {isKo ? '로그인' : 'Login'}
                </Button>
                <Button variant="gold" size="sm" onClick={handleSignupClick}>
                  {isKo ? '회원가입' : 'Sign Up'}
                </Button>
              </div>
            </div>
          )}

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {resources.map((resource) => {
              const Icon = resource.icon || FileText;
              const isDownloading = downloading === resource.id;
              return (
                <div
                  key={resource.id}
                  className="bg-card border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
                >
                  {/* Thumbnail */}
                  {resource.thumbnail_url ? (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={resource.thumbnail_url}
                        alt={isKo ? resource.titleKo : resource.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <Icon className="h-16 w-16 text-primary/30" />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-2 py-1 text-xs font-medium bg-muted rounded">
                        {resource.file_type}
                      </span>
                      {resource.pages && (
                        <span className="text-xs text-muted-foreground">
                          {resource.pages} {isKo ? '페이지' : 'pages'}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      {isKo ? resource.titleKo || resource.title : resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {isKo ? resource.descKo || resource.description : resource.description}
                    </p>

                    <Button
                      variant={user ? "gold" : "outline"}
                      className="w-full gap-2"
                      onClick={() => handleDownload(resource)}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {isKo ? '다운로드 중...' : 'Downloading...'}
                        </>
                      ) : user ? (
                        <>
                          <Download className="h-4 w-4" />
                          {isKo ? '다운로드' : 'Download'}
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" />
                          {isKo ? '로그인 후 다운로드' : 'Login to Download'}
                        </>
                      )}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
