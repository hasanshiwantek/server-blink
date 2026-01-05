import React from "react";
import BlogSkeleton from "../loader/BlogSkeleton";
import Link from "next/link";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";
const BlogCategories = ({
  blogPosts,
  error,
  loading,
  pagination,
  filters,
  setFilters,
}: {
  blogPosts: any[];
  error: any;
  pagination: any;
  filters: any;
  setFilters: any;
  loading: boolean;
}) => {
  const getExcerpt = (html: string, maxLength = 200) => {
    if (!html) return "";

    // Create a temporary DOM element
    const div = document.createElement("div");
    div.innerHTML = html;

    // Get text content only
    const text = div.textContent || div.innerText || "";

    // Truncate
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
 
// Total Pages ko backend data se nikalna
  const totalPages = pagination?.totalPages || 1;
  const showPagination = totalPages > 1;
  return (
    <div className="flex flex-col items-start w-full ">
        <h2 className=""><span
                  className="text-[11px]"
                  itemProp="name"
                >
                  Home
                </span> {" "} <span className="mt-2 mx-3 text-gray-400 text-[11px]" aria-hidden="true">/</span> {" "} <span
                  className="!text-[#D42020] text-[11px]"
                  itemProp="name"
                >
                 Blog
                </span></h2>
      <h2 className="text-4xl my-6 text-[#545454]">
    Blog
  </h2>

<div className="w-full">
  {loading ? (
    // Skeleton Loader for 3 items
    <BlogSkeleton />
  ) : error ? (
    <div className="w-full py-10 text-center text-red-500 font-medium">
      {error || "Something went wrong while fetching blogs."}
    </div>
  ) : blogPosts && blogPosts.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
  {blogPosts.map((blog) => (
  <div
    key={blog.id}
    className="
      relative
      w-full 
      h-[250px] md:h-[280px] xl:h-[250px]
      rounded-lg overflow-hidden 
      group
      cursor-pointer
    "
  >
    {/* Image with zoom effect */}
    <div className="absolute inset-0 overflow-hidden">
     <Image
        src={blog.thumbnail || "/default-product-image.svg"}
        alt={blog.title}
        fill
        className="
          object-fill
          transition-transform duration-500 ease-out
          group-hover:scale-110
        "
      />
      {/* Dark overlay */}
      <div className="
        absolute inset-0 
        bg-gradient-to-t from-black/80 via-black/40 to-transparent
      "></div>
    </div>

    {/* Text Content Overlay */}
    <div className="
      absolute inset-0
      flex flex-col justify-end
      p-5 md:p-6
      text-white
    ">
      
      <Link
        href={`blogs/${blog.id}`}
        className="group/title mb-3"
      >
        <h3 className="
          h3-secondary 
          !text-white !font-normal line-clamp-1
          group-hover/title:text-[#F15939] 
          leading-tight
          transition-colors duration-300
        ">
          {blog.title}
        </h3>
      </Link>

      <Link
        href={`blogs/${blog.id}`}
        className="relative inline-block w-fit text-white bg-[#808080] font-bold md:text-[14px] py-2 px-3 border-b-2 border-black"
      >
        READ MORE
      </Link>

    </div>
  </div>
))}
    </div>
  ) : (
    <div className="w-full py-10 text-center text-gray-500 font-medium">
      No blogs found.
    </div>
  )}
</div>

     {/* Pagination */}
      {!loading && !error && (
        <div className="mt-6 flex justify-start">
         <Pagination
            currentPage={pagination?.currentPage} 
            totalPages={totalPages}
            onPageChange={(page: number) =>
              setFilters((prev: any) => ({
                ...prev,
                page,
              }))
            }
          />
        </div>
      )}
    </div>
  );
};

export default BlogCategories;
