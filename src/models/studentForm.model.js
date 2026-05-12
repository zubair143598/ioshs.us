import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    registrationNo: {
      type: String,
      required: true,
      unique: true,
    },

    courseName: {
      type: String,
      required: true,
    },

    result: {
      type: String,
      enum: ["PASS", "FAIL", "IN PROGRESS", "PENDING"],
      required: true,
    },

    issuingBody: {
      type: String,
      required: true,
    },

    completionDate: {
      type: Date,
      required: true,
    },

    grade: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.Student ||
  mongoose.model("Student", studentSchema);

export default Student;