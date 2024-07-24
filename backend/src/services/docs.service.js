import PDFDocument from "pdfkit";
import { formatImages, cropImage } from "./images.service.js";

const pagesSize = {
  A4: "A4",
};

const A4measures = {
  portrait: {
    width: 595.28,
    height: 841.89,
  },
  landscape: {
    width: 841.89,
    height: 595.28,
  },
};

//page = { dimension: { name: "", measures: { width: 0, height: 0} }, columns: 0, rows: 0 }
//const pages = [];

const padding = 5;

const types = {
  perPage: (quantity) => {
    const q = Number(quantity);
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
  },
};

const modes = {
  fit: (width, height) => {
    return { fit: [width, height], align: "center", valign: "center" };
  },
  fill: (width, height) => {
    return { cover: [width, height], align: "center", valign: "center" };
  },
  stretch: (width, height) => {
    return { width, height };
  },
};

async function generatePDF(images, template, mode, res) {
  let { rows, columns } = types[`${template.type}`](template.value);

  if (rows === undefined || columns === undefined) {
    return new Error("Error formating images");
  }
  const formatedImgs = await formatImages(images);
  //console.log(formatedImgs);
  const pages = definePages(formatedImgs, template.value, rows, columns);
  console.log(pages);

  console.log(`Rows: ${rows}, Columns: ${columns}`);
  const doc = new PDFDocument({ autoFirstPage: false });
  //const writeStream = fs.createWriteStream("output.pdf");
  doc.pipe(res);

  const perPage = template.value;
  let fileIndex = 0;
  for (const page of pages) {
    let imgIndex = 0;
    doc.addPage({ size: pagesSize.A4, layout: page.dimension.name });
    const height =
      (page.dimension.measures.height - padding * (page.rows - 1)) / page.rows;
    const width =
      (page.dimension.measures.width - padding * (page.columns - 1)) /
      page.columns;
    //console.log(`Width: ${width}, Height: ${height}`);
    while (fileIndex < formatedImgs.length && imgIndex < template.value) {
      const image =
        mode === "fill"
          ? await cropImage(formatedImgs[fileIndex], width, height)
          : formatedImgs[fileIndex];
      //console.log(`Image ${fileIndex}`);
      //console.log(image);
      const posx = (imgIndex % page.columns) * (width + padding);
      const posy = Math.floor(imgIndex / page.columns) * (height + padding);
      //console.log(`Posx: ${posx}, Posy: ${posy}`);
      doc.image(image.buffer, posx, posy, modes[`${mode}`](width, height));
      /* .rect(posx, posy, width, height)
        .stroke(); */
      imgIndex++;
      fileIndex = page.number * perPage + imgIndex;
    }
  }
  doc.end();

  /* writeStream.on("finish", () => {
    console.log("PDF created successfully");
  }); */
}

function definePages(files, perPage, rows, columns) {
  const pages = [];
  try {
    let landsCounter = 0;
    let counter = 0;
    files.forEach((file, index) => {
      if (file.dimensions.width > file.dimensions.height) {
        landsCounter++;
      }

      if ((index + 1) % perPage === 0 || index === files.length - 1) {
        const dimension = evaluateSize(landsCounter, perPage);
        pages.push({
          number: counter++,
          dimension,
          rows: dimension.name === "landscape" ? rows : columns,
          columns: dimension.name === "landscape" ? columns : rows,
        });

        landsCounter = 0;
      }
    });
  } catch (error) {
    console.log(error);
    return new Error("Error defining pages");
  }

  return pages;
}

function evaluateSize(landsCounter, perPage) {
  console.log(`Lands: ${landsCounter} PerPage: ${perPage}`);
  if (landsCounter > perPage / 2) {
    return { name: "landscape", measures: A4measures.landscape };
  }
  return { name: "portrait", measures: A4measures.portrait };
}

export default generatePDF;
