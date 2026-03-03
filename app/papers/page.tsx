"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Variants } from "framer-motion";

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};


const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};


type Subject = { name: string; hindi: string; desc: string; file: string; code: string };

const class9Subjects: Subject[] = [
    { name: "English", hindi: "अंग्रेज़ी", desc: "Grammar, comprehension, and writing questions aligned with RBSE Class 9 English syllabus.", file: "https://res.cloudinary.com/dr3usvmyr/image/upload/v1772553078/english_gsufmx.pdf", code: "ENG" },
    { name: "Hindi", hindi: "हिंदी", desc: "गद्य, पद्य, व्याकरण और रचनात्मक लेखन पर आधारित सर्वाधिक संभावित प्रश्न।", file: "https://res.cloudinary.com/dr3usvmyr/image/upload/v1772561255/hindi9th_bbj5h6.pdf", code: "HIN" },
    { name: "Mathematics", hindi: "गणित", desc: "Chapter-wise expected questions covering algebra, geometry, and statistics as per RBSE Class 9 pattern.", file: "https://res.cloudinary.com/dr3usvmyr/image/upload/v1772561255/maths9th_riyk3p.pdf", code: "MATH" },
    { name: "Science", hindi: "विज्ञान", desc: "Physics, Chemistry, and Biology units with high-weightage topic focus for Class 9 board examination.", file: "https://res.cloudinary.com/dr3usvmyr/image/upload/v1772561320/science9th_aiovqq.pdf", code: "SCI" },
    { name: "Social Science", hindi: "सामाजिक विज्ञान", desc: "History, Geography, Political Science, and Economics questions from high-frequency board exam topics.", file: "https://res.cloudinary.com/dr3usvmyr/image/upload/v1772561320/sst9th_prfbad.pdf", code: "SST" },
];


const class11CoreSubjects: Subject[] = [
    { name: "English", hindi: "अंग्रेज़ी", desc: "Prose, poetry, grammar, and writing section questions aligned with RBSE Class 11 English syllabus.", file: "https://res.cloudinary.com/dr3usvmyr/image/upload/v1772561425/english11th_ppl0zw.pdf", code: "ENG" },
    { name: "Hindi", hindi: "हिंदी", desc: "गद्य, पद्य, व्याकरण और रचनात्मक लेखन पर आधारित सर्वाधिक संभावित प्रश्न।", file: "https://res.cloudinary.com/dr3usvmyr/image/upload/v1772561423/hindi11th_ispijz.pdf", code: "HIN" },
    { name: "Physics", hindi: "भौतिक विज्ञान", desc: "Most expected questions from mechanics, thermodynamics, optics, and modern physics for Class 11.", file: "https://res.cloudinary.com/dr3usvmyr/image/upload/v1772561422/physics11th_rui3pj.pdf", code: "PHY" },
    { name: "Chemistry", hindi: "रसायन विज्ञान", desc: "Organic, inorganic, and physical chemistry questions as per RBSE Class 11 curriculum.", file: "https://res.cloudinary.com/dr3usvmyr/image/upload/v1772561422/chemistry11th_dro9vi.pdf", code: "CHEM" },
];

const class11BiologySubjects: Subject[] = [
    { name: "Biology", hindi: "जीव विज्ञान", desc: "Cell biology, genetics, plant physiology, and human biology questions curated for Class 11 boards.", file: "https://res.cloudinary.com/dr3usvmyr/image/upload/v1772561502/biology11th_dtmzkl.pdf", code: "BIO" },
];

const class11MathsSubjects: Subject[] = [
    { name: "Mathematics", hindi: "गणित", desc: "Sets, functions, trigonometry, algebra, and calculus predictor questions for Class 11 Science stream.", file: "https://res.cloudinary.com/dr3usvmyr/image/upload/v1772561503/maths11th_ntslnw.pdf", code: "MATH" },
];

function SubjectCard({ s, onView }: { s: Subject; onView: (file: string) => void }) {
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(30,58,95,0.13)" }}
            className="flex flex-col rounded-sm transition-shadow duration-300"
            style={{ backgroundColor: "#fff", border: "1px solid #e0d9ce", boxShadow: "0 2px 10px rgba(30,58,95,0.06)" }}
        >
            <div className="h-1 rounded-t-sm w-full" style={{ backgroundColor: "#7c2d12" }} />
            <div className="flex flex-col flex-1 p-6">
                <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center text-white text-xs font-bold font-sans mb-4"
                    style={{ backgroundColor: "#1e3a5f" }}
                >
                    {s.code}
                </div>
                <h2 className="text-base font-bold mb-0.5" style={{ color: "#1e3a5f", fontFamily: "Georgia, serif" }}>
                    {s.name}
                </h2>
                <p className="text-xs mb-3 font-sans" style={{ color: "#7c2d12" }}>
                    {s.hindi}
                </p>
                <p className="text-xs font-sans leading-relaxed flex-1 mb-6" style={{ color: "#6b7280" }}>
                    {s.desc}
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onView(s.file)}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-semibold font-sans rounded-sm transition-all duration-200"
                    style={{ backgroundColor: "#7c2d12", color: "#fff", border: "none", cursor: "pointer" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    View Paper
                </motion.button>
            </div>
        </motion.div>
    );
}

function SectionBlock({
    title,
    subjects,
    onView,
}: {
    title: string;
    subjects: Subject[];
    onView: (file: string) => void;
}) {
    return (
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
                <span
                    className="text-xs font-semibold font-sans tracking-widest uppercase px-3 py-1 rounded-sm"
                    style={{ backgroundColor: "#f0ede6", color: "#7c2d12", border: "1px solid #e0d9ce" }}
                >
                    {title}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: "#e0d9ce" }} />
            </div>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {subjects.map((s, i) => (
                    <SubjectCard key={i} s={s} onView={onView} />
                ))}
            </motion.div>
        </div>
    );
}

export default function PapersPage() {
    const router = useRouter();
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [studentName, setStudentName] = useState("");
    const [studentClass, setStudentClass] = useState<number | null>(null);
    const [studentStream, setStudentStream] = useState<string | null>(null);
    const [selectedPDF, setSelectedPDF] = useState<string | null>(null);

    useEffect(() => {
        const mobile = localStorage.getItem("rbpp_mobile");
        if (!mobile) {
            router.replace("/login");
            return;
        }

        const fetchStudent = async () => {
            try {
                const res = await fetch(`/api/student?mobile=${mobile}`);
                if (!res.ok) throw new Error("Fetch failed");
                const data = await res.json();
                setStudentName(data.name || "");
                setStudentClass(Number(data.class));
                setStudentStream(data.stream || null);
                setReady(true);
            } catch {
                router.replace("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [router]);

    useEffect(() => {
        if (selectedPDF) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedPDF]);

    const handleLogout = () => {
        localStorage.removeItem("rbpp_mobile");
        router.push("/login");
    };

    const openModal = useCallback((file: string) => {
        setSelectedPDF(file);
    }, []);

    const closeModal = useCallback(() => {
        setSelectedPDF(null);
    }, []);

    const getBadgeLabel = () => {
        if (studentClass === 9) return "Class 9 Student";
        if (studentClass === 11 && studentStream === "science") return "Class 11 — Science Stream";
        if (studentClass === 11) return `Class 11 — ${studentStream ?? "Unknown"} Stream`;
        return "";
    };

    const isUnsupportedStream = studentClass === 11 && studentStream !== "science";

    if (loading || !ready) {
        return (
            <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8f6f2" }}>
                <p className="text-sm font-sans" style={{ color: "#6b7280" }}>Loading your papers…</p>
            </main>
        );
    }

    return (
        <>
            <main className="min-h-screen" style={{ backgroundColor: "#f8f6f2" }}>
                {/* ── NAV ── */}
                <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#f8f6f2]/90 border-b border-[#e4dccf] shadow-sm">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                        {/* ─── Logo Section ─── */}
                        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                            <div
                                className="w-9 h-9 rounded-md flex items-center justify-center text-white text-sm font-bold transition-all duration-300 group-hover:scale-105"
                                style={{
                                    background: "linear-gradient(135deg, #7c2d12, #9a3412)",
                                    boxShadow: "0 4px 14px rgba(124,45,18,0.25)"
                                }}
                            >
                                RB
                            </div>

                            <div className="flex flex-col leading-tight">
                                <span
                                    className="text-base font-semibold transition-colors duration-300 group-hover:text-[#7c2d12]"
                                    style={{
                                        color: "#1e3a5f",
                                        fontFamily: "Georgia, serif",
                                        letterSpacing: "0.4px"
                                    }}
                                >
                                    Rajasthan Board
                                </span>
                                <span
                                    className="text-[10px] font-sans tracking-widest uppercase"
                                    style={{ color: "#7c2d12" }}
                                >
                                    माध्यमिक शिक्षा बोर्ड राजस्थान
                                </span>
                            </div>
                        </Link>

                        {/* ─── Right Section ─── */}
                        <button
                            onClick={handleLogout}
                            className="text-xs px-5 py-2.5 rounded-md font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
                            style={{
                                backgroundColor: "#7c2d12",
                                color: "#fff",
                                boxShadow: "0 4px 14px rgba(124,45,18,0.25)"
                            }}
                        >
                            Logout
                        </button>

                    </div>
                </nav>

                {/* ── HEADER ── */}
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-12">
                            <motion.p variants={fadeUp} className="text-xs tracking-[0.22em] uppercase mb-3 font-sans" style={{ color: "#7c2d12" }}>
                                माध्यमिक शिक्षा बोर्ड राजस्थान &nbsp;•&nbsp; Session 2025–26
                            </motion.p>
                            <motion.h1
                                variants={fadeUp}
                                className="text-3xl md:text-4xl font-bold mb-3"
                                style={{ color: "#1e3a5f", fontFamily: "Georgia, serif", letterSpacing: "-0.01em" }}
                            >
                                {studentName ? `Welcome, ${studentName}` : "Predictor Papers Access"}
                            </motion.h1>
                            <motion.p variants={fadeUp} className="text-sm font-sans mb-5" style={{ color: "#6b7280" }}>
                                Subject-wise papers for Class 9 &amp; Class 11 — Rajasthan Board Annual Examination 2026.
                            </motion.p>
                            {getBadgeLabel() && (
                                <motion.div variants={fadeUp}>
                                    <span
                                        className="inline-block text-xs font-semibold font-sans px-4 py-1.5 rounded-sm"
                                        style={{ backgroundColor: "#1e3a5f", color: "#fff", letterSpacing: "0.05em" }}
                                    >
                                        {getBadgeLabel()}
                                    </span>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* ── UNSUPPORTED STREAM ── */}
                        {isUnsupportedStream ? (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="rounded-sm px-8 py-10 text-center"
                                style={{ backgroundColor: "#fff", border: "1px solid #e0d9ce" }}
                            >
                                <div
                                    className="w-12 h-12 rounded-sm mx-auto mb-5 flex items-center justify-center font-bold text-white text-lg"
                                    style={{ backgroundColor: "#7c2d12" }}
                                >
                                    !
                                </div>
                                <h2 className="text-lg font-bold mb-2" style={{ color: "#1e3a5f", fontFamily: "Georgia, serif" }}>
                                    Papers Not Available
                                </h2>
                                <p className="text-sm font-sans" style={{ color: "#6b7280" }}>
                                    Predictor papers are currently available only for the Science stream.
                                </p>
                            </motion.div>
                        ) : studentClass === 9 ? (
                            /* ── CLASS 9 GRID ── */
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={stagger}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                {class9Subjects.map((s, i) => (
                                    <SubjectCard key={i} s={s} onView={openModal} />
                                ))}
                            </motion.div>
                        ) : (
                            /* ── CLASS 11 SCIENCE SECTIONS ── */
                            <div>
                                <SectionBlock title="Core Subjects" subjects={class11CoreSubjects} onView={openModal} />
                                <SectionBlock title="Biology (For PCB Students)" subjects={class11BiologySubjects} onView={openModal} />
                                <SectionBlock title="Mathematics (For PCM Students)" subjects={class11MathsSubjects} onView={openModal} />
                            </div>
                        )}
                    </div>
                </section>

                {/* ── BOTTOM NOTE ── */}
                <section className="pb-16 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div
                            className="rounded-sm px-6 py-5"
                            style={{
                                backgroundColor: "#f0ede6",
                                border: "1px solid #e0d9ce",
                            }}
                        >
                            <p
                                className="text-xs font-sans leading-relaxed"
                                style={{ color: "#6b7280" }}
                            >
                                <span
                                    className="font-semibold"
                                    style={{ color: "#1e3a5f" }}
                                >
                                    Official Examination Papers Notice:
                                </span>{" "}
                                The documents available on this portal constitute the authorized
                                examination papers for the Rajasthan Board (RBSE) Academic
                                Session 2025–26. These papers are issued for academic reference
                                and institutional use. Students are advised to download and
                                utilize them strictly for educational purposes in accordance
                                with board guidelines.
                            </p>
                        </div>
                    </div>
                </section>



                {/* ── FOOTER ── */}
                <footer className="py-6 px-6" style={{ borderTop: "1px solid #e0d9ce", backgroundColor: "#f8f6f2" }}>
                    <div className="max-w-6xl mx-auto text-center">
                        <p className="text-xs font-sans" style={{ color: "#9ca3af" }}>
                            © 2026 Rajasthan Board Predictor Portal. All Rights Reserved.
                        </p>
                    </div>
                </footer>
            </main>

            {/* ── PDF MODAL ── */}
            <AnimatePresence>
                {selectedPDF && (
                    <motion.div
                        key="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                        style={{ backgroundColor: "rgba(10, 20, 40, 0.82)", backdropFilter: "blur(4px)" }}
                        onClick={closeModal}
                    >
                        <motion.div
                            key="modal-box"
                            initial={{ opacity: 0, scale: 0.96, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 16 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full max-w-5xl rounded-sm overflow-hidden flex flex-col"
                            style={{
                                backgroundColor: "#fff",
                                border: "1px solid #e0d9ce",
                                boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
                                height: "90vh",
                                maxHeight: "90vh",
                                userSelect: "none",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal header */}
                            <div
                                className="flex items-center justify-between px-5 py-3 flex-shrink-0"
                                style={{ borderBottom: "1px solid #e0d9ce", backgroundColor: "#f8f6f2" }}
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-6 h-6 rounded-sm flex items-center justify-center text-white text-xs font-bold"
                                        style={{ backgroundColor: "#7c2d12" }}
                                    >
                                        RB
                                    </div>
                                    <span className="text-xs font-semibold font-sans" style={{ color: "#1e3a5f" }}>
                                        Rajasthan Board Predictor — Paper Viewer
                                    </span>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="w-7 h-7 rounded-sm flex items-center justify-center transition-all duration-150 hover:opacity-70"
                                    style={{ backgroundColor: "#1e3a5f", color: "#fff", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}
                                >
                                    ✕
                                </button>
                            </div>

                            {/* iFrame container */}
                            <div
                                className="flex-1 w-full"
                                style={{ position: "relative", overflow: "hidden" }}
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                <iframe
                                    src={`${selectedPDF}#toolbar=0&navpanes=0&scrollbar=0`}
                                    className="w-full h-full rounded-sm"
                                    style={{ border: "none" }}
                                    title="Predictor Paper Viewer"
                                />
                            </div>

                            {/* Modal footer */}
                            <div
                                className="px-5 py-2.5 flex-shrink-0 text-center"
                                style={{ borderTop: "1px solid #e0d9ce", backgroundColor: "#f8f6f2" }}
                            >
                                <p className="text-xs font-sans" style={{ color: "#9ca3af" }}>
                                    For personal academic use only — Rajasthan Board Predictor Portal 2026
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
