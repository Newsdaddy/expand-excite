import { AlertCircle, HelpCircle, Clock, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProblemSection = () => {
  const { t } = useLanguage();

  const problems = [
    {
      icon: HelpCircle,
      title: t('problem.item1.title'),
      description: t('problem.item1.desc'),
      track: "Strategy",
    },
    {
      icon: AlertCircle,
      title: t('problem.item2.title'),
      description: t('problem.item2.desc'),
      track: "Strategy",
    },
    {
      icon: Target,
      title: t('problem.item3.title'),
      description: t('problem.item3.desc'),
      track: "Sales",
    },
    {
      icon: Clock,
      title: t('problem.item4.title'),
      description: t('problem.item4.desc'),
      track: "Sales",
    },
  ];

  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            <span className="inline-block">{t('problem.title1')}</span>{" "}
            <span className="inline-block">{t('problem.title2')}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('problem.subtitle')}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group card-elevated rounded-2xl border border-border/50 p-6 transition-all duration-300 hover:border-primary/30"
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  problem.track === "Strategy" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-secondary/10 text-secondary"
                }`}>
                  <problem.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      problem.track === "Strategy"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    }`}>
                      {problem.track}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold">{problem.title}</h3>
                  <p className="mt-2 text-muted-foreground">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border/50 bg-muted/30 p-6 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            <span className="inline-block">{t('problem.summaryLabel')}</span>{" "}
            <span className="inline-block text-foreground">{t('problem.summary')}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
