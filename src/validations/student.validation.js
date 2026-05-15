import { z } from "zod";

import { courseOptions } from "@/constants/courses";

export const studentSchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(3, "Student name must be at least 3 characters"),

  email: z.string().trim().email("Invalid email"),

  courseName: z.enum(courseOptions),

  courseTitle: z.string().trim().min(3, "Course title is required"),

  certificateDescription: z.string().trim().min(10, "Description must be at least 10 characters"),

  result: z.enum(["PASS", "FAIL", "IN PROGRESS", "PENDING"]),

  issuingBody: z.string().trim().min(2, "Issuing body is required"),

  completionDate: z.string().min(1, "Completion date is required"),

  grade: z.string().trim().min(1, "Grade is required"),
});
