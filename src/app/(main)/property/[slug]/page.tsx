import type { Metadata } from "next";
import { PropertyClient } from "@/features/property-detail";
import { localize } from "@/lib/localize";
import type { IProperty } from "@/types";

interface IPropertyPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: IPropertyPageProps): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/properties/slug/${params.slug}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error();
    const property: IProperty = await res.json();

   
    const titleText = localize(property.title);
    const descriptionText = localize(property.description).slice(0, 160);

    return {
      title: titleText,
      description: descriptionText,
      openGraph: {
        title: titleText,
        description: descriptionText,
        images: property.images.find((img) => img.isPrimary)
          ? [{ url: property.images.find((img) => img.isPrimary)!.url }]
          : [],
      },
    };
  } catch {
    return { title: "Property Details" };
  }
}

export default function PropertyPage({ params }: IPropertyPageProps) {
  return <PropertyClient slug={params.slug} />;
}
