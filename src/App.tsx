import { Attachments } from "./components/Attachments";
import { CollageForm } from "./components/CollageForm";
import { PDFCollage } from "./components/PDFCollage";
import { UploadZone } from "./components/UploadZone";
import { useState, useEffect } from "react";
import { useNoiceStore } from "@/store/NoiceStore";
import Layout from "@/layouts/Layout";

function App() {
  const [pdfReady, setPdfready] = useState<boolean | null>(null);
  const { setNoice, cleanNoice } = useNoiceStore((state) => state);
  useEffect(() => {
    if (pdfReady === true) {
      setNoice({
        message: "Collage generado",
        type: "success",
        styleType: "modal",
        children: (
          <div className="bg-gradient-to-r to-emerald-600 from-sky-400 py-2 px-4 rounded-lg">
            <a
              className="font-bold text-white"
              href="#pdfview"
              onClick={() => {
                cleanNoice();
              }}
            >
              Ver PDF
            </a>
          </div>
        ),
      });
    } else if (pdfReady === false) {
      setNoice({
        message: "Generando collage",
        type: "loading",
        styleType: "modal",
      });
    }
  }, [pdfReady]);
  return (
    <Layout>
      <main className="mx-auto max-w-7xl py-5 lg:py-10 flex flex-col items-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Collage{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            PDF
          </span>
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 px-4 text-center lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Arrastra los archivos al área de carga y genera un PDF con todas las
          imágenes.
        </p>
      </main>
      <UploadZone />
      <div className="mx-auto my-4 min-w-72 w-[250px] sm:w-[500px] md:w-[600px] lg:w-[900px]">
        <Attachments />
      </div>
      <CollageForm
        onLoading={() => {
          setPdfready(false);
        }}
      />
      <PDFCollage onReady={setPdfready} ready={pdfReady} />
    </Layout>
  );
}

export default App;
