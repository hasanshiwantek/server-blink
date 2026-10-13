import { getProductInfo } from "@/utils/product";
import Image from "next/image";
import Link from "next/link";
import ProductPrice from "../productprice/ProductPrice";
interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  productUrl?: string;
  price: any;
  msrp: any;
  rating: any;
  reviews: any;
  brand?: { id: number; name: string; slug?: string };
  categories?: { id: number; name: string }[];
  image?: { path?: string }[];
  availabilityText?: string;
  description?: string;
  customFields?: Record<string, string>;
  purchasabilityStatus?: string;
  callForPricingLabel?: string;
  callForPricingPhone?: string;
}

export default function ProductCategoryCard({ product }: { product: Product }) {
  const {
    productName,
    sku,
    productUrl,
    brandName,
    brandUrl,
    imageSrc,
    price,
    msrp,
    hasMsrp,
    callForPricingLabel,
    callForPricingPhone,
    callForPricingTel,
    availableForSale,
  } = getProductInfo(product);
  return (
    <div
      style={{ height: "auto" }} /* auto height for mobile, fixed on md+ */
      className="
    border rounded-md bg-white
    grid items-start
    md:grid-cols-[314px_1fr]
    grid-cols-1
    w-full
    md:h-[171px]
    h-auto
  "
    >
      {/* ✅ Product Image */}
      <Link href={productUrl}>
        <div className="flex items-center justify-center md:w-[314px] md:h-[171px] w-full h-auto shrink-0 p-4 md:p-0">
          <Image
            src={imageSrc}
            alt={productName}
            width={171}
            height={171}
            fetchPriority="high"
            className="object-contain md:w-[171px] md:h-[171px] w-[150px] h-[150px]"
          />
        </div>
      </Link>

      {/* ✅ Product Info */}
      <div className="flex flex-col justify-between p-4 md:h-[171px] h-auto bg-[#F2F2F2]">
        <p className="text-[12px]">
          <Link href={brandUrl || "/"}>
            <span className="text-[12px] hover:text-[#D42020]">
              {brandName}
            </span>{" "}
          </Link>
          <Link href={productUrl}>
            <span className="text-[12px] hover:text-[#D42020]"> SKU:{sku}</span>
          </Link>
        </p>

        <Link
          href={productUrl}
          className="cursor-pointer relative inline-block group"
        >
          <h3 className="mb-1 text-[20px] font-normal md:line-clamp-2 line-clamp-3 hover:text-[#D42020]">
            {sku} | {brandName} | {productName}
          </h3>
        </Link>

        {availableForSale ? (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {/* Price */}
            {hasMsrp ? (
              <div>
                <p className="mb-1 text-[15px]">
                  Price{" "}
                  <ProductPrice
                    price={msrp}
                    inline={true}
                    className="line-through !text-[15px] !font-normal"
                  />
                </p>
                <ProductPrice
                  price={price}
                  inline={false}
                  className="font-bold !text-[#545454] !text-3xl"
                />
              </div>
            ) : (
              <ProductPrice
                price={price}
                inline={false}
                className="font-bold !text-[#545454] !text-3xl"
              />
            )}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span
              className="text-[1rem] font-bold  "
              style={{ fontFamily: '"Roboto"' }}
            >
              {callForPricingLabel}:{" "}
              <Link
                href={callForPricingTel}
                className="text-[#d40511] underline"
              >
                {callForPricingPhone}
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
