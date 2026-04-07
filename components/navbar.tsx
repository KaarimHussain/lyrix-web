"use client";

import Logo from "./logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Box, X, Menu, Loader2, LogOut, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

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
                  <Link href="/features/lyrix-ai" className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted group transition-all">
                    <div className="aspect-square w-15 relative rounded-lg border border-border/50 overflow-hidden bg-muted shadow-sm">
                      <NavItemImage src="https://cdn.echelonindustries.net/cdn/images/1f9124b3f8806740_1775521597.png" alt="Lyrix AI" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors">Lyrix AI</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">Intelligent content generation.</div>
                    </div>
                  </Link>
                  <Link href="/features/visual-editor" className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted group transition-all">
                    <div className="aspect-square w-15 relative rounded-lg border border-border/50 overflow-hidden bg-muted shadow-sm">
                      <NavItemImage src="https://cdn.echelonindustries.net/cdn/images/27657da2053fc161_1775521568.png" alt="Visual Editor" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors">Visual Editor</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">Drag & drop interface.</div>
                    </div>
                  </Link>
                  <Link href="/features/renderer" className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted group transition-all">
                    <div className="aspect-square w-15 relative rounded-lg border border-border/50 overflow-hidden bg-muted shadow-sm">
                      <NavItemImage src="https://cdn.echelonindustries.net/cdn/images/4e62d36d6308f170_1775521580.png" alt="Renderer" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors">Renderer</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">High-performance delivery.</div>
                    </div>
                  </Link>
                  <Link href="/features/plugin-engine" className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted group transition-all">
                    <div className="aspect-square w-15 relative rounded-lg border border-border/50 overflow-hidden bg-muted shadow-sm">
                      <NavItemImage src="https://cdn.echelonindustries.net/cdn/images/d520ae46a90cc872_1775521588.png" alt="Plugin Engine" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors">Plugin Engine</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">Extend anytime anywhere.</div>
                    </div>
                  </Link>
                  <Link href="/features/team-sync" className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted group transition-all">
                    <div className="aspect-square w-15 relative rounded-lg border border-border/50 overflow-hidden bg-muted shadow-sm">
                      <NavItemImage src="https://cdn.echelonindustries.net/cdn/images/8e60a31e12b700ae_1775521520.png" alt="Team Sync" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors">Team Sync</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">Collaborate in real time.</div>
                    </div>
                  </Link>
                  <Link href="/features/ai-automation" className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-muted group transition-all">
                    <div className="aspect-square w-15 relative rounded-lg border border-border/50 overflow-hidden bg-muted shadow-sm">
                      <NavItemImage src="https://cdn.echelonindustries.net/cdn/images/0e730cb402b95a86_1775521606.png" alt="AI Automation" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xl font-semibold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors">AI Automation</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">Next-gen workflows.</div>
                    </div>
                  </Link>
                </div>

                {/* Right Side: Plugin Marketplace Promo */}
                <div className="w-full md:w-[280px] bg-muted/20 p-5 md:p-6 flex flex-col shrink-0 border-t md:border-t-0 md:border-l border-border relative overflow-hidden group">
                  <Link href="/plugins" className="flex-1 block relative z-10 h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
                    <div className="h-full bg-card rounded-xl p-5 border border-border flex flex-col justify-between shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_oklch(0.55_0.12_155_/_0.1)]">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-3 border border-primary/20">
                          <Box className="w-3 h-3" />
                          <span>Ecosystem</span>
                        </div>
                        <h3 className="text-base font-bold text-foreground mb-1.5 leading-tight font-sans">Plugin Marketplace</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">Extend Lyrix with community plugins. Auth, analytics, CMS, and more.</p>
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

          {/* === NORMAL LINKS === */}
          <NavigationMenuItem>
            <Link href="/plugins" className="bg-transparent hover:bg-accent group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors text-foreground">
              Plugins
            </Link>
          </NavigationMenuItem>
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
            <Logo height={60} width={60} text="Lyrix" textClassName="text-2xl font-bold" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {DesktopNav}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="hidden sm:flex items-center justify-center w-24 h-8">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : isAuthenticated ? (
            <>
              <Link href="/dashboard" passHref>
                <Button variant="outline" size="sm" className="hidden sm:inline-flex h-8 gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex h-8 text-muted-foreground hover:text-destructive gap-2"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button variant="outline" size="sm" className="hidden sm:inline-flex h-8">Login</Button>
              </Link>
              <Link href="/register" passHref>
                <Button size="sm" className="hidden sm:inline-flex h-8">Register</Button>
              </Link>
            </>
          )}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-8 md:hidden bg-background",
          isMobileMenuOpen ? "block" : "hidden",
        )}
      >
        <div className="relative z-20 grid gap-6 rounded-md p-4 text-foreground">
          <div className="grid gap-4">
            <h4 className="font-medium leading-none text-foreground">Features</h4>            <div className="grid gap-2 pl-4 border-l border-border">
              <MobileLink href="/features/lyrix-ai" icon="https://cdn.echelonindustries.net/cdn/images/1f9124b3f8806740_1775521597.png"> Lyrix AI </MobileLink>
              <MobileLink href="/features/visual-editor" icon="https://cdn.echelonindustries.net/cdn/images/27657da2053fc161_1775521568.png"> Visual Editor </MobileLink>
              <MobileLink href="/features/renderer" icon="https://cdn.echelonindustries.net/cdn/images/4e62d36d6308f170_1775521580.png"> Renderer </MobileLink>
              <MobileLink href="/features/plugin-engine" icon="https://cdn.echelonindustries.net/cdn/images/d520ae46a90cc872_1775521588.png"> Plugin Engine </MobileLink>
              <MobileLink href="/features/team-sync" icon="https://cdn.echelonindustries.net/cdn/images/8e60a31e12b700ae_1775521520.png"> Team Sync </MobileLink>
              <MobileLink href="/features/ai-automation" icon="https://cdn.echelonindustries.net/cdn/images/0e730cb402b95a86_1775521606.png"> AI Automation </MobileLink>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-border pt-6">
            <Link href="/plugins" className="text-sm font-medium text-muted-foreground hover:text-foreground">Plugins</Link>
            <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground">Docs</Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex w-full h-10 items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="inline-flex w-full h-10 items-center justify-center rounded-md bg-destructive/10 text-destructive px-4 py-2 text-sm font-medium hover:bg-destructive/20 gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex w-full h-10 items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex w-full h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Optimized Image Preloading to ensure they only load once */}
      <div className="hidden pointer-events-none" aria-hidden="true">
        {NAV_FEATURE_IMAGES.map((src) => (
          <Image key={src} src={src} alt="preload" width={40} height={40} priority />
        ))}
      </div>
    </header>
  );
}

const NAV_FEATURE_IMAGES = [
  "https://cdn.echelonindustries.net/cdn/images/1f9124b3f8806740_1775521597.png",
  "https://cdn.echelonindustries.net/cdn/images/27657da2053fc161_1775521568.png",
  "https://cdn.echelonindustries.net/cdn/images/4e62d36d6308f170_1775521580.png",
  "https://cdn.echelonindustries.net/cdn/images/d520ae46a90cc872_1775521588.png",
  "https://cdn.echelonindustries.net/cdn/images/8e60a31e12b700ae_1775521520.png",
  "https://cdn.echelonindustries.net/cdn/images/0e730cb402b95a86_1775521606.png",
];

const NavItemImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-muted/40 overflow-hidden">
      {/* Really light blur color of that image placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse bg-primary/5 transition-opacity duration-500"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        onLoadingComplete={() => setIsLoaded(true)}
        className={cn(
          "object-cover transition-all duration-700 ease-out",
          isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-xl scale-110"
        )}
      />
    </div>
  );
};

const MobileLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon?: string }) => (
  <Link href={href} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground py-2 transition-colors">
    {icon && (
      <div className="w-8 h-8 relative rounded-md border border-border/50 overflow-hidden shrink-0 bg-muted/30">
        <NavItemImage src={icon} alt={String(children)} />
      </div>
    )}
    {children}
  </Link>
);