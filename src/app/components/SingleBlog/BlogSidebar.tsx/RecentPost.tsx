"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    id: 1,
    title: "Network Attached Storage Buying Guide 2026: A Comprehensive Look",
    author: "Business |  Power Supplies",
    date: "September 12, 2022",
    image: "/gridimgone.png",
    slug: "network-attached-storage-guide",
  },
  {
    id: 2,
    title:
      "Host Bus Adapter: Types, Comparisons, and Complete Guide to Modern Storage",
    author: "Business |  Power Supplies",
    date: "September 12, 2022",
    image: "/gridimgtwo.png",
    slug: "host-bus-adapter-guide",
  },
  {
    id: 3,
    title: "Cloud Storage vs Local Storage: The Modern Dilemma",
    author: "Business |  Power Supplies",
    date: "September 12, 2022",
    image: "/gridimgthree.png",
    slug: "cloud-storage-modern-dilemma",
  },
];

const RecentPost = () => {
  return (
    <>
         <h3 className="text-4xl">
           Popular Blogs
          </h3>
    <section className="w-full flex  justify-center border">
        
      <div className="w-full xl:max-w-[1440px] 2xl:max-w-[1920px] ">
        <div className="flex flex-col gap-5 justify-items-center ">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
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
                  src={blog.image}
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
                <h3 className="!text-[#D42020] group-hover:text-[#F15939] transition-colors duration-200 line-clamp-2">
                  {blog.date}
                </h3>
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
