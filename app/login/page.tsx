
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "register" | "login";

const inputClass =
    "w-full px-4 py-3 rounded-sm text-sm font-sans outline-none transition-all duration-200 bg-white border focus:border-[#1e3a5f]";
const inputStyle = { border: "1px solid #d6cfc4", color: "#1e3a5f" };

export default function LoginPage() {
    const router = useRouter();
    const [tab, setTab] = useState<Tab>("register");

    const [name, setName] = useState("");
    const [regMobile, setRegMobile] = useState("");
    const [cls, setCls] = useState("");
    const [stream, setStream] = useState("");

    const [loginMobile, setLoginMobile] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const validateMobile = (m: string) => /^\d{10}$/.test(m);

    const handleRegister = async () => {
        setError("");
        if (!name.trim()) return setError("Please enter your full name.");
        if (!validateMobile(regMobile)) return setError("Mobile number must be exactly 10 digits.");
        if (!cls) return setError("Please select your class.");
        if (cls === "11" && !stream) return setError("Please select your stream.");

        setLoading(true);
        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode: "register", name, mobile: regMobile, class: cls, stream }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Registration failed. Please try again.");
            localStorage.setItem("rbpp_mobile", regMobile);
            router.push("/papers");
        } catch (e: any) {
            setError(e.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setError("");
        if (!validateMobile(loginMobile)) return setError("Mobile number must be exactly 10 digits.");

        setLoading(true);
        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode: "login", mobile: loginMobile }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Login failed. Please try again.");
            localStorage.setItem("rbpp_mobile", loginMobile);
            router.push("/papers");
        } catch (e: any) {
            setError(e.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const switchTab = (t: Tab) => {
        setTab(t);
        setError("");
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: "#f8f6f2" }}>
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 mb-8"
            >
                <div className="w-9 h-9 rounded-sm flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: "#7c2d12" }}>
                    RB
                </div>
                <span className="text-sm font-semibold tracking-wide" style={{ color: "#1e3a5f", fontFamily: "Georgia, serif" }}>
                    Rajasthan Board
                </span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ boxShadow: "0 20px 60px rgba(30,58,95,0.13)" }}
                className="w-full max-w-md rounded-sm transition-shadow duration-300"
                style={{ backgroundColor: "#fff", border: "1px solid #e0d9ce", boxShadow: "0 4px 24px rgba(30,58,95,0.08)" }}
            >
                <div className="px-8 pt-8 pb-6" style={{ borderBottom: "1px solid #f0ede6" }}>
                    <h1 className="text-2xl font-bold mb-1" style={{ color: "#1e3a5f", fontFamily: "Georgia, serif" }}>
                        Student Access Portal
                    </h1>
                    <p className="text-xs font-sans tracking-wide" style={{ color: "#7c2d12" }}>
                        Rajasthan Board Papers 2026 - Class 9th & 11th
                    </p>
                </div>

                <div className="px-8 pt-6">
                    <div className="flex rounded-sm overflow-hidden" style={{ border: "1px solid #e0d9ce" }}>
                        {(["register", "login"] as Tab[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => switchTab(t)}
                                className="flex-1 py-2.5 text-sm font-semibold font-sans transition-all duration-250 capitalize"
                                style={{ backgroundColor: tab === t ? "#7c2d12" : "transparent", color: tab === t ? "#fff" : "#6b7280" }}
                            >
                                {t === "register" ? "Register" : "Login"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="px-8 pb-8 pt-6">
                    <AnimatePresence mode="wait">
                        {tab === "register" ? (
                            <motion.div
                                key="register"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="flex flex-col gap-4"
                            >
                                <div>
                                    <label className="block text-xs font-semibold font-sans mb-1.5" style={{ color: "#1e3a5f" }}>
                                        Full Name <span style={{ color: "#7c2d12" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold font-sans mb-1.5" style={{ color: "#1e3a5f" }}>
                                        Mobile Number <span style={{ color: "#7c2d12" }}>*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="10-digit mobile number"
                                        maxLength={10}
                                        value={regMobile}
                                        onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ""))}
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold font-sans mb-1.5" style={{ color: "#1e3a5f" }}>
                                        Class <span style={{ color: "#7c2d12" }}>*</span>
                                    </label>
                                    <select
                                        value={cls}
                                        onChange={(e) => { setCls(e.target.value); setStream(""); }}
                                        className={inputClass}
                                        style={{ ...inputStyle, appearance: "none" }}
                                    >
                                        <option value="">Select Class</option>
                                        <option value="9">Class 9</option>
                                        <option value="11">Class 11</option>
                                    </select>
                                </div>

                                <AnimatePresence>
                                    {cls === "11" && (
                                        <motion.div
                                            key="stream"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.25 }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            <label className="block text-xs font-semibold font-sans mb-1.5" style={{ color: "#1e3a5f" }}>
                                                Stream <span style={{ color: "#7c2d12" }}>*</span>
                                            </label>
                                            <select
                                                value={stream}
                                                onChange={(e) => setStream(e.target.value)}
                                                className={inputClass}
                                                style={{ ...inputStyle, appearance: "none" }}
                                            >
                                                <option value="">Select Stream</option>
                                                <option value="science">Science</option>
                                            </select>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {error && (
                                    <p className="text-xs font-sans" style={{ color: "#7c2d12" }}>
                                        {error}
                                    </p>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleRegister}
                                    disabled={loading}
                                    className="w-full py-3.5 text-sm font-semibold font-sans rounded-sm mt-1 transition-all duration-200"
                                    style={{ backgroundColor: loading ? "#a16b58" : "#7c2d12", color: "#fff", opacity: loading ? 0.8 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                                >
                                    {loading ? "Registering…" : "Register & Continue →"}
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="flex flex-col gap-4"
                            >
                                <p className="text-xs font-sans leading-relaxed" style={{ color: "#6b7280" }}>
                                    Enter the mobile number you used during registration to access your exam papers.
                                </p>

                                <div>
                                    <label className="block text-xs font-semibold font-sans mb-1.5" style={{ color: "#1e3a5f" }}>
                                        Registered Mobile Number <span style={{ color: "#7c2d12" }}>*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="10-digit mobile number"
                                        maxLength={10}
                                        value={loginMobile}
                                        onChange={(e) => setLoginMobile(e.target.value.replace(/\D/g, ""))}
                                        className={inputClass}
                                        style={inputStyle}
                                    />
                                </div>

                                {error && (
                                    <p className="text-xs font-sans" style={{ color: "#7c2d12" }}>
                                        {error}
                                    </p>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleLogin}
                                    disabled={loading}
                                    className="w-full py-3.5 text-sm font-semibold font-sans rounded-sm mt-1 transition-all duration-200"
                                    style={{ backgroundColor: loading ? "#a16b58" : "#7c2d12", color: "#fff", opacity: loading ? 0.8 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                                >
                                    {loading ? "Verifying…" : "Login & Continue →"}
                                </motion.button>

                                <p className="text-xs font-sans text-center" style={{ color: "#9ca3af" }}>
                                    New student?{" "}
                                    <button onClick={() => switchTab("register")} className="underline" style={{ color: "#1e3a5f" }}>
                                        Register here
                                    </button>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 text-xs font-sans text-center"
                style={{ color: "#c4b8a8" }}
            >
                © 2026 Rajasthan Board Exam Portal. All Rights Reserved.
            </motion.p>
        </main>
    );

}

