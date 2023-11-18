export type ModalData = {
  id: number | null;
  modalBg?: string | null;
  modalLevel?: number | null;
  modalRarityOrName?: number | string | null;
  modalType?: ModalType;
};

export type ModalType = "standard" | "confirmation" | "cardPicker";
