import type { Metadata } from "next";
import { PropertyClient } from "@/features/property-detail";

interface PropertyPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/properties/slug/${params.slug}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error();
    const property = await res.json();

    return {
      title: property.title,
      description: property.description?.slice(0, 160),
      openGraph: {
        images: [{ url: property.primaryImage?.url }],
      },
    };
  } catch {
    return { title: "Property Details" };
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  return <PropertyClient slug={params.slug} />;
}
