import dbConnect from "@/lib/db";

import Student from "@/models/studentForm.model";

import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await dbConnect();

    // Await params
    const { id } = await params;

    const body = await req.json();

    const updatedStudent =
      await Student.findByIdAndUpdate(
        id,
        {
          studentName: body.studentName,

          email: body.email.toLowerCase(),

          courseTitle: body.courseTitle,
          
          courseName: body.courseName,

          result: body.result,

          issuingBody: body.issuingBody,

          certificateDescription: body.certificateDescription,

          completionDate:
            body.completionDate,

          grade: body.grade,
        },

        {
          returnDocument: "after",
        }
      );

    return NextResponse.json({
      success: true,
      data: updatedStudent,
    });
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

// DELETE STUDENT
export async function DELETE(
  req,
  { params }
) {
  try {
    await dbConnect();

    const { id } = await params;

    await Student.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message:
        "Student deleted successfully",
    });
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