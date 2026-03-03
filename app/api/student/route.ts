import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";

const StudentSchema = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String, required: true, unique: true },
  class: { type: Number },
  stream: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Student =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mobile = searchParams.get("mobile");

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { error: "A valid 10-digit mobile number is required." },
        { status: 400 }
      );
    }

    await connectDB();

    const student = await Student.findOne({ mobile });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        name: student.name,
        class: student.class,
        stream: student.stream,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}