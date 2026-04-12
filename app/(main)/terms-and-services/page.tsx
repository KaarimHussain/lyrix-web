import type { Metadata } from "next";
import { Footer } from "@/components/blocks/Footer";

export const metadata: Metadata = {
    title: "Terms and Services",
    description: "The rules and conditions for using Lyrix.",
};

export default function TermsAndServicesPage() {
    return (
        <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <section className="border-b border-border bg-dot-grid pt-28 pb-14 md:pt-36 md:pb-20">
                <div className="container-layout mx-auto max-w-4xl">
                    <p className="mb-4 inline-flex rounded-md border border-border bg-muted/40 px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Legal
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Terms and Services</h1>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                        These terms govern your access to and use of Lyrix products, services, and websites.
                    </p>
                    <p className="mt-3 text-xs font-mono text-muted-foreground">Last updated: April 12, 2026</p>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container-layout mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 md:p-10">
                    <div className="space-y-8 text-sm leading-7 text-foreground/90 md:text-base">
                        <section>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">1. Acceptance of Terms</h2>
                            <p className="mt-2 text-muted-foreground">By using Lyrix, you agree to these terms. If you do not agree, do not use the service.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">2. Accounts and Security</h2>
                            <p className="mt-2 text-muted-foreground">You are responsible for account credentials and all activity under your account.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">3. Acceptable Use</h2>
                            <p className="mt-2 text-muted-foreground">You agree not to misuse the service, disrupt operations, or violate applicable laws.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">4. Intellectual Property</h2>
                            <p className="mt-2 text-muted-foreground">Lyrix branding, software, and content are protected by intellectual property laws unless stated otherwise.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">5. Disclaimer of Warranties</h2>
                            <p className="mt-2 text-muted-foreground">The service is provided as-is and as-available without warranties of any kind to the fullest extent allowed by law.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">6. Limitation of Liability</h2>
                            <p className="mt-2 text-muted-foreground">To the extent permitted by law, Lyrix is not liable for indirect, incidental, or consequential damages.</p>
                        </section>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
