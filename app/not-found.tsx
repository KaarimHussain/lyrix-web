import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SearchX, Terminal, CircleAlert } from "lucide-react";
import Logo from "@/components/logo";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary relative overflow-hidden">

            {/* Minimal Ambient Background */}
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-[100%]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-destructive/5 blur-[120px] rounded-[100%]" />
                <div className="absolute inset-0 bg-dot-grid opacity-[0.15]" style={{ maskImage: "radial-gradient(circle at center, black, transparent 80%)", WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)" }} />
            </div>

            <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-24 text-center">

                {/* 404 Visual Showcase */}
                <div className="relative mb-10 group animate-in fade-in zoom-in duration-1000">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    {/* The 404 Glass Pane */}
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] bg-background/40 border border-border/80 flex items-center justify-center relative shadow-2xl shadow-primary/5 backdrop-blur-xl">
                        {/* Inner glowing ring */}
                        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none" />

                        <span className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-background border border-border shadow-xl flex items-center justify-center text-destructive z-20">
                            <CircleAlert className="w-5 h-5" />
                        </span>

                        <h1 className="text-6xl sm:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/40 drop-shadow-sm">
                            404
                        </h1>
                    </div>
                </div>

                {/* Text Content */}
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
                    Route not found
                </h2>

                <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10 font-sans leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
                    The block you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                {/* Fixed High-Contrast Terminal Window */}
                <div className="mb-12 rounded-xl overflow-hidden shadow-2xl shadow-black/20 w-full max-w-lg animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both ring-1 ring-border/50">
                    {/* Mac-style Window Header */}
                    <div className="bg-[#1A1A1A] border-b border-[#333] px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#888]">
                            <Terminal className="w-3.5 h-3.5" />
                            <span>lyrix-router</span>
                        </div>
                        <div className="w-12" /> {/* Spacer for balance */}
                    </div>

                    {/* Terminal Body */}
                    <div className="bg-[#0D0D12] p-5 font-mono text-sm sm:text-base text-left">
                        <div className="text-[#A1A1AA] mb-1">
                            <span className="text-[#10B981] font-semibold mr-2">➜</span>
                            <span className="text-[#8B5CF6]">~</span> npm run resolve-route
                        </div>
                        <div className="text-[#EF4444] mt-2 font-medium flex items-start gap-2">
                            <SearchX className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>
                                Error: Next.js App Router could not match the requested path to any registered page component.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500 fill-mode-both">
                    <Button asChild size="lg" className="h-12 w-full sm:w-auto px-8 bg-foreground text-background hover:bg-foreground/90 font-semibold shadow-lg shadow-foreground/10 transition-all hover:scale-[1.02]">
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Platform
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-12 w-full sm:w-auto px-8 border-border bg-background hover:bg-muted font-semibold transition-all hover:scale-[1.02]">
                        <Link href="/plugins">
                            Browse Plugins
                        </Link>
                    </Button>
                </div>

            </main>

            {/* Lyrix branding subtle footer */}
            <div className="py-8 flex justify-center relative z-10 animate-in fade-in duration-1000 delay-1000 fill-mode-both">
                <Link href="/" className="opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2 select-none">
                    <Logo width={20} height={20} />
                    <span className="font-bold tracking-tight text-foreground text-sm">Lyrix Global</span>
                </Link>
            </div>

        </div>
    );
}
