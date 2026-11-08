import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { profile } from "@/content/profile";
import { fontVariables } from "@/lib/fonts";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s — ${profile.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: profile.name, url: profile.contact.github }],
  keywords: ["프론트엔드", "Front-End", "포트폴리오", "Next.js", "React", "TypeScript", profile.name],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={fontVariables}>
      <body>
        <SmoothScroll>
          <ScrollProgress />
          <CustomCursor />
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
