import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/layout/Providers";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const vazirmatn = localFont({
  src: "../../public/fonts/Vazirmatn/Vazirmatn-VF.woff2",
  variable: "--font-vazirmatn",
  display: "swap",
  weight: "100 900",
  preload: true,
});

const SITE_URL = "https://iranian-amlak.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Iranian Amlak",
    default: "Iranian Amlak — Find Your Perfect Home",
  },
  description:
    "جستجوی هوشمند ملک، نقشه تعاملی و به‌روزرسانی لحظه‌ای برای خرید و اجاره ملک در ایران.",
  keywords: [
    "iranian amlak",
    "real estate",
    "real estate iran",
    "آپارتمان",
    "ملک",
    "خرید خانه",
    "اجاره خانه",
    "تهران",
  ],
  authors: [{ name: "Iranian Amlak Team", url: SITE_URL }],
  creator: "Iranian Amlak",
  publisher: "Iranian Amlak",
  applicationName: "Iranian Amlak",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "fa-IR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: "Iranian Amlak",
    title: "Iranian Amlak — Find Your Perfect Home",
    description: "جستجوی هوشمند ملک، نقشه تعاملی و به‌روزرسانی لحظه‌ای.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Iranian Amlak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iranian Amlak — Find Your Perfect Home",
    description: "جستجوی هوشمند ملک، نقشه تعاملی و به‌روزرسانی لحظه‌ای.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
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
    <html
      lang="fa"
      dir="rtl"
      className={vazirmatn.variable}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preconnect"
          href="https://tile.openstreetmap.org"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
      </head>
      <body>
        <NextTopLoader color="#1463C7" showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
