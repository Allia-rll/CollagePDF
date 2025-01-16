import { Img } from "@/types/ImgType";
import { Page } from "@/types/PageType";

export const formatImages = async (images: Img[]) => {
  const imagePromises = images.map(async (img) => {
    const dimensions = await getImageDimensions(img.file);
    const base64 = await getImageBase64(img.file);
    return { ...img, dimensions, base64 } as Img;
  });

  return Promise.all(imagePromises);
};

// Función para obtener las dimensiones de la imagen
const getImageDimensions = (
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

export const getImageBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result.toString()); // Retorna el resultado como Base64
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file); // Convierte el archivo en Base64
  });
};

export function getColumsAndRows(q: number) {
  if (q <= 0) {
    return { rows: 0, columns: 0 };
  }

  let columns = Math.ceil(Math.sqrt(q));
  let rows = Math.ceil(q / columns);

  while (rows * columns < q) {
    columns++;
    rows = Math.ceil(q / columns);
  }

  return { rows, columns };
}

export function definePages(
  imgs: Img[],
  perPage: number,
  rows: number,
  columns: number,
) {
  const pages: Page[] = [];
  try {
    let landsCounter = 0;
    let counter = 0;
    imgs.forEach((img, index) => {
      if (img.dimensions!.width > img.dimensions!.height) {
        landsCounter++;
      }

      if ((index + 1) % perPage === 0 || index === imgs.length - 1) {
        const orientation = evaluateSize(landsCounter, perPage);
        pages.push({
          quantity: counter++,
          type: "A4",
          orientation,
          rows: orientation === "landscape" ? rows : columns,
          columns: orientation === "landscape" ? columns : rows,
        });

        landsCounter = 0;
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error defining pages");
  }

  return pages;
}

function evaluateSize(
  landsCounter: number,
  perPage: number,
): "landscape" | "portrait" {
  console.log(`Lands: ${landsCounter} PerPage: ${perPage}`);
  if (landsCounter > perPage / 2) {
    return "portrait";
  }
  return "landscape";
}
