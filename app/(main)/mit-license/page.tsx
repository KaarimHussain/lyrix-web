import type { Metadata } from "next";
import { Footer } from "@/components/blocks/Footer";

export const metadata: Metadata = {
    title: "MIT License",
    description: "The MIT License used by Lyrix.",
};

const MIT_LICENSE_TEXT = `MIT License

Copyright (c) ${new Date().getFullYear()} Lyrix

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export default function MITLicensePage() {
    return (
        <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <section className="border-b border-border bg-dot-grid pt-28 pb-14 md:pt-36 md:pb-20">
                <div className="container-layout mx-auto max-w-4xl">
                    <p className="mb-4 inline-flex rounded-md border border-border bg-muted/40 px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Legal
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">MIT License</h1>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                        Lyrix is distributed under the MIT License.
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container-layout mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 md:p-10">
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-xs leading-6 text-foreground/90 md:text-sm">
                        {MIT_LICENSE_TEXT}
                    </pre>
                </div>
            </section>

            <Footer />
        </main>
    );
}
