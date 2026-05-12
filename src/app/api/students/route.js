import dbConnect from "@/lib/db";
import Student from "@/models/studentForm.model";
import { studentSchema } from "@/validations/student.validation";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const validation = studentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const student = await Student.create(body);

    return NextResponse.json(
      {
        success: true,
        data: student,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const students = await Student.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: students,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}