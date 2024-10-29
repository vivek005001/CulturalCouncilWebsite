import * as z from "zod";

export const eventFormSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(25, "Title must be less than 25 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(400, "Description must be less than 400 characters"),
    venue: z
      .string()
      .min(1, "Venue is required")
      .max(400, "Venue must be less than 400 characters"),
    imageUrl: z.string().optional(),
    startDateTime: z.date().min(new Date(), "Start date must be in the future"),
    endDateTime: z.date().min(new Date(), "End date must be in the future"),
    url: z.union([z.literal(""), z.string().trim().url()]),
  })
  .refine((data) => data.endDateTime > data.startDateTime, {
    message: "End date cannot be earlier than start date.",
    path: ["endDateTime"],
  });
