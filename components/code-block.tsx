// components/code-block.tsx
import { codeToHtml } from "shiki";

interface CodeBlockProps {
    code: string;
    lang?: string;
}

export async function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
    const html = await codeToHtml(code, {
        lang,
        theme: "nord", // or "github-light", "nord", "dracula", etc.
    });

    return (
        <div
            className="rounded-xl border border-border overflow-x-auto text-xs font-mono [&>pre]:p-4 [&>pre]:font-mono [&>pre]:!bg-muted/50"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}