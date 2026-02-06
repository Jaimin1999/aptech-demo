import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(10, "Name must be at most 10 letters"),
  bio: z
    .string()
    .min(1, "Name is required")
    .max(10, "Name must be at most 10 letters"),
  role:z.string().min(1,"Role is required"),
  appointmentDate: z
  .string()
  .min(1, "Appointment date is required")
  .regex(
    /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
    "Appointment date must be a valid date in the format YYYY-MM-DD"
  ),
});

export type FormData = z.infer<typeof formSchema>;

