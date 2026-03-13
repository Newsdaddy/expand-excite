import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Mail, Lock, User, Building2, Briefcase, Phone, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthModal = () => {
  const { language } = useLanguage();
  const isKo = language === 'ko';
  const { toast } = useToast();
  const {
    showAuthModal,
    setShowAuthModal,
    authModalMode,
    setAuthModalMode,
    signIn,
    signUp,
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    job_title: '',
    phone: '',
    wants_consultation: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (authModalMode === 'login') {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: isKo ? '로그인 실패' : 'Login Failed',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: isKo ? '로그인 성공!' : 'Login Successful!',
            description: isKo ? '환영합니다.' : 'Welcome back.',
          });
        }
      } else {
        // Validation
        if (!formData.name || !formData.email || !formData.company || !formData.job_title || !formData.password) {
          toast({
            title: isKo ? '필수 항목을 입력해주세요' : 'Please fill required fields',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }

        const { error } = await signUp({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          company: formData.company,
          job_title: formData.job_title,
          phone: formData.phone || undefined,
          wants_consultation: formData.wants_consultation,
        });

        if (error) {
          toast({
            title: isKo ? '회원가입 실패' : 'Sign Up Failed',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: isKo ? '회원가입 완료!' : 'Sign Up Complete!',
            description: isKo
              ? '이메일을 확인하여 계정을 활성화해주세요.'
              : 'Please check your email to activate your account.',
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      company: '',
      job_title: '',
      phone: '',
      wants_consultation: false,
    });
  };

  const switchMode = () => {
    resetForm();
    setAuthModalMode(authModalMode === 'login' ? 'signup' : 'login');
  };

  return (
    <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {authModalMode === 'login'
              ? isKo ? '로그인' : 'Login'
              : isKo ? '회원가입' : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {authModalMode === 'signup' && (
            <>
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {isKo ? '이름' : 'Name'} *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={isKo ? '홍길동' : 'John Doe'}
                  required
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {isKo ? '회사명' : 'Company'} *
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={isKo ? '(주)회사명' : 'Company Inc.'}
                  required
                />
              </div>

              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="job_title" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  {isKo ? '직함' : 'Job Title'} *
                </Label>
                <Input
                  id="job_title"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  placeholder={isKo ? '예: 전략기획팀 매니저' : 'e.g., Strategy Manager'}
                  required
                />
              </div>

              {/* Phone (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {isKo ? '전화번호 (선택)' : 'Phone (Optional)'}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+82 10-1234-5678"
                />
              </div>
            </>
          )}

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {isKo ? '이메일' : 'Email'} *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@company.com"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              {isKo ? '비밀번호' : 'Password'} *
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder={isKo ? '6자 이상' : 'Min 6 characters'}
                minLength={6}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Consultation Checkbox (Signup only) */}
          {authModalMode === 'signup' && (
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="wants_consultation"
                checked={formData.wants_consultation}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, wants_consultation: checked === true }))
                }
              />
              <Label htmlFor="wants_consultation" className="text-sm cursor-pointer">
                {isKo
                  ? '이커머스 데이터 솔루션 상담을 원합니다'
                  : 'I want consultation on ecommerce data solutions'}
              </Label>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" variant="gold" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isKo ? '처리 중...' : 'Processing...'}
              </>
            ) : authModalMode === 'login' ? (
              isKo ? '로그인' : 'Login'
            ) : (
              isKo ? '회원가입' : 'Sign Up'
            )}
          </Button>

          {/* Switch Mode */}
          <div className="text-center text-sm text-muted-foreground pt-2">
            {authModalMode === 'login' ? (
              <>
                {isKo ? '계정이 없으신가요?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-primary hover:underline font-medium"
                >
                  {isKo ? '회원가입' : 'Sign Up'}
                </button>
              </>
            ) : (
              <>
                {isKo ? '이미 계정이 있으신가요?' : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-primary hover:underline font-medium"
                >
                  {isKo ? '로그인' : 'Login'}
                </button>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
