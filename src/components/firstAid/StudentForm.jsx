"use client";

import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { studentSchema } from "@/validations/student.validation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { courseOptions } from "@/constants/courses";

const StudentForm = ({ open, handleClose, student }) => {
  const queryClient = useQueryClient();

  const {
  register,
  handleSubmit,
  reset,
  setValue,
  formState: { errors },
} = useForm({
    resolver: zodResolver(studentSchema),

    defaultValues: {
      studentName: "",
      email: "",
      courseName: "",
      courseTitle: "",
      certificateDescription: "",
      result: "PASS",
      issuingBody: "",
      completionDate: "",
      grade: "",
    },
  });

  useEffect(() => {
  if (student) {
    setValue("studentName", student.studentName);

    setValue("email", student.email);

    setValue("courseName", student.courseName);

    setValue("courseTitle", student.courseTitle);

    setValue(
      "certificateDescription",
      student.certificateDescription
    );

    setValue("result", student.result);

    setValue("issuingBody", student.issuingBody);

    setValue(
      "completionDate",
      student.completionDate.split("T")[0]
    );

    setValue("grade", student.grade);
  } else {
    reset();
  }
}, [student, setValue, reset]);

  const mutation = useMutation({
  mutationFn: async (data) => {

    // EDIT
    if (student) {
      const response = await axios.put(
        `/api/students/${student._id}`,
        data
      );

      return response.data;
    }

    // CREATE
    const response = await axios.post(
      "/api/students",
      data
    );

    return response.data;
  },

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["students"],
    });

    reset();

    handleClose();
  },

  onError: (error) => {
    console.log(error);

    alert(
      error?.response?.data?.message ||
      "Something went wrong"
    );
  },
});

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-[#283544] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
          <h2 className="text-2xl font-semibold">
  {student ? "Edit Student" : "Add New Student"}
</h2>

          <button
            onClick={handleClose}
            className="rounded-lg bg-red-500 px-3 py-1 text-sm"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <InputField
              label="Student Name"
              name="studentName"
              register={register}
              errors={errors}
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              register={register}
              errors={errors}
            />

            <div>
              <label className="mb-2 block text-sm">Course Name</label>

              <select
  {...register("courseName")}
  disabled={!!student}
  className="w-full rounded-xl border border-gray-600 bg-[#1F2937] px-4 py-3 outline-none transition duration-300 ease-in-out focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
>
                <option value="">Select Course</option>

                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>

              {errors.courseName && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.courseName.message}
                </p>
              )}
            </div>

            <InputField
              label="Course Title"
              name="courseTitle"
              register={register}
              errors={errors}
            />

            <div>
              <label className="mb-2 block text-sm">Result</label>

              <select
                {...register("result")}
                className="w-full rounded-xl border border-gray-600 bg-[#1F2937] px-4 py-3 transition duration-300 ease-in-out hover:-translate-y-0.5 focus:-translate-y-0.5"
              >
                <option value="PASS">PASS</option>
                <option value="FAIL">FAIL</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>

            <InputField
              label="Issuing Body"
              name="issuingBody"
              register={register}
              errors={errors}
            />

            <InputField
              label="Completion Date"
              name="completionDate"
              type="date"
              register={register}
              errors={errors}
            />

            <InputField
              label="Grade"
              name="grade"
              register={register}
              errors={errors}
            />
          </div>

          <div className="md:col-span-2 pt-3">
            <label className="mb-2 block text-sm">
              Certificate Description
            </label>

            <textarea
              {...register("certificateDescription")}
              rows={4}
              className="w-full rounded-xl border border-gray-600 bg-[#1F2937] px-4 py-3 outline-none"
              placeholder="Write certificate description..."
            />

            {errors.certificateDescription && (
              <p className="mt-1 text-sm text-red-400">
                {errors.certificateDescription.message}
              </p>
            )}
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-gray-500 px-6 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-xl bg-cyan-500 px-6 py-3 font-medium text-black"
            >
              {mutation.isPending
  ? student
    ? "Updating..."
    : "Saving..."
  : student
    ? "Update Student"
    : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;

const InputField = ({ label, name, register, errors, type = "text" }) => {
  return (
    <div>
      <label className="mb-2 block text-sm">{label}</label>

      <input
        type={type}
        {...register(name)}
        className="w-full rounded-xl border border-gray-600 bg-[#1F2937] px-4 py-3 transition duration-300 ease-in-out hover:-translate-y-0.5 focus:-translate-y-0.5"
      />

      {errors[name] && (
        <p className="mt-1 text-sm text-red-400">{errors[name]?.message}</p>
      )}
    </div>
  );
};
