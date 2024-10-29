import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface MainCarouselProps {
  images: string[];
}

export function MainCarousel({ images }: MainCarouselProps) {
  return (
    <Carousel className="w-full shadow-2xl">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="w-full flex gap-5">
              <Card className="p-0 relative bg-transparent w-full aspect-video rounded-2xl border-0">
                <Image
                  src={image}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hover:bg-transparent hover:text-neutral-400 hover:border-neutral-400" />
      <CarouselNext className="hover:bg-transparent hover:text-neutral-400 hover:border-neutral-400" />
    </Carousel>
  );
}
