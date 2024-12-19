import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageDimensions = (
  file: File,
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
