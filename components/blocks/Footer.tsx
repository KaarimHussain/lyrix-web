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

                {/* Links Row */}
                <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 lg:gap-32 w-full mb-24 text-center md:text-left">

                    {/* Group: Product */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Product</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">Features</Link>
                            <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">Roadmap</Link>
                            <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">Changelog</Link>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px bg-white/10" />

                    {/* Group: Developers */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Developers</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">Docs</Link>
                            <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">GitHub</Link>
                            <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">Contributing</Link>
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
