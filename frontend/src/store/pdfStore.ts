import { create } from "zustand";

type Pdf = {
  pdfUrl: string | null;
};

type PdfActions = {
  setPdfUrl: (pdf: Blob | MediaSource) => void;
  cleanPdfUrl: () => void;
};

export const usePdfStore = create<Pdf & PdfActions>((set) => ({
  pdfUrl: null,
  setPdfUrl: (pdf: Blob | MediaSource) =>
    set(() => ({ pdfUrl: URL.createObjectURL(pdf) })),
  cleanPdfUrl: () => set(() => ({ pdfUrl: null })),
}));
