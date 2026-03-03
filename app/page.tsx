"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const router = useRouter();

  const features = [
    {
      title: "Exam-Focused Content",
      desc: "Every question is curated based on the latest Rajasthan Board syllabus and examination pattern.",
      icon: "📋",
    },
    {
      title: "Most Expected Questions",
      desc: "Compiled from trend analysis of past 10 years of board examinations with high accuracy.",
      icon: "🎯",
    },
    {
      title: "Experienced Faculty",
      desc: "Papers prepared by senior educators with decades of Rajasthan Board teaching experience.",
      icon: "🏛",
    },
    {
      title: "Smart Revision Structure",
      desc: "Organized by chapter weightage and difficulty level for effective last-minute preparation.",
      icon: "📐",
    },
  ];

  const subjects = [
    // ── Class 9 ──
    { name: "Mathematics", code: "गणित", classes: "Class 9" },
    { name: "Science", code: "विज्ञान", classes: "Class 9" },
    { name: "English", code: "अंग्रेज़ी", classes: "Class 9" },
    { name: "Social Science", code: "सामाजिक विज्ञान", classes: "Class 9" },

    // ── Class 11 ──
    { name: "Mathematics", code: "गणित", classes: "Class 11" },
    { name: "Physics", code: "भौतिक विज्ञान", classes: "Class 11" },
    { name: "Chemistry", code: "रसायन विज्ञान", classes: "Class 11" },
    { name: "Biology", code: "जीव विज्ञान", classes: "Class 11" },
  ];
  const steps = [
    {
      num: "01",
      title: "Register",
      desc: "Create your student profile by entering your name, mobile number, and class to securely access the portal.",
    },
    {
      num: "02",
      title: "Access Papers",
      desc: "View subject-wise official examination papers directly on the portal through the secure paper viewer.",
    },
    {
      num: "03",
      title: "Prepare with Official Papers",
      desc: "Study and practice using the authorized Rajasthan Board examination papers available on this website.",
    },
  ];

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#f8f6f2", color: "#1e3a5f", fontFamily: "'Georgia', serif" }}
    >
      {/* ── NAV ── */}
      <>
        {/* Top Tricolor Strip */}
        <div className="h-[2px] w-full bg-gradient-to-r from-orange-500 via-white to-green-600" />

        <nav className="sticky top-0 z-50 bg-[#f8f6f2]/95 backdrop-blur border-b border-[#e4dccf]">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">

            {/* ─── Logo Section ─── */}
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-3 group min-w-0"
            >
              {/* Logo Badge */}
              <div
                className="w-8 h-8 md:w-9 md:h-9 rounded-md flex items-center justify-center text-white text-xs md:text-sm font-bold transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #7c2d12, #9a3412)",
                  boxShadow: "0 3px 10px rgba(124,45,18,0.25)"
                }}
              >
                RB
              </div>

              {/* Text */}
              <div className="flex flex-col leading-tight truncate">
                <span
                  className="text-sm md:text-base font-semibold truncate"
                  style={{
                    color: "#1e3a5f",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  Rajasthan Board
                </span>

                {/* Hide Hindi subtitle on very small screens */}
                <span
                  className="hidden sm:block text-[10px] font-sans tracking-wider uppercase"
                  style={{ color: "#7c2d12" }}
                >
                  माध्यमिक शिक्षा बोर्ड राजस्थान
                </span>
              </div>
            </Link>

            {/* ─── Right Button ─── */}
            <button
              onClick={() => router.push("/login")}
              className="text-[11px] md:text-xs px-3 md:px-5 py-2 rounded-md font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{
                backgroundColor: "#7c2d12",
                color: "#fff",
                boxShadow: "0 3px 10px rgba(124,45,18,0.25)"
              }}
            >
              Student Login →
            </button>

          </div>
        </nav>
      </>

      {/* ── HERO ── */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.25em] uppercase mb-6 font-sans"
              style={{ color: "#7c2d12" }}
            >
              माध्यमिक शिक्षा बोर्ड राजस्थान &nbsp;•&nbsp; Academic Session 2025–26
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{ color: "#1e3a5f", letterSpacing: "-0.02em" }}
            >
              Rajasthan Board
              <br />
              <span style={{ color: "#7c2d12" }}>Exam Papers</span>
              <br />
              2026
            </motion.h1>


            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl font-sans leading-relaxed mb-4 max-w-2xl mx-auto"
              style={{ color: "#374151" }}
            >
              Comprehensive exam-focused papers for Class 9 and Class 11 students
              appearing in the Rajasthan Board Annual Examination 2026.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-sm font-sans mb-12 max-w-xl mx-auto"
              style={{ color: "#6b7280" }}
            >
              Access the subject-wise question papers prepared by experienced faculty; these documents reflect the official RBSE question-paper pattern and syllabus and represent the papers students can expect in the Rajasthan Board examinations
            </motion.p>

            <motion.div variants={fadeUp} custom={4}>
              <button
                onClick={() => router.push("/login")}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold font-sans rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: "#7c2d12", color: "#fff", boxShadow: "0 4px 20px rgba(124,45,18,0.3)" }}
              >
                Access Exam Papers
                <span>→</span>
              </button>
              <p className="mt-4 text-xs font-sans" style={{ color: "#9ca3af" }}>
                Free access for registered Rajasthan Board students
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ borderTop: "1px solid #e0d9ce" }} />
      </div>

      {/* ── ABOUT ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.2em] uppercase mb-4 font-sans"
              style={{ color: "#7c2d12" }}
            >
              About Exam Papers
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ color: "#1e3a5f" }}
            >
              What Are Exam Papers?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base md:text-lg font-sans leading-relaxed mb-6"
              style={{ color: "#374151" }}
            >
              Exam Papers are meticulously designed question sets that anticipate the
              examination questions based on a rigorous analysis of'
              Rajasthan Board papers, current syllabus weightage, and chapter-wise importance
              distribution.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-base font-sans leading-relaxed"
              style={{ color: "#6b7280" }}
            >
              Unlike generic practice papers, our exam papers are updated every academic session
              to reflect the evolving examination trends of the Madhyamik Shiksha Board Rajasthan
              (RBSE), ensuring students spend their preparation time on content that matters most.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ borderTop: "1px solid #e0d9ce" }} />
      </div>

      {/* ── WHY CHOOSE ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.2em] uppercase mb-4 font-sans"
              style={{ color: "#7c2d12" }}
            >
              Why Choose Us
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#1e3a5f" }}
            >
              Built for Board Examination Excellence
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(30,58,95,0.12)" }}
                className="p-6 rounded-sm cursor-default transition-shadow duration-300"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e0d9ce",
                  boxShadow: "0 2px 8px rgba(30,58,95,0.05)",
                }}
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-base font-bold mb-3" style={{ color: "#1e3a5f" }}>
                  {f.title}
                </h3>
                <p className="text-sm font-sans leading-relaxed" style={{ color: "#6b7280" }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ borderTop: "1px solid #e0d9ce" }} />
      </div>

      {/* ── SUBJECTS ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* ── Heading ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.25em] uppercase mb-4 font-sans"
              style={{ color: "#7c2d12" }}
            >
              Academic Subjects
            </motion.p>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#1e3a5f" }}
            >
              Available for Class 9, 11 & 12
            </motion.h2>
          </motion.div>

          {/* ── Cards Grid ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {subjects.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                whileHover={{
                  y: -6,
                  boxShadow: "0 18px 50px rgba(30,58,95,0.15)"
                }}
                className="group relative"
              >
                <Link href="/login">
                  <div
                    className="cursor-pointer p-6 md:p-8 rounded-md transition-all duration-300 text-center"
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #e0d9ce",
                      boxShadow: "0 3px 10px rgba(30,58,95,0.05)",
                    }}
                  >
                    {/* Top Accent Line */}
                    <div
                      className="absolute top-0 left-0 w-full h-1 rounded-t-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: "#7c2d12" }}
                    />

                    {/* Icon Circle */}
                    <div
                      className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center text-white font-bold text-xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, #1e3a5f, #274b78)"
                      }}
                    >
                      {s.name.charAt(0)}
                    </div>

                    {/* Subject Name */}
                    <h3
                      className="text-base md:text-lg font-bold mb-1 transition-colors duration-300 group-hover:text-[#7c2d12]"
                      style={{ color: "#1e3a5f" }}
                    >
                      {s.name}
                    </h3>

                    {/* Hindi Name */}
                    <p
                      className="text-xs font-sans mb-3"
                      style={{ color: "#7c2d12" }}
                    >
                      {s.code}
                    </p>

                    {/* Class Badge */}
                    <span
                      className="inline-block text-[11px] font-sans px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "#f8f6f2",
                        color: "#6b7280",
                        border: "1px solid #e0d9ce"
                      }}
                    >
                      {s.classes}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ borderTop: "1px solid #e0d9ce" }} />
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.2em] uppercase mb-4 font-sans"
              style={{ color: "#7c2d12" }}
            >
              How It Works
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#1e3a5f" }}
            >
              Three Steps to Board Readiness
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="text-center px-4">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center font-bold text-xl"
                  style={{ backgroundColor: "#7c2d12", color: "#fff" }}
                >
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 w-full"
                    style={{ left: `${(i + 1) * 33}%`, width: "16%", borderTop: "1px dashed #c4b8a8" }}
                  />
                )}
                <h3 className="text-xl font-bold mb-3" style={{ color: "#1e3a5f" }}>
                  {step.title}
                </h3>
                <p className="text-sm font-sans leading-relaxed" style={{ color: "#6b7280" }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ borderTop: "1px solid #e0d9ce" }} />
      </div>

      {/* ── TRUST ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.25em] uppercase mb-4 font-sans"
              style={{ color: "#7c2d12" }}
            >
              Official Academic Portal
            </motion.p>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ color: "#1e3a5f" }}
            >
              Designed for Rajasthan Board Students
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base md:text-lg font-sans leading-relaxed mb-10"
              style={{ color: "#374151" }}
            >
              This portal provides authorized subject-wise examination papers for
              students of Class 9 & 11 preparing for the Rajasthan Board
              Secondary and Senior Secondary Examinations. All papers are structured
              strictly in accordance with the RBSE-prescribed syllabus, marking
              scheme, and official examination framework.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12"
            >
              {[
                { stat: "RBSE", label: "Aligned Framework" },
                { stat: "9 • 11", label: "Classes Covered" },
                { stat: "Subject-wise", label: "Structured Papers" },
                { stat: "2026", label: "Academic Session" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-2xl md:text-3xl font-bold mb-2"
                    style={{ color: "#7c2d12" }}
                  >
                    {item.stat}
                  </div>
                  <div className="text-xs font-sans" style={{ color: "#6b7280" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 px-6 relative" style={{ backgroundColor: "#f0ede6" }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs tracking-[0.25em] uppercase mb-4 font-sans"
              style={{ color: "#7c2d12" }}
            >
              Secure Student Access
            </motion.p>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-5xl font-bold leading-tight mb-6"
              style={{ color: "#1e3a5f" }}
            >
              Access Official Examination Papers
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base font-sans mb-10"
              style={{ color: "#6b7280" }}
            >
              Register with your Name, Mobile Number, and Class to securely view
              subject-wise Rajasthan Board examination papers for the Academic
              Session 2025–26.
            </motion.p>

            <motion.div variants={fadeUp} custom={3}>
              <button
                onClick={() => router.push("/login")}
                className="inline-flex items-center gap-2 px-10 py-5 text-base font-semibold font-sans rounded-md transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundColor: "#7c2d12",
                  color: "#fff",
                  boxShadow: "0 6px 30px rgba(124,45,18,0.35)",
                }}
              >
                Register &amp; View Papers
                <span>→</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-10 px-6"
        style={{
          borderTop: "1px solid #e0d9ce",
          backgroundColor: "#f8f6f2",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">

          <p className="text-xs font-sans mb-2" style={{ color: "#9ca3af" }}>
            © 2026 Rajasthan Board Academic Portal. All Rights Reserved.
          </p>

          <p className="text-xs font-sans" style={{ color: "#c4b8a8" }}>
            माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE) — Academic Resource Access Platform
          </p>

          <p className="text-[10px] font-sans mt-3" style={{ color: "#b8b2a7" }}>
            This portal is intended for educational use by registered Rajasthan Board students only.
          </p>

        </div>
      </footer>
    </main>
  );
}