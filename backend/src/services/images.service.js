import sharp from "sharp";

export async function formatImages(images) {
  const files = [];

  try {
    for (const image of images) {
      const dimensions = await getDimensions(image.buffer);
      files.push({
        buffer: image.buffer,
        dimensions,
      });
    }
  } catch (err) {
    console.log(err);
    return new Error("Error formating images");
  }

  return files;
}

async function getDimensions(imageBuffer) {
  try {
    const metadata = await sharp(imageBuffer).metadata();
    return { width: metadata.width, height: metadata.height };
  } catch (err) {
    console.log(err);
    return new Error("Error getting images dimensions");
  }
}

export async function cropImage(imageFormated, width, height) {
  try {
    //console.log(`Width: ${width}, Height: ${height}`);
    const { data, info } = await sharp(imageFormated.buffer)
      .resize({
        width: Math.floor(width),
        height: Math.floor(height),
        fit: "cover",
      })
      .toBuffer({ resolveWithObject: true });
    //console.log(info);
    return {
      buffer: data,
      dimensions: { width: info.width, height: info.height },
    };
  } catch (err) {
    console.log(err);
    return new Error("Error cropping images");
  }
}

export async function rotateImage(imageFormated, angle) {
  try {
    //console.log(`Angle: ${angle}`);
    const buffer = await sharp(imageFormated.buffer).rotate(angle).toBuffer();

    return buffer;
  } catch (err) {
    console.log(err);
    return new Error("Error rotating images");
  }
}

export function isRotable(image, width, height) {
  return (
    (image.dimensions.width > image.dimensions.height && width < height) ||
    (image.dimensions.width < image.dimensions.height && width > height)
  );
}
