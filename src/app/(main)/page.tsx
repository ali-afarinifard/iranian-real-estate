import { FeaturedSection, HeroSection, HowItWorks } from "@/features/home/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nestify — Find Your Perfect Home in the Netherlands",
  description:
    "Discover premium apartments, villas, and penthouses across Amsterdam, Rotterdam, and beyond. Real-time listings, interactive map, and direct agent contact.",
  keywords: [
    "real estate Netherlands",
    "Amsterdam apartments",
    "Rotterdam properties",
    "buy house Netherlands",
    "rent apartment Amsterdam",
  ],
  openGraph: {
    title: "Nestify — Find Your Perfect Home in the Netherlands",
    description:
      "2,400+ premium properties across 5 Dutch cities. Browse, filter, and connect with agents directly.",
    url: "https://nestify.nl",
    siteName: "Nestify",
    locale: "en_NL",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Amsterdam canal houses — Nestify real estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nestify — Find Your Perfect Home in the Netherlands",
    description: "2,400+ premium properties. Browse, filter, and connect.",
  },
  alternates: {
    canonical: "https://nestify.nl",
    languages: {
      "en-NL": "https://nestify.nl/en",
      "fa-IR": "https://nestify.nl/fa",
    },
  },
};

// ISR: revalidate every 60 seconds so featured listings stay fresh
// without a full server round-trip on every request.
export const revalidate = 60;

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedSection />
      <HowItWorks />
    </main>
  );
}
