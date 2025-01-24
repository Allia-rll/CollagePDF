import { useEffect, useState } from "react";
import { usePdfStore } from "@/store/pdfStore";
import { useAttchStore } from "@/store/AttchStore";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import { Document, Page, View, Image, pdf } from "@react-pdf/renderer";
import { Img } from "@/types/ImgType";
import { Page as PageType } from "@/types/PageType";
import { getStyleImg } from "@/lib/utils";

export function PDFCollage({
  onReady,
  ready,
}: {
  onReady: (ready: boolean) => void;
  ready: boolean | null;
}) {
  const { pages, perPage, imageMode } = usePdfStore((state) => state);
  const { imgs } = useAttchStore((state) => state);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const generatePages = async () => {
      if (pages && imgs && imageMode && ready === false) {
        const pdfDoc = (
          <PDF
            pages={pages}
            images={imgs}
            perPage={perPage}
            imageMode={imageMode}
          />
        );
        const pdfBlob = await pdf(pdfDoc).toBlob();

        const pdfUrl = URL.createObjectURL(pdfBlob);

        setPdfUrl(pdfUrl);

        onReady(true);
      }
    };

    generatePages();
  }, [ready]);

  if (!pages || !imgs || !pdfUrl) return null;

  return (
    <section id="pdfview" className="h-screen p-4 grid grid-rows-[auto_1fr]">
      <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white">
        Su{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          PDF
        </span>
      </h1>
      <div className="grid grid-rows-[1fr_auto] gap-2 sm:gap-0 sm:grid-cols-[1fr_auto]">
        <iframe src={pdfUrl} className="w-full h-full px-2"></iframe>
        <a
          href={pdfUrl}
          download="collage.pdf"
          className="text-center text-white bg-gradient-to-r to-emerald-600 from-sky-400 rounded-md p-2 sm:my-auto"
        >
          <div className="flex flex-col">
            <DocumentArrowDownIcon className="h-4 w-4 mx-auto" />
            <h1 className="font-bold">Descargar PDF</h1>
          </div>
        </a>
      </div>
    </section>
  );
}

const PDF = ({
  pages,
  images,
  perPage,
  imageMode,
}: {
  pages: PageType[];
  images: Img[];
  perPage: number;
  imageMode: "contain" | "cover" | "fill";
}) => {
  console.log(pages, images, perPage);
  return (
    <Document>
      {pages.map((page, i) => {
        const inPage = images.slice(i * perPage, (i + 1) * perPage);
        return (
          <Page key={i} size={page.type} orientation={page.orientation}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                height: "100%",
              }}
            >
              {inPage.map((img, j) => (
                <View
                  key={j}
                  style={{
                    width: `${100 / page.columns}%`, // Tamaño dinámico basado en columnas
                    height: `${100 / page.rows}%`, // Altura dinámica basada en filas
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    key={j}
                    src={img.base64}
                    style={{ ...getStyleImg(page, img, imageMode) }}
                  />
                </View>
              ))}
            </View>
          </Page>
        );
      })}
    </Document>
  );
};
