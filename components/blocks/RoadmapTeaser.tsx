const roadmapPhases = [
    {
        phase: "Phase 1",
        title: "Core Foundation",
        date: "Q1 2026",
        status: "in-progress" as const,
        items: [
            { name: "App Router support", done: true },
            { name: "Block registry & runtime renderer", done: true },
            { name: "JSON-based serialization", done: false },
        ],
    },
    {
        phase: "Phase 2",
        title: "Visual Editor",
        date: "Q2 2026",
        status: "planned" as const,
        items: [
            { name: "Visual page editor", done: false },
            { name: "Drag & drop block composition", done: false },
            { name: "Live preview", done: false },
        ],
    },
    {
        phase: "Phase 3",
        title: "Ecosystem",
        date: "Q3 2026",
        status: "planned" as const,
        items: [
            { name: "Plugin system", done: false },
            { name: "Playground & examples", done: false },
            { name: "Block marketplace", done: false },
        ],
    },
];

export function RoadmapTeaser() {
    return (
        <section className="relative py-24 md:py-32 bg-background">
            <div className="container-layout">
                <hr className="border-border mb-16 md:mb-24" />

                <div className="flex flex-col items-start gap-4 mb-16">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        04 / WHAT'S COMING
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
                        The roadmap.
                    </h2>
                    <p className="text-muted-foreground text-base max-w-lg leading-relaxed">
                        Lyrix is in early development. Here's what's shipping and what's next.
                    </p>
                </div>

                <div className="relative">
                    {/* vertical line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-border hidden md:block" />

                    <div className="flex flex-col gap-10">
                        {roadmapPhases.map((phase, i) => (
                            <div key={i} className="flex gap-8 md:gap-12 my-2">
                                {/* timeline dot */}
                                <div className="hidden md:flex flex-col items-center pt-1 flex-shrink-0">
                                    <div className={`w-[15px] h-[15px] rounded-full border-2 flex-shrink-0 z-10 ${phase.status === "in-progress"
                                        ? "bg-primary border-primary shadow-[0_0_10px_oklch(0.55_0.12_155_/_0.6)]"
                                        : "bg-background border-border"
                                        }`} />
                                </div>

                                {/* content */}
                                <div className={`flex-1 p-6 rounded-2xl border transition-colors ${phase.status === "in-progress"
                                    ? "border-primary/30 bg-primary/5"
                                    : "border-border bg-card/30"
                                    }`}>
                                    <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                                {phase.phase}
                                            </span>
                                            <span className="text-sm font-semibold text-foreground">
                                                {phase.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono text-muted-foreground">
                                                {phase.date}
                                            </span>
                                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${phase.status === "in-progress"
                                                ? "bg-primary/10 text-primary"
                                                : "bg-muted text-muted-foreground"
                                                }`}>
                                                {phase.status === "in-progress" ? "In progress" : "Planned"}
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="flex flex-col gap-3">
                                        {phase.items.map((item, j) => (
                                            <li key={j} className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border ${item.done
                                                    ? "bg-primary border-primary"
                                                    : "bg-transparent border-border"
                                                    }`}>
                                                    {item.done && (
                                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className={`text-sm ${item.done
                                                    ? "text-foreground"
                                                    : "text-muted-foreground"
                                                    }`}>
                                                    {item.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* legend */}
                <div className="flex gap-6 mt-12 text-xs font-mono text-muted-foreground/60">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>In progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                        <span>Planned</span>
                    </div>
                </div>
            </div>
        </section>
    );
}