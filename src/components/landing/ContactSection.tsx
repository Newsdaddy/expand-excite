import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Gift, FileCheck, Users, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUtmParams } from "@/hooks/useUtmParams";
import { useRateLimiter } from "@/hooks/useRateLimiter";
import { contactFormSchema, utmParamsSchema } from "@/lib/validations/contactForm";
import managerPhoto from "@/assets/byeongjin-jeong.jpg";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const utmParams = useUtmParams();
  const { canSubmit, cooldownRemaining, recordAttempt } = useRateLimiter({
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
    cooldownMs: 5 * 60 * 1000, // 5 minutes cooldown
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Check rate limit
    if (!canSubmit) {
      const minutes = Math.ceil(cooldownRemaining / 60);
      toast({
        title: "잠시 후 다시 시도해주세요",
        description: `${minutes}분 후에 다시 제출할 수 있습니다.`,
        variant: "destructive",
      });
      return;
    }

    // Validate form data
    const formResult = contactFormSchema.safeParse(formData);
    if (!formResult.success) {
      const fieldErrors: Record<string, string> = {};
      formResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Sanitize UTM params
    const sanitizedUtm = utmParamsSchema.safeParse(utmParams);
    const safeUtmParams = sanitizedUtm.success
      ? sanitizedUtm.data
      : { utm_source: null, utm_medium: null, utm_campaign: null, utm_term: null, utm_content: null };

    setIsSubmitting(true);

    // Record the attempt for rate limiting
    if (!recordAttempt()) {
      setIsSubmitting(false);
      toast({
        title: "제출 횟수 초과",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Use server-side edge function for secure, rate-limited submission
      const response = await fetch(`${SUPABASE_URL}/functions/v1/submit-consultation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formResult.data.name,
          company: formResult.data.company,
          email: formResult.data.email,
          phone: formResult.data.phone || null,
          message: formResult.data.message,
          utm_source: safeUtmParams.utm_source,
          utm_medium: safeUtmParams.utm_medium,
          utm_campaign: safeUtmParams.utm_campaign,
          utm_term: safeUtmParams.utm_term,
          utm_content: safeUtmParams.utm_content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle rate limit error from server
        if (response.status === 429) {
          const retryAfter = errorData.retryAfter || 300;
          const minutes = Math.ceil(retryAfter / 60);
          toast({
            title: "잠시 후 다시 시도해주세요",
            description: `${minutes}분 후에 다시 제출할 수 있습니다.`,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        
        throw new Error(errorData.error || "Submission failed");
      }

      toast({
        title: t('contact.form.success'),
        description: t('contact.form.successDesc'),
      });

      setFormData({ name: "", company: "", email: "", phone: "", message: "" });
    } catch (error) {
      // Only log errors in development to prevent info leakage
      if (import.meta.env.DEV) {
        console.error("Error submitting consultation request:", error);
      }
      toast({
        title: t('contact.form.error') || "오류가 발생했습니다",
        description: t('contact.form.errorDesc') || "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const benefits = [
    {
      icon: Users,
      title: t('contact.benefit1.title'),
      description: t('contact.benefit1.desc'),
    },
    {
      icon: FileCheck,
      title: t('contact.benefit2.title'),
      description: t('contact.benefit2.desc'),
    },
    {
      icon: Gift,
      title: t('contact.benefit3.title'),
      description: t('contact.benefit3.desc'),
    },
  ];

  const isDisabled = isSubmitting || !canSubmit;

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
              <span className="text-sm font-medium uppercase tracking-wider text-accent">
                {t('contact.label')}
              </span>

              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                {t('contact.title')}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                <span className="inline-block">{t('contact.subtitle1')}</span>{" "}
                <span className="inline-block">{t('contact.subtitle2')}</span>
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
              <p className="font-display text-xl font-bold">{t('contact.name')}</p>
              <p className="text-sm text-primary">{t('contact.role')}</p>
            </div>

            {/* Contact Form */}
            <div className="mt-10 rounded-2xl border border-border/30 bg-muted/20 p-6 md:p-8">
              <h3 className="mb-2 text-center font-display text-xl font-bold">
                {t('contact.form.title')}
              </h3>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                {t('contact.form.subtitle')}
              </p>

              {!canSubmit && cooldownRemaining > 0 && (
                <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive">
                  제출 횟수를 초과했습니다. {Math.ceil(cooldownRemaining / 60)}분 후에 다시 시도해주세요.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.form.name')} *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={t('contact.form.namePlaceholder')}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className={`bg-background/50 ${errors.name ? 'border-destructive' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t('contact.form.company')} *</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder={t('contact.form.companyPlaceholder')}
                      value={formData.company}
                      onChange={handleChange}
                      required
                      maxLength={200}
                      className={`bg-background/50 ${errors.company ? 'border-destructive' : ''}`}
                    />
                    {errors.company && (
                      <p className="text-xs text-destructive">{errors.company}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.form.email')} *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t('contact.form.emailPlaceholder')}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={255}
                      className={`bg-background/50 ${errors.email ? 'border-destructive' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t('contact.form.phonePlaceholder')}
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={20}
                      className={`bg-background/50 ${errors.phone ? 'border-destructive' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact.form.message')} *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t('contact.form.messagePlaceholder')}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    maxLength={2000}
                    className={`bg-background/50 resize-none ${errors.message ? 'border-destructive' : ''}`}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message}</p>
                  )}
                  <p className="text-right text-xs text-muted-foreground">
                    {formData.message.length}/2000
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="xl"
                  className="w-full"
                  disabled={isDisabled}
                >
                  {isSubmitting ? (
                    t('contact.form.submitting')
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      {t('contact.form.submit')}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
