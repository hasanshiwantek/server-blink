// app/category/[slug]/page.tsx
import ProductsPage from "@/app/products/page";
import { fetchBrands } from "@/lib/api/brand";
import { fetchCategories } from "@/lib/api/category";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>; // 👈 same as ProductPage
}

// function findCategoryBySlug(categories: any[], slug: string): any | undefined {
//   for (const cat of categories) {
//     if (cat.slug === slug) return cat;
//     if (cat.subcategories && cat.subcategories.length > 0) {
//       const found = findCategoryBySlug(cat.subcategories, slug);
//       if (found) return found;
//     }
//   }
//   return undefined;
// }

function findBrandBySlug(brands: any[], slug: string): any | undefined {
  for (const brand of brands) {
    if (brand.brand?.slug == slug) return brand;
  }
  return undefined;
}

// ✅ Dynamic SEO metadata per category
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brands = await fetchBrands();
  const brand = findBrandBySlug(brands, slug);
  const formattedBrand =
    brand?.brand?.page_title ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const title = `${formattedBrand}`;
  const description = brand?.brand?.meta_description;

  return {
    title: {
      absolute: title
    },
    description: description,
    alternates: {
      canonical: `https://staging.sparemicro.com/brand/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://staging.sparemicro.com/brand/${slug}`,
      siteName: "Server Blink",
      images: [
        {
          url: "https://staging.sparemicro.com/images/products-og.jpg", // Update with actual OG image
          width: 1200,
          height: 630,
          alt: `${formattedBrand} Products`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params; // 👈 matching slug

  const brands = await fetchBrands();

  const brand = findBrandBySlug(brands, slug);

  if (!brand) {
    return <div className="text-center py-10">❌ brand not found</div>;
  }

  return (
    <ProductsPage
      initialBrandId={brand?.brand?.id}
      initialBrandName={brand?.brand?.name}
    />
  );
}

