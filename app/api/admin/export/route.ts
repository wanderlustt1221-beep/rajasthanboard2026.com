
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";

const StudentSchemaExp = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String, required: true, unique: true },
  class: { type: Number },
  stream: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const StudentExp = mongoose.models.Student || mongoose.model("Student", StudentSchemaExp);

function toCSV(rows: any[]): string {
  const headers = ["Name", "Mobile", "Class", "Stream", "Registered At"];
  const lines = rows.map((s) => [
    `"${(s.name || "").replace(/"/g, '""')}"`,
    `"${s.mobile || ""}"`,
    `"${s.class || ""}"`,
    `"${(s.stream || "").replace(/"/g, '""')}"`,
    `"${s.createdAt ? new Date(s.createdAt).toLocaleString("en-IN") : ""}"`,
  ].join(","));
  return [headers.join(","), ...lines].join("\n");
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "all";
    await connectDB();

    let query: any = {};
    if (type === "class9") query = { class: 9 };
    else if (type === "class11science") query = { class: 11, stream: "science" };
    else if (type === "daterange") {
      const from = searchParams.get("from");
      const to = searchParams.get("to");
      if (!from || !to) return NextResponse.json({ error: "from and to required." }, { status: 400 });
      const fromDate = new Date(from); fromDate.setHours(0, 0, 0, 0);
      const toDate = new Date(to); toDate.setHours(23, 59, 59, 999);
      query = { createdAt: { $gte: fromDate, $lte: toDate } };
    }

    const students = await StudentExp.find(query).sort({ createdAt: -1 }).lean();
    const csv = toCSV(students);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="rbpp-${type}-${Date.now()}.csv"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
