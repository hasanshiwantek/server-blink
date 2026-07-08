import { Metadata } from "next";
import { fetchBrands } from "@/lib/api/brand";
import AllBrandsClient from "@/app/components/Home/AllBrandsClient";

export const metadata: Metadata = {
  title: "All Brands",
  description:
    "Browse all brands available at Server Blink — servers, networking, and IT hardware.",
  alternates: {
    canonical: "https://staging.sparemicro.com/brands",
  },
};

export default async function BrandsDirectoryPage() {
  const brands = await fetchBrands();

  return <AllBrandsClient brands={brands} />;
}
