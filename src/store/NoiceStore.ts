import { create } from "zustand";
import { NoiceType } from "@/types/NoiceType";

type Noice = {
  noice: NoiceType | null;
};

type NoiceActions = {
  setNoice: (noice: NoiceType) => void;
  cleanNoice: () => void;
};

export const useNoiceStore = create<Noice & NoiceActions>((set) => ({
  noice: null,
  setNoice: (noice) => set(() => ({ noice })),
  cleanNoice: () => set(() => ({ noice: null })),
}));
