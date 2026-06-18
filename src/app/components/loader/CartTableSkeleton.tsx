const CartTableSkeleton = ({ count = 4 }) => {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
                <colgroup>
                    <col className="w-[40%]" />
                    <col className="w-[15%]" />
                    <col className="w-[20%]" />
                    <col className="w-[15%]" />
                    <col className="w-[10%]" />
                </colgroup>
                <thead>
                    <tr className="border-b border-gray-200">
                        {["Items", "Price", "Quantity", "Total", ""].map((h) => (
                            <th key={h} className="px-3 py-3 text-left text-xl font-normal  text-gray-500">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: count }).map((_, i) => (
                        <tr key={i} className="border-b border-gray-200">
                            {/* Product */}
                            <td className="px-3 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
                                    <div className="flex-1 flex flex-col gap-2">
                                        <div className="h-3 bg-gray-200 animate-pulse rounded w-[90%]" />
                                        <div className="h-3 bg-gray-200 animate-pulse rounded w-[55%]" />
                                    </div>
                                </div>
                            </td>
                            {/* Price */}
                            <td className="px-3 py-4">
                                <div className="h-3 bg-gray-200 animate-pulse rounded w-16" />
                            </td>
                            {/* Quantity (3 boxes: - qty +) */}
                            <td className="px-3 py-4">
                                <div className="flex items-center justify-center gap-1">
                                    <div className="w-7 h-7 bg-gray-200 animate-pulse rounded-md" />
                                    <div className="w-7 h-7 bg-gray-200 animate-pulse rounded-md" />
                                    <div className="w-7 h-7 bg-gray-200 animate-pulse rounded-md" />
                                </div>
                            </td>
                            {/* Total */}
                            <td className="px-3 py-4 text-right">
                                <div className="h-3 bg-gray-200 animate-pulse rounded w-16 ml-auto" />
                            </td>
                            {/* Remove */}
                            <td className="px-3 py-4 text-center">
                                <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full mx-auto" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals skeleton */}
            <div className="flex flex-col items-end gap-2 mt-5 pr-3">
                <div className="h-3 bg-gray-200 animate-pulse rounded w-40" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-32" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-44 mt-1" />
            </div>
        </div>
    );
};

export default CartTableSkeleton;