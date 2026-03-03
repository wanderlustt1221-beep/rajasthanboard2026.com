
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";

const StudentSchemaWA = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String, required: true, unique: true },
  class: { type: Number },
  stream: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const StudentWA = mongoose.models.Student || mongoose.model("Student", StudentSchemaWA);

export async function GET() {
  try {
    await connectDB();
    const students = await StudentWA.find({}).select("name mobile class stream").lean();

    const numbers = students.map((s: any) => `+91${s.mobile}`);
    const links = students.map((s: any) =>
      `https://wa.me/91${s.mobile}?text=${encodeURIComponent("नमस्ते! RBPP 2026 papers ready.")}`
    );
    const csvRows = [
      "Name,Mobile,Class,Stream,WhatsApp Link",
      ...students.map((s: any) =>
        `"${s.name || ""}","+91${s.mobile}",${s.class},"${s.stream || ""}","https://wa.me/91${s.mobile}"`
      ),
    ].join("\n");

    return NextResponse.json({ numbers, links, csv: csvRows, count: students.length });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}