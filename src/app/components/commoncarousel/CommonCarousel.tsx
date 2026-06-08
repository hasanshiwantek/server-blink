import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItemType {
  name: string;
  logo: string;
  slug: string;
}

interface CommonCarouselProps {
  items?: CarouselItemType[];
  autoPlayInterval?: number;
}

const CommonCarousel: React.FC<CommonCarouselProps> = ({
  items = [],
  autoPlayInterval = 3000,
}) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeftStart = React.useRef(0);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({ left: -containerWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({ left: containerWidth, behavior: "smooth" });
    }
  };

  // ==================== DRAG HANDLERS ====================
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;

    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeftStart.current = carouselRef.current.scrollLeft;

    carouselRef.current.style.cursor = "grabbing";
    carouselRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !carouselRef.current) return;

    const x = e.clientX;
    const walk = (startX.current - x) * 2; // Drag sensitivity
    carouselRef.current.scrollLeft = scrollLeftStart.current + walk;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;

    isDragging.current = false;
    carouselRef.current.style.cursor = "grab";
    carouselRef.current.releasePointerCapture(e.pointerId);
  };
  // =======================================================

  if (!items.length) return null;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Navigation Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 -left-6 -translate-y-1/2 z-10 text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft size={34} />
      </button>
      <button
        onClick={scrollRight}
        className="absolute top-1/2 -right-6 -translate-y-1/2 z-10 text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <ChevronRight size={34} />
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing"
        style={{ WebkitUserSelect: "none", userSelect: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="
              flex-shrink-0
              w-1/2     
              sm:w-1/3     
              md:w-1/4     
              flex justify-center
            "
          >
            <Card className="border-none shadow-none flex justify-center items-center bg-transparent">
              <CardContent className="flex items-center justify-center p-6 w-[100.2%] md:w-[139.2%] h-[13.34rem] bg-[#FFFFFF] rounded-2xl">
                <Link href={`/brand/${item?.slug}`} title="">
                  <div className="w-32 h-32">
                    <Image
                      src={item.logo ?? "/default-product-image.svg"}
                      alt={item.name}
                      width={250}
                      height={250}
                      className="object-contain transition-all duration-700 ease-in-out hover:scale-105 cursor-pointer w-full h-full select-none"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonCarousel;