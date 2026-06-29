import SortDropdown from "./SortDropdown";

interface Props {
  total: number;
  view: "list" | "grid";
  setView: (view: "list" | "grid") => void;
  filters: any;
  setFilters: any;
  filterMeta: any;
}

export default function SortingBar({
  total,
  view,
  setView,
  filters,
  setFilters,
  filterMeta,
}: Props) {
  // ✅ Build a dynamic title based on filters
  const getFilterTitle = () => {
    const parts: string[] = [];

    if (filterMeta.brandName) {
      parts.push(`Brand: ${filterMeta.brandName}`);
    }

    if (filterMeta.categoryName) {
      parts.push(`Category: ${filterMeta.categoryName}`);
    }

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      parts.push(`Price: $${filters.minPrice} - $${filters.maxPrice}`);
    } else if (filters.minPrice !== undefined) {
      parts.push(`Price: Above $${filters.minPrice}`);
    } else if (filters.maxPrice !== undefined) {
      parts.push(`Price: Below $${filters.maxPrice}`);
    }

    return parts.length === 0
      ? `All Products (Showing ${total || 0})`
      : `${parts.join(", ")} (Showing ${total || 0})`;
  };

  return (
    <div  className="flex flex-col items-center xl:flex-row justify-between items-center border 2xl:py-[20px] xl:py-[15px] py-5 w-full">

      {/* ✅ Dynamic Heading Placeholder */}
      {/* <h4 className="h3-regular">{getFilterTitle()}</h4> */}

      <div className="flex flex-row xl:flex-row items-center w-full gap-3 justify-between">

        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView("grid")}
            className={`w-[35px] h-[35px] flex items-center justify-center border transition-colors ${view === "grid"
                ? "bg-[var(--primary-color)] text-white  shadow-md"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="5" r="1" />
              <circle cx="19" cy="5" r="1" />
              <circle cx="5" cy="5" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
              <circle cx="12" cy="19" r="1" />
              <circle cx="19" cy="19" r="1" />
              <circle cx="5" cy="19" r="1" />
            </svg>
          </button>
          <button
            onClick={() => setView("list")}
            className={`w-[35px] h-[35px] flex items-center justify-center border transition-colors ${view === "list"
                ? "bg-[var(--primary-color)] text-white  shadow-md"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
              <path d="M14 4h7" />
              <path d="M14 9h7" />
              <path d="M14 15h7" />
              <path d="M14 20h7" />
            </svg>
          </button>
        </div>

        {/* Centered Sort Section */}
        <div className="flex items-center gap-5 justify-center flex-1 mt-3 md:mt-0">
          <span className="text-[13px] whitespace-nowrap">Sort By: </span>
          <SortDropdown filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </div>

  );
}
