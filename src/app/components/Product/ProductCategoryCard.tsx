import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import BulkInquiryModal from "../modal/BulkInquiryModal";
import { useEffect, useState } from "react";
import ProductPrice from "../productprice/ProductPrice";
import { fetchStats } from "@/redux/slices/homeSlice";
interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: any;
  msrp: any;
  rating: any;
  reviews: any;
  brand?: { id: number; name: string };
  categories?: { id: number; name: string }[];
  image?: { path?: string }[];
  availabilityText?: string;
  description?: string;
  customFields?: Record<string, string>;
}

export default function ProductCategoryCard({ product }: { product: Product }) {
  const { reviews, reviewsLoading, reviewsError, stats } = useAppSelector(
    (state) => state.home
  );
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
// useEffect(() => {
//   if (!stats || Object.keys(stats).length === 0) {
//     dispatch(fetchStats());
//   }
// }, [dispatch, stats]);
  
  const imageUrl = product.image?.[0]?.path || "/default-product-image.svg";

  return (
   <div
  style={{ height: "auto" }}  /* auto height for mobile, fixed on md+ */
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
  <div className="flex items-center justify-center md:w-[314px] md:h-[171px] w-full h-auto shrink-0 p-4 md:p-0">
    <Image
      src={imageUrl}
      alt={product?.name}
      width={171}
      height={171}
      className="object-contain md:w-[171px] md:h-[171px] w-[150px] h-[150px]"
    />
  </div>

  {/* ✅ Product Info */}
  <div className="flex flex-col justify-between p-4 md:h-[171px] h-auto bg-[#F2F2F2]">
    <p className="text-[12px]">
      <span className="text-[12px] hover:text-[#D42020]">{product?.brand?.name}</span>{" "}
      <span className="text-[12px] hover:text-[#D42020]">SKU:</span>
      <span className="text-[12px] hover:text-[#D42020]">{product?.sku}</span> 
    </p>

    <Link
      href={`/${product?.sku}`}
      className="cursor-pointer relative inline-block group"
    >
      <h3 className="mb-1 text-[20px] font-normal md:line-clamp-2 line-clamp-3 hover:text-[#D42020]">
        {product?.sku} | {product?.brand?.name} | {product?.name}
      </h3>
    </Link>

    <div className="flex flex-wrap items-center gap-2 mt-2">
      {/* Price */}
      {product?.msrp && Number(product.msrp) > 0 ? (
        <div>
          <p className="mb-1 text-[15px]">
            Price{" "}
            <ProductPrice
              price={Number(product.price) + Number(product.msrp)}
              inline={true}
              className="line-through !text-[15px] !font-normal"
            />
          </p>
          <ProductPrice
            price={Number(product.price)}
            inline={false}
            className="font-bold !text-[#545454] !text-3xl"
          />
        </div>
      ) : (
        <ProductPrice
          price={Number(product.price)}
          inline={false}
          className="font-bold !text-[#545454] !text-3xl"
        />
      )}
    </div>
  </div>
</div>
  );
}
