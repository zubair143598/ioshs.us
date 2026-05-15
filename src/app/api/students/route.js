import dbConnect from "@/lib/db";
import Student from "@/models/studentForm.model";
import { studentSchema } from "@/validations/student.validation";
import { NextResponse } from "next/server";
import { courseData } from "@/constants/courses";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    body.email = body.email.toLowerCase();

    const validation =
      studentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const selectedCourse =
      courseData[body.courseName];

    const prefix = selectedCourse.prefix;

    // Find latest student of same course
    const latestStudent =
      await Student.findOne({
        courseName: body.courseName,
      }).sort({
        createdAt: -1,
      });

    let registrationNo;

    // First student of course
    if (!latestStudent) {
      registrationNo = `${prefix}${selectedCourse.start}`;
    } else {
      const lastNumber =
        latestStudent.registrationNo.replace(
          prefix,
          ""
        );

      const nextNumber =
        Number(lastNumber) + 1;

      registrationNo = `${prefix}${nextNumber}`;
    }

    const student =
      await Student.create({
        ...body,
        registrationNo,
      });

    return NextResponse.json(
      {
        success: true,
        data: student,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Registration number already exists",
        },
        { status: 400 }
      );
    }

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