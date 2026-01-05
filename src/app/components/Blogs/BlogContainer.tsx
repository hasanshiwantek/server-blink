"use client";
import React, { useEffect, useState } from "react";
import OurLatestBlogs from "./OurLatestBlogs";
import GridCard from "./GridCard";
import BlogTrending from "./BlogTrending";
import BlogCategories from "./BlogCategories";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getBlogs } from "@/redux/slices/storeFrontSlice";

const BlogContainer = () => {
  const [filters, setFilters] = useState({ page: 1, perPage: 20 });
const dispatch = useAppDispatch();
const { blogs, error,loading } = useAppSelector(
  (state: any) => state.storeFront
);
const blogPosts = blogs?.data;
const pagination = blogs?.pagination || null;
console.log("Blogs data from frontend: ", blogPosts);
  useEffect(() => {
    dispatch(getBlogs(filters));
  }, [dispatch]);

  return (
    <main className="flex flex-col gap-30" role="blog">
  <div className="w-full max-w-[1170px] mx-auto px-6 xl:px-0">
    <div className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Main Content – full width */}
        <div className="lg:col-span-12">
          <BlogCategories
            blogPosts={blogPosts}
            error={error}
            loading={loading}
            pagination={pagination}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

      </div>
    </div>
  </div>
</main>

  );
};

export default BlogContainer;
