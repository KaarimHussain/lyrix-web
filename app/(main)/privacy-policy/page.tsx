import type { Metadata } from "next";
import { Footer } from "@/components/blocks/Footer";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How Lyrix collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <section className="border-b border-border bg-dot-grid pt-28 pb-14 md:pt-36 md:pb-20">
                <div className="container-layout mx-auto max-w-4xl">
                    <p className="mb-4 inline-flex rounded-md border border-border bg-muted/40 px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Legal
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Privacy Policy</h1>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                        This Privacy Policy explains how Lyrix handles personal data when you use our website and services.
                    </p>
                    <p className="mt-3 text-xs font-mono text-muted-foreground">Last updated: April 12, 2026</p>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container-layout mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 md:p-10">
                    <div className="space-y-8 text-sm leading-7 text-foreground/90 md:text-base">
                        <section>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">1. Information We Collect</h2>
                            <p className="mt-2 text-muted-foreground">We may collect account details, authentication data, usage data, and support communications.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">2. How We Use Information</h2>
                            <p className="mt-2 text-muted-foreground">We use data to provide the service, secure accounts, improve product quality, and communicate service updates.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">3. Data Sharing</h2>
                            <p className="mt-2 text-muted-foreground">We do not sell personal data. We may share data with infrastructure providers needed to operate Lyrix.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">4. Data Retention</h2>
                            <p className="mt-2 text-muted-foreground">We retain data for as long as needed to provide the service, comply with legal obligations, and resolve disputes.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">5. Your Rights</h2>
                            <p className="mt-2 text-muted-foreground">You can request access, correction, or deletion of personal data by contacting us through official support channels.</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">6. Contact</h2>
                            <p className="mt-2 text-muted-foreground">For privacy questions, contact the Lyrix team at your designated support email.</p>
                        </section>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
