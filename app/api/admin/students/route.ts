
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";

const StudentSchema = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String, required: true, unique: true },
  class: { type: Number },
  stream: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

export async function GET() {
  try {
    await connectDB();
    const students = await Student.find({}).sort({ createdAt: -1 }).lean();

    const total = students.length;
    const class9 = students.filter((s: any) => s.class === 9).length;
    const class11Science = students.filter((s: any) => s.class === 11 && s.stream === "science").length;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayCount = students.filter((s: any) => new Date(s.createdAt) >= todayStart).length;

    return NextResponse.json({ students, stats: { total, class9, class11Science, todayCount } });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
