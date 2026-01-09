const BlogSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
            relative
            w-full
            h-[250px] md:h-[280px] xl:h-[250px]
            rounded-lg overflow-hidden
            bg-gray-200
            animate-pulse
          "
        >
          {/* Image overlay */}
          <div className="absolute inset-0 bg-gray-300" />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

          {/* Text Content Skeleton */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
            {/* Title bar */}
            <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
            {/* Read More bar */}
            <div className="h-5 w-24 bg-gray-300 rounded mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSkeleton;
