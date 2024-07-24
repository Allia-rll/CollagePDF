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
    console.log("Image formated");
    console.log(imageFormated);
    console.log(`Width: ${width}, Height: ${height}`);
    const oWidth = imageFormated.dimensions.width;
    const oHeight = imageFormated.dimensions.height;

    const aspectRatio = width / height;
    const newWidth =
      oWidth < oHeight * aspectRatio ? oWidth : oHeight * aspectRatio;
    const newHeight =
      oHeight < oWidth * (1 / aspectRatio)
        ? oHeight
        : oWidth * (1 / aspectRatio);

    const left = Math.round((oWidth - newWidth) / 2);
    const top = Math.round((oHeight - newHeight) / 2);
    console.log(`Left: ${left}, Top: ${top}`);

    const buffer = await sharp(imageFormated.buffer)
      .extract({
        left,
        top,
        width: Math.round(newWidth),
        height: Math.round(newHeight),
      })
      .toBuffer();

    return { buffer, dimensions: { width: newWidth, height: newHeight } };
  } catch (err) {
    console.log(err);
    return new Error("Error cropping images");
  }
}
