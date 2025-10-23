import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Invalid email"),
  message: z.string().min(2, "Message is too short").max(5000),
  // honeypot field – should stay empty
  website: z
    .string()
    .optional()
    .transform((v) => v?.trim() || ""),
});

export type ContactInput = z.infer<typeof contactSchema>;
