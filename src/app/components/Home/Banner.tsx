"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";

const robotoCondensedStyle = { fontFamily: "var(--font-roboto-condensed)" };
const roboto = "var(--font-roboto-condensed), Arial, Helvetica, sans-serif";

const Banner = ({ carousels, settings }: any) => {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);


  if (!carousels?.length) return null

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {carousels?.map((slide: any, index: number) => (
            <CarouselItem key={slide.id}>
              <div className="relative flex w-full flex-col overflow-hidden rounded-xs sm:block md:h-[312px] md:w-[913px] sm:h-[320px]">
                {/* Image (mobile: top only; sm+: full slide background) */}
                <div className="relative h-[105px] w-full shrink-0 sm:absolute sm:inset-0 sm:h-full">
                  <Image
                    src={slide.image}
                    alt={slide.altText}
                    fill
                    priority={index === 0}           // ← sirf pehli slide
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority="high"
                    sizes="(max-width: 640px) 100vw, 913px"
                    className="object-cover"
                    quality={75}
                  />
                </div>

                {/* Mobile: copy below image on gray */}
                <div className="bg-[#393939] px-6 py-5 text-left sm:hidden">
                  <h1
                    className="mb-3 text-xl font-bold leading-tight text-white"
                    style={robotoCondensedStyle}
                  >
                    {slide.heading}
                  </h1>
                  <p
                    className="mb-5 max-w-xl text-base font-semibold text-white"
                    style={robotoCondensedStyle}
                  >
                    {slide.text}
                  </p>
                  <button
                    type="button"
                    onClick={() => router.push(slide?.link)}
                    className="inline-flex items-center justify-center rounded bg-[var(--primary-color)] border-0 border-b-[3px] border-b-[#860109] box-border h-[30px] px-5 text-[18px] font-bold uppercase tracking-wide text-white shadow-md transition-colors duration-200"
                    style={robotoCondensedStyle}
                  >
                    {slide.buttonText}
                  </button>
                </div>

                {/* sm+: overlay on image (absolute so it stacks over full-bleed image) */}
                <div className="absolute inset-0 z-[1] hidden items-center px-6 sm:flex md:px-12 lg:px-16">
                  <div className="max-w-2xl text-left text-white">
                    <h1
                      className="h1-bold mb-3 drop-shadow-2xl md:mb-4 md:leading-tight"
                      style={robotoCondensedStyle}
                    >
                      {slide.heading}
                    </h1>
                    <p
                      className="mb-6 max-w-xl text-base font-bold text-gray-100 drop-shadow-lg md:mb-8 md:text-[18px]"
                      style={robotoCondensedStyle}
                    >
                      {slide.text}
                    </p>
                    <button
                      type="button"
                      onClick={() => router.push(slide?.link)}
                      className="inline-flex items-center justify-center rounded bg-[var(--primary-color)] border-0 border-b-[3px] border-b-[#860109] box-border h-[30px] px-5 text-[18px] font-bold uppercase tracking-wide text-white shadow-xl transition-colors duration-200"
                      style={robotoCondensedStyle}
                    >
                      {slide.buttonText}
                    </button>
                  </div>
                </div>

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden h-20 bg-gradient-to-t from-black/40 to-transparent sm:block" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Dots - Bottom Right (sits on gray strip on mobile) */}
        <div className="absolute bottom-0.5 right-0 z-10 flex gap-2 bg-[#CAC9C9] p-2 px-3 sm:bottom-0.5">
          {carousels?.map((_: any, index: number) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${current === index
                ? "bg-[#d42020] w-3"
                : "bg-white/60 hover:bg-white/90"
                }`}
            />
          ))}
        </div>

        {/* Arrow Navigation — visible on all breakpoints; vertically center on mobile image */}
        <CarouselPrevious className="flex size-9 border-white/30 bg-white/10 text-white hover:bg-white/20 sm:size-8 sm:left-4 left-2 top-[110px] z-20 -translate-y-1/2 sm:top-1/2" />
        <CarouselNext className="flex size-9 border-white/30 bg-white/10 text-white hover:bg-white/20 sm:size-8 sm:right-4 right-2 top-[110px] z-20 -translate-y-1/2 sm:top-1/2" />
      </Carousel>

      {/* Promo Banner Below Carousel */}
      <div className="bg-white text-center py-3 mt-6 rounded-xs border-b-3 border-[#8b8b8b]">
        <p
          className="text-base md:text-[18px] text-[#545454] font-medium"
          style={{ fontFamily: roboto }}
        >
          $10 off on First Order: Code:{" "}
          <span
            className="text-base md:text-[18px] text-[#545454] font-medium"
            style={{ fontFamily: roboto }}
          >
            FIRSTORDER
          </span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
