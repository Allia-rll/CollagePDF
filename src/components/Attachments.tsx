import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAttchStore } from "@/store/AttchStore";
import { type CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { XCircleIcon } from "@heroicons/react/24/solid";

export function Attachments() {
  const { imgs, err } = useAttchStore((state) => state);
  const [api, setApi] = useState<CarouselApi>();

  const handleDelete = useAttchStore((state) => state.deleteImg);
  const handleClean = useAttchStore((state) => state.clean);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("slidesChanged", () => {
      if (api.canScrollNext()) api.scrollNext();
    });
  }, [api]);
  return (
    <>
      <Carousel
        opts={{
          align: "start",
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {imgs && imgs.length >= 1 ? (
            imgs.map((image, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 lg:basis-1/3 mx-auto"
              >
                <div className="p-1">
                  <Card className="max-h-[282px] relative">
                    <XCircleIcon
                      className="cursor-pointer w-8 h-8 text-red-800 hover:text-red-900 absolute top-[-8px] right-[-8px] z-100"
                      onClick={() => handleDelete(index)}
                    />
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                      <img
                        src={image.src}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem
              key="null-images"
              className="sm:basis-1/2 lg:basis-1/3 mx-auto"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span
                      className={`text-2xl sm:text-xl font-semibold text-center ${
                        err && "text-red-800"
                      }`}
                    >
                      No hay imagenes seleccionadas
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Button
        className="w-1/2 sm:w-1/5 mt-2"
        variant={"destructive"}
        onClick={handleClean}
        disabled={imgs?.length === undefined}
      >
        Limpiar
      </Button>
    </>
  );
}
