import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SkipLink } from "@/components/SkipLink";
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
  title: "Product Explorer | Browse & Favorite Products",
  description: "Explore products from FakeStore API. Search, filter by category, and save your favorites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-zinc-900 antialiased dark:bg-[#0a0a0a] dark:text-zinc-50`}
      >
        <ThemeProvider>
          <SkipLink />
          <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
            <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-[#0a0a0a]/80">
              <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6" aria-label="Main navigation">
                <Link
                  href="/"
                  className="flex flex-col hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg"
                  aria-label="Product Explorer Home"
                >
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    Product Explorer
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Browse & Favorite Products
                  </p>
                </Link>
                <ThemeToggle />
              </nav>
            </header>
            <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 lg:px-6" role="main">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
