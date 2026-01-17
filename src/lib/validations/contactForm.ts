import { z } from "zod";

// Email regex pattern for proper validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone regex pattern (allows various formats: +82-10-1234-5678, 010-1234-5678, etc.)
const phoneRegex = /^[\d\s\-+()]{8,20}$/;

// UTM parameter validation - alphanumeric, dashes, underscores only
const utmParamRegex = /^[a-zA-Z0-9_\-]*$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "이름을 입력해주세요" })
    .max(100, { message: "이름은 100자 이하여야 합니다" }),
  company: z
    .string()
    .trim()
    .min(1, { message: "회사명을 입력해주세요" })
    .max(200, { message: "회사명은 200자 이하여야 합니다" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "이메일을 입력해주세요" })
    .max(255, { message: "이메일은 255자 이하여야 합니다" })
    .regex(emailRegex, { message: "올바른 이메일 형식을 입력해주세요" }),
  phone: z
    .string()
    .trim()
    .max(20, { message: "전화번호는 20자 이하여야 합니다" })
    .regex(phoneRegex, { message: "올바른 전화번호 형식을 입력해주세요" })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, { message: "상담 내용을 입력해주세요" })
    .max(2000, { message: "상담 내용은 2000자 이하여야 합니다" }),
});

export const utmParamsSchema = z.object({
  utm_source: z
    .string()
    .max(100)
    .regex(utmParamRegex)
    .nullable()
    .optional()
    .transform((val) => (val && utmParamRegex.test(val) ? val : null)),
  utm_medium: z
    .string()
    .max(100)
    .regex(utmParamRegex)
    .nullable()
    .optional()
    .transform((val) => (val && utmParamRegex.test(val) ? val : null)),
  utm_campaign: z
    .string()
    .max(100)
    .regex(utmParamRegex)
    .nullable()
    .optional()
    .transform((val) => (val && utmParamRegex.test(val) ? val : null)),
  utm_term: z
    .string()
    .max(100)
    .regex(utmParamRegex)
    .nullable()
    .optional()
    .transform((val) => (val && utmParamRegex.test(val) ? val : null)),
  utm_content: z
    .string()
    .max(100)
    .regex(utmParamRegex)
    .nullable()
    .optional()
    .transform((val) => (val && utmParamRegex.test(val) ? val : null)),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type UtmParamsData = z.infer<typeof utmParamsSchema>;
