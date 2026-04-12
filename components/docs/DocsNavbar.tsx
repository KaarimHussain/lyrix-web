"use client";

import Link from "next/link";
import Logo from "@/components/logo";
import { Search, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function DocsNavbar() {
    const [query, setQuery] = useState("");

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4 md:px-6">
                <div className="flex items-center gap-6 shrink-0">
                    <Link href="/">
                        <Logo height={40} width={40} text="Lyrix" textClassName="text-lg font-bold" />
                    </Link>
                </div>

                {/* Search */}
                <div className="flex-1 max-w-sm relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    <input
                        type="search"
                        placeholder="Search docs..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full h-8 pl-8 pr-4 text-sm bg-muted/40 border border-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground/60">
                        ⌘K
                    </kbd>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <Link href="https://github.com/KaarimHussain/Lyrix" target="_blank">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Github className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
