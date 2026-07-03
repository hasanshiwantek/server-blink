"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
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
  stars: string;
  url: string;
  created_at: string;
  updated_at: string;
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

// Dynamically import Carousel
const Carousel = dynamic(
  () => import("primereact/carousel").then((mod) => mod.Carousel),
  { ssr: false }
);

const SWIPE_THRESHOLD_PX = 45;
const REVIEW_CARD_WIDTH = 380;
const roboto = "Roboto, Arial, Helvetica, sans-serif";

const Testimonials = () => {
  const dispatch = useAppDispatch();
  const { reviews, reviewsLoading, reviewsError, stats } = useAppSelector(
    (state) => state.home
  );

  const [visibleItems, setVisibleItems] = useState(1);
  const carouselWrapRef = useRef<HTMLDivElement>(null);

  // Drag handling refs
  const dragStartX = useRef(0);
  const dragActive = useRef(false);
  const isDragging = useRef(false);

  const updateVisibleItems = useCallback(() => {
    const containerWidth =
      carouselWrapRef.current?.offsetWidth ?? window.innerWidth;
    const count = Math.max(1, Math.floor(containerWidth / REVIEW_CARD_WIDTH));
    setVisibleItems(count);
  }, []);

  useEffect(() => {
    dispatch(fetchReviews());
    dispatch(fetchStats());
  }, [dispatch]);

  useEffect(() => {
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, [updateVisibleItems]);

  useEffect(() => {
    if (!reviewsLoading && reviews.length > 0) {
      updateVisibleItems();
    }
  }, [reviewsLoading, reviews.length, updateVisibleItems]);

  const clickCarouselNav = useCallback((direction: "next" | "prev") => {
    const root = carouselWrapRef.current;
    if (!root) return;
    const sel =
      direction === "next"
        ? "button.p-carousel-next"
        : "button.p-carousel-prev";
    const btn = root.querySelector<HTMLButtonElement>(sel);
    if (btn && !btn.disabled) btn.click();
  }, []);

  // ==================== DRAG HANDLERS ====================
  const handleCarouselPointerDown = useCallback((e: React.PointerEvent) => {
    dragActive.current = true;
    isDragging.current = false;
    dragStartX.current = e.clientX;

    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
  }, []);

  const handleCarouselPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragActive.current) return;

    const diff = Math.abs(e.clientX - dragStartX.current);
    if (diff > 10) {
      isDragging.current = true;
    }
  }, []);

  const handleCarouselPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragActive.current) return;

      dragActive.current = false;
      const target = e.currentTarget as HTMLElement;

      try {
        target.releasePointerCapture(e.pointerId);
      } catch { }

      const diff = e.clientX - dragStartX.current;

      // Only navigate if it was a meaningful drag
      if (isDragging.current && Math.abs(diff) > SWIPE_THRESHOLD_PX) {
        if (diff < 0) {
          clickCarouselNav("next");
        } else {
          clickCarouselNav("prev");
        }
      }

      isDragging.current = false;
    },
    [clickCarouselNav]
  );
  // =======================================================

  const reviewTemplate = (review: Review) => (
    <div className="text-left p-4 flex flex-col gap-3 w-full max-w-[380px] h-[218px] box-border mx-auto">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Image
          src={review?.stars || "/default-product-image.svg"}
          alt="Rating"
          width={80}
          height={32}fetchPriority="high"
          className="h-8 w-36 shrink-0"
          unoptimized
        />
        <p className="mb-0 text-sm font-medium shrink-0">{review.dateOfExperience}</p>
      </div>
      <Link href={review?.url} target="_blank" className="block min-w-0">
        <h2 className="text-[14px] text-[#333333] font-bold ">
          <span className="inline-block w-full max-w-[348px] border-b border-black overflow-hidden whitespace-nowrap text-ellipsis">
            {review?.reviewHeading}
          </span>
        </h2>
      </Link>

      <div
        className="text-[14px] text-[#333333] leading-snug overflow-auto review-scroll min-w-0"
        style={{
          maxHeight: "4.5em",
          minHeight: "4.5em",
        }}
      >
        {review?.reviewContent ? review?.reviewContent : "No review content"}
      </div>
      <p className="text-[#333333] text-[14px] truncate" style={{ fontFamily: roboto }}>
        <span className="font-bold">Date of Experience:</span> {review.dateOfExperience}
      </p>

      <p className="mb-0 text-[13px] text-[#00000099] truncate">{review.reviewer}</p>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <header className="text-left mb-4 bg-[#393939] border-b border-gray-400">
        <h2 className="font-bold text-xl text-white p-3 flex-1">REVIEWS</h2>
      </header>

      <div className="flex items-center justify-between md:flex-col sm:flex-col lg:flex-row flex-col lg:py-10">
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
            width={200}fetchPriority="high"
            height={200}
            className="max-w-44"
          />
          <span className="flex items-center justify-center gap-1 text-center">
            Based on
            <Link
              href="https://www.trustpilot.com/review/serverblink.com"
              target="_blank"
              className="border-b-2 text-black border-black"
            >
              {stats?.count || "0"} reviews
            </Link>
          </span>
          <div className="flex items-center justify-center">
            <IoStarSharp size={20} color="#00b67a" />
            <h4 className="text-[#2A2A2A]">TrustPilot</h4>
          </div>
        </div>

        {/* Carousel */}
        <div className="w-full lg:flex-1 min-w-0 relative">
          {reviewsLoading ? (
            <div className="flex gap-4 py-4 overflow-hidden animate-pulse">
              {Array.from({ length: visibleItems }).map((_, index) => (
                <div
                  key={index}
                  className="w-[380px] max-w-[380px] shrink-0 rounded-md border bg-white p-6 space-y-4 h-[218px]"
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
              <p className="h5-regular text-red-600 break-words w-full">
                {reviewsError}
              </p>
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
              className="testimonials-carousel w-full cursor-grab touch-pan-y select-none active:cursor-grabbing [&_button.p-carousel-prev]:sr-only [&_button.p-carousel-next]:sr-only"
              onPointerDown={handleCarouselPointerDown}
              onPointerMove={handleCarouselPointerMove}
              onPointerUp={handleCarouselPointerUp}
              onPointerCancel={handleCarouselPointerUp}
            >
              <Carousel
                value={reviews}
                numVisible={visibleItems}
                numScroll={1}
                circular
                autoplayInterval={4000}
                itemTemplate={reviewTemplate}
                showIndicators={false}
                showNavigators={true}
                pt={{
                  root: { className: "w-full" },
                  content: { className: "overflow-hidden" },
                  item: { className: "box-border" },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;