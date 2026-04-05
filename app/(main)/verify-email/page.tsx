"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, MailCheck } from "lucide-react";
import Logo from "@/components/logo";

function VerifyEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [isValidating, setIsValidating] = useState(true);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // On mount check verification status
    useEffect(() => {
        if (!email) {
            router.push("/register");
            return;
        }

        const checkStatus = async () => {
            try {
                const res = await fetch(`/api/auth/check-verification?email=${encodeURIComponent(email)}`);
                const data = await res.json();

                if (data.status === "verified") {
                    router.push("/dashboard");
                } else if (data.status === "not_found") {
                    router.push("/register");
                } else {
                    setIsValidating(false);
                }
            } catch {
                setError("Failed to validate email status. Please refresh.");
                setIsValidating(false);
            }
        };

        checkStatus();
    }, [email, router]);

    // Cooldown timer
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    // Auto-focus first input
    useEffect(() => {
        if (!isValidating) {
            inputRefs.current[0]?.focus();
        }
    }, [isValidating]);

    if (isValidating) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground animate-pulse">Validating request...</p>
                </div>
            </div>
        );
    }

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // digits only

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // single digit
        setOtp(newOtp);
        setError("");

        // Auto-advance
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (!pasted) return;
        const newOtp = [...otp];
        for (let i = 0; i < 6; i++) {
            newOtp[i] = pasted[i] || "";
        }
        setOtp(newOtp);
        const focusIdx = Math.min(pasted.length, 5);
        inputRefs.current[focusIdx]?.focus();
    };

    const handleVerify = async () => {
        const code = otp.join("");
        if (code.length !== 6) {
            setError("Please enter the full 6-digit code");
            return;
        }

        setIsVerifying(true);
        setError("");

        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp: code }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Verification failed");
                setIsVerifying(false);
                return;
            }

            router.push("/dashboard");
            router.refresh();
        } catch {
            setError("Something went wrong. Please try again.");
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        if (resendCooldown > 0) return;
        setIsResending(true);
        setError("");

        try {
            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to resend");
            } else {
                setResendCooldown(60);
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
            }
        } catch {
            setError("Failed to resend. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-4 relative">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-primary/8 blur-[80px]" />
                <div className="absolute inset-0 bg-dot-grid opacity-20" />
            </div>

            <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center gap-8">
                <Logo height={80} width={80} />

                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <MailCheck className="w-7 h-7 text-primary" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Check your email
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-[300px]">
                        We sent a 6-digit code to{" "}
                        <span className="text-foreground font-medium">{email}</span>
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="w-full rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive text-center">
                        {error}
                    </div>
                )}

                {/* OTP inputs */}
                <div className="flex gap-2.5" onPaste={handlePaste}>
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
                            disabled={isVerifying}
                        />
                    ))}
                </div>

                {/* Actions */}
                <div className="w-full flex flex-col gap-3">
                    <Button
                        className="w-full h-11 font-medium"
                        onClick={handleVerify}
                        disabled={isVerifying || otp.join("").length !== 6}
                    >
                        {isVerifying ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Verifying…
                            </>
                        ) : (
                            "Verify Email"
                        )}
                    </Button>

                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={isResending || resendCooldown > 0}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isResending
                            ? "Sending…"
                            : resendCooldown > 0
                                ? `Resend code in ${resendCooldown}s`
                                : "Didn\u0027t get the code? Resend"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-background">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}
