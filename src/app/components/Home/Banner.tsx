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
              <div className="relative h-[320px] md:h-[312px] md:w-[913px] w-full rounded-xs overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={90}
                  />
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 `} />

                {/* Content - Left aligned */}
                <div className="relative h-full flex items-center px-6 md:px-12 lg:px-16">
                  <div className="text-left text-white max-w-2xl">
                    <h1 className="h1-bold mb-3 md:mb-4 drop-shadow-2xl leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-base md:text-[18px] font-bold mb-6 md:mb-8 text-gray-100 drop-shadow-lg max-w-xl">
                      {slide.subtitle}
                    </p>
                    <button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-white font-bold py-2.5 md:py-2 px-5 md:px-5 rounded text-base md:text-[15px] transition-colors duration-200 shadow-xl uppercase tracking-wide">
                      {slide.buttonText}
                    </button>
                  </div>
                </div>

                {/* Bottom gradient for better dot visibility */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Dots - Bottom Right */}
        <div className="absolute bottom-4 right-4 md:right-6 flex gap-2 z-10">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-red-600 w-3"
                  : "bg-white/60 hover:bg-white/90"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <CarouselPrevious className="hidden md:flex left-4 bg-white/10 hover:bg-white/20 border-white/30 text-white" />
        <CarouselNext className="hidden md:flex right-4 bg-white/10 hover:bg-white/20 border-white/30 text-white" />
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
