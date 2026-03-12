"use client";

import Logo from "./logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Box,
  Code2,
  FileText,
  Github,
  Layout,
  Megaphone,
  Server,
  Terminal,
  Users,
  X,
  Menu,
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const DesktopNav = useMemo(
    () => (
      <NavigationMenu>
        <NavigationMenuList className="gap-1">
          {/* === FEATURES MENU === */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-accent data-[state=open]:bg-accent hover:text-accent-foreground data-[state=open]:text-accent-foreground h-9 px-3 py-2 text-sm font-medium">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[80vw] max-w-[850px] flex flex-col md:flex-row p-0 bg-background text-foreground rounded-lg overflow-hidden">
                {/* Left Side: 6 Products */}
                <div className="flex-1 p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  <div className="col-span-1 sm:col-span-2 mb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-2">
                    Shop all products
                  </div>

                  {/* Product 1 */}
                  <Link
                    href="/features/lyrix-ai"
                    className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted group transition-all"
                  >
                    <div className="aspect-square w-15 relative rounded-lg border border-border/50 overflow-hidden bg-muted shadow-sm">
                      <Image
                        src="/images/navbar/Lyrix-AI.png"
                        alt="Lyrix AI"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors">
                        Lyrix AI
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        Intelligent content generation.
                      </div>
                    </div>
                  </Link>

                  {/* Product 2 */}
                  <Link
                    href="/features/visual-editor"
                    className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted group transition-all"
                  >
                    <div className="aspect-square w-15 relative rounded-lg border border-border/50 overflow-hidden bg-muted shadow-sm">
                      <Image
                        src="/images/navbar/Visual-Editor.png"
                        alt="Visual Editor"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors">
                        Visual Editor
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        Drag & drop interface.
                      </div>
                    </div>
                  </Link>

                  {/* Product 3 */}
                  <Link
                    href="/features/renderer"
                    className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted group transition-all"
                  >
                    <div className="aspect-square w-15 relative rounded-lg border border-border/50 overflow-hidden bg-muted shadow-sm">
                      <Image
                        src="/images/navbar/Renderer.png"
                        alt="Renderer"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors">
                        Renderer
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        High-performance delivery.
                      </div>
                    </div>
                  </Link>

                  {/* Product 4 */}
                  <Link
                    href="/features/plugin-engine"
                    className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted group transition-all"
                  >
                    <div className="aspect-square w-15 relative rounded-lg border border-border/50 overflow-hidden bg-muted shadow-sm">
                      <Image
                        src="/images/navbar/Plugin-Engine.png"
                        alt="Plugin Engine"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors">
                        Plugin Engine
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        Extend anytime anywhere.
                      </div>
                    </div>
                  </Link>

                  {/* Product 5 */}
                  <Link
                    href="/features/team-sync"
                    className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted group transition-all"
                  >
                    <div className="aspect-square w-15 relative rounded-lg border border-border/50 overflow-hidden bg-muted shadow-sm">
                      <Image
                        src="/images/navbar/Team-Sync.png"
                        alt="Team Sync"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors">
                        Team Sync
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        Collaborate in real time.
                      </div>
                    </div>
                  </Link>

                  {/* Product 6 */}
                  <Link
                    href="/features/ai-automation"
                    className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted group transition-all"
                  >
                    <div className="aspect-square w-15 relative rounded-lg border border-border/50 overflow-hidden bg-muted shadow-sm">
                      <Image
                        src="/images/navbar/AI-Feature.png"
                        alt="AI Feature"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors">
                        AI Automation
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        Next-gen workflows.
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Right Side: Plugin Marketplace Promo */}
                <div className="w-full md:w-[280px] bg-muted/20 p-5 md:p-6 flex flex-col shrink-0 border-t md:border-t-0 md:border-l border-border relative overflow-hidden group">
                  <Link href="/plugins" className="flex-1 block relative z-10 h-full">
                    {/* Background Accent Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />

                    <div className="h-full bg-card rounded-xl p-5 border border-border flex flex-col justify-between shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_oklch(0.55_0.12_155_/_0.1)]">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-3 border border-primary/20">
                          <Box className="w-3 h-3" />
                          <span>Ecosystem</span>
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-1.5 leading-tight font-sans">
                          Plugin Marketplace
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Extend Lyrix with community plugins. Auth, analytics, CMS, and more.
                        </p>
                      </div>
                      <div className="text-[11px] font-medium text-foreground group-hover:text-primary mt-4 inline-flex items-center gap-1 transition-colors">
                        Browse Plugins ↗
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* === USE CASES MENU === */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-accent data-[state=open]:bg-accent hover:text-accent-foreground data-[state=open]:text-accent-foreground h-9 px-3 py-2 text-sm font-medium">
              Use Cases
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[80vw] max-w-[700px] p-5 md:p-6 bg-background rounded-lg">
                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-1">
                  Explore
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Card 1 */}
                  <Link
                    href="/use-cases/marketing"
                    className="block p-4 bg-muted/40 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shadow-sm border border-border shrink-0">
                        <Megaphone className="w-4 h-4 text-foreground" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Marketing Pages
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground pl-11">
                      Launch campaigns faster with pre-built UI blocks.
                    </p>
                  </Link>

                  {/* Card 2 */}
                  <Link
                    href="/use-cases/docs"
                    className="block p-4 bg-muted/40 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shadow-sm border border-border shrink-0">
                        <FileText className="w-4 h-4 text-foreground" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Docs Sites
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground pl-11">
                      Beautiful, versioned platform documentation.
                    </p>
                  </Link>

                  {/* Card 3 */}
                  <Link
                    href="/use-cases/internal"
                    className="block p-4 bg-muted/40 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shadow-sm border border-border shrink-0">
                        <Server className="w-4 h-4 text-foreground" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Internal Tools
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground pl-11">
                      Secure portals and dashboards for your team.
                    </p>
                  </Link>

                  {/* Card 4 */}
                  <Link
                    href="/use-cases/ecommerce"
                    className="block p-4 bg-muted/40 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shadow-sm border border-border shrink-0">
                        <Box className="w-4 h-4 text-foreground" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">
                        E-commerce
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground pl-11">
                      High-conversion storefronts and carts.
                    </p>
                  </Link>

                  {/* Card 5 */}
                  <Link
                    href="/use-cases/portfolio"
                    className="block p-4 bg-muted/40 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shadow-sm border border-border shrink-0">
                        <Layout className="w-4 h-4 text-foreground" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Portfolios
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground pl-11">
                      Showcase your work with stunning animations.
                    </p>
                  </Link>

                  {/* Card 6 */}
                  <Link
                    href="/use-cases/agencies"
                    className="block p-4 bg-muted/40 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shadow-sm border border-border shrink-0">
                        <Users className="w-4 h-4 text-foreground" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">
                        Agencies
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground pl-11">
                      Scale client work with reusable systems.
                    </p>
                  </Link>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* === DEVELOPERS MENU === */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-accent data-[state=open]:bg-accent hover:text-accent-foreground data-[state=open]:text-accent-foreground h-9 px-3 py-2 text-sm font-medium">
              Developers
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[80vw] max-w-[750px] p-0 bg-card text-card-foreground flex flex-col md:flex-row shadow-lg border-border rounded-lg overflow-hidden">
                {/* Left Side List */}
                <div className="flex-1 p-5 md:p-6 pb-4 md:pb-6">
                  <div className="text-[11px] font-bold text-muted-foreground mb-3 px-1 uppercase tracking-wider">
                    Build with Lyrix
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <Link
                      href="/docs"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border"
                    >
                      <div className="w-9 h-9 rounded-md relative overflow-hidden shrink-0 bg-primary/10 flex items-center justify-center opacity-90 border border-primary/20">
                        <BookOpen className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-[13px] font-semibold text-foreground mb-0.5 leading-none">
                          Documentation
                        </div>
                        <div className="text-[11px] text-muted-foreground leading-none">
                          Complete guides and tutorials.
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/api"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border"
                    >
                      <div className="w-9 h-9 rounded-md relative overflow-hidden shrink-0 bg-primary/10 flex items-center justify-center opacity-90 border border-primary/20">
                        <Terminal className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-[13px] font-semibold text-foreground mb-0.5 leading-none">
                          API Reference
                        </div>
                        <div className="text-[11px] text-muted-foreground leading-none">
                          Endpoints, SDKs, and types.
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/automations"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border"
                    >
                      <div className="w-9 h-9 rounded-md relative overflow-hidden shrink-0 bg-primary/10 flex items-center justify-center opacity-90 border border-primary/20">
                        <Code2 className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-[13px] font-semibold text-foreground mb-0.5 leading-none">
                          Complex Automations
                        </div>
                        <div className="text-[11px] text-muted-foreground leading-none">
                          Build logic with AI assist.
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Right Side Card */}
                <div className="w-full md:w-[300px] bg-muted/20 p-5 md:p-6 flex flex-col shrink-0 border-t md:border-t-0 md:border-l border-border">
                  <div className="text-[11px] font-bold text-muted-foreground mb-3 px-1 uppercase tracking-wider">
                    Start Building
                  </div>
                  <div className="flex-1 rounded-xl bg-primary text-primary-foreground p-5 flex flex-col justify-end relative overflow-hidden shadow-sm group cursor-pointer border border-primary-foreground/20 min-h-[160px]">
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-10"></div>
                    {/* Glowing highlight blob */}
                    <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-primary-foreground/20 blur-3xl rounded-full transition-transform duration-700 group-hover:scale-110"></div>
                    <div className="relative z-20">
                      <div className="inline-flex px-2 py-0.5 bg-primary-foreground/20 backdrop-blur-md rounded-md text-[9px] font-medium text-primary-foreground mb-2 border border-primary-foreground/20">
                        Released 3 min ago
                      </div>
                      <h3 className="text-xl font-bold text-primary-foreground mb-1.5 leading-tight">
                        Send Emails <br />with AI
                      </h3>
                      <p className="text-[10px] text-primary-foreground/90 mb-4 leading-normal">
                        Send emails directly through Lyrix or your existing ESP via natural prompts.
                      </p>
                      <Button size="sm" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0 rounded-md px-4 h-7 font-bold shadow-sm shadow-black/10 text-[11px] w-fit">
                        Explore
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* === NORMAL LINKS === */}
          <NavigationMenuItem>
            <Link href="/docs" className="bg-transparent hover:bg-accent group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors text-foreground">
              Docs
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/pricing" className="bg-transparent hover:bg-accent group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors text-foreground">
              Pricing
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
    []
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link href="/">
            <Logo
              height={60}
              width={60}
              text="Lyrix"
              textClassName="text-2xl font-bold"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {DesktopNav}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link href="/login" passHref>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex h-8">Login</Button>
          </Link>
          <Link href="/register" passHref>
            <Button size="sm" className="hidden sm:inline-flex h-8">Register</Button>
          </Link>
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-8 md:hidden bg-background",
          isMobileMenuOpen ? "block" : "hidden",
        )}
      >
        <div className="relative z-20 grid gap-6 rounded-md p-4 text-foreground">
          <div className="grid gap-4">
            <h4 className="font-medium leading-none text-foreground">
              Features
            </h4>
            <div className="grid gap-2 pl-4 border-l border-border">
              <MobileLink href="/features/lyrix-ai">Lyrix AI</MobileLink>
              <MobileLink href="/features/visual-editor">Visual Editor</MobileLink>
              <MobileLink href="/features/renderer">Renderer</MobileLink>
              <MobileLink href="/features/plugin-engine">Plugin Engine</MobileLink>
              <MobileLink href="/features/team-sync">Team Sync</MobileLink>
              <MobileLink href="/features/ai-automation">AI Automation</MobileLink>
            </div>
          </div>

          <div className="grid gap-4">
            <h4 className="font-medium leading-none text-foreground">
              Use Cases
            </h4>
            <div className="grid gap-2 pl-4 border-l border-border">
              <MobileLink href="/use-cases/marketing">Marketing Pages</MobileLink>
              <MobileLink href="/use-cases/docs">Docs Sites</MobileLink>
              <MobileLink href="/use-cases/internal">Internal Tools</MobileLink>
              <MobileLink href="/use-cases/ecommerce">E-commerce</MobileLink>
            </div>
          </div>

          <div className="grid gap-4">
            <h4 className="font-medium leading-none text-foreground">
              Developers
            </h4>
            <div className="grid gap-2 pl-4 border-l border-border">
              <MobileLink href="/docs">Documentation</MobileLink>
              <MobileLink href="/api">API Reference</MobileLink>
              <MobileLink href="/automations">Automations</MobileLink>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-border pt-6">
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="inline-flex w-full h-10 items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex w-full h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Helper for mobile menu links
const MobileLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
  >
    {children}
  </Link>
);
