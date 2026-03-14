"use client";

import { useState } from "react";
import LyrixInput from "@/components/LyrixInput";

export default function TestPage() {
    const [query, setQuery] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    return (
        <>
            <div className="min-h-screen w-full container mx-auto max-w-5xl py-15 flex flex-col gap-5">
                {/* Default */}
                <LyrixInput label="Email" placeholder="developer@lyrix.dev" required />

                {/* Password with show/hide toggle */}
                <LyrixInput variant="password" label="Password" placeholder="••••••••" />

                {/* Search with clear button */}
                <LyrixInput
                    variant="search"
                    placeholder="Search plugins..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    clearable
                    onClear={() => setQuery("")}
                />

                {/* With error state */}
                <LyrixInput label="Email" error="Invalid email address" value={email} />

                {/* With success state */}
                <LyrixInput label="Username" success="Username is available!" value={username} />

                {/* Sizes */}
                <LyrixInput inputSize="sm" placeholder="Small" />
                <LyrixInput inputSize="md" placeholder="Medium (default)" />
                <LyrixInput inputSize="lg" placeholder="Large" />
            </div>
        </>
    )
}