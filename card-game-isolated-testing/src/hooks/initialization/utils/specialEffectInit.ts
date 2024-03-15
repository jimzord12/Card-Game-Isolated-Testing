import { updateCardData } from "../../../../api/apiFns";
import EffectClass from "../../../classes/effectClass";
import SPCard from "../../../classes/spClass_V2";
import { convertTimestamp2 } from "../../game/gameLoop/utils";

export const specialEffectInit = (spCards: SPCard[]) => {
  const activeSPCards = spCards.filter(
    (card) => card.state === true && !card.disabled
  );
  if (activeSPCards.length > 1)
    throw new Error("⛔ - Custom: More than 1 Active Effect Card Detected!");
  if (activeSPCards.length === 1) {
    const spCard = activeSPCards[0];

    if (spCard.expiresAtUnix === null)
      throw new Error(
        "⛔ - Custom: Active Effect Card has no expiration date!"
      );

    console.log("🔷 specialEffectInit: The Effect is still Active!");
    console.log("🔷1 - spCard.expiresAtUnix: ", spCard.expiresAtUnix);
    console.log("🔷2 - Date.now(): ", Date.now());
    console.log(
      "🔷spCard.expiresAtUnix < Date.now(): ",
      spCard.expiresAtUnix < Date.now()
    );
    // const a = convertTimestamp(spCard.expiresAtUnix);
    // const b = convertTimestamp(Date.now());

    // console.log("1 - : ", a);
    // console.log("2 - : ", b);
    console.log(
      "Effect Expires in: ",
      convertTimestamp2(spCard.expiresAtUnix - Date.now())
    );

    // 🔷 Check if Expired
    if (spCard.expiresAtUnix < Date.now()) {
      if (spCard.id === null)
        throw new Error("⛔ specialEffectInit.ts: SPCard's ID is null!");

      updateCardData({ id: spCard.id, state: 0, disabled: true });
      return false;
    }

    const activeEffect = new EffectClass(spCard, spCard.expiresAtUnix);
    console.log("🙌 4 - The Active Effect: ", activeEffect);
    return activeEffect;
  }
  return null;
};
