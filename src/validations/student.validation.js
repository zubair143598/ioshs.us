import { z } from "zod";

export const studentSchema = z.object({
  studentName: z
    .string()
    .min(3, "Student name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email"),

  registrationNo: z
    .string()
    .min(2, "Registration number is required"),

  courseName: z
    .string()
    .min(2, "Course name is required"),

  result: z.enum([
    "PASS",
    "FAIL",
    "IN PROGRESS",
    "PENDING",
  ]),

  issuingBody: z
    .string()
    .min(2, "Issuing body is required"),

  completionDate: z
    .string()
    .min(1, "Completion date is required"),

  grade: z
    .string()
    .min(1, "Grade is required"),
});