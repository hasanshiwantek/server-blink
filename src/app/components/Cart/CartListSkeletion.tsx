
const CartListSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Cart Heading */}
      <div className="mb-8 h-9 w-64 max-w-full rounded bg-gray-200" />

      {/* Table Header */}
      <div className="hidden xl:flex items-center justify-between border-b border-gray-300 pb-5">
        <div className="h-5 w-16 rounded bg-gray-200" />
        <div className="flex w-[48.8%] justify-between">
          <div className="h-5 w-14 rounded bg-gray-200" />
          <div className="h-5 w-20 rounded bg-gray-200" />
          <div className="h-5 w-12 rounded bg-gray-200" />
        </div>
      </div>

      {/* Cart Product */}
      <div className="flex flex-col gap-4 border-b border-gray-300 py-5 md:grid md:grid-cols-[180px_minmax(0,1fr)] md:gap-x-5 xl:flex xl:flex-row xl:items-center xl:justify-between">
        {/* Image + Product Details */}
        <div className="flex w-full items-center gap-4 xl:w-[65.1%]">
          <div className="h-[105px] w-[40%] shrink-0 rounded-sm bg-gray-200 md:w-[180px] xl:w-[143px]" />

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {/* Brand */}
            <div className="h-4 w-20 max-w-full rounded bg-gray-200" />

            {/* Product Name */}
            <div className="h-5 w-full rounded bg-gray-200" />
            <div className="h-5 w-[85%] max-w-full rounded bg-gray-200" />
          </div>
        </div>

        {/* Price, Quantity & Total */}
        <div className="flex w-full flex-col gap-4 pl-3 md:col-start-2 md:row-start-2 md:flex-row md:items-center md:justify-between md:gap-3 xl:w-[66%] xl:flex-row xl:pl-0">
          {/* Price */}
          <div className="flex items-center justify-between md:block">
            <div className="h-4 w-12 rounded bg-gray-200 md:hidden" />
            <div className="h-5 w-20 rounded bg-gray-200" />
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-between md:block">
            <div className="h-4 w-16 rounded bg-gray-200 md:hidden" />
            <div className="flex items-center gap-0">
              <div className="h-8 w-8 rounded-sm bg-gray-300" />
              <div className="h-8 w-10 rounded-sm bg-gray-200" />
              <div className="h-8 w-8 rounded-sm bg-gray-300" />
            </div>
          </div>

          {/* Total + Remove */}
          <div className="flex items-center justify-between gap-3">
            <div className="h-4 w-12 rounded bg-gray-200 md:hidden" />
            <div className="h-5 w-24 rounded bg-gray-200" />
            <div className="h-7 w-7 shrink-0 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-6 flex justify-end">
        <div className="w-full rounded-xl border border-gray-200 p-5 sm:p-6 md:w-[45%]">
          {/* Subtotal */}
          <div className="flex items-center justify-between border-b border-gray-300 pb-5">
            <div className="h-5 w-20 rounded bg-gray-200" />
            <div className="h-5 w-16 rounded bg-gray-200" />
          </div>

          {/* Shipping */}
          <div className="flex items-center justify-between border-b border-gray-300 py-5">
            <div className="h-5 w-20 rounded bg-gray-200" />
            <div className="h-5 w-16 rounded bg-gray-200" />
          </div>

          {/* Coupon */}
          <div className="flex items-center justify-between border-b border-gray-300 py-5">
            <div className="h-5 w-24 rounded bg-gray-200" />
            <div className="h-5 w-20 rounded bg-gray-200" />
          </div>

          {/* Grand Total */}
          <div className="flex items-center justify-between py-5">
            <div className="h-5 w-24 rounded bg-gray-200" />
            <div className="h-5 w-20 rounded bg-gray-200" />
          </div>

          {/* Checkout Button */}
          <div className="mt-2 flex justify-end">
            <div className="h-12 w-[187px] max-w-full rounded-sm bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartListSkeleton;
