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

  const rafId = React.useRef<number | null>(null);
  const latestX = React.useRef(0);

  const [isTransitioning, setIsTransitioning] = React.useState(false);

  if (!items.length) return null;

  // Duplicate items for seamless infinite loop
  const loopItems = [...items, ...items, ...items];

  const getItemWidth = () => {
    const el = carouselRef.current;
    if (!el) return 0;

    const firstItem = el.firstElementChild as HTMLElement;
    if (!firstItem) return 0;

    return firstItem.offsetWidth;
  };

  // Start position in the middle set
  React.useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const setInitialPosition = () => {
      const itemWidth = getItemWidth();

      if (itemWidth) {
        el.scrollLeft = itemWidth * items.length;
      }
    };

    setInitialPosition();

    const handleResize = () => {
      requestAnimationFrame(setInitialPosition);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [items.length]);

  const scrollRight = () => {
    const el = carouselRef.current;
    if (!el || isTransitioning) return;

    const itemWidth = getItemWidth();
    if (!itemWidth) return;

    setIsTransitioning(true);

    el.scrollBy({
      left: itemWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      const currentPosition = el.scrollLeft;
      const middleStart = itemWidth * items.length;
      const middleEnd = itemWidth * items.length * 2;

      // When moving into third copy,
      // silently move back to the same position in middle copy
      if (currentPosition >= middleEnd) {
        el.style.scrollBehavior = "auto";

        el.scrollLeft =
          currentPosition - itemWidth * items.length;

        el.style.scrollBehavior = "";
      }

      setIsTransitioning(false);
    }, 450);
  };

  const scrollLeft = () => {
    const el = carouselRef.current;
    if (!el || isTransitioning) return;

    const itemWidth = getItemWidth();
    if (!itemWidth) return;

    setIsTransitioning(true);

    el.scrollBy({
      left: -itemWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      const currentPosition = el.scrollLeft;

      // If we go before the middle copy,
      // silently move forward to the same position
      if (currentPosition <= 0) {
        el.style.scrollBehavior = "auto";

        el.scrollLeft =
          currentPosition + itemWidth * items.length;

        el.style.scrollBehavior = "";
      }

      setIsTransitioning(false);
    }, 450);
  };

  // ==================== DRAG HANDLERS ====================

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if ((e.target as HTMLElement).closest("a")) return;
    if (!carouselRef.current) return;

    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeftStart.current = carouselRef.current.scrollLeft;

    carouselRef.current.style.cursor = "grabbing";
    carouselRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isDragging.current || !carouselRef.current) return;

    latestX.current = e.clientX;

    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      if (carouselRef.current) {
        const walk =
          (startX.current - latestX.current) * 2;

        carouselRef.current.scrollLeft =
          scrollLeftStart.current + walk;
      }

      rafId.current = null;
    });
  };

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!carouselRef.current) return;

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }

    isDragging.current = false;

    carouselRef.current.style.cursor = "grab";

    if (carouselRef.current.hasPointerCapture(e.pointerId)) {
      carouselRef.current.releasePointerCapture(e.pointerId);
    }
  };

  // =======================================================

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
        style={{
          WebkitUserSelect: "none",
          userSelect: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {loopItems.map((item, index) => (
          <div
            key={`${item.slug}-${index}`}
            className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 flex justify-center"
          >
            <Card className="border-none shadow-none flex justify-center items-center bg-transparent">
              <CardContent className="flex items-center justify-center p-6 w-[100.2%] md:w-[139.2%] h-[13.34rem] bg-[#FFFFFF] rounded-2xl">
                <Link
                  href={`/brand/${item.slug}`}
                  aria-label={`View ${item.name} products`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-32 h-32">
                    <Image
                      src={
                        item.logo ??
                        "/default-product-image.svg"
                      }
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