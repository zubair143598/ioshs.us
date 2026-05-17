import dbConnect from "@/lib/db";

import Student from "@/models/studentForm.model";

import { studentSchema } from "@/validations/student.validation";

import { NextResponse } from "next/server";

export async function PUT(req, context) {
  try {
    await dbConnect();

    // FIX
    const params = await context.params;

    const body = await req.json();

    body.email = body.email.toLowerCase();

    // Find existing student
    const existingStudent = await Student.findById(params.id);

    if (!existingStudent) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 404 },
      );
    }

    // Prevent editing these fields
    body.registrationNo = existingStudent.registrationNo;

    body.courseName = existingStudent.courseName;

    const validation = studentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const updatedStudent = await Student.findByIdAndUpdate(params.id, body, {
      returnDocument: "after",
    });

    const updatedStudent = await Student.findByIdAndUpdate(params.id, body, {
      returnDocument: "after",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req, context) {
  try {
    await dbConnect();

    const params = await context.params;

    const student = await Student.findById(params.id);

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 404 }
      );
    }

    await Student.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 },
    );
  }
}
