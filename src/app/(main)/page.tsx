import {
  FeaturedSection,
  HeroSection,
  HowItWorks,
} from "@/features/home/components";
import type { Metadata } from "next";

const SITE_URL = "https://iranian-amlak.com";

export const metadata: Metadata = {
  title: "Iranian Amlak — Find Your Perfect Home",
  description:
    "جستجوی هوشمند آپارتمان، ویلا و پنت‌هاوس در سراسر ایران. آگهی‌های لحظه‌ای، نقشه تعاملی و ارتباط مستقیم با مشاور املاک.",
  keywords: [
    "iranian amlak",
    "real estate iran",
    "خرید ملک",
    "اجاره آپارتمان",
    "املاک تهران",
    "ویلا",
    "پنت‌هاوس",
  ],
  openGraph: {
    title: "Iranian Amlak — Find Your Perfect Home",
    description:
      "هزاران آگهی ملک معتبر. جستجو، فیلتر و ارتباط مستقیم با مشاور املاک.",
    url: SITE_URL,
    siteName: "Iranian Amlak",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Iranian Amlak — جستجوی ملک",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iranian Amlak — Find Your Perfect Home",
    description: "هزاران آگهی ملک معتبر. جستجو، فیلتر و ارتباط مستقیم.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "fa-IR": "/",
      "en-US": "/en",
    },
  },
};

// ISR: revalidate every 60 seconds so featured listings stay fresh
// without a full server round-trip on every request.
export const revalidate = 60;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Iranian Amlak",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Iranian Amlak",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <HeroSection />
        <FeaturedSection />
        <HowItWorks />
      </main>
    </>
  );
}
