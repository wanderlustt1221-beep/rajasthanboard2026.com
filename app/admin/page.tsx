"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────
type Student = {
    _id: string;
    name: string;
    mobile: string;
    class: number;
    stream: string | null;
    createdAt: string;
};
type Stats = { total: number; class9: number; class11Science: number; todayCount: number };
type SortKey = "createdAt" | "name" | "class";
type SortDir = "asc" | "desc";

const ADMIN_WA = "916367075149";
const PAGE_SIZE = 10;
const RECENT_SIZE = 5;

// ─── Animated Counter ─────────────────────────────────────────
function AnimatedCounter({ target }: { target: number }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (target === 0) { setCount(0); return; }
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const t = setInterval(() => {
            current += step;
            if (current >= target) { setCount(target); clearInterval(t); }
            else setCount(current);
        }, 16);
        return () => clearInterval(t);
    }, [target]);
    return <>{count}</>;
}

// ─── Stat Card ────────────────────────────────────────────────
function StatCard({ label, value, accent, icon }: { label: string; value: number; accent?: boolean; icon: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2, boxShadow: "0 16px 40px rgba(30,58,95,0.15)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl p-4 sm:p-6 flex flex-col gap-2 relative overflow-hidden"
            style={{
                backgroundColor: accent ? "#7c2d12" : "#fff",
                border: accent ? "none" : "1px solid #e0d9ce",
                boxShadow: accent ? "0 8px 32px rgba(124,45,18,0.25)" : "0 2px 10px rgba(30,58,95,0.06)",
            }}
        >
            {accent && (
                <div className="absolute inset-0 opacity-10"
                    style={{ background: "radial-gradient(circle at top right, #fff, transparent)" }} />
            )}
            <span className="text-xl sm:text-2xl">{icon}</span>
            <span className="text-2xl sm:text-3xl font-bold" style={{ color: accent ? "#fff" : "#1e3a5f", fontFamily: "Georgia, serif" }}>
                <AnimatedCounter target={value} />
            </span>
            <span className="text-xs font-sans leading-tight" style={{ color: accent ? "#fcd5c0" : "#6b7280" }}>{label}</span>
        </motion.div>
    );
}

// ─── Pagination ───────────────────────────────────────────────
function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
    if (total <= 1) return null;
    const start = Math.max(1, Math.min(page - 1, total - 2));
    const pages = Array.from({ length: Math.min(3, total) }, (_, i) => start + i);
    return (
        <div className="flex items-center justify-between gap-2">
            <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}
                className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg font-sans font-medium transition-all active:scale-95"
                style={{ border: "1px solid #e0d9ce", color: page === 1 ? "#c4b8a8" : "#1e3a5f", backgroundColor: "#fff", opacity: page === 1 ? 0.5 : 1 }}>
                ← Prev
            </button>
            <div className="flex items-center gap-1">
                {pages.map((p) => (
                    <button key={p} onClick={() => onChange(p)}
                        className="w-8 h-8 text-xs rounded-lg font-sans font-semibold transition-all active:scale-95"
                        style={{ backgroundColor: p === page ? "#1e3a5f" : "transparent", color: p === page ? "#fff" : "#6b7280", border: "1px solid #e0d9ce" }}>
                        {p}
                    </button>
                ))}
                {total > 3 && page < total - 1 && <span className="text-xs" style={{ color: "#c4b8a8" }}>…{total}</span>}
            </div>
            <button onClick={() => onChange(Math.min(total, page + 1))} disabled={page === total}
                className="flex items-center gap-1 px-3 py-2 text-xs rounded-lg font-sans font-medium transition-all active:scale-95"
                style={{ border: "1px solid #e0d9ce", color: page === total ? "#c4b8a8" : "#1e3a5f", backgroundColor: "#fff", opacity: page === total ? 0.5 : 1 }}>
                Next →
            </button>
        </div>
    );
}

// ─── Section Card ─────────────────────────────────────────────
function SectionCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: "#fff", border: "1px solid #e0d9ce", boxShadow: "0 2px 16px rgba(30,58,95,0.07)" }}
        >
            {children}
        </motion.div>
    );
}

// ─── WA Icon ──────────────────────────────────────────────────
function WAIcon({ size = 14 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

// ─── Main ─────────────────────────────────────────────────────
export default function AdminDashboard() {
    const router = useRouter();
    const [students, setStudents] = useState<Student[]>([]);
    const [stats, setStats] = useState<Stats>({ total: 0, class9: 0, class11Science: 0, todayCount: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Table
    const [search, setSearch] = useState("");
    const [filterClass, setFilterClass] = useState("all");
    const [sortKey, setSortKey] = useState<SortKey>("createdAt");
    const [sortDir, setSortDir] = useState<SortDir>("desc");
    const [tablePage, setTablePage] = useState(1);

    // Export
    const [exportLoading, setExportLoading] = useState<string | null>(null);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    // WhatsApp
    const [waSending, setWaSending] = useState<string | null>(null);
    const [waCopied, setWaCopied] = useState(false);

    // Recent
    const [recentPage, setRecentPage] = useState(1);

    // Collapsible sections on mobile
    const [openSection, setOpenSection] = useState<string | null>("whatsapp");

    // ─ Fetch ──────────────────────────────────────────────────
    const fetchStudents = useCallback(async () => {
        setLoading(true); setError("");
        try {
            const res = await fetch("/api/admin/students");
            if (!res.ok) throw new Error();
            const data = await res.json();
            setStudents(data.students || []);
            setStats(data.stats || { total: 0, class9: 0, class11Science: 0, todayCount: 0 });
        } catch { setError("Failed to load data. Tap to retry."); }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchStudents(); }, [fetchStudents]);

    // ─ WhatsApp ───────────────────────────────────────────────
    const buildMessage = (label: string, list: Student[]): string => {
        const lines = list.map((s, i) =>
            `${i + 1}. ${s.name} | Class ${s.class}${s.stream ? ` (${s.stream})` : ""} | +91${s.mobile}`
        );
        return `📋 *RBPP 2026 — ${label}*\nTotal: ${list.length} students\n\n${lines.join("\n")}\n\n_Rajasthan Board Predictor Portal_`;
    };

    const sendToWhatsApp = (label: string, list: Student[]) => {
        setWaSending(label);
        const url = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(buildMessage(label, list))}`;
        window.open(url, "_blank");
        setTimeout(() => setWaSending(null), 2500);
    };

    const class9Students = students.filter((s) => s.class === 9);
    const class11Students = students.filter((s) => s.class === 11);

    // ─ Table ──────────────────────────────────────────────────
    const filtered = students
        .filter((s) => {
            const q = search.toLowerCase();
            return (!q || s.name.toLowerCase().includes(q) || s.mobile.includes(q)) &&
                (filterClass === "all" || String(s.class) === filterClass);
        })
        .sort((a, b) => {
            let va: any = a[sortKey], vb: any = b[sortKey];
            if (sortKey === "createdAt") { va = new Date(va).getTime(); vb = new Date(vb).getTime(); }
            if (va < vb) return sortDir === "asc" ? -1 : 1;
            if (va > vb) return sortDir === "asc" ? 1 : -1;
            return 0;
        });

    const tablePages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((tablePage - 1) * PAGE_SIZE, tablePage * PAGE_SIZE);
    const toggleSort = (key: SortKey) => {
        if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
        else { setSortKey(key); setSortDir("asc"); }
        setTablePage(1);
    };
    const sortIcon = (key: SortKey) => sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕";

    // ─ Recent ─────────────────────────────────────────────────
    const recentSorted = [...students].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const recentPages = Math.max(1, Math.ceil(recentSorted.length / RECENT_SIZE));
    const recentPaginated = recentSorted.slice((recentPage - 1) * RECENT_SIZE, recentPage * RECENT_SIZE);

    // ─ Export ─────────────────────────────────────────────────
    const exportCSV = async (type: string) => {
        setExportLoading(type);
        try {
            const params = new URLSearchParams({ type });
            if (type === "daterange") { params.set("from", dateFrom); params.set("to", dateTo); }
            const res = await fetch(`/api/admin/export?${params}`);
            if (!res.ok) throw new Error();
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = `rbpp-${type}-${Date.now()}.csv`; a.click();
            URL.revokeObjectURL(url);
        } catch { alert("Export failed. Please try again."); }
        finally { setExportLoading(null); }
    };

    const copyNumbers = async () => {
        const text = students.map(s => `+91${s.mobile}`).join("\n");
        try {
            await navigator.clipboard.writeText(text);
            setWaCopied(true); setTimeout(() => setWaCopied(false), 2000);
        } catch { alert("Could not copy — please copy manually."); }
    };

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
    };

    const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    const fmtDateShort = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

    const toggleSection = (key: string) => setOpenSection(prev => prev === key ? null : key);

    // ─── RENDER ───────────────────────────────────────────────
    return (
        <main className="min-h-screen pb-24 md:pb-10" style={{ backgroundColor: "#f4f1ed" }}>

            {/* ── STICKY NAV ── */}
            <nav className="sticky top-0 z-50 backdrop-blur-md"
                style={{ backgroundColor: "rgba(248,246,242,0.92)", borderBottom: "1px solid #e0d9ce", boxShadow: "0 1px 12px rgba(30,58,95,0.06)" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm"
                            style={{ backgroundColor: "#7c2d12" }}>RB</div>
                        <div className="leading-tight">
                            <div className="text-sm font-bold" style={{ color: "#1e3a5f", fontFamily: "Georgia, serif" }}>Admin Panel</div>
                            <div className="text-xs font-sans hidden sm:block" style={{ color: "#9ca3af" }}>RBPP 2026</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={fetchStudents}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all active:scale-90"
                            style={{ border: "1px solid #e0d9ce", backgroundColor: "#fff", color: "#6b7280" }}
                            title="Refresh">
                            ↻
                        </button>
                        <button onClick={() => router.push("/")}
                            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium font-sans transition-all active:scale-95"
                            style={{ backgroundColor: "#1e3a5f", color: "#fff" }}>
                            ← Site
                        </button>
                        <button onClick={handleLogout}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium font-sans transition-all active:scale-95"
                            style={{ backgroundColor: "#7c2d12", color: "#fff" }}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6">

                {/* ── STATS GRID ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <StatCard label="Total Students" value={stats.total} accent icon="👥" />
                    <StatCard label="Class 9" value={stats.class9} icon="📚" />
                    <StatCard label="Class 11 Science" value={stats.class11Science} icon="🔬" />
                    <StatCard label="Today" value={stats.todayCount} icon="📅" />
                </div>

                {/* ── ERROR BANNER ── */}
                <AnimatePresence>
                    {error && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            onClick={fetchStudents}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer active:scale-98"
                            style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}>
                            <span style={{ color: "#dc2626" }}>⚠</span>
                            <p className="text-xs font-sans" style={{ color: "#991b1b" }}>{error} <span className="underline">Tap to retry.</span></p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── WHATSAPP SECTION ── */}
                <SectionCard delay={0.05}>
                    {/* Section Header */}
                    <button
                        onClick={() => toggleSection("whatsapp")}
                        className="w-full flex items-center justify-between px-5 py-4 sm:py-5 transition-colors active:bg-gray-50"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                                style={{ backgroundColor: "#25d366", boxShadow: "0 4px 12px rgba(37,211,102,0.3)" }}>
                                <WAIcon size={16} />
                            </div>
                            <div className="text-left">
                                <h2 className="text-sm font-bold" style={{ color: "#1e3a5f", fontFamily: "Georgia, serif" }}>WhatsApp Tools</h2>
                                <p className="text-xs font-sans" style={{ color: "#9ca3af" }}>Send lists & contact students</p>
                            </div>
                        </div>
                        <span className="text-lg transition-transform duration-200" style={{
                            color: "#9ca3af",
                            transform: openSection === "whatsapp" ? "rotate(180deg)" : "rotate(0deg)",
                            display: "inline-block"
                        }}>⌄</span>
                    </button>

                    <AnimatePresence>
                        {openSection === "whatsapp" && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                style={{ overflow: "hidden" }}
                            >
                                <div className="px-4 sm:px-5 pb-5 space-y-4" style={{ borderTop: "1px solid #f0ede6" }}>

                                    {/* Info pill */}
                                    <div className="mt-4 px-4 py-3 rounded-xl flex items-start gap-2.5"
                                        style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                                        <span className="text-base flex-shrink-0">ℹ️</span>
                                        <p className="text-xs font-sans leading-relaxed" style={{ color: "#166534" }}>
                                            Tap a button — WhatsApp opens with the full classwise list pre-written to <strong>+91 63670 75149</strong>. Just hit Send!
                                        </p>
                                    </div>

                                    {/* Big WA Buttons — stacked on mobile */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {[
                                            { label: "All Students", list: students, color: "#7c2d12", shadow: "rgba(124,45,18,0.3)" },
                                            { label: "Class 9 Students", list: class9Students, color: "#1e3a5f", shadow: "rgba(30,58,95,0.3)" },
                                            { label: "Class 11 Science", list: class11Students, color: "#065f46", shadow: "rgba(6,95,70,0.3)" },
                                        ].map(({ label, list, color, shadow }) => (
                                            <motion.button
                                                key={label}
                                                whileTap={{ scale: 0.96 }}
                                                onClick={() => sendToWhatsApp(label, list)}
                                                disabled={list.length === 0 || waSending === label}
                                                className="flex items-center gap-3 px-4 py-4 sm:py-5 rounded-xl font-sans transition-all w-full text-left"
                                                style={{
                                                    backgroundColor: color,
                                                    color: "#fff",
                                                    opacity: list.length === 0 ? 0.35 : 1,
                                                    boxShadow: `0 6px 20px ${shadow}`,
                                                }}
                                            >
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                                    style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                                                    {waSending === label
                                                        ? <span className="text-lg">⏳</span>
                                                        : <WAIcon size={18} />
                                                    }
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold leading-tight">
                                                        {waSending === label ? "Opening…" : `Send ${label}`}
                                                    </div>
                                                    <div className="text-xs opacity-75 mt-0.5">{list.length} student{list.length !== 1 ? "s" : ""}</div>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Secondary tools */}
                                    <div className="grid grid-cols-2 gap-3 pt-1">
                                        <motion.button whileTap={{ scale: 0.96 }} onClick={copyNumbers}
                                            className="flex items-center justify-center gap-2 px-3 py-3 text-xs font-semibold font-sans rounded-xl transition-all"
                                            style={{ backgroundColor: waCopied ? "#dcfce7" : "#f0f9ff", color: waCopied ? "#16a34a" : "#1e3a5f", border: `1px solid ${waCopied ? "#bbf7d0" : "#bfdbfe"}` }}>
                                            {waCopied ? "✓ Copied!" : "📋 Copy Numbers"}
                                        </motion.button>
                                        <motion.button whileTap={{ scale: 0.96 }}
                                            onClick={() => {
                                                const rows = ["Name,Mobile,Class,Stream", ...students.map(s => `"${s.name}","+91${s.mobile}",${s.class},"${s.stream || ""}"`)]
                                                const blob = new Blob([rows.join("\n")], { type: "text/csv" });
                                                const url = URL.createObjectURL(blob);
                                                const a = document.createElement("a"); a.href = url; a.download = "rbpp-contacts.csv"; a.click(); URL.revokeObjectURL(url);
                                            }}
                                            className="flex items-center justify-center gap-2 px-3 py-3 text-xs font-semibold font-sans rounded-xl"
                                            style={{ backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>
                                            ↓ Download CSV
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </SectionCard>

                {/* ── CSV EXPORT SECTION ── */}
                <SectionCard delay={0.08}>
                    <button onClick={() => toggleSection("export")}
                        className="w-full flex items-center justify-between px-5 py-4 sm:py-5 transition-colors active:bg-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                                style={{ backgroundColor: "#7c2d12", boxShadow: "0 4px 12px rgba(124,45,18,0.25)" }}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h2 className="text-sm font-bold" style={{ color: "#1e3a5f", fontFamily: "Georgia, serif" }}>CSV Export</h2>
                                <p className="text-xs font-sans" style={{ color: "#9ca3af" }}>Download student data</p>
                            </div>
                        </div>
                        <span className="text-lg transition-transform duration-200" style={{
                            color: "#9ca3af",
                            transform: openSection === "export" ? "rotate(180deg)" : "rotate(0deg)",
                            display: "inline-block"
                        }}>⌄</span>
                    </button>

                    <AnimatePresence>
                        {openSection === "export" && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                style={{ overflow: "hidden" }}
                            >
                                <div className="px-4 sm:px-5 pb-5 space-y-3" style={{ borderTop: "1px solid #f0ede6" }}>
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {[
                                            { label: "All Students", type: "all", emoji: "👥" },
                                            { label: "Class 9 Only", type: "class9", emoji: "📚" },
                                            { label: "Class 11 Science", type: "class11science", emoji: "🔬" },
                                        ].map(btn => (
                                            <motion.button key={btn.type} whileTap={{ scale: 0.96 }}
                                                onClick={() => exportCSV(btn.type)}
                                                disabled={exportLoading === btn.type}
                                                className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-sans transition-all"
                                                style={{ backgroundColor: "#1e3a5f", color: "#fff", opacity: exportLoading === btn.type ? 0.6 : 1 }}>
                                                <span>{exportLoading === btn.type ? "⏳" : btn.emoji}</span>
                                                <div className="text-left">
                                                    <div className="text-xs font-bold">{exportLoading === btn.type ? "Exporting…" : `Export`}</div>
                                                    <div className="text-xs opacity-70">{btn.label}</div>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Date Range */}
                                    <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: "#f8f6f2", border: "1px solid #e0d9ce" }}>
                                        <p className="text-xs font-semibold font-sans" style={{ color: "#1e3a5f" }}>📅 Export by Date Range</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-xs font-sans mb-1" style={{ color: "#6b7280" }}>From</label>
                                                <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
                                                    className="w-full px-3 py-2.5 text-xs rounded-lg font-sans outline-none"
                                                    style={{ border: "1px solid #d6cfc4", backgroundColor: "#fff", color: "#1e3a5f" }} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-sans mb-1" style={{ color: "#6b7280" }}>To</label>
                                                <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
                                                    className="w-full px-3 py-2.5 text-xs rounded-lg font-sans outline-none"
                                                    style={{ border: "1px solid #d6cfc4", backgroundColor: "#fff", color: "#1e3a5f" }} />
                                            </div>
                                        </div>
                                        <motion.button whileTap={{ scale: 0.97 }}
                                            onClick={() => exportCSV("daterange")}
                                            disabled={!dateFrom || !dateTo || exportLoading === "daterange"}
                                            className="w-full py-3 text-xs font-bold font-sans rounded-xl transition-all"
                                            style={{ backgroundColor: "#7c2d12", color: "#fff", opacity: (!dateFrom || !dateTo) ? 0.35 : 1 }}>
                                            {exportLoading === "daterange" ? "Exporting…" : "Export Date Range"}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </SectionCard>

                {/* ── STUDENT TABLE ── */}
                <SectionCard delay={0.11}>
                    {/* Table Header */}
                    <div className="px-4 sm:px-5 py-4 sm:py-5" style={{ borderBottom: "1px solid #f0ede6" }}>
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h2 className="text-sm font-bold" style={{ color: "#1e3a5f", fontFamily: "Georgia, serif" }}>All Registrations</h2>
                                <p className="text-xs font-sans mt-0.5" style={{ color: "#9ca3af" }}>{filtered.length} of {students.length}</p>
                            </div>
                            <select value={filterClass} onChange={e => { setFilterClass(e.target.value); setTablePage(1); }}
                                className="px-3 py-2 text-xs rounded-lg font-sans outline-none"
                                style={{ border: "1px solid #d6cfc4", color: "#1e3a5f", appearance: "none", backgroundColor: "#fff" }}>
                                <option value="all">All</option>
                                <option value="9">Class 9</option>
                                <option value="11">Class 11</option>
                            </select>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#9ca3af" }}>🔍</span>
                            <input type="text" placeholder="Search name or number…" value={search}
                                onChange={e => { setSearch(e.target.value); setTablePage(1); }}
                                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl font-sans outline-none"
                                style={{ border: "1px solid #d6cfc4", color: "#1e3a5f", backgroundColor: "#f8f6f2" }} />
                        </div>
                    </div>

                    {/* Desktop Table */}
                    {loading ? (
                        <div className="py-16 text-center">
                            <div className="text-2xl mb-2">⏳</div>
                            <p className="text-xs font-sans" style={{ color: "#9ca3af" }}>Loading students…</p>
                        </div>
                    ) : paginated.length === 0 ? (
                        <div className="py-16 text-center">
                            <div className="text-2xl mb-2">🔍</div>
                            <p className="text-xs font-sans" style={{ color: "#9ca3af" }}>No students found.</p>
                        </div>
                    ) : (
                        <>
                            {/* Mobile Cards */}
                            <div className="block sm:hidden divide-y" style={{ borderColor: "#f0ede6" }}>
                                <AnimatePresence mode="wait">
                                    {paginated.map((s, i) => (
                                        <motion.div key={s._id}
                                            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="px-4 py-3.5 flex items-start justify-between gap-3">
                                            <div className="flex items-start gap-3 min-w-0">
                                                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                                    style={{ backgroundColor: "#1e3a5f" }}>
                                                    {s.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold font-sans truncate" style={{ color: "#1e3a5f" }}>{s.name}</p>
                                                    <p className="text-xs font-mono mt-0.5" style={{ color: "#6b7280" }}>{s.mobile}</p>
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        <span className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                                                            style={{ backgroundColor: s.class === 9 ? "#dbeafe" : "#fee2e2", color: s.class === 9 ? "#1e40af" : "#991b1b" }}>
                                                            Cl. {s.class}
                                                        </span>
                                                        {s.stream && <span className="text-xs font-sans capitalize" style={{ color: "#9ca3af" }}>{s.stream}</span>}
                                                        <span className="text-xs font-sans" style={{ color: "#c4b8a8" }}>{fmtDateShort(s.createdAt)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <motion.a whileTap={{ scale: 0.9 }}
                                                href={`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(`📋 Student:\n${s.name}\nClass ${s.class}${s.stream ? ` (${s.stream})` : ""}\n+91${s.mobile}\n${fmtDate(s.createdAt)}\n\n_RBPP 2026_`)}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl text-white"
                                                style={{ backgroundColor: "#25d366", textDecoration: "none", boxShadow: "0 2px 8px rgba(37,211,102,0.3)" }}>
                                                <WAIcon size={16} />
                                            </motion.a>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Desktop Table */}
                            <div className="hidden sm:block overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ backgroundColor: "#f8f6f2", borderBottom: "1px solid #e0d9ce" }}>
                                            {[
                                                { label: "#", key: null },
                                                { label: "Name", key: "name" as SortKey },
                                                { label: "Mobile", key: null },
                                                { label: "Class", key: "class" as SortKey },
                                                { label: "Stream", key: null },
                                                { label: "Date", key: "createdAt" as SortKey },
                                                { label: "WA", key: null },
                                            ].map(col => (
                                                <th key={col.label} onClick={() => col.key && toggleSort(col.key)}
                                                    className="px-4 py-3 text-left text-xs font-semibold font-sans"
                                                    style={{ color: "#1e3a5f", cursor: col.key ? "pointer" : "default", userSelect: "none", whiteSpace: "nowrap" }}>
                                                    {col.label}{col.key && <span style={{ color: "#9ca3af" }}>{sortIcon(col.key)}</span>}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence mode="wait">
                                            {paginated.map((s, i) => (
                                                <motion.tr key={s._id}
                                                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.03 }}
                                                    style={{ borderBottom: "1px solid #f0ede6" }}
                                                    className="hover:bg-[#faf9f7] transition-colors">
                                                    <td className="px-4 py-3 text-xs font-sans" style={{ color: "#c4b8a8" }}>{(tablePage - 1) * PAGE_SIZE + i + 1}</td>
                                                    <td className="px-4 py-3 text-xs font-semibold font-sans" style={{ color: "#1e3a5f" }}>{s.name}</td>
                                                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "#374151" }}>{s.mobile}</td>
                                                    <td className="px-4 py-3">
                                                        <span className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                                                            style={{ backgroundColor: s.class === 9 ? "#dbeafe" : "#fee2e2", color: s.class === 9 ? "#1e40af" : "#991b1b" }}>
                                                            Class {s.class}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-xs font-sans capitalize" style={{ color: "#6b7280" }}>
                                                        {s.stream || <span style={{ color: "#e0d9ce" }}>—</span>}
                                                    </td>
                                                    <td className="px-4 py-3 text-xs font-sans" style={{ color: "#9ca3af" }}>{fmtDate(s.createdAt)}</td>
                                                    <td className="px-4 py-3">
                                                        <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                            href={`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(`📋 Student Info:\n\nName: ${s.name}\nMobile: +91${s.mobile}\nClass: ${s.class}${s.stream ? `\nStream: ${s.stream}` : ""}\nRegistered: ${fmtDate(s.createdAt)}\n\n_RBPP 2026_`)}`}
                                                            target="_blank" rel="noopener noreferrer"
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white"
                                                            style={{ backgroundColor: "#25d366", textDecoration: "none" }}>
                                                            <WAIcon size={13} />
                                                        </motion.a>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {!loading && tablePages > 1 && (
                        <div className="px-4 sm:px-5 py-4" style={{ borderTop: "1px solid #f0ede6" }}>
                            <Pagination page={tablePage} total={tablePages} onChange={setTablePage} />
                        </div>
                    )}
                </SectionCard>

                {/* ── RECENT REGISTRATIONS ── */}
                <SectionCard delay={0.14}>
                    <div className="px-4 sm:px-5 py-4 sm:py-5 flex items-center justify-between" style={{ borderBottom: "1px solid #f0ede6" }}>
                        <div>
                            <h2 className="text-sm font-bold" style={{ color: "#1e3a5f", fontFamily: "Georgia, serif" }}>Recent Registrations</h2>
                            <p className="text-xs font-sans mt-0.5" style={{ color: "#9ca3af" }}>Latest signups</p>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#fee2e2", color: "#991b1b" }}>
                            {students.length} total
                        </span>
                    </div>

                    <div className="divide-y" style={{ borderColor: "#f0ede6" }}>
                        <AnimatePresence mode="wait">
                            {recentPaginated.map((s, i) => (
                                <motion.div key={s._id}
                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                            style={{ backgroundColor: s.class === 9 ? "#1e3a5f" : "#7c2d12" }}>
                                            {s.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold font-sans truncate" style={{ color: "#1e3a5f" }}>{s.name}</p>
                                            <p className="text-xs font-mono" style={{ color: "#9ca3af" }}>{s.mobile}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="text-xs font-semibold px-2 py-0.5 rounded-lg hidden sm:inline"
                                            style={{ backgroundColor: s.class === 9 ? "#dbeafe" : "#fee2e2", color: s.class === 9 ? "#1e40af" : "#991b1b" }}>
                                            Cl. {s.class}
                                        </span>
                                        <span className="text-xs font-sans hidden sm:inline" style={{ color: "#c4b8a8" }}>{fmtDateShort(s.createdAt)}</span>
                                        <motion.a whileTap={{ scale: 0.9 }}
                                            href={`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(`New student: ${s.name} | Class ${s.class} | +91${s.mobile}`)}`}
                                            target="_blank" rel="noopener noreferrer"
                                            className="w-8 h-8 flex items-center justify-center rounded-xl text-white flex-shrink-0"
                                            style={{ backgroundColor: "#25d366", textDecoration: "none" }}>
                                            <WAIcon size={13} />
                                        </motion.a>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {students.length === 0 && !loading && (
                            <div className="py-10 text-center">
                                <div className="text-2xl mb-2">📭</div>
                                <p className="text-xs font-sans" style={{ color: "#9ca3af" }}>No registrations yet.</p>
                            </div>
                        )}
                    </div>

                    {recentPages > 1 && (
                        <div className="px-4 sm:px-5 py-4" style={{ borderTop: "1px solid #f0ede6" }}>
                            <Pagination page={recentPage} total={recentPages} onChange={setRecentPage} />
                        </div>
                    )}
                </SectionCard>

            </div>

            {/* ── MOBILE BOTTOM NAV ── */}
            <div className="fixed bottom-0 left-0 right-0 sm:hidden z-50 backdrop-blur-md"
                style={{ backgroundColor: "rgba(248,246,242,0.95)", borderTop: "1px solid #e0d9ce", paddingBottom: "env(safe-area-inset-bottom)" }}>
                <div className="flex items-center justify-around px-2 py-2">
                    {[
                        { label: "WA Tools", key: "whatsapp", emoji: "💬" },
                        { label: "Export", key: "export", emoji: "📥" },
                    ].map(item => (
                        <button key={item.key} onClick={() => { toggleSection(item.key); document.querySelector(`[data-section="${item.key}"]`)?.scrollIntoView({ behavior: "smooth" }); }}
                            className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all active:scale-90"
                            style={{ backgroundColor: openSection === item.key ? "#1e3a5f" : "transparent", color: openSection === item.key ? "#fff" : "#6b7280" }}>
                            <span className="text-lg">{item.emoji}</span>
                            <span className="text-xs font-sans font-medium">{item.label}</span>
                        </button>
                    ))}
                    <button onClick={fetchStudents}
                        className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl active:scale-90"
                        style={{ color: "#6b7280" }}>
                        <span className="text-lg">↻</span>
                        <span className="text-xs font-sans font-medium">Refresh</span>
                    </button>
                    <button onClick={() => router.push("/")}
                        className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl active:scale-90"
                        style={{ color: "#6b7280" }}>
                        <span className="text-lg">🏠</span>
                        <span className="text-xs font-sans font-medium">Site</span>
                    </button>
                </div>
            </div>

            {/* ── FOOTER ── */}
            <footer className="py-5 px-4 hidden sm:block" style={{ borderTop: "1px solid #e0d9ce", marginTop: "8px" }}>
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-xs font-sans" style={{ color: "#c4b8a8" }}>
                        © 2026 Rajasthan Board Predictor Portal — Admin Panel
                    </p>
                </div>
            </footer>
        </main>
    );
}