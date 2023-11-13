import { ReactNode } from "react";
import { create } from "zustand";

type ModalState = {
  stack: ReactNode[];
  pushModal: (content: ReactNode) => void;
  popModal: () => void;
  clearModals: () => void;
};

export const useModalStore = create<ModalState>((set /*, get */) => ({
  stack: [],
  pushModal: (content) =>
    set((state) => ({ stack: [...state.stack, content] })),
  popModal: () => set((state) => ({ stack: state.stack.slice(0, -1) })),
  clearModals: () => set({ stack: [] }),
}));
