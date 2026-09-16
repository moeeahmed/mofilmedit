import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { HeroHeader } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://mofilmedit.co.uk";
const description =
  "mofilmedit is a UK-based videography brand crafting cinematic storytelling, sports visuals, and brand films that leave a lasting impact.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "mofilmedit | Cinematic Videography & Editing",
    template: "%s | mofilmedit",
  },
  description,
  keywords: [
    "mofilmedit",
    "videography",
    "video editing",
    "cinematic video",
    "sports videography",
    "event videography",
    "UK videographer",
  ],
  authors: [{ name: "mofilmedit" }],
  creator: "mofilmedit",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "mofilmedit | Cinematic Videography & Editing",
    description,
    siteName: "mofilmedit",
    images: [
      {
        url: "https://djpguts9gwm3x.cloudfront.net/mofilmedit.jpg",
        width: 1200,
        height: 630,
        alt: "mofilmedit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mofilmedit | Cinematic Videography & Editing",
    description,
    images: ["https://djpguts9gwm3x.cloudfront.net/mofilmedit.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <HeroHeader />
          {children}

          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
