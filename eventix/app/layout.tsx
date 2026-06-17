import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { NeonAuthUIProvider, UserButton } from "@neondatabase/auth/react";
import { authClient } from "../lib/auth/client";
import { CalendarDays } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventix",
  description: "Plan events, share invite links, and track RSVPs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NeonAuthUIProvider authClient={authClient} defaultTheme="dark">
          <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
            <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-base font-semibold tracking-wide"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <CalendarDays className="size-5" />
                </span>
                Eventix
              </Link>
              <nav className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
                <UserButton size="icon" />
              </nav>
            </div>
          </header>
          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 md:py-10">
            {children}
          </main>
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}
