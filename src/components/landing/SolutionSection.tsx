import { BarChart3, Building2, Globe2, LineChart, Map, Users2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
const SolutionSection = () => {
  const {
    t
  } = useLanguage();
  const track1Features = [{
    icon: Globe2,
    title: t('solution.track1.f1.title'),
    description: t('solution.track1.f1.desc')
  }, {
    icon: Map,
    title: t('solution.track1.f2.title'),
    description: t('solution.track1.f2.desc')
  }, {
    icon: BarChart3,
    title: t('solution.track1.f3.title'),
    description: t('solution.track1.f3.desc')
  }];
  const track2Features = [{
    icon: LineChart,
    title: t('solution.track2.f1.title'),
    description: t('solution.track2.f1.desc')
  }, {
    icon: Building2,
    title: t('solution.track2.f2.title'),
    description: t('solution.track2.f2.desc')
  }, {
    icon: Users2,
    title: t('solution.track2.f3.title'),
    description: t('solution.track2.f3.desc')
  }];
  return <section id="solutions" className="relative py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            {t('solution.label')}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            {t('solution.title')}
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Track 1 */}
          <div className="card-elevated rounded-3xl border border-border/50 p-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-primary"> Use case 1</span>
            </div>
            
            <h3 className="font-display text-2xl font-bold">
              {t('solution.track1.title')}
            </h3>
            <p className="mt-2 text-muted-foreground">
              {t('solution.track1.desc')}
            </p>

            <div className="mt-8 space-y-6">
              {track1Features.map((feature, index) => <div key={index} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Track 2 */}
          <div className="card-elevated rounded-3xl border border-secondary/30 p-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-sm font-medium text-secondary">Use case 2</span>
            </div>
            
            <h3 className="font-display text-2xl font-bold">
              {t('solution.track2.title')}
            </h3>
            <p className="mt-2 text-muted-foreground">
              {t('solution.track2.desc')}
            </p>

            <div className="mt-8 space-y-6">
              {track2Features.map((feature, index) => <div key={index} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <feature.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default SolutionSection;