export type ModalData = {
  modalBg?: string | null;
  modalLevel?: number | null;
  modalRarity?: number | null;
  modalType?: ModalType;
};

export type ModalType = "standard" | "confirmation";
