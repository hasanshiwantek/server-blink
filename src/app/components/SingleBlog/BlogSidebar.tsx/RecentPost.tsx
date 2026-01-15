"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getBlogs } from "@/redux/slices/storeFrontSlice";
const RecentPost = () => {
  const [filters, setFilters] = useState({ page: 1, perPage: 20 });
  const dispatch = useAppDispatch();
  const { blogs, error, loading } = useAppSelector(
    (state: any) => state.storeFront
  );
  const blogPosts = blogs?.data;
  const pagination = blogs?.pagination || null;
  console.log("Blogs data from frontend: ", blogPosts);
  useEffect(() => {
    dispatch(getBlogs(filters));
  }, [dispatch]);

  return (
    <>
      <h3 className="text-4xl">Popular Blogs</h3>
      <section className="w-full flex  justify-center border">
        <div className="w-full xl:max-w-[1440px] 2xl:max-w-[1920px] ">
          <div className="flex flex-col gap-5 justify-items-center ">
            {blogPosts?.map((blog: any) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.id}`}
                className="
            w-[80%] p-1.5 md:w-[100.7%] 2xl:w-[97.1%]
             rounded-lg transition overflow-hidden
            flex flex-col sm:flex-row justify-start items-center sm:items-stretch gap-3 bg-[#F5F6FA]
          "
              >
                {/* Image */}
                <div
                  className="
              w-full
              md:w-[34.5%] md:h-[55px]
              2xl:w-[35.6%] 2xl:h-[55px]
              relative overflow-hidden  flex-shrink-0 m-auto
            "
                >
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <div
                  className="
              flex flex-col justify-center gap-1.5 lg:justify-between items-start 
              w-full sm:w-[55%] md:w-[60%]
              text-left
            "
                >
                  {/* <p className="h5-20px-regular  ">
                  {blog.author}
                </p> */}
                  <h3 className="text-xl group-hover:text-[#F15939] transition-colors duration-200 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="!text-[#D42020] group-hover:text-[#F15939] transition-colors duration-200 line-clamp-2 text-sm">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentPost;
