import { ModalBackgroundsImageGroup } from "../../types/ImageTypes/ImageGroupTypes";

export function getModalBgImage(
  cardName: string
): keyof ModalBackgroundsImageGroup {
  const firstLetter = cardName[0].toLowerCase();
  const computedKey = (firstLetter +
    cardName.slice(1) +
    "BG") as keyof ModalBackgroundsImageGroup;

  return computedKey;
}
