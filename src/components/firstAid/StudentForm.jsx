"use client";

import React from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { studentSchema } from "@/validations/student.validation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";

const StudentForm = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),

    defaultValues: {
      studentName: "",
      email: "",
      registrationNo: "",
      courseName: "",
      result: "PASS",
      issuingBody: "",
      completionDate: "",
      grade: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
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
            Add New Student
          </h2>

          <button
            onClick={handleClose}
            className="rounded-lg bg-red-500 px-3 py-1 text-sm"
          >
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6"
        >
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

            <InputField
              label="Registration No"
              name="registrationNo"
              register={register}
              errors={errors}
            />

            <InputField
              label="Course Name"
              name="courseName"
              register={register}
              errors={errors}
            />

            <div>
              <label className="mb-2 block text-sm">
                Result
              </label>

              <select
                {...register("result")}
                className="w-full rounded-xl border border-gray-600 bg-[#1F2937] px-4 py-3"
              >
                <option value="PASS">PASS</option>
                <option value="FAIL">FAIL</option>
                <option value="IN PROGRESS">
                  IN PROGRESS
                </option>
                <option value="PENDING">
                  PENDING
                </option>
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
                ? "Saving..."
                : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;

const InputField = ({
  label,
  name,
  register,
  errors,
  type = "text",
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm">
        {label}
      </label>

      <input
        type={type}
        {...register(name)}
        className="w-full rounded-xl border border-gray-600 bg-[#1F2937] px-4 py-3"
      />

      {errors[name] && (
        <p className="mt-1 text-sm text-red-400">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};