import { create } from "zustand";
import { type Img } from "../types/ImgType";

type Attch = {
  imgs: Img[] | null;
  err: boolean;
};

type AttchActions = {
  setImgs: (imgs: Img[]) => void;
  setErr: (err: boolean) => void;
  addImg: (file: File) => void;
  deleteImg: (index: number) => void;
  clean: () => void;
};

export const useAttchStore = create<Attch & AttchActions>((set) => ({
  imgs: null,
  err: false,
  setErr: (err: boolean) => set(() => ({ err })),
  setImgs: (imgs: Img[]) => set(() => ({ imgs })),
  addImg: (file: File) =>
    set((state) => ({
      imgs: state.imgs
        ? [...state.imgs, { file, src: URL.createObjectURL(file) }]
        : [{ file, src: URL.createObjectURL(file) }],
    })),
  deleteImg: (index: number) =>
    set((state) => ({
      imgs: state.imgs ? state.imgs.filter((_, i) => i !== index) : null,
    })),
  clean: () => set(() => ({ imgs: null, err: false })),
}));
