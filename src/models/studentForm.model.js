import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    registrationNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    courseTitle: {
      type: String,
      required: true,
      trim: true,
    },

    certificateDescription: {
      type: String,
      required: true,
      trim: true,
    },

    result: {
      type: String,
      enum: ["PASS", "FAIL", "IN PROGRESS", "PENDING"],
      required: true,
    },

    issuingBody: {
      type: String,
      required: true,
      trim: true,
    },

    completionDate: {
      type: Date,
      required: true,
    },

    grade: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
