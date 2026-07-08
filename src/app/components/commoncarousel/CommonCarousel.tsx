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

  // width cache — avoids reading offsetWidth on every click (no forced reflow)
  const widthRef = React.useRef(0);
  // rAF throttle for drag writes
  const rafId = React.useRef<number | null>(null);
  const latestX = React.useRef(0);

  React.useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const update = () => { widthRef.current = el.offsetWidth; };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -widthRef.current, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: widthRef.current, behavior: "smooth" });
  };

  // ==================== DRAG HANDLERS ====================
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) return;
    if (!carouselRef.current) return;

    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeftStart.current = carouselRef.current.scrollLeft;

    carouselRef.current.style.cursor = "grabbing";
    carouselRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !carouselRef.current) return;
    latestX.current = e.clientX;

    // per-frame ek hi write — layout thrash avoid
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      if (carouselRef.current) {
        const walk = (startX.current - latestX.current) * 2;
        carouselRef.current.scrollLeft = scrollLeftStart.current + walk;
      }
      rafId.current = null;
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    isDragging.current = false;
    carouselRef.current.style.cursor = "grab";
    carouselRef.current.releasePointerCapture(e.pointerId);
  };
  // =======================================================

  if (!items.length) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <button
        type="button"
        aria-label="Previous slide"
        onClick={scrollLeft}
        className="absolute top-1/2 -left-6 -translate-y-1/2 z-10 text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft size={34} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={scrollRight}
        className="absolute top-1/2 -right-6 -translate-y-1/2 z-10 text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <ChevronRight size={34} aria-hidden="true" />
      </button>

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
            className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 flex justify-center"
          >
            <Card className="border-none shadow-none flex justify-center items-center bg-transparent">
              <CardContent className="flex items-center justify-center p-6 w-[100.2%] md:w-[139.2%] h-[13.34rem] bg-[#FFFFFF] rounded-2xl">
                <Link href={`/brand/${item?.slug}`} aria-label={`View ${item.name} products`} onClick={(e) => e.stopPropagation()}>
                  <div className="w-32 h-32">
                    <Image
                      src={item.logo ?? "/default-product-image.svg"}
                      alt={item.name}
                      width={250}
                      height={250}
                      className="object-contain transition-all duration-700 ease-in-out hover:scale-105 cursor-pointer w-full h-full select-none"
                      loading="lazy"
                      quality={75}
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