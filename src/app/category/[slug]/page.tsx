// app/category/[slug]/page.tsx
import ProductsPage from "@/app/products/page";
import { fetchCategories, fetchCategoryById } from "@/lib/api/category";
import { Metadata } from "next";
import NotFound from "@/app/not-found";
interface Props {
  params: Promise<{ slug: string }>; // 👈 same as ProductPage
}

function findCategoryBySlug(categories: any[], slug: string): any | undefined {
  for (const cat of categories) {
    if (cat.slug === slug) return cat;
    if (cat.subcategories && cat.subcategories.length > 0) {
      const found = findCategoryBySlug(cat.subcategories, slug);
      if (found) return found;
    }
  }
  return undefined;
}

// ✅ Dynamic SEO metadata per category
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await fetchCategories();
  const category = findCategoryBySlug(categories, slug);

  const formattedCategory =
    category?.seo?.page_title || slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const title = `${formattedCategory} `;
  const description = category?.seo?.meta_description;

  return {
    title: {
      absolute: formattedCategory,  // ← changed
    },
    description,
    alternates: {
      canonical: `https://staging.sparemicro.com/category/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://staging.sparemicro.com/category/${slug}`,
      siteName: "Server Blink",
      images: [
        {
          url: "https://staging.sparemicro.com/images/products-og.jpg", // Replace with actual OG image
          width: 1200,
          height: 630,
          alt: `${formattedCategory} Products`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params; // 👈 matching slug
  const categories = await fetchCategories();

  // Find category by slug
  const category = findCategoryBySlug(categories, slug);

  if (!category) {
    return <NotFound />;
    // return <div className="text-center py-10">❌ Category not found</div>;
  }
  const formattedCategorydescription = await fetchCategoryById(category.id);
  return (
    <ProductsPage
      initialCategoryId={category.id}
      initialCategoryName={category.name}
      initialCategorydescription={category?.description}
    />
  );
}
