import { Navbar } from "@/components/sections/navbar";
import { RecruitmentBanner } from "@/components/recruitment-banner";
import { ThemeProvider } from "@/components/theme-provider";
import { FooterSection } from "@/components/sections/footer-section";
import { CTASection } from "@/components/sections/cta-section";
import { CookieConsentComponent } from "@/components/cookie-consent";
import {
  organizationAndWebsiteJsonLd,
  serializeJsonLd,
} from "@/lib/organization";
import { siteConfig } from "@/lib/site";
import { AnalyticsProvider } from "@/components/analytics-provider";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { metadata as baseMetadata } from "./metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "black",
};

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Medicina do Trabalho em Portugal | Medisigma - Segurança e Saúde",
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <script
          id="schema-org-identity"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationAndWebsiteJsonLd),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <div className="max-w-7xl mx-auto border-x relative flex flex-col divide-y divide-border">
            <div className="block w-px h-full border-l border-border absolute top-0 left-6 z-10" />
            <div className="block w-px h-full border-r border-border absolute top-0 right-6 z-10" />
            <RecruitmentBanner />
            <Navbar />
            {children}
            <CTASection />
            <FooterSection />
          </div>
          <CookieConsentComponent />
        </ThemeProvider>
        <AnalyticsProvider />
      </body>
    </html>
  );
}
