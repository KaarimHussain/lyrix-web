import { codeToHtml } from "shiki";

// ---- code strings ----
const wpCode = `// functions.php
register_post_type('hero_block', [...]);
add_meta_box(
  'hero_fields', 'Hero Fields',
  'render_hero_meta', 'hero_block'
);
// + 200 more lines...`;

const lyrixCode = `import { defineBlock } from 'lyrix/blocks'

export const HeroBlock = defineBlock({
  name: 'Hero',
  schema: {
    title: { type: 'string' },
    subtitle: { type: 'string' },
  },
  render: ({ title, subtitle }) => (
    <section>...</section>
  )
})`;

const jsonCode = `// what your app receives
{
  blocks: [
    { type: "Hero",     data: { title: "Welcome", subtitle: "..." } },
    { type: "Features", data: { items: [...] } },
    { type: "CTA",      data: { label: "Get Started" } },
  ]
}`;

const renderCode = `// page.tsx — the entire rendering pattern
const { blocks } = await getPage(slug)
const registry = { HeroBlock, FeaturesBlock, CTABlock }

return blocks.map(({ type, data }) => {
  const Block = registry[type]
  return <Block key={type} {...data} />
})`;

// ---- helper ----
async function Code({ code, lang = "tsx" }: { code: string; lang?: string }) {
    const html = await codeToHtml(code, {
        lang,
        themes: { light: "github-dark", dark: "github-dark" },
    });
    return (
        <div
            className="rounded-xl border border-border overflow-x-auto text-sm font-mono [&>pre]:p-4 [&>pre]:font-mono [&>pre]:!bg-secondary-foreground"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

// ---- section (RSC — no "use client") ----
export async function SolutionSection() {
    return (
        <section className="relative py-24 md:py-32 bg-background">
            <div className="container-layout">
                <hr className="border-border mb-16 md:mb-24" />

                <div className="flex flex-col items-start gap-4 mb-10">
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        02 / HOW IT WORKS
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">
                        Blocks are code. Pages are data. Rendering is yours.
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
                        No proprietary APIs. No abstraction layers. Just React components, typed JSON, and full control over rendering.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Card 1 — before/after */}
                    <div className="p-6 md:p-8 rounded-2xl border border-border bg-card">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-md">
                            Code-first blocks
                        </span>
                        <h3 className="font-semibold text-lg md:text-xl text-foreground mt-3 mb-2">
                            Define blocks as React components
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            No PHP. No proprietary templating. A block is just a typed React component — lives in your codebase, versioned with git, works with your design system.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span className="text-xs font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-md mb-3 inline-block">
                                    WordPress way
                                </span>
                                <Code code={wpCode} lang="php" />
                            </div>
                            <div>
                                <span className="text-xs font-medium text-green-600 bg-green-500/10 px-3 py-1 rounded-md mb-3 inline-block">
                                    Lyrix way
                                </span>
                                <Code code={lyrixCode} lang="tsx" />
                            </div>
                        </div>
                    </div>

                    {/* Card 2 — flow + JSON */}
                    <div className="p-6 md:p-8 rounded-2xl border border-border bg-card">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-md">
                            Pages are data
                        </span>
                        <h3 className="font-semibold text-lg md:text-xl text-foreground mt-3 mb-2">
                            Visual composition outputs typed JSON
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Editors build pages visually in Lyrix Studio. Under the hood it's a JSON array of blocks — typed, yours, stored wherever you want.
                        </p>
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                            {["Editor composes page", "Lyrix Studio", "JSON → DB / file", "Next.js fetches it"].map((step, i, arr) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-muted border border-border text-foreground">
                                        {step}
                                    </span>
                                    {i < arr.length - 1 && (
                                        <span className="text-muted-foreground text-sm">→</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Code code={jsonCode} lang="json" />
                    </div>

                    {/* Card 3 — render pattern */}
                    <div className="p-6 md:p-8 rounded-2xl border border-border bg-card">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-md">
                            Rendering is yours
                        </span>
                        <h3 className="font-semibold text-lg md:text-xl text-foreground mt-3 mb-2">
                            You own the entire render lifecycle
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            No hidden magic. Fetch the JSON, map over the blocks, render your components. That's the entire system.
                        </p>
                        <Code code={renderCode} lang="tsx" />
                        <p className="text-xs text-muted-foreground leading-relaxed mt-4">
                            You control SSR vs SSG, caching, styling, error boundaries — everything. Lyrix never touches your render output.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}