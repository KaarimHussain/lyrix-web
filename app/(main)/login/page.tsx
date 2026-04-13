"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import LyrixInput from "@/components/LyrixInput";
import { Separator } from "@/components/ui/separator";
import { Chrome, Quote, Loader2 } from "lucide-react";
import Logo from "@/components/logo";

type AuthError = {
    title: string;
    description: string;
};

function LoginPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<AuthError | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const oauthParamError = useMemo(() => {
        const errorParam = searchParams.get("error");
        if (errorParam === "OAuthAccountNotLinked") {
            return {
                title: "Account already exists",
                description: "An account with this email already exists. Please sign in with your password instead.",
            };
        }
        return null;
    }, [searchParams]);

    const buildLoginError = (rawError?: string | null, code?: string | null): AuthError => {
        const normalized = rawError?.trim() || "";
        const lowered = normalized.toLowerCase();
        const normalizedCode = code?.trim().toLowerCase() || "";

        if (!normalized) {
            return {
                title: "Sign in failed",
                description: "We couldn't sign you in right now. Please try again.",
            };
        }

        if (lowered === "configuration" || lowered.includes("config")) {
            return {
                title: "Authentication temporarily unavailable",
                description:
                    "Sign-in is not fully configured right now. If you're an admin, check AUTH_SECRET and Google auth environment variables.",
            };
        }

        if (normalized === "CredentialsSignin" && normalizedCode === "oauth_only_account") {
            return {
                title: "Google sign-in required",
                description: "This account was created with Google. Please continue with Google to sign in.",
            };
        }

        if (normalized === "CredentialsSignin") {
            return {
                title: "Invalid credentials",
                description: "Your email or password is incorrect. Please check and try again.",
            };
        }

        if (lowered.includes("google")) {
            return {
                title: "Google sign-in required",
                description: "This account was created with Google. Please continue with Google to sign in.",
            };
        }

        if (lowered.includes("no account") || lowered.includes("not found")) {
            return {
                title: "Account not found",
                description: "No account exists for this email address. Check your email or create a new account.",
            };
        }

        if (lowered.includes("password")) {
            return {
                title: "Password issue",
                description: normalized,
            };
        }

        if (lowered.includes("database") || lowered.includes("connection")) {
            return {
                title: "Service unavailable",
                description: "We're having trouble reaching the database. Please try again in a moment.",
            };
        }

        return {
            title: "Sign in failed",
            description: normalized,
        };
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        setError(null);
        try {
            // OAuth providers should use redirect flow for reliable behavior across environments.
            await signIn("google", { callbackUrl: "/dashboard" });
        } catch {
            setError({
                title: "Google sign-in failed",
                description: "A network or provider error occurred while signing in with Google.",
            });
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});

        // Client-side validation
        const errors: { email?: string; password?: string } = {};
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setError({
                title: "Missing required fields",
                description: "Please fill in your email and password to continue.",
            });
            return;
        }

        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                const parsedError = buildLoginError(result.error, result.code);

                // Show targeted field errors for known messages
                if (parsedError.title === "Google sign-in required") {
                    setFieldErrors({ email: "Use Google to sign in for this account." });
                } else if (parsedError.title === "Account not found") {
                    setFieldErrors({ email: "No account found with this email." });
                } else if (parsedError.title === "Password issue" || parsedError.title === "Invalid credentials") {
                    setFieldErrors({ password: "Please check your password and try again." });
                } else {
                    setFieldErrors({});
                }
                setError(parsedError);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch {
            setError({
                title: "Unexpected error",
                description: "A network or server error occurred while signing in. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 bg-background text-foreground selection:bg-primary/20 selection:text-primary">

            <div className="hidden lg:flex flex-col justify-between bg-muted/30 p-10 xl:p-14 relative overflow-hidden border-r border-border">
                {/* Animated SVG Abstract Art Background */}
                <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

                    <div className="absolute inset-0 bg-dot-grid opacity-30" />

                    {/* Rotating Geometric Network */}
                    <svg
                        viewBox="0 0 100 100"
                        className="absolute w-[150%] h-[150%] opacity-30 text-primary"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <g stroke="currentColor" strokeWidth="0.15" fill="none">
                            <circle cx="50" cy="50" r="45" strokeDasharray="2 4" className="origin-center animate-[spin_60s_linear_infinite]" />
                            <circle cx="50" cy="50" r="35" strokeDasharray="1 3" className="origin-center animate-[spin_40s_linear_infinite_reverse]" />
                            <circle cx="50" cy="50" r="25" strokeDasharray="10 2 2 2" className="origin-center animate-[spin_30s_linear_infinite]" />

                            <g className="origin-center animate-[spin_80s_linear_infinite_reverse] opacity-40">
                                <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="1 2" />
                                <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="1 2" />
                                <line x1="18" y1="18" x2="82" y2="82" strokeDasharray="1 2" />
                                <line x1="18" y1="82" x2="82" y2="18" strokeDasharray="1 2" />
                            </g>

                            <g fill="currentColor" stroke="none">
                                <circle cx="50" cy="5" r="0.8" className="origin-center animate-[spin_60s_linear_infinite]" />
                                <circle cx="85" cy="50" r="1.2" className="origin-center animate-[spin_40s_linear_infinite_reverse]" />
                                <circle cx="50" cy="75" r="1" className="origin-center animate-[spin_30s_linear_infinite]" />
                                <circle cx="25" cy="25" r="1.5" className="origin-center animate-[spin_80s_linear_infinite_reverse]" />
                            </g>

                            <circle cx="50" cy="50" r="8" fill="currentColor" className="opacity-10 animate-pulse" />
                            <circle cx="50" cy="50" r="3" fill="currentColor" className="opacity-30" />
                        </g>
                    </svg>

                    {/* Morphing Sine Waves (Content as Code vibe) */}
                    <svg viewBox="0 0 100 100" className="absolute w-[120%] h-[120%] opacity-20 text-primary" preserveAspectRatio="none">
                        <path fill="none" stroke="currentColor" strokeWidth="0.1">
                            <animate attributeName="d" dur="12s" repeatCount="indefinite"
                                values="M0 50 Q 25 30, 50 50 T 100 50; M0 50 Q 25 70, 50 50 T 100 50; M0 50 Q 25 30, 50 50 T 100 50" />
                        </path>
                        <path fill="none" stroke="currentColor" strokeWidth="0.05" className="opacity-60">
                            <animate attributeName="d" dur="18s" repeatCount="indefinite"
                                values="M0 40 Q 25 60, 50 40 T 100 40; M0 40 Q 25 20, 50 40 T 100 40; M0 40 Q 25 60, 50 40 T 100 40" />
                        </path>
                        <path fill="none" stroke="currentColor" strokeWidth="0.05" className="opacity-40">
                            <animate attributeName="d" dur="24s" repeatCount="indefinite"
                                values="M0 60 Q 25 40, 50 60 T 100 60; M0 60 Q 25 80, 50 60 T 100 60; M0 60 Q 25 40, 50 60 T 100 60" />
                        </path>
                    </svg>
                </div>

                <div className="relative z-10 flex items-center">
                    <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
                        <Logo height={80} width={80} />
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg mt-auto">
                    <div className="mb-4">
                        <Quote className="w-8 h-8 text-primary/40 rotate-180" />
                    </div>
                    <blockquote className="space-y-4">
                        <p className="text-xl md:text-2xl font-medium leading-relaxed font-sans text-foreground/90 tracking-tight">
                            &quot;Lyrix treats content as code. No more fighting with WYSIWYG editors or proprietary plugins. If you can build a React component, you can build a CMS block.&quot;
                        </p>
                        <footer className="text-sm">
                            <div className="font-semibold text-foreground">Sophia Reynolds</div>
                            <div className="text-muted-foreground">Lead Engineer, Acme Corp</div>
                        </footer>
                    </blockquote>
                </div>
            </div>

            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen lg:min-h-0 relative">

                <div className="lg:hidden absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[50px] -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute inset-0 bg-dot-grid opacity-20" />
                </div>

                <div className="mx-auto flex w-full flex-col justify-center space-y-8 max-w-[400px] relative z-10">

                    <div className="flex lg:hidden justify-center mb-4">
                        <Logo height={80} width={80} />
                    </div>

                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                            Welcome back
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your credentials to access your workspace
                        </p>
                    </div>

                    {/* General error banner */}
                    {(oauthParamError || error) && (
                        <div
                            role="alert"
                            aria-live="polite"
                            className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-destructive text-left"
                        >
                            <p className="text-sm font-semibold">{(oauthParamError || error)?.title}</p>
                            <p className="text-xs text-destructive/85 mt-0.5">{(oauthParamError || error)?.description}</p>
                        </div>
                    )}

                    <div className="grid gap-6">
                        <Button
                            variant="outline"
                            className="w-full h-11 bg-background hover:bg-muted text-foreground transition-all gap-2 text-sm font-medium border border-border rounded-xl"
                            onClick={handleGoogleSignIn}
                            disabled={isGoogleLoading || isLoading}
                        >
                            {isGoogleLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Chrome className="w-4 h-4" />
                            )}
                            Continue with Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full border-t border-border bg-transparent" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground font-medium tracking-wider">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <form className="grid gap-5" onSubmit={handleSubmit}>
                            <LyrixInput
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="developer@lyrix.dev"
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
                                }}
                                error={fieldErrors.email}
                                disabled={isLoading}
                            />

                            <LyrixInput
                                id="password"
                                variant="password"
                                label={
                                    <div className="flex items-center justify-between w-full">
                                        <span>Password</span>
                                        <Link
                                            href="/forgot-password"
                                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                }
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: undefined }));
                                }}
                                error={fieldErrors.password}
                                disabled={isLoading}
                            />

                            <Button
                                type="submit"
                                className="w-full h-11 mt-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium"
                                disabled={isLoading || isGoogleLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Signing in…
                                    </>
                                ) : (
                                    <>Sign In &rarr;</>
                                )}
                            </Button>
                        </form>
                    </div>

                    <div className="text-center text-sm text-muted-foreground mt-4">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-foreground hover:text-primary font-medium transition-colors underline underline-offset-4 decoration-border hover:decoration-primary">
                            Sign up
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <LoginPageContent />
        </Suspense>
    );
}
