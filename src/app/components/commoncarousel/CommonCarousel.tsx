import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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
  autoPlayInterval?: number; // in ms
}

const CommonCarousel: React.FC<CommonCarouselProps> = ({
  items = [],
  autoPlayInterval = 3000,
}) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);


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

  if (!items.length) return null;

  return (
   <div className="relative w-full">
  {/* Navigation Buttons */}
  <button
    onClick={scrollLeft}
    className="absolute top-1/2 -left-6 -translate-y-1/2 z-10 text-black p-2 rounded-full"
  >
    <ChevronLeft size={34} />
  </button>
  <button
    onClick={scrollRight}
    className="absolute top-1/2 -right-6 -translate-y-1/2 z-10 text-black p-2 rounded-full"
  >
    <ChevronRight size={34} />
  </button>

  {/* Carousel */}
 <div
  ref={carouselRef}
  className="flex overflow-hidden"
>
  {items.map((item, index) => (
    <div
      key={index}
      className="
        flex-shrink-0
        w-full        /* Mobile: 1 item */
        sm:w-1/3      /* Small screens: 2 items */
        md:w-1/4      /* Medium and above: 4 items */
        flex justify-center
      "
    >
      <Card className="border-none shadow-none flex justify-center items-center bg-transparent">
        <CardContent className="flex items-center justify-center p-6 w-[100.2%] md:w-[139.2%] h-[13.34rem] bg-[#FFFFFF] rounded-2xl">
          <Link href={`/brand/${item?.slug}`}>
            <div className="w-32 h-32">
              <Image
                src={item.logo ?? "/default-product-image.svg"}
                alt={item.name}
                width={250}
                height={250}
                className="object-contain transition-all duration-700 ease-in-out hover:scale-105 cursor-pointer w-full h-full"
                loading="lazy"
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
