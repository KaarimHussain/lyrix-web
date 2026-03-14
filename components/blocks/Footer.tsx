"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
    return (
        <footer
            className="relative pt-24 pb-8 overflow-hidden flex flex-col items-center border-t border-white/5"
            style={{ backgroundColor: "oklch(0.13 0.01 85)", color: "oklch(0.98 0.01 85)" }}
        >

            <div className="container-layout relative z-10 w-full flex flex-col items-center">

                {/* Group: Products Row */}
                <div className="flex flex-col w-full px-4 md:px-0 mb-20">
                    <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-6 text-center">Products</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { name: "Lyrix AI", href: "/features/lyrix-ai", color: "from-purple-500/0 via-purple-500/50 to-purple-500/0" },
                            { name: "Visual Editor", href: "/features/visual-editor", color: "from-blue-500/0 via-blue-500/50 to-blue-500/0" },
                            { name: "Renderer", href: "/features/renderer", color: "from-green-500/0 via-green-500/50 to-green-500/0" },
                            { name: "Plugin Engine", href: "/features/plugin-engine", color: "from-orange-500/0 via-orange-500/50 to-orange-500/0" },
                            { name: "Team Sync", href: "/features/team-sync", color: "from-pink-500/0 via-pink-500/50 to-pink-500/0" },
                            { name: "AI Automation", href: "/features/ai-automation", color: "from-red-500/0 via-red-500/50 to-red-500/0" },
                        ].map((product, idx) => (
                            <Link
                                key={idx}
                                href={product.href}
                                className="group relative flex flex-col items-center justify-center p-6 border border-white/10 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500 overflow-hidden"
                            >
                                {/* Intense Glow Layer */}
                                <div className={`absolute -bottom-10 left-0 right-0 h-[150%] bg-gradient-to-t ${product.color.replace('50', '50')} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl z-0`} />
                                {/* Base Accent Glow */}
                                <div className={`absolute bottom-0 left-1/4 right-1/4 h-8 bg-gradient-to-t ${product.color.replace('50', '80')} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-md z-0`} />

                                <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/20 rounded-2xl transition-all duration-500 pointer-events-none z-10" />
                                <span className="relative z-20 text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300 drop-shadow-md">
                                    {product.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Links Row */}
                <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 lg:gap-32 w-full mb-24 text-center md:text-left">

                    {/* Group: Resources */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Resources</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="/changelog" className="text-sm text-white/70 hover:text-white transition-colors">Changelogs</Link>
                            <Link href="/pricing" className="text-sm text-white/70 hover:text-white transition-colors">Pricing</Link>
                            <Link href="/blog" className="text-sm text-white/70 hover:text-white transition-colors">Blog</Link>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px bg-white/10" />

                    {/* Group: Developers */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Developers</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="/roadmap" className="text-sm text-white/70 hover:text-white transition-colors">Roadmap</Link>
                            <Link href="/docs" className="text-sm text-white/70 hover:text-white transition-colors">Docs</Link>
                            <Link href="/github" className="text-sm text-white/70 hover:text-white transition-colors">GitHub</Link>
                            <Link href="/contributing" className="text-sm text-white/70 hover:text-white transition-colors">Contributing</Link>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px bg-white/10" />

                    {/* Group: Legal */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Legal</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">MIT License</Link>
                            <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">Privacy</Link>
                        </div>
                    </div>

                </div>

            </div>

            {/* Massive Watermark Wordmark */}
            <div className="relative w-full flex justify-center items-end overflow-hidden mt-4 pt-4 select-none z-0">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="font-sans font-black uppercase tracking-tighter text-white/10 leading-[0.75] text-center"
                    style={{ fontSize: "clamp(80px, 20vw, 320px)" }}
                >
                    LYRIX
                </motion.div>
            </div>

            {/* Bottom Meta Bar */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-8 text-xs text-white/40 font-mono tracking-tight text-center">
                <span>&copy; {new Date().getFullYear()} Lyrix. Open-source under MIT.</span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-primary opacity-70 shadow-[0_0_8px_oklch(0.55_0.12_155_/_0.8)]" />
                <span>Built for Next.js</span>
            </div>

        </footer>
    );
}
