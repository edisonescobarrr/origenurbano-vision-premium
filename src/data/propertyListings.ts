export type PropertyListing = {
  id: string;
  slug: string;
  coverImage: string;
  gallery: string[];
  galleryLabels: string[];
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: number;
  type: string;
  featured: boolean;
  imageFit: "contain" | "cover";
  description: string;
  highlights: string[];
};

export const PROPERTY_LISTINGS: PropertyListing[] = [];

export function getPropertyBySlug(slug: string): PropertyListing | undefined {
  return PROPERTY_LISTINGS.find((p) => p.slug === slug);
}
