"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LyrixInput from "@/components/LyrixInput";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import Logo from "@/components/logo";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to send reset code");
            } else {
                setIsSent(true);
                // Wait 2 seconds and redirect to reset-password
                setTimeout(() => {
                    router.push(`/reset-password?email=${encodeURIComponent(email)}`);
                }, 2000);
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
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
                        Forgot your password?
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-[300px]">
                        No worries! Enter your email and we&apos;ll send you a reset code.
                    </p>
                </div>

                {isSent ? (
                    <div className="w-full flex flex-col items-center gap-4 p-8 rounded-2xl bg-card border border-border animate-in fade-in zoom-in duration-300">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <MailCheck className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-center">
                            Code sent to {email}! Redirecting...
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="w-full grid gap-6">
                        <LyrixInput
                            id="email"
                            type="email"
                            label="Email Address"
                            placeholder="developer@lyrix.dev"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError("");
                            }}
                            error={error}
                            disabled={isLoading}
                        />

                        <div className="flex flex-col gap-3">
                            <Button
                                type="submit"
                                className="w-full h-11 font-medium"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Sending code…
                                    </>
                                ) : (
                                    "Send Reset Code"
                                )}
                            </Button>

                            <Link
                                href="/login"
                                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to log in
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
