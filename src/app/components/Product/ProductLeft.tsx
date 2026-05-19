"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import img1 from "@/assets/slug/trustpilot-img.webp";
import img2 from "@/assets/slug/easyReturn-image.webp";
import img3 from "@/assets/slug/fastShipping-img.webp";
import img4 from "@/assets/slug/securePayment-img.webp";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ProductLeftProps = {
  images: string[];
  selectedImage: string;
  setSelectedImage: (url: string) => void;
};

const ProductLeft = ({
  images,
  selectedImage,
  setSelectedImage,
}: ProductLeftProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [expanded, setExpanded] = useState(false); // NEW: fullscreen toggle

  const imageList = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) {
      return images.filter(Boolean);
    }
    return ["/default-product-image.svg"];
  }, [images]);

  const openLightbox = useCallback(() => {
    const idx = imageList.findIndex((u) => u === selectedImage);
    setModalIndex(idx >= 0 ? idx : 0);
    setZoomed(false);
    setExpanded(false); // reset on open
    setLightboxOpen(true);
  }, [imageList, selectedImage]);

  const goPrev = useCallback(() => {
    setModalIndex((i) =>
      imageList.length <= 1 ? i : (i - 1 + imageList.length) % imageList.length
    );
    setZoomed(false);
  }, [imageList.length]);

  const goNext = useCallback(() => {
    setModalIndex((i) =>
      imageList.length <= 1 ? i : (i + 1) % imageList.length
    );
    setZoomed(false);
  }, [imageList.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, goPrev, goNext]);

  const modalSrc = imageList[modalIndex] ?? "/default-product-image.svg";

  useEffect(() => {
    if (!lightboxOpen) return;
    const src = imageList[modalIndex];
    if (src) setSelectedImage(src);
  }, [lightboxOpen, modalIndex, imageList, setSelectedImage]);

  const handleOpenChange = (open: boolean) => {
    setLightboxOpen(open);
    if (!open) {
      setZoomed(false);
      setExpanded(false);
    }
  };

  return (
    <div className="product-left flex w-full md:w-[70%] flex-col px-10 md:px-0  lg:w-[50%]">
      <div className="flex flex-col items-center gap-8">
        {/* Main Image — opens lightbox on click */}
        <div className="flex h-auto w-full items-center justify-center rounded-2xl border-1 border-[#8b8b8b] bg-white p-4 aspect-square lg:h-[455px] lg:w-[76.7%]">
          <button
            type="button"
            onClick={() => {
              if (selectedImage) {
                openLightbox()
              }
            }}
            className="flex h-full w-full cursor-zoom-in items-center justify-center rounded-xl bg-transparent p-0 text-left outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#D42020]"
            aria-label="View product image larger"
          >
            <Image
              src={selectedImage || "/default-product-image.svg"}
              alt="Main product image"
              className="h-full w-full object-contain"
              width={500}
              height={500}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 35vw"
              quality={90}
            />
          </button>
        </div>

        <Dialog open={lightboxOpen} onOpenChange={handleOpenChange}>
          <DialogPortal>
            <DialogOverlay className="z-[100] bg-black/75" />
            <DialogPrimitive.Content
              aria-describedby={undefined}
              className={cn(
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[101] flex flex-col border-0 bg-transparent p-0 shadow-none outline-none"
              )}
            >
              <DialogPrimitive.Title className="sr-only">
                Product image gallery
              </DialogPrimitive.Title>

              {/* Top-right: zoom + close */}
              <div className="pointer-events-auto absolute right-4 top-4 z-[110] flex gap-2 sm:right-6 sm:top-6">
                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  className="flex h-11 w-11 items-center justify-center bg-neutral-800 text-white transition hover:bg-neutral-700"
                  aria-label={zoomed ? "Zoom out" : "Zoom in"}
                >
                  <Search className="h-5 w-5" strokeWidth={2} />
                </button>
                <DialogPrimitive.Close asChild>
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center bg-neutral-800 text-white transition hover:bg-neutral-700"
                    aria-label="Close gallery"
                  >
                    <X className="h-5 w-5" strokeWidth={2} />
                  </button>
                </DialogPrimitive.Close>
              </div>

              {/* Side arrows */}
              {imageList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="pointer-events-auto absolute left-2 top-1/2 z-[110] -translate-y-1/2 rounded-sm p-2 text-neutral-400 transition hover:text-white sm:left-4 md:left-8"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-14 w-14 md:h-16 md:w-16" strokeWidth={1.25} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className="pointer-events-auto absolute right-2 top-1/2 z-[110] -translate-y-1/2 rounded-sm p-2 text-neutral-400 transition hover:text-white sm:right-4 md:right-8"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-14 w-14 md:h-16 md:w-16" strokeWidth={1.25} />
                  </button>
                </>
              )}

              {/* Center image panel */}
              <div className="flex flex-1 items-center justify-center px-4 pb-8 pt-16 sm:px-8 sm:pt-20">
                {/* 
                  CHANGED: 
                  - When expanded=false → normal constrained size (original behavior)
                  - When expanded=true  → nearly fullscreen (like BigCommerce)
                  - Click on image toggles expanded state
                  - cursor changes to zoom-in/zoom-out to hint the behavior
                */}
                <div
                  className={cn(
                    "flex items-center justify-center bg-white p-4 shadow-lg sm:p-5 transition-all duration-300",
                    expanded
                      ? "max-h-[90vh] max-w-[90vw] w-[90vw] h-[90vh]"
                      : "max-h-[min(72vh,640px)] max-w-[min(82vw,640px)]",
                    zoomed && !expanded && "max-h-[85vh] max-w-[92vw] overflow-auto"
                  )}
                >
                  <div
                    className={cn(
                      "relative flex min-h-[160px] min-w-[160px] max-w-full items-center justify-center",
                      zoomed && !expanded && "min-h-[45vh]",
                      expanded && "w-full h-full"
                    )}
                  >
                    <Image
                      src={modalSrc}
                      alt=""
                      width={1200}
                      height={1200}
                      onClick={() => setExpanded((e) => !e)}
                      className={cn(
                        "object-contain transition-all duration-300",
                        expanded
                          ? "h-full w-full max-h-[calc(90vh-2.5rem)] max-w-full cursor-zoom-out"
                          : cn(
                            "h-auto max-h-[56vh] w-auto max-w-[min(78vw,560px)] cursor-zoom-in",
                            zoomed && "max-h-none max-w-none scale-[1.45] sm:scale-[1.6]"
                          )
                      )}
                      sizes="90vw"
                      quality={95}
                    />
                  </div>
                </div>
              </div>
            </DialogPrimitive.Content>
          </DialogPortal>
        </Dialog>

        <TooltipProvider>
          {/* Trust Badges */}
          <div className="mx-auto mt-2 flex w-fit items-center gap-0 overflow-x-auto border-2 border-[#545454] hidden sm:flex">
            {/* Trustpilot Badge */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center border-r-2 border-[#545454]">
                  <div className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center sm:h-[75px] sm:w-[75px] md:h-[90px] md:w-[90px]">
                    <Image
                      src={img1}
                      alt="Trustpilot"
                      width={90}
                      height={90}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-[280px] rounded-md bg-[#3d3d3d] px-4 py-2 text-base text-white"
              >
                <p>
                  A well-known review website is Trustpilot. It is used by
                  companies of all sizes, from small local businesses to large
                  international corporations.
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Fast Shipping Badge */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center border-r-2 border-[#545454]">
                  <div className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center sm:h-[75px] sm:w-[75px] md:h-[90px] md:w-[90px]">
                    <Image
                      src={img2}
                      alt="Fast Shipping"
                      width={90}
                      height={90}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-[280px] rounded-md bg-[#3d3d3d] px-4 py-2 text-base text-white"
              >
                <p>
                  Express shipping is available. Get your product delivered in
                  as fast as one day
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Easy Return Badge */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center border-r-2 border-[#545454]">
                  <div className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center sm:h-[75px] sm:w-[75px] md:h-[90px] md:w-[90px]">
                    <Image
                      src={img3}
                      alt="Easy Return"
                      width={90}
                      height={90}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-[280px] rounded-md bg-[#3d3d3d] px-4 py-2 text-base text-white"
              >
                <p>
                  Have peace of mind knowing that *replacements/refunds are done
                  promptly
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Secure Payment Badge */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center">
                  <div className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center sm:h-[75px] sm:w-[75px] md:h-[90px] md:w-[90px]">
                    <Image
                      src={img4}
                      alt="Secure Payment"
                      width={90}
                      height={90}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-[280px] rounded-md bg-[#3d3d3d] px-4 py-2 text-base text-white"
              >
                <p className="mb-2">
                  Protects both users and merchants from the threats posed by
                  fraudulent payments. Accepted Payment Cards:
                </p>
                <ul className="list-none space-y-1">
                  <li>Visa</li>
                  <li>Mastercard</li>
                  <li>American Express</li>
                  <li>Discover</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProductLeft;