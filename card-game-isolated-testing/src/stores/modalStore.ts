import { ReactNode } from "react";
import { create } from "zustand";
import { ModalData, ModalType } from "../types/ModalTypes/BaseModalTypes";

type ModalState = {
  stack: ReactNode[];
  modalData: ModalData;
  pushModal: (content: ReactNode, type: ModalType) => void;
  popModal: () => void;
  clearModals: () => void;
  provideModalData: (modalData: ModalData) => void;
};

export const useModalStore = create<ModalState>((set /*, get */) => ({
  stack: [],
  modalData: {
    modalBg: null,
    modalLevel: 1,
    modalRarity: 4,
    modalType: "standard",
  },
  pushModal: (content, type) =>
    set((state) => ({
      stack: [...state.stack, content],
      modalData: { ...state.modalData, modalType: type },
    })),
  popModal: () => set((state) => ({ stack: state.stack.slice(0, -1) })),
  clearModals: () => set({ stack: [] }),
  provideModalData: (modalData) => {
    set((state) => ({
      ...state,
      modalData: { ...state.modalData, ...modalData },
    }));
  },
}));
