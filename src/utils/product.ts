export type ProductInfoSource = {
  id?: number | string | null;
  name?: string | null;
  sku?: string | null;
  slug?: string | null;
  productUrl?: string | null;
  brand?: { name?: string | null; slug?: string | null } | null;
  image?: { path?: string | null; isPrimary?: number | null }[] | null;
  price?: number | string | null;
  msrp?: number | string | null;
  retailPrice?: number | string | null;
  costPrice?: number | string | null;
  availabilityText?: string | null;
  callForPricingLabel?: string | null;
  callForPricingPhone?: string | null;
  purchasabilityStatus?: string | null;
  currentStock?: number | string | null;
  allowPurchase?: boolean | number | null;
  minPurchaseQuantity?: number | null;
  maxPurchaseQuantity?: number | null;
  showCondition?: boolean | number | null;
  condition?: string | null;
  dimensions?: { weight?: number | string | null } | null;
  freeShipping?: boolean | number | null;
  fixedShippingCost?: number | string | null;
  categories?:
    | { id?: number | string; name?: string; slug?: string | null }[]
    | null;
  categoryHierarchy?:
    | { id?: number | string; name?: string; slug?: string }[]
    | null;
};

export function getProductInfo(product?: ProductInfoSource | null) {
  // identity
  const id = product?.id ?? undefined;
  const productName = product?.name || "Unnamed Product";
  const sku = product?.sku || "";
  const skuUrl = `/${sku}`;
  const productUrl = product?.productUrl || skuUrl;
  const categoryHierarchy = product?.categoryHierarchy ?? [];
  const categoryUrl = `/category/${product?.categories?.[0]?.slug || product?.slug}`;

  // brand
  const hasBrand = !!product?.brand?.name;
  const brandName = product?.brand?.name || "Unknown Brand";
  const brandSlug = product?.brand?.slug || undefined;
  const brandUrl = brandSlug ? `/brand/${brandSlug}` : undefined;

  // media (primary image first, then the rest in API order)
  const imageList = product?.image ?? [];
  const primaryImage = imageList.find((img) => img?.isPrimary === 1);
  const images = (
    primaryImage
      ? [primaryImage, ...imageList.filter((img) => img !== primaryImage)]
      : imageList
  )
    .map((img) => img?.path)
    .filter((path): path is string => !!path);
  const imageSrc = images[0] || "/default-product-image.svg";

  // pricing
  const price = Number(product?.price) || 0;
  const msrp = Number(product?.msrp) || 0;
  const hasMsrp = msrp > 0;
  const retailPrice = Number(product?.retailPrice) || 0;
  const costPrice = Number(product?.costPrice) || 0;
  const hasCostPrice = costPrice > price;
  const callForPricingLabel =
    product?.callForPricingLabel?.trim() || "Call for pricing";
  const callForPricingPhone =
    product?.callForPricingPhone?.trim() || "(502) 000-0000";
  const callForPricingTel = `tel:${
    product?.callForPricingPhone?.trim() || "+15020000000"
  }`;

  // availability
  const availabilityText = product?.availabilityText || undefined;
  const availableForSale =
    product?.purchasabilityStatus == "available" && price > 0;
  const isOutOfStock = Number(product?.currentStock) === 0;
  const isPurchaseBlocked = !product?.allowPurchase;
  const disabledAddToCart = isOutOfStock || isPurchaseBlocked;
  const stockStatusText = isOutOfStock
    ? "Out of Stock"
    : availabilityText || "In Stock";

  // purchase limits
  const minQty = product?.minPurchaseQuantity || 1;
  const maxQty = product?.maxPurchaseQuantity ?? undefined;

  // details
  const condition =
    product?.showCondition && product?.condition
      ? product.condition
      : undefined;
  const weight = product?.dimensions?.weight || undefined;
  const shippingText = product?.freeShipping
    ? "Free Shipping"
    : Number(product?.fixedShippingCost) > 0
      ? `$${product?.fixedShippingCost} (Fixed Shipping Cost)`
      : "Calculated at Checkout";

  return {
    id,
    productName,
    sku,
    skuUrl,
    productUrl,
    categoryHierarchy,
    categoryUrl,
    hasBrand,
    brandName,
    brandSlug,
    brandUrl,
    images,
    imageSrc,
    price,
    msrp,
    hasMsrp,
    retailPrice,
    costPrice,
    hasCostPrice,
    callForPricingLabel,
    callForPricingPhone,
    callForPricingTel,
    availabilityText,
    stockStatusText,
    availableForSale,
    isOutOfStock,
    isPurchaseBlocked,
    disabledAddToCart,
    minQty,
    maxQty,
    condition,
    weight,
    shippingText,
  };
}
