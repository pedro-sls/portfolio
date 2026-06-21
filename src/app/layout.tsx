import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { getSiteName, getSiteUrl, siteConfig } from "@/data/site";
import { getHtmlLang, getPreferredLocale } from "@/lib/locale";
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
  colorScheme: "dark",
  themeColor: "#111111",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getPreferredLocale();
  const metadata = siteConfig.metadata[locale];
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: metadata.title,
      template: `%s | ${profile.name}`,
    },
    description: metadata.description,
    applicationName: getSiteName(),
    authors: [{ name: profile.name, url: profile.links.github }],
    creator: profile.name,
    publisher: profile.name,
    keywords: [...siteConfig.keywords],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url: "/",
      siteName: getSiteName(),
      title: metadata.title,
      description: metadata.description,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? ["en_US"] : ["pt_BR"],
      images: [
        {
          url: siteConfig.openGraphImage,
          width: 1200,
          height: 630,
          alt: metadata.openGraphAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [siteConfig.openGraphImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getPreferredLocale();

  return (
    <html
      lang={getHtmlLang(locale)}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
