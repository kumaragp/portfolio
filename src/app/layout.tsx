import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";
import { ProjectScrollProvider } from "@/components/ProjectScrollContext";
import "./globals.css";
import "devicon/devicon.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  keywords: ["Kumara Galan Pramana", "Data Analyst", "Information Systems", "Portfolio", "Machine Learning"],
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName,
    type: "website",
    locale: "en_US",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: "icon.png",
  },
};

type RootLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ProjectScrollProvider>
          {children}
          {modal}
        </ProjectScrollProvider>
      </body>
    </html>
  );
}
