"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import bannerImg1 from "@/assets/banner/banner-img1.jpg";
import bannerImg2 from "@/assets/banner/banner-img2.jpg";
import bannerImg3 from "@/assets/banner/banner-img3.jpg";
import bannerImg4 from "@/assets/banner/banner-img4.jpg";

const bannerSlides = [
  {
    id: 1,
    title: "Reliable and Efficient",
    subtitle: "Get reliable and efficient storage solutions for your server",
    buttonText: "SHOP NOW",
    image: bannerImg1,
    gradient: "from-slate-900/70 to-slate-800/50",
  },
  {
    id: 2,
    title: "YOUR SERVER PARTS PARTNER",
    subtitle: "Find the perfect server parts to fit your needs.",
    buttonText: "SHOP NOW",
    image: bannerImg2,
    gradient: "from-blue-900/70 to-blue-800/50",
  },
  {
    id: 3,
    title: "Server Upgrade",
    subtitle: "Upgrade your server with the latest parts.",
    buttonText: "SHOP NOW",
    image: bannerImg3,
    gradient: "from-slate-900/70 to-slate-700/50",
  },
  {
    id: 4,
    title: "Easy-to-install Parts",
    subtitle:
      "Shop with confidence, knowing our server parts are backed by our satisfaction guarantee",
    buttonText: "SHOP NOW",
    image: bannerImg4,
    gradient: "from-gray-900/70 to-gray-800/50",
  },
];

const Banner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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
          {bannerSlides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative flex w-full flex-col overflow-hidden rounded-xs sm:block md:h-[312px] md:w-[913px] sm:h-[320px]">
                {/* Image (mobile: top only; sm+: full slide background) */}
                <div className="relative h-[105px] w-full shrink-0 sm:absolute sm:inset-0 sm:h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={90}
                  />
                </div>

                {/* Mobile: copy below image on gray */}
                <div className="bg-[#393939] px-6 py-5 text-left sm:hidden">
                  <h1 className="mb-3 text-xl font-bold leading-tight text-white">
                    {slide.title}
                  </h1>
                  <p className="mb-5 max-w-xl text-base font-semibold text-white">
                    {slide.subtitle}
                  </p>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="rounded bg-[var(--primary-color)] px-5 py-2 text-base font-bold uppercase tracking-wide text-white shadow-md transition-colors duration-200"
                  >
                    {slide.buttonText}
                  </button>
                </div>

                {/* sm+: overlay on image (absolute so it stacks over full-bleed image) */}
                <div className="absolute inset-0 z-[1] hidden items-center px-6 sm:flex md:px-12 lg:px-16">
                  <div className="max-w-2xl text-left text-white">
                    <h1 className="h1-bold mb-3 drop-shadow-2xl md:mb-4 md:leading-tight">
                      {slide.title}
                    </h1>
                    <p className="mb-6 max-w-xl text-base font-bold text-gray-100 drop-shadow-lg md:mb-8 md:text-[18px]">
                      {slide.subtitle}
                    </p>
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className="rounded bg-[var(--primary-color)] px-5 py-2.5 text-base font-bold uppercase tracking-wide text-white shadow-xl transition-colors duration-200 md:py-2 md:text-[15px]"
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
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${current === index
                  ? "bg-red-600 w-3"
                  : "bg-white/60 hover:bg-white/90"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation — visible on all breakpoints; vertically center on mobile image */}
        <CarouselPrevious className="flex size-9 border-white/30 bg-white/10 text-white hover:bg-white/20 sm:size-8 sm:left-4 left-2 top-[110px] z-20 -translate-y-1/2 sm:top-1/2" />
        <CarouselNext className="flex size-9 border-white/30 bg-white/10 text-white hover:bg-white/20 sm:size-8 sm:right-4 right-2 top-[110px] z-20 -translate-y-1/2 sm:top-1/2" />
      </Carousel>

      {/* Promo Banner Below Carousel */}
      <div className="bg-white text-center py-3 mt-6 rounded-xs border-b-3 border-[#8b8b8b]">
        <p className="text-base md:text-[18px]  text-[#8b8b8b] font-medium">
          $10 off on First Order: Code:{" "}
          <span className="text-base md:text-[18px]  text-[#8b8b8b] font-medium">
            FIRSTORDER
          </span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
