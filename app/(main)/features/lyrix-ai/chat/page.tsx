"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Send,
  Paperclip,
  Globe,
  BookOpen,
  Code,
  PenTool,
  Plus,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LyrixAIChatPage() {
  const [input, setInput] = useState("");

  const suggestedFeatures = [
    {
      icon: <PenTool className="w-5 h-5 text-purple-400" />,
      title: "Write a blog post",
      description: "Generate a fully researched 1500-word article.",
      color: "hover:bg-purple-500/10 hover:border-purple-500/50"
    },
    {
      icon: <Code className="w-5 h-5 text-blue-400" />,
      title: "Code Assistant",
      description: "Debug, refactor, or write multi-file boilerplate.",
      color: "hover:bg-blue-500/10 hover:border-blue-500/50"
    },
    {
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      title: "Market Research",
      description: "Analyze competitors and market trends instantly.",
      color: "hover:bg-emerald-500/10 hover:border-emerald-500/50"
    },
    {
      icon: <BookOpen className="w-5 h-5 text-orange-400" />,
      title: "Summarize Docs",
      description: "Upload PDFs and get insights immediately.",
      color: "hover:bg-orange-500/10 hover:border-orange-500/50"
    }
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden pt-20">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-[0.03] pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        </div>

        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 pt-20 pb-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Centered Welcome Content */}
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 mb-6 group hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-purple-500" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                Good evening, User.
              </h1>
              <p className="text-xl text-muted-foreground font-light max-w-lg mx-auto">
                How can I help you create or collaborate today?
              </p>
            </div>

            {/* Suggested Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12">
              {suggestedFeatures.map((feature, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "flex items-start gap-4 p-5 rounded-2xl border border-border/50 bg-card/30 text-left transition-all duration-300 group hover:shadow-lg",
                    feature.color
                  )}
                >
                  <div className="p-2.5 rounded-xl bg-background border border-border group-hover:bg-transparent transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      {feature.title} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{feature.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Input Area at Bottom */}
        <div className="border-t border-border/50 bg-background/50 backdrop-blur-xl px-4 py-6">
          <div className="max-w-3xl mx-auto relative group">
            {/* Input Wrapper */}
            <div className="relative rounded-3xl border border-border bg-card/50 shadow-sm transition-all focus-within:border-purple-500/50 focus-within:ring-4 focus-within:ring-purple-500/5">
              <Textarea
                placeholder="Message Lyrix AI..."
                className="w-full min-h-[140px] resize-none border-none bg-transparent py-4 px-5 pr-12 focus-visible:ring-0 text-base leading-relaxed"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              {/* Toolbar Buttons */}
              <div className="flex items-center justify-between px-4 pb-4">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-purple-400 rounded-full">
                    <Plus className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-purple-400 rounded-full">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <div className="h-4 w-px bg-border mx-1" />
                  <Button variant="ghost" size="sm" className="h-9 text-muted-foreground hover:text-purple-400 gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Search</span>
                  </Button>
                </div>

                <Button
                  disabled={!input.trim()}
                  className={cn(
                    "h-10 w-10 p-0 rounded-full transition-all",
                    input.trim()
                      ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Footer hint */}
            <p className="text-[11px] text-muted-foreground text-center mt-3">
              Lyrix AI can occasionally provide incorrect information. Verify important details.
            </p>
          </div>
        </div>
      </main>

      {/* Sidebar (Optional brand presence) */}
      <aside className="w-72 border-l border-border/50 bg-card hidden xl:flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Lyrix AI</span>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-3">Recent Chats</p>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-purple-500/5 rounded-xl transition-colors group">
              <MessageSquare className="w-4 h-4 text-muted-foreground group-hover:text-purple-400" />
              <span className="truncate">Product Vision 2026</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-purple-500/5 rounded-xl transition-colors group">
              <MessageSquare className="w-4 h-4 text-muted-foreground group-hover:text-purple-400" />
              <span className="truncate">Landing Page Draft</span>
            </button>
          </div>
        </nav>

        <div className="pt-6 border-t border-border">
          <Link href="/features/lyrix-ai">
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 rounded-xl text-muted-foreground hover:text-foreground">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Exit Assistant
            </Button>
          </Link>
        </div>
      </aside>
    </div>
  );
}
