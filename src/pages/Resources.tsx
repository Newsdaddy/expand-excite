import { useState, useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase, Resource } from "@/lib/supabase";
import {
  FileText,
  Download,
  ChevronRight,
  TrendingUp,
  Globe,
  BarChart3,
  Users,
  Loader2,
  Sparkles,
  LineChart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Category definitions
type CategoryType = "ecommerce" | "ax";

const categoryInfo = {
  ecommerce: {
    titleKo: "이커머스 마켓 인텔리전스",
    titleEn: "E-Commerce Market Intelligence",
    descKo: "글로벌 이커머스 시장 데이터와 인사이트",
    descEn: "Global e-commerce market data and insights",
    icon: LineChart,
  },
  ax: {
    titleKo: "실무 AX 케이스",
    titleEn: "Practical AX Cases",
    descKo: "AI 트랜스포메이션 실무 적용 사례",
    descEn: "Real-world AI transformation case studies",
    icon: Sparkles,
  },
};

// Default resources with category
const defaultResources = [
  // E-Commerce Market Intelligence
  {
    id: "0",
    category: "ecommerce" as CategoryType,
    title: "ECDB Global E-Commerce Compass 2026",
    titleKo: "ECDB 글로벌 이커머스 나침반 2026",
    description: "Comprehensive global e-commerce market analysis and strategic insights for 2026",
    descKo: "2026년 글로벌 이커머스 시장 종합 분석 및 전략적 인사이트",
    file_type: "PDF Report",
    pages: 45,
    icon: Globe,
    thumbnail_url: "/downloads/ECDB_Global_E-Commerce_Compass_2026_thumb.png",
    file_path: "/downloads/ECDB_Global_E-Commerce_Compass_2026.pdf",
    is_public: true,
  },
  {
    id: "1",
    category: "ecommerce" as CategoryType,
    title: "ECDB Global E-Commerce Outlook 2026",
    titleKo: "ECDB 글로벌 이커머스 아웃룩 2026",
    description: "Strategic outlook and market forecast for global e-commerce in 2026",
    descKo: "2026년 글로벌 이커머스 전략적 전망 및 시장 예측",
    file_type: "PDF Report",
    pages: 30,
    icon: TrendingUp,
    thumbnail_url: "/downloads/ECDB_Global-eCommmerce-Outlook-2026_thumb.png",
    file_path: "/downloads/ECDB_Global-eCommmerce-Outlook-2026.pdf",
    is_public: true,
  },
  {
    id: "2",
    category: "ecommerce" as CategoryType,
    title: "ECDB E-Commerce Trends 2026",
    titleKo: "ECDB 이커머스 트렌드 2026",
    description: "Key e-commerce trends and emerging patterns shaping the industry in 2026",
    descKo: "2026년 이커머스 산업을 형성하는 핵심 트렌드와 신흥 패턴",
    file_type: "PDF Report",
    pages: 25,
    icon: BarChart3,
    thumbnail_url: "/downloads/ECDB_E-Commerce_Trends_2026_thumb.png",
    file_path: "/downloads/ECDB_E-Commerce_Trends_2026.pdf",
    is_public: true,
  },
  {
    id: "3",
    category: "ecommerce" as CategoryType,
    title: "ECDB Solutions (EN)",
    titleKo: "ECDB 솔루션 안내 (영문)",
    description: "Comprehensive overview of ECDB's e-commerce data solutions and services",
    descKo: "ECDB 이커머스 데이터 솔루션 및 서비스 종합 안내 (영문판)",
    file_type: "PDF Brochure",
    pages: 20,
    icon: FileText,
    thumbnail_url: "/downloads/ECDB_Solutions_EN_thumb.png",
    file_path: "/downloads/ECDB_Solutions_EN.pdf",
    is_public: true,
  },
  {
    id: "4",
    category: "ecommerce" as CategoryType,
    title: "ECDB Service Guide (KO)",
    titleKo: "ECDB 서비스 안내 (한글)",
    description: "Comprehensive overview of ECDB's e-commerce data solutions and services in Korean",
    descKo: "ECDB 이커머스 데이터 솔루션 및 서비스 종합 안내 (한글판)",
    file_type: "PDF Brochure",
    pages: 20,
    icon: FileText,
    thumbnail_url: "/downloads/ECDB_Solutions_KO_thumb.png",
    file_path: "/downloads/ECDB_Solutions_KO.pdf",
    is_public: true,
  },
  {
    id: "6",
    category: "ecommerce" as CategoryType,
    title: "ECDB E-Commerce in Europe 2026",
    titleKo: "ECDB 유럽 이커머스 리포트 2026",
    description: "Comprehensive analysis of European e-commerce market trends, growth drivers, and regional insights for 2026",
    descKo: "2026년 유럽 이커머스 시장 트렌드, 성장 동력 및 지역별 인사이트 종합 분석",
    file_type: "PDF Report",
    pages: 35,
    icon: Globe,
    thumbnail_url: "/downloads/ECDB_E-Commerce_in_Europe_2026_thumb.png",
    file_path: "/downloads/ECDB_E-Commerce_in_Europe_2026.pdf",
    is_public: true,
  },
  {
    id: "10",
    category: "ecommerce" as CategoryType,
    title: "TikTok GMV Data (Apr 2026 Update)",
    titleKo: "틱톡 실거래 기반 매출 자료 (26년 4월 업데이트)",
    description: "TikTok Shop transaction-based GMV data and analytics - April 2026 latest update",
    descKo: "틱톡샵 실거래 기반 GMV 매출 데이터 및 분석 자료 - 2026년 4월 최신 업데이트",
    file_type: "ZIP Archive",
    pages: undefined,
    icon: TrendingUp,
    thumbnail_url: "/downloads/TikTok_logo_thumb.png",
    file_path: "/downloads/TikTok_GMV_Data_Apr2026.zip",
    is_public: true,
  },
  // Practical AX Cases
  {
    id: "5",
    category: "ax" as CategoryType,
    title: "AI Agent Initial Setup: Cursor + Claude Code",
    titleKo: "AI 에이전트 초기 셋업: 커서 + 클로드 코드",
    description: "Step-by-step guide to set up Cursor and Claude Code for AI agent development - even a 9-year-old can follow",
    descKo: "9살도 따라하는 Cursor + Claude Code AI 에이전트 개발 환경 초기 셋업 가이드",
    file_type: "PDF Guide",
    pages: 10,
    icon: Sparkles,
    thumbnail_url: "/downloads/AI_Agent_Setup_Cursor_Claude_Code_thumb.png",
    file_path: "/downloads/AI_Agent_Setup_Cursor_Claude_Code.pdf",
    is_public: true,
  },
  {
    id: "7",
    category: "ax" as CategoryType,
    title: "Sales AI Agent Architecture Guide",
    titleKo: "세일즈 AI 에이전트 구축 가이드",
    description: "Complete architecture guide for building AI-powered sales agent systems",
    descKo: "AI 기반 세일즈 에이전트 시스템 구축을 위한 아키텍처 가이드",
    file_type: "Infographic",
    pages: 1,
    icon: Sparkles,
    thumbnail_url: "/downloads/BJ Sales Ops Stack.png",
    file_path: "/downloads/BJ Sales Ops Stack.png",
    is_public: true,
  },
  {
    id: "8",
    category: "ax" as CategoryType,
    title: "Sales Routine with AI Agent",
    titleKo: "AI 에이전트와 함께하는 세일즈 루틴",
    description: "Daily sales workflow enhanced by AI agents - from prospecting to closing",
    descKo: "AI 에이전트를 활용한 일일 세일즈 워크플로우 - 리드 발굴부터 클로징까지",
    file_type: "Infographic",
    pages: 1,
    icon: Sparkles,
    thumbnail_url: "/downloads/Sales Routine with AI agent.png",
    file_path: "/downloads/Sales Routine with AI agent.png",
    is_public: true,
  },
];

const iconMap: { [key: string]: any } = {
  BarChart3,
  Globe,
  TrendingUp,
  Users,
  FileText,
  Sparkles,
  LineChart,
};

const Resources = () => {
  const { language } = useLanguage();
  const isKo = language === 'ko';
  const { toast } = useToast();
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
        category: r.category || 'ecommerce',
      })));
    }
  };

  const handleDownload = async (resource: typeof defaultResources[0]) => {
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
      // Check if it's a local file path (starts with /)
      if (resource.file_path.startsWith('/')) {
        // Direct download for local files
        const a = document.createElement('a');
        a.href = resource.file_path;
        a.download = resource.file_path.split('/').pop() || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        // Supabase storage download
        const { data, error } = await supabase.storage
          .from('resources')
          .download(resource.file_path);

        if (error) throw error;

        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = resource.file_path.split('/').pop() || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

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

  // Group resources by category
  const ecommerceResources = resources.filter(r => r.category === 'ecommerce');
  const axResources = resources.filter(r => r.category === 'ax');

  const renderResourceCard = (resource: typeof defaultResources[0]) => {
    const Icon = resource.icon || FileText;
    const isDownloading = downloading === resource.id;
    const hasFile = !!resource.file_path;

    return (
      <div
        key={resource.id}
        className="bg-card border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 transition-colors flex flex-col h-full"
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

        <div className="p-6 flex flex-col flex-1">
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
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
            {isKo ? resource.descKo || resource.description : resource.description}
          </p>

          <Button
            variant={hasFile ? "gold" : "outline"}
            className="w-full gap-2 mt-4"
            onClick={() => handleDownload(resource)}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isKo ? '다운로드 중...' : 'Downloading...'}
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                {isKo ? '다운로드' : 'Download'}
              </>
            )}
          </Button>
        </div>
      </div>
    );
  };

  const renderCategorySection = (
    category: CategoryType,
    resourceList: typeof defaultResources
  ) => {
    if (resourceList.length === 0) return null;

    const info = categoryInfo[category];
    const CategoryIcon = info.icon;

    return (
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <CategoryIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {isKo ? info.titleKo : info.titleEn}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isKo ? info.descKo : info.descEn}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceList.map(renderResourceCard)}
        </div>
      </section>
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
              {isKo ? "성장 자료" : "Growth Resources"}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {isKo
                ? "이커머스 인텔리전스와 AI 트랜스포메이션 자료를 무료로 다운로드하세요"
                : "Download free resources for e-commerce intelligence and AI transformation"}
            </p>
          </div>

          {/* Category Sections */}
          <div className="max-w-6xl mx-auto">
            {renderCategorySection("ecommerce", ecommerceResources)}
            {renderCategorySection("ax", axResources)}
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
                {isKo ? "무료 온라인 컨설팅 신청하기" : "Register for Free Online Consulting"}
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
