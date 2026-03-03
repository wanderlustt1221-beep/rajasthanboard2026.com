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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, name, mobile, class: cls, stream } = body;

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { error: "A valid 10-digit mobile number is required." },
        { status: 400 }
      );
    }

    await connectDB();

    if (mode === "register") {
      const existing = await Student.findOne({ mobile });
      if (existing) {
        return NextResponse.json(
          { error: "Mobile already registered." },
          { status: 400 }
        );
      }

      await Student.create({ name, mobile, class: cls, stream: stream || null });
      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (mode === "login") {
      const student = await Student.findOne({ mobile });
      if (!student) {
        return NextResponse.json(
          { error: "Student not found. Please register first." },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}