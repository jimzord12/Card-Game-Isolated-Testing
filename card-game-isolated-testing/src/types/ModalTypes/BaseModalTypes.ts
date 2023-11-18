export type ModalData = {
  id: number | null;
  modalBg?: string | null;
  modalLevel?: number | null;
  modalRarityOrName?: number | string | null;
  modalType?: ModalType;
  modalMenuIndex?: number | null;
};

export type ModalType = "standard" | "confirmation" | "cardPicker";
