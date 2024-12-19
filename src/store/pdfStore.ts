import { create } from "zustand";
import { Page } from "@/types/PageType";
import type { ImageMode } from "@/types/ImageModeType";

type Pdf = {
  pages: Page[] | null;
  perPage: number;
  imageMode: ImageMode;
};

type PdfActions = {
  setPdf: (pages: Page[], perPage: number, imageMode: ImageMode) => void;
  cleanPages: () => void;
};

export const usePdfStore = create<Pdf & PdfActions>((set) => ({
  pages: null,
  perPage: 0,
  imageMode: null,
  setPdf: (pages: Page[], perPage: number, imageMode: ImageMode) =>
    set(() => ({ pages, perPage, imageMode })),
  cleanPages: () => set(() => ({ pages: null, perPage: 0 })),
}));
