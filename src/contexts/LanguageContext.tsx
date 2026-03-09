import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ko: {
    // Header
    'nav.sales': '데이터',
    'nav.resources': '다운로드',
    'nav.login': '로그인',
    'nav.logout': '로그아웃',
    'nav.webinar': '웨비나 신청',
    'nav.features': 'Features',
    'nav.solutions': 'Solutions',
    'nav.pricing': 'Pricing',
    'nav.whyEcdb': 'Why ECDB',
    'nav.contact': '상담하기',
    
    // Hero
    'hero.badge': 'APAC 기업을 위한 글로벌 커머스 인텔리전스',
    'hero.title1': '글로벌 이커머스',
    'hero.title2': '마켓 인텔리전스',
    'hero.title3': '전략 수립 솔루션',
    'hero.sub1': '어디에 진출할지',
    'hero.sub2': '어떤 플랫폼과 협업할지',
    'hero.sub3': '누구에게 먼저 영업할지',
    'hero.sub4': '데이터로 결정하세요.',
    'hero.demoBtn': '데모 예약하기',
    'hero.consultBtn': '구독 상담하기',
    'hero.stat1': '글로벌 시장 커버리지',
    'hero.stat2': '마켓플레이스 & 스토어 데이터',
    'hero.stat3': '의사결정자 리드',
    
    // Problem Section
    'problem.title1': '시장 · 플랫폼 · 기업 정보는',
    'problem.title2': '흩어져 있다',
    'problem.subtitle': '의사결정도, 영업도 느립니다',
    'problem.item1.title': '국가 간 비교 기준 부재',
    'problem.item1.desc': '글로벌 커머스 시장 비교 시 기준이 중구난방입니다.',
    'problem.item2.title': '플랫폼 선택이 감에 의존',
    'problem.item2.desc': '정량화되고 신뢰할 만한 플랫폼 KPI 데이터가 부재합니다.',
    'problem.item3.title': '파트너십 타겟 불명확',
    'problem.item3.desc': '어느 마켓플레이스, 온라인스토어와 먼저 파트너십을 맺어야 하는지 모릅니다.',
    'problem.item4.title': '세일즈 타이밍 부재',
    'problem.item4.desc': '리드는 있는데 우선순위와 타이밍이 없습니다. 성장 기업을 사전에 포착하기 어렵습니다.',
    'problem.summary': "'누가 곧 커질지, 누구에게 지금 연락해야 하는지 모른다.'",
    'problem.summaryLabel': '한 줄 요약:',
    
    // Solution Section
    'solution.label': 'Solution',
    'solution.title': '어느 쪽에 해당하시나요?',
    'solution.track1.title': 'Expansion Decision Intelligence',
    'solution.track1.desc': 'D2C 전략을 위한 의사결정 인텔리전스',
    'solution.track1.f1.title': '국가·지역 간 일관 비교',
    'solution.track1.f1.desc': '시장 규모, 성장률, 경쟁 밀도를 일관된 기준으로 비교',
    'solution.track1.f2.title': '플랫폼 구조 분석',
    'solution.track1.f2.desc': '카테고리 특성과 플랫폼별 진입 전략 도출',
    'solution.track1.f3.title': '확장 우선순위',
    'solution.track1.f3.desc': '데이터 기반 시장 진입 우선순위 명확화',
    'solution.track2.title': 'Partnership & Sales Intelligence',
    'solution.track2.desc': '로지스틱/인프라 기업을 위한 파트너십 & 세일즈 리드',
    'solution.track2.f1.title': '성장 기업 포착',
    'solution.track2.f1.desc': '지금 빠르게 성장 중인 마켓플레이스와 온라인스토어 식별',
    'solution.track2.f2.title': '니즈 급증 기업',
    'solution.track2.f2.desc': '물류/결제 니즈가 급증하는 기업 선제 파악',
    'solution.track2.f3.title': '의사결정자 리드',
    'solution.track2.f3.desc': 'Partnership / Ops / Strategy 리드 직접 연결',
    
    // Features Section
    'features.label': 'Features',
    'features.title': 'ECDB가 제공하는 것',
    'features.subtitle1': '❌ 무작위 데이터 수집 →',
    'features.subtitle2': '✅ 마스터카드 등 결제 기업 제공 데이터',
    'features.detailLink': '에서 확인하세요',
    'features.detailPrefix': '제공 데이터 상세 내용은',
    'features.f1.title': 'Market & Platform Intelligence',
    'features.f1.desc': '50+ 글로벌 시장의 마켓플레이스, 온라인스토어 매출, 랭킹, 트래픽 데이터',
    'features.f2.title': 'Competitive Landscape',
    'features.f2.desc': '경쟁사 분석, 트랜잭션 KPI, 마케팅 분석으로 시장 구조 파악',
    'features.f3.title': 'Growth Tracking',
    'features.f3.desc': '성장 중인 기업을 사전에 포착하여 선제적 영업 기회 확보',
    'features.f4.title': 'Lead Database',
    'features.f4.desc': '직함 기반 의사결정자 연락처 - Partnership, Ops, Strategy 리드',
    'features.f5.title': 'Smart Filtering',
    'features.f5.desc': '국가, 플랫폼 유형, 성장 지표 기반 세일즈 우선순위 필터링',
    'features.f6.title': 'Export & Integration',
    'features.f6.desc': '리드 Export, CRM 연계로 바로 영업에 활용',
    
    // Pricing Section
    'pricing.label': 'Pricing',
    'pricing.title': '비즈니스에 맞는 플랜을 선택하세요',
    'pricing.note': '*연간 결제 기준 · 신용카드 및 현금 송금 결제 가능',
    'pricing.recommended': '추천',
    'pricing.consultBtn': '구독 상담하기',
    'pricing.detailPrefix': '제공 데이터 상세 내용은',
    'pricing.detailLink': '에서 확인하세요',
    'pricing.corporate.desc': '팀 최대 5명',
    'pricing.corporatePlus.desc': '팀 최대 5명',
    'pricing.enterprise.desc': '전사 단위 접근',
    'pricing.enterprise.price': '맞춤 가격',
    'pricing.perMonth': '/월',
    'pricing.f1': '연간 데이터',
    'pricing.f2': '연간 데이터 + 월간 데이터',
    'pricing.f7': 'API 및 특별 분석 맞춤 솔루션',
    
    // Why Section
    'why.label': 'Why ECDB',
    'why.title': '기존 방식 vs ECDB',
    'why.old1': '시장 리포트 → 전략팀만 사용',
    'why.new1': '전략과 영업을 같은 데이터로 연결',
    'why.old2': 'LinkedIn Sales Navigator → 맥락 없음',
    'why.new2': '시장 성장 데이터 + 세일즈 리드 결합',
    'why.old3': '내부 리드 DB → 최신성/우선순위 부족',
    'why.new3': "'왜 이 회사인가'가 설명된다",
    'why.bottom.title': 'ECDB = Market Intelligence + Partnership Targeting',
    'why.bottom.desc1': "'시장 리서치 툴' 뿐만 아니라",
    'why.bottom.desc2': "'파트너십 & 세일즈 인텔리전스'로도 활용",
    
    // Contact Section
    'contact.label': 'Dedicated Manager',
    'contact.title': '정병진 매니저와 상담하세요',
    'contact.subtitle1': '정병진 매니저를 통해 계약 시',
    'contact.subtitle2': '첫 계약 기업 단독 혜택이 적용됩니다',
    'contact.name': 'Byeongjin Jeong',
    'contact.role': 'APAC Country Lead',
    'contact.benefit1.title': '기업 맞춤 컨설팅',
    'contact.benefit1.desc': '귀사의 비즈니스에 맞는 맞춤형 솔루션 제안',
    'contact.benefit2.title': '계약 프로세스 밀착 관리',
    'contact.benefit2.desc': '계약 및 결제에 필요한 모든 서류 구비 및 프로세스 관리',
    'contact.benefit3.title': '첫 계약 기업 단독 혜택',
    'contact.benefit3.desc': '정병진 매니저 계약 시에만 제공되는 특별 혜택',
    'contact.demoBtn': '데모 예약하기',
    'contact.consultBtn': '구독 상담하기',
    'contact.form.title': '구독 상담 신청',
    'contact.form.subtitle': '아래 정보를 입력하시면 담당 매니저가 빠르게 연락드립니다',
    'contact.form.name': '이름',
    'contact.form.namePlaceholder': '홍길동',
    'contact.form.company': '회사명',
    'contact.form.companyPlaceholder': '(주)회사명',
    'contact.form.email': '이메일 주소',
    'contact.form.emailPlaceholder': 'example@company.com',
    'contact.form.phone': '전화번호',
    'contact.form.phonePlaceholder': '010-1234-5678',
    'contact.form.message': '상담 의뢰 내용',
    'contact.form.messagePlaceholder': '문의하실 내용을 자유롭게 작성해주세요',
    'contact.form.submit': '상담 신청하기',
    'contact.form.submitting': '신청 중...',
    'contact.form.success': '상담 신청이 완료되었습니다!',
    'contact.form.successDesc': '담당 매니저가 빠른 시일 내에 연락드리겠습니다.',
    
    // CTA Section
    'cta.title1': '이번 분기 전략에',
    'cta.title2': '바로 쓰는 툴',
    'cta.desc1': 'APAC 본사 기업과 로지스틱/커머스 인프라 기업이',
    'cta.desc2': '글로벌 이커머스 시장에서 데이터로 결정하게 만드는',
    'cta.desc3': '글로벌 커머스 인텔리전스 플랫폼',
    'cta.demoBtn': '데모 예약하기',
    'cta.consultBtn': '구독 상담하기',
    'cta.paymentNote': '신용카드 및 현금 송금 결제 가능 · 언제든 취소 가능',
    
    // Footer
    'footer.features': 'Features',
    'footer.solutions': 'Solutions',
    'footer.pricing': 'Pricing',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.copyright': '© 2026 ECDB. All rights reserved.',
  },
  en: {
    // Header
    'nav.sales': 'Data',
    'nav.resources': 'Downloads',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.webinar': 'Register Webinar',
    'nav.features': 'Features',
    'nav.solutions': 'Solutions',
    'nav.pricing': 'Pricing',
    'nav.whyEcdb': 'Why ECDB',
    'nav.contact': 'Contact Us',

    // Hero
    'hero.badge': 'Global Commerce Intelligence for APAC Enterprises',
    'hero.title1': 'Global eCommerce',
    'hero.title2': 'Market Intelligence',
    'hero.title3': 'Strategy Solution',
    'hero.sub1': 'Where to expand',
    'hero.sub2': 'Which platform to partner with',
    'hero.sub3': 'Who to reach out first',
    'hero.sub4': 'Decide with data.',
    'hero.demoBtn': 'Book a Demo',
    'hero.consultBtn': 'Subscribe Consultation',
    'hero.stat1': 'Global Market Coverage',
    'hero.stat2': 'Marketplace & Store Data',
    'hero.stat3': 'Decision-Maker Leads',

    // Problem Section
    'problem.title1': 'Market · Platform · Company Data',
    'problem.title2': 'Is Scattered Everywhere',
    'problem.subtitle': 'Decisions and sales are slowing down',
    'problem.item1.title': 'No Cross-Country Benchmarks',
    'problem.item1.desc': 'No standardized criteria for comparing global commerce markets.',
    'problem.item2.title': 'Platform Selection by Gut Feeling',
    'problem.item2.desc': 'Lack of quantified and reliable platform KPI data.',
    'problem.item3.title': 'Unclear Partnership Targets',
    'problem.item3.desc': "Don't know which marketplace or online store to partner with first.",
    'problem.item4.title': 'No Sales Timing',
    'problem.item4.desc': 'Leads exist but lack priority and timing. Hard to identify fast-growing companies early.',
    'problem.summary': "'We don't know who's about to grow or who to contact now.'",
    'problem.summaryLabel': 'In short:',

    // Solution Section
    'solution.label': 'Solution',
    'solution.title': 'Which one applies to you?',
    'solution.track1.title': 'Expansion Decision Intelligence',
    'solution.track1.desc': 'Decision intelligence for D2C strategy',
    'solution.track1.f1.title': 'Consistent Cross-Region Comparison',
    'solution.track1.f1.desc': 'Compare market size, growth rate, and competitive density with unified criteria',
    'solution.track1.f2.title': 'Platform Structure Analysis',
    'solution.track1.f2.desc': 'Derive entry strategies by category and platform characteristics',
    'solution.track1.f3.title': 'Expansion Prioritization',
    'solution.track1.f3.desc': 'Data-driven market entry priority clarification',
    'solution.track2.title': 'Partnership & Sales Intelligence',
    'solution.track2.desc': 'Partnership & sales leads for logistics/infrastructure companies',
    'solution.track2.f1.title': 'Capture Growing Companies',
    'solution.track2.f1.desc': 'Identify rapidly growing marketplaces and online stores right now',
    'solution.track2.f2.title': 'Surging Demand Companies',
    'solution.track2.f2.desc': 'Proactively identify companies with surging logistics/payment needs',
    'solution.track2.f3.title': 'Decision-Maker Leads',
    'solution.track2.f3.desc': 'Direct connection to Partnership / Ops / Strategy leads',

    // Features Section
    'features.label': 'Features',
    'features.title': 'What ECDB Provides',
    'features.subtitle1': '❌ Random data collection →',
    'features.subtitle2': '✅ Data from payment companies like Mastercard',
    'features.detailLink': 'for details',
    'features.detailPrefix': 'Visit',
    'features.f1.title': 'Market & Platform Intelligence',
    'features.f1.desc': 'Marketplace and online store revenue, rankings, and traffic data across 50+ global markets',
    'features.f2.title': 'Competitive Landscape',
    'features.f2.desc': 'Understand market structure through competitor analysis, transaction KPIs, and marketing analytics',
    'features.f3.title': 'Growth Tracking',
    'features.f3.desc': 'Capture growing companies early to secure proactive sales opportunities',
    'features.f4.title': 'Lead Database',
    'features.f4.desc': 'Title-based decision-maker contacts - Partnership, Ops, Strategy leads',
    'features.f5.title': 'Smart Filtering',
    'features.f5.desc': 'Filter sales priorities by country, platform type, and growth metrics',
    'features.f6.title': 'Export & Integration',
    'features.f6.desc': 'Lead export and CRM integration for immediate sales activation',

    // Pricing Section
    'pricing.label': 'Pricing',
    'pricing.title': 'Choose the Right Plan for Your Business',
    'pricing.note': '*Based on annual billing · Credit card and wire transfer available',
    'pricing.recommended': 'Recommended',
    'pricing.consultBtn': 'Subscribe Consultation',
    'pricing.detailPrefix': 'Visit',
    'pricing.detailLink': 'for detailed features',
    'pricing.corporate.desc': 'Up to 5 team members',
    'pricing.corporatePlus.desc': 'Up to 5 team members',
    'pricing.enterprise.desc': 'Enterprise-wide access',
    'pricing.enterprise.price': 'Custom Pricing',
    'pricing.perMonth': '/mo',
    'pricing.f1': 'Annual Data',
    'pricing.f2': 'Annual Data + Monthly Data',
    'pricing.f7': 'API & Custom Analytics Solutions',

    // Why Section
    'why.label': 'Why ECDB',
    'why.title': 'Traditional Methods vs ECDB',
    'why.old1': 'Market reports → Only used by strategy team',
    'why.new1': 'Connect strategy and sales with the same data',
    'why.old2': 'LinkedIn Sales Navigator → No context',
    'why.new2': 'Market growth data + Sales leads combined',
    'why.old3': 'Internal lead DB → Outdated/No priorities',
    'why.new3': "'Why this company' is clearly explained",
    'why.bottom.title': 'ECDB = Market Intelligence + Partnership Targeting',
    'why.bottom.desc1': "Not just a 'market research tool',",
    'why.bottom.desc2': "but also 'partnership & sales intelligence'",

    // Contact Section
    'contact.label': 'Dedicated Manager',
    'contact.title': 'Consult with Manager Byeongjin Jeong',
    'contact.subtitle1': 'When you sign up through Manager Byeongjin Jeong,',
    'contact.subtitle2': 'exclusive first-contract benefits apply',
    'contact.name': 'Byeongjin Jeong',
    'contact.role': 'APAC Country Lead',
    'contact.benefit1.title': 'Tailored Consulting',
    'contact.benefit1.desc': 'Customized solutions tailored to your business',
    'contact.benefit2.title': 'Dedicated Contract Process Management',
    'contact.benefit2.desc': 'Full documentation and process management for contracts and payments',
    'contact.benefit3.title': 'First-Contract Exclusive Benefits',
    'contact.benefit3.desc': 'Special benefits only available when signing through Manager Byeongjin Jeong',
    'contact.demoBtn': 'Book a Demo',
    'contact.consultBtn': 'Subscribe Consultation',
    'contact.form.title': 'Subscribe Consultation Request',
    'contact.form.subtitle': 'Fill in the form below and our manager will contact you shortly',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'John Doe',
    'contact.form.company': 'Company',
    'contact.form.companyPlaceholder': 'Company Inc.',
    'contact.form.email': 'Email Address',
    'contact.form.emailPlaceholder': 'example@company.com',
    'contact.form.phone': 'Phone Number',
    'contact.form.phonePlaceholder': '+1 234 567 8900',
    'contact.form.message': 'Consultation Details',
    'contact.form.messagePlaceholder': 'Please describe your inquiry freely',
    'contact.form.submit': 'Submit Consultation Request',
    'contact.form.submitting': 'Submitting...',
    'contact.form.success': 'Consultation request submitted!',
    'contact.form.successDesc': 'Our manager will contact you shortly.',

    // CTA Section
    'cta.title1': 'A Tool You Can Use',
    'cta.title2': 'Right in This Quarter\'s Strategy',
    'cta.desc1': 'For APAC headquarters and logistics/commerce infrastructure companies',
    'cta.desc2': 'to make data-driven decisions in the global eCommerce market',
    'cta.desc3': 'Global Commerce Intelligence Platform',
    'cta.demoBtn': 'Book a Demo',
    'cta.consultBtn': 'Subscribe Consultation',
    'cta.paymentNote': 'Credit card and wire transfer available · Cancel anytime',

    // Footer
    'footer.features': 'Features',
    'footer.solutions': 'Solutions',
    'footer.pricing': 'Pricing',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.copyright': '© 2026 ECDB. All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
