import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { RoadmapCard } from "./RoadmapCard";
import { roadmapConstants } from "./roadmap";

export const Roadmap = () => {
    return (
        <div className="w-full">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {roadmapConstants.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <RoadmapCard item={item} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-8">
                    <CarouselPrevious
                        color="secondary"
                        className="static translate-y-0"
                    />
                    <CarouselNext color="secondary" className="static translate-y-0" />
                </div>
            </Carousel>
        </div>
    );
};
