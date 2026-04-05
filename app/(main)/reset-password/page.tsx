"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import LyrixInput from "@/components/LyrixInput";
import { Loader2, KeyRound } from "lucide-react";
import Logo from "@/components/logo";

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isResetting, setIsResetting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (!email) router.push("/forgot-password");
        inputRefs.current[0]?.focus();
    }, [email, router]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setError("");
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length !== 6) {
            setError("Please enter the full 6-digit code");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsResetting(true);
        setError("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: code, newPassword: password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to reset password");
                setIsResetting(false);
            } else {
                setIsSuccess(true);
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch {
            setError("Something went wrong. Please try again.");
            setIsResetting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-4 relative">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-primary/8 blur-[80px]" />
                <div className="absolute inset-0 bg-dot-grid opacity-20" />
            </div>

            <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center gap-8">
                <Logo height={60} width={60} />

                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Reset your password
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-[300px]">
                        Enter the code sent to your email and your new password.
                    </p>
                </div>

                {isSuccess ? (
                    <div className="w-full flex flex-col items-center gap-4 p-8 rounded-2xl bg-card border border-border animate-in fade-in zoom-in duration-300">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <KeyRound className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-center">
                            Password updated successfully! Redirecting…
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleReset} className="w-full grid gap-8">
                        {/* OTP code */}
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium leading-none">Security Code</label>
                            <div className="flex justify-between gap-1.5">
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={(el) => { inputRefs.current[i] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(i, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(i, e)}
                                        className={`w-12 h-14 text-center text-xl font-bold rounded-xl border bg-background outline-none transition-all duration-150
                                            ${error
                                                ? "border-destructive focus:ring-2 focus:ring-destructive/30"
                                                : "border-border focus:border-primary focus:ring-2 focus:ring-primary/30"
                                            }`}
                                        disabled={isResetting}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* New password */}
                        <LyrixInput
                            id="password"
                            variant="password"
                            label="New Password"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isResetting}
                            error={error && !otp.includes("") ? error : undefined}
                        />

                        {/* Error (general) */}
                        {error && otp.includes("") && (
                             <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive text-center">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-11 font-medium"
                            disabled={isResetting}
                        >
                            {isResetting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Updating…
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
