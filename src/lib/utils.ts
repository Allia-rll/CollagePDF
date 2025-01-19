import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Style } from "@react-pdf/types";
import { Page as PageType, PAGE_SIZES } from "@/types/PageType";
import { Img } from "@/types/ImgType";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new Image();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        img.src = reader.result;
      }
    };

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = reject;

    reader.readAsDataURL(file);
  });
};

export const getStyleImg = (
  page: PageType,
  img: Img,
  imageMode: "contain" | "cover" | "fill"
): Style => {
  const imgStyle: Style = {
    objectFit: imageMode,
    width: "100%",
    height: "100%",
    margin: "5px",
  };

  if (page.orientation === "portrait") {
    if (img.dimensions!.height > img.dimensions!.width) {
      imgStyle.transform = "rotate(90deg)";
      imgStyle.width = `${
        PAGE_SIZES["A4"][1] / page.rows - (10 / 72) * 25.4
      }mm`;
      imgStyle.height = `${
        PAGE_SIZES["A4"][0] / page.columns - (10 / 72) * 25.4
      }mm`;
    }
  } else {
    if (img.dimensions!.width > img.dimensions!.height) {
      imgStyle.transform = "rotate(90deg)";
      imgStyle.width = `${
        PAGE_SIZES["A4"][0] / page.rows - (10 / 72) * 25.4
      }mm`;
      imgStyle.height = `${
        PAGE_SIZES["A4"][1] / page.columns - (10 / 72) * 25.4
      }mm`;
    }
  }

  return imgStyle;
};
