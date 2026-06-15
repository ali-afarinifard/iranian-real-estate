import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const vazirmatn = localFont({
  src: "../../public/fonts/Vazirmatn/Vazirmatn-VF.woff2",
  variable: "--font-vazirmatn",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Nestify",
    default: "Nestify — Find Your Perfect Home",
  },
  description:
    "Discover premium properties for sale and rent across the Netherlands. Smart search, interactive maps, and real-time updates.",
  keywords: [
    "real estate",
    "properties",
    "apartments",
    "houses",
    "Amsterdam",
    "Rotterdam",
    "Netherlands",
  ],
  authors: [{ name: "Nestify Team" }],
  openGraph: {
    type: "website",
    locale: "en_NL",
    url: "https://nestify.nl",
    siteName: "Nestify",
    title: "Nestify — Find Your Perfect Home",
    description: "Discover premium properties across the Netherlands.",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "Nestify" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nestify — Find Your Perfect Home",
    description: "Discover premium properties across the Netherlands.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1463C7" },
    { media: "(prefers-color-scheme: dark)", color: "#042353" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={vazirmatn.variable} suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://tile.openstreetmap.org"
          crossOrigin=""
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
