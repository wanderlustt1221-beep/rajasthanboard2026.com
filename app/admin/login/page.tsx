
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError("");
        if (!password.trim()) return setError("Please enter the admin password.");

        setLoading(true);
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Login failed.");
            router.replace("/admin");
        } catch (e: any) {
            setError(e.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
    };

    return (
        <main
            className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{ backgroundColor: "#f8f6f2" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-sm rounded-sm"
                style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e0d9ce",
                    boxShadow: "0 4px 24px rgba(30,58,95,0.08)",
                }}
            >
                {/* Header */}
                <div className="px-8 pt-8 pb-6" style={{ borderBottom: "1px solid #f0ede6" }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className="w-8 h-8 rounded-sm flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: "#7c2d12" }}
                        >
                            RB
                        </div>
                        <span className="text-xs font-semibold font-sans tracking-wide" style={{ color: "#1e3a5f" }}>
                            Rajasthan Board
                        </span>
                    </div>
                    <h1 className="text-xl font-bold" style={{ color: "#1e3a5f", fontFamily: "Georgia, serif" }}>
                        Admin Access
                    </h1>
                    <p className="text-xs font-sans mt-1" style={{ color: "#9ca3af" }}>
                        Enter admin password to continue
                    </p>
                </div>

                {/* Form */}
                <div className="px-8 py-6 flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-semibold font-sans mb-1.5" style={{ color: "#1e3a5f" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            className="w-full px-4 py-3 rounded-sm text-sm font-sans outline-none bg-white"
                            style={{ border: "1px solid #d6cfc4", color: "#1e3a5f" }}
                            autoFocus
                        />
                    </div>

                    {error && (
                        <p className="text-xs font-sans" style={{ color: "#7c2d12" }}>
                            {error}
                        </p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full py-3.5 text-sm font-semibold font-sans rounded-sm transition-all"
                        style={{
                            backgroundColor: loading ? "#a16b58" : "#7c2d12",
                            color: "#fff",
                            opacity: loading ? 0.8 : 1,
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? "Verifying…" : "Access Admin Panel →"}
                    </motion.button>
                </div>
            </motion.div>

            <p className="mt-6 text-xs font-sans" style={{ color: "#c4b8a8" }}>
                © 2026 Rajasthan Board Portal
            </p>
        </main>
    );
}