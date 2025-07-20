import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rakshith Dharmappa Portfolio",
  description: "Portfolio of Rakshith Dharmappa - Full Stack Developer, Cloud & AI Enthusiast. Explore my projects, skills, and experience.",
  keywords: [
    "Rakshith Dharmappa",
    "Portfolio",
    "Full Stack Developer",
    "Cloud",
    "AI",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript"
  ],
  authors: [
    {
      name: "Rakshith Dharmappa",
      url: "https://www.linkedin.com/in/rakshithd26/",
    },
  ],
  creator: "Rakshith Dharmappa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rakshithdharmappa.com",
    title: "Rakshith Dharmappa Portfolio",
    description: "Portfolio of Rakshith Dharmappa - Full Stack Developer, Cloud & AI Enthusiast.",
    siteName: "Rakshith Dharmappa Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakshith Dharmappa Portfolio",
    description: "Portfolio of Rakshith Dharmappa - Full Stack Developer, Cloud & AI Enthusiast.",
    creator: "@rakshith2605",
  },
  icons: {
    icon: [
      {
        url: "/fevicon2.svg",
        sizes: "any",
      }
    ],
    shortcut: "/fevicon2.svg?v=2",
    apple: "/fevicon2.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/fevicon2.svg" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}