import { z } from "zod";
import { BOOKING_GOALS, BOOKING_LOCATIONS } from "@/content/booking";

const optionalText = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
    .transform((v) => v?.trim() || "");

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number is too short")
    .max(30)
    .regex(/^[+()\d\s-]+$/, "Phone number can only contain digits"),
  business: z.string().trim().min(2, "Business name is too short").max(120),
  link: optionalText(300),
  goal: z.enum(BOOKING_GOALS as [string, ...string[]], {
    message: "Choose what the video is for",
  }),
  audience: optionalText(500),
  brief: z.string().trim().min(10, "Tell me a bit more about the project").max(3000),
  references: optionalText(1000),
  location: z.enum(BOOKING_LOCATIONS as [string, ...string[]], {
    message: "Choose a location",
  }),
  locationDetail: optionalText(200),
  dates: z.string().trim().min(2, "Add your preferred dates").max(300),
  // honeypot field – should stay empty
  website: optionalText(200),
});

export type BookingInput = z.infer<typeof bookingSchema>;
