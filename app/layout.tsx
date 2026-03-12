
import type { Metadata } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lyrix - AI-Powered Visual Block Editor for Next.js",
    template: "%s | Lyrix",
  },
  description:
    "Lyrix is an open-source, AI-powered CMS and visual block editor built for Next.js. Create rich, dynamic pages with a code-first approach — designed for developers and non-technical users alike.",
  keywords: [
    "Lyrix",
    "visual block editor",
    "Next.js CMS",
    "AI CMS",
    "open source CMS",
    "code-first CMS",
    "Next.js visual editor",
    "headless CMS",
    "block editor Next.js",
    "React page builder",
  ],
  authors: [{ name: "Lyrix", url: "https://lyrix-seven.vercel.app/" }],
  creator: "Lyrix",
  applicationName: "Lyrix",
  metadataBase: new URL("https://lyrix-seven.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lyrix-seven.vercel.app/",
    siteName: "Lyrix",
    title: "Lyrix - AI-Powered Visual Block Editor for Next.js",
    description:
      "Open-source, AI-powered CMS and visual block editor for Next.js. Built for devs, usable by anyone.",
    // Note: 'images' is removed because renaming app/og-image.png to app/opengraph-image.png 
    // makes Next.js handle OG images automatically.
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyrix - AI-Powered Visual Block Editor for Next.js",
    description:
      "Open-source, AI-powered CMS and visual block editor for Next.js. Built for devs, usable by anyone.",
    creator: "@kaarimhussain",
    // Note: Next.js will automatically use opengraph-image for Twitter cards as well if twitter-image is missing.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Note: 'icons' is removed. Renaming app/favicon.png to app/icon.png handles this automatically.
  manifest: "/site.webmanifest", // Make sure this exists in /public
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://lyrix-seven.vercel.app/#website",
        "url": "https://lyrix-seven.vercel.app/",
        "name": "Lyrix",
        "description": "Open-source, AI-powered CMS and visual block editor for Next.js.",
        "publisher": {
          "@type": "Organization",
          "name": "Lyrix",
          "logo": {
            "@type": "ImageObject",
            "url": "https://lyrix-seven.vercel.app/icon.png"
          }
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://lyrix-seven.vercel.app/#software",
        "name": "Lyrix",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Lyrix is an open-source, code-first visual block editor for Next.js."
      }
    ]
  };

  return (
    <html lang="en">
      <body className={`${interTight.variable} ${geistMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}