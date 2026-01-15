import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Gift, FileCheck, Users, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import managerPhoto from "@/assets/byeongjin-jeong.jpg";

const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: t('contact.form.success'),
      description: t('contact.form.successDesc'),
    });
    
    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
                      className="bg-background/50"
                    />
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
                      className="bg-background/50"
                    />
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
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('contact.form.phone')} *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t('contact.form.phonePlaceholder')}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-background/50"
                    />
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
                    className="bg-background/50 resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="gold" 
                  size="xl" 
                  className="w-full"
                  disabled={isSubmitting}
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
