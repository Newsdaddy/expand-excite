import { BarChart3, Building2, Globe2, LineChart, Map, Users2, TrendingUp, BookOpen, Search, Calendar, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const SolutionSection = () => {
  const { t, language } = useLanguage();
  const isKo = language === 'ko';

  const track1Features = [
    {
      icon: Globe2,
      title: t('solution.track1.f1.title'),
      description: t('solution.track1.f1.desc')
    },
    {
      icon: Map,
      title: t('solution.track1.f2.title'),
      description: t('solution.track1.f2.desc')
    },
    {
      icon: BarChart3,
      title: t('solution.track1.f3.title'),
      description: t('solution.track1.f3.desc')
    }
  ];

  const track2Features = [
    {
      icon: LineChart,
      title: t('solution.track2.f1.title'),
      description: t('solution.track2.f1.desc')
    },
    {
      icon: Building2,
      title: t('solution.track2.f2.title'),
      description: t('solution.track2.f2.desc')
    },
    {
      icon: Users2,
      title: t('solution.track2.f3.title'),
      description: t('solution.track2.f3.desc')
    }
  ];

  const track3Features = [
    {
      icon: Search,
      title: t('solution.track3.f1.title'),
      description: t('solution.track3.f1.desc')
    },
    {
      icon: TrendingUp,
      title: t('solution.track3.f2.title'),
      description: t('solution.track3.f2.desc')
    },
    {
      icon: BookOpen,
      title: t('solution.track3.f3.title'),
      description: t('solution.track3.f3.desc')
    }
  ];

  return (
    <section id="solutions" className="relative py-16 bg-white">
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            {t('solution.title')}
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Track 1 */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm font-medium text-blue-600">목적 1</span>
            </div>

            <h3 className="font-display text-xl font-bold">
              {t('solution.track1.title')}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('solution.track1.desc')}
            </p>

            <div className="mt-8 space-y-5">
              {track1Features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                    <feature.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track 2 */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-600">목적 2</span>
            </div>

            <h3 className="font-display text-xl font-bold">
              {t('solution.track2.title')}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('solution.track2.desc')}
            </p>

            <div className="mt-8 space-y-5">
              {track2Features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                    <feature.icon className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track 3 */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              <span className="text-sm font-medium text-purple-600">목적 3</span>
            </div>

            <h3 className="font-display text-xl font-bold">
              {t('solution.track3.title')}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('solution.track3.desc')}
            </p>

            <div className="mt-8 space-y-5">
              {track3Features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                    <feature.icon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
