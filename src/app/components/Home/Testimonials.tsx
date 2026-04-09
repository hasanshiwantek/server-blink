"use client";
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { fetchReviews, fetchStats } from "@/redux/slices/homeSlice";
export interface Review {
  id: number;
  brand: string;
  reviewer: string;
  location: string;
  totalReviews: string;
  date: string;
  reviewHeading: string;
  reviewContent: string;
  dateOfExperience: string;
  stars: string; // URL string
  url: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null;
}

export interface Stats {
  id: number;
  brand: string;
  count: string;
  rating: string;
  status: string;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// Dynamically import Carousel to reduce bundle size
const Carousel = dynamic(
  () => import("primereact/carousel").then((mod) => mod.Carousel),
  {
    ssr: false,
  }
);
const SWIPE_THRESHOLD_PX = 45;

const Testimonials = () => {
  const dispatch = useAppDispatch();
  const { reviews, reviewsLoading, reviewsError, stats } = useAppSelector(
    (state) => state.home
  );
  const [visibleItems, setVisibleItems] = useState(3); // dynamically set numVisible
  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragActive = useRef(false);

  const responsiveOptions = useMemo(
    () => [
      { breakpoint: 1400, numVisible: 2 },
      { breakpoint: 1199, numVisible: 2 },
      { breakpoint: 767, numVisible: 2 },
      { breakpoint: 575, numVisible: 1 },
    ],
    []
  );

  useEffect(() => {
    dispatch(fetchReviews());
    dispatch(fetchStats());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const resp = responsiveOptions.find((r) => width <= r.breakpoint);
      setVisibleItems(resp ? resp.numVisible : 2);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [responsiveOptions]);

  const clickCarouselNav = useCallback((direction: "next" | "prev") => {
    const root = carouselWrapRef.current;
    if (!root) return;
    const sel =
      direction === "next" ? "button.p-carousel-next" : "button.p-carousel-prev";
    const btn = root.querySelector<HTMLButtonElement>(sel);
    if (btn && !btn.disabled) btn.click();
  }, []);

  const handleCarouselPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "touch") return;
      dragActive.current = true;
      dragStartX.current = e.clientX;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const handleCarouselPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (!dragActive.current) return;
      dragActive.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      const diff = e.clientX - dragStartX.current;
      if (Math.abs(diff) < SWIPE_THRESHOLD_PX) return;
      if (diff < 0) {
        clickCarouselNav("next");
      } else {
        clickCarouselNav("prev");
      }
    },
    [clickCarouselNav]
  );

  const reviewTemplate = (review: Review) => (
    <div className="text-left p-4 flex flex-col gap-3 w-full md:w-[250px] lg:w-[280px] xl:w-[330px] h-[218px]">
      {/* <FaQuoteLeft size={24} color="#00b67a" className="mb-2" /> */}
      <div className="mb-3 flex items-center justify-between">
        <Image
          src={review?.stars || "/default-product-image.svg"}
          alt="Rating"
          width={80}
          height={32}
          className="h-8 w-36"
          unoptimized
        />
        <p className="mb-1 font-[500]">{review.dateOfExperience}</p>
      </div>
      <Link href={review?.url} target="_blank">
        <h2 className="text-xl text-black font-bold hover:text-blue-600">
          <span className="inline-block border-b border-black overflow-hidden whitespace-nowrap text-ellipsis max-w-72">
            {review?.reviewHeading}
          </span>
        </h2>
      </Link>


      <div
        className="text-xl overflow-auto review-scroll"
        style={{
          maxHeight: "3.5em", // Approx 5 lines at 1.5em each
          minHeight: "3.5em",
        }}
      >
        {review?.reviewContent ? review?.reviewContent : "No review content"}
      </div>
      <p className="text-black">
        <span className="font-bold">Date of Experience:</span> {review.dateOfExperience}
      </p>

      <p className="mb-2">{review.reviewer}</p>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <header className="text-left mb-4 bg-[#393939] border-b border-gray-400">
        <h2 className="font-bold text-xl text-white p-3 flex-1">
          REVIEWS
        </h2>

      </header>

      <div className="flex items-center justify-between md:flex-col sm:flex-col lg:flex-row flex-col">
        {/* Left Summary Box */}
        <div className="flex flex-col items-center justify-between gap-5 whitespace-nowrap">
          <h3 className="text-center h3-regular">
            {stats?.status || "Excellent"}
          </h3>
          <Image
            src={
              stats?.image ||
              "https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-4.5.svg"
            }
            alt="Reviews"
            width={200}
            height={200}
            className="max-w-44"
          />
          <span className="flex items-center justify-center gap-1 text-center">
            Based on
            <a href="#" className="border-b-2 text-black border-black">
              {stats?.count || "18"} {' '}
              reviews
            </a>
          </span>
          <div className="flex items-center justify-center">
            <IoStarSharp size={20} color="#00b67a" />
            <h4 className="text-[#2A2A2A]">TrustPilot</h4>
          </div>
        </div>

        {/* Carousel */}
        <div className="w-full lg:w-[81%] relative">
          {reviewsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 animate-pulse">
              {Array.from({ length: visibleItems }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-md border bg-white p-6 space-y-4"
                >
                  <div className="h-6 w-16 rounded bg-gray-200" />
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="h-24 rounded bg-gray-100" />
                  <div className="h-3 w-24 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          ) : reviewsError ? (
            <div className="flex flex-col items-center justify-center gap-4 bg-white border rounded-md p-8 text-center w-full max-w-full overflow-hidden">
              <p className="h5-regular text-red-600 break-words w-full">{reviewsError}</p>
              <button
                onClick={() => dispatch(fetchReviews())}
                className="btn-outline-primary !px-6 !py-3 !text-base"
                type="button"
              >
                Retry
              </button>
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex items-center justify-center bg-white border rounded-md p-10">
              <p className="h5-regular text-gray-600">
                No testimonials available at the moment.
              </p>
            </div>
          ) : (
            <div
              ref={carouselWrapRef}
              className="cursor-grab touch-pan-y select-none active:cursor-grabbing [&_button.p-carousel-prev]:sr-only [&_button.p-carousel-next]:sr-only"
              onPointerDown={handleCarouselPointerDown}
              onPointerUp={handleCarouselPointerUp}
              onPointerCancel={handleCarouselPointerUp}
            >
              <Carousel
                value={reviews}
                numVisible={visibleItems}
                numScroll={1}
                responsiveOptions={responsiveOptions.map((r) => ({
                  breakpoint: r.breakpoint + "px",
                  numVisible: r.numVisible,
                  numScroll: 1,
                }))}
                circular
                autoplayInterval={4000}
                itemTemplate={reviewTemplate}
                showIndicators={false}
                showNavigators={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
