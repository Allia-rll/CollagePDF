import { usePdfStore } from "@/store/pdfStore";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";

export function PDFViewer() {
  const { pdfUrl } = usePdfStore((state) => state);

  if (!pdfUrl) return null;

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
