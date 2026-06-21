import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Pedro Sales | Software Engineering Portfolio",
  description:
    "Software Engineering portfolio by Pedro Sales, focused on web development, automation, integrations, and maintainable software foundations.",
};

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
