import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { fetchProductBySlugAndUrl, fetchWebPages } from "@/lib/api/products";
const CategoriesSidebar = dynamic(
  () => import("../components/Home/CategoriesSidebar")
);

const BrandsSidebar = dynamic(
  () => import("../components/Home/BrandsSidebar")
);
const ProductExtras = dynamic(
  () => import("../components/Product/ProductExtras")
);
const ProductOverview = dynamic(
  () => import("../components/Product/ProductOverview")
);
const ProductCard = dynamic(
  () => import("../components/Product/ProductCard")
);
const DynamicWebPage = dynamic(
  () => import("../components/Product/DynamicWebPage")
);
//  Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const headersList = await headers();

  const pathname: any = headersList.get("x-pathname");
  const product = await fetchProductBySlugAndUrl(pathname);
  const webPages = await fetchWebPages(pathname);

  if (!product && !webPages) {
    notFound();
  }

  const url = `https://server-blink.vercel.app/${slug}`;

  if (webPages) {
    return {
      title: {
        absolute: webPages.pageTitle || webPages.pageName,  // ← changed
      },
      description:
        webPages.metaDescription?.substring(0, 160) ||
        webPages.pageName,
      keywords: webPages.metaKeywords || webPages.searchKeywords || webPages.pageName,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: webPages.pageTitle || webPages.pageName,
        description: webPages.metaDescription || webPages.pageName,
        url,
        siteName: "Server Blink",
        type: "website",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }
  return {
    title: {
      absolute: product.pageTitle || product.name,  // ← changed
    },
    description:
      product.metaDescription?.substring(0, 160),
    keywords:
      product.searchKeywords ||
      `${product.name}, ${product.brand?.name}, Server Blink`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.pageTitle || product.name,
      description: product.metaDescription,
      url,
      siteName: "",
      images: [
        {
          url: product.image?.[0]?.path || "/default-product-image.svg",
          width: 1200,
          height: 630,
          alt: product.pageTitle || product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.pageTitle || product.name,
      description: product.metaDescription,
      images: [product.image?.[0]?.path || "/default-product-image.svg"],
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

//  Page component (server-side)
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const headersList = await headers();
  //  Most reliable - Next.js sets this automatically
  const pathname: any = headersList.get("x-pathname");

  //  Parallel data fetching
  const product = await fetchProductBySlugAndUrl(pathname);
  const webPages = await fetchWebPages(pathname);

  if (!product && !webPages) {
    notFound();
  }
  const backendSchema = product?.schema;

  return (
    <>
      {webPages ? <DynamicWebPage webPages={webPages} /> : <div>
        {/* Structured Data (SEO safe) */}
        {backendSchema && (
          <Script
            id="product-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(backendSchema),
            }}
            strategy="afterInteractive"
          />
        )}

        <main
          role="main"
          className="w-full max-w-[1170px] mx-auto px-4 lg:px-6 xl:px-0"
        >
          <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
            {/* Left Sidebar - Fixed 235px on desktop */}
            <aside className="hidden lg:block md:w-[20%] flex-shrink-0">
              <CategoriesSidebar activeCategoryId={product?.categoryIds[0]} />
              <BrandsSidebar activeBrandId={product?.brand?.id} />
            </aside>

            {/* Main Product Content - Fixed 912px max on desktop */}
            <article className="w-full lg:max-w-[78%]">
              <ProductCard product={product} />
              <ProductOverview product={product} />

              {/* Client-side component */}
              {product?.relatedProductsEnabled && <Suspense
                fallback={
                  <div className="py-10 text-center text-sm text-gray-500">
                    Loading...
                  </div>
                }
              >
                <ProductExtras product={product} />
              </Suspense>}
            </article>
          </div>
        </main>
      </div>}
    </>
  );
}
