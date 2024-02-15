import { Dispatch, SetStateAction } from "react";
import { cardUrlsWithShadow } from "../../../constants/cards/cardImageUrls/withShadow";
import { TownMapEntitiesData } from "../../../types";
import { isRegCard } from "../../../types/TypeGuardFns/RegGuards";

import GlowImage from "../../GlowImage/GlowImage";
import "./solar.css";
import "./wind.css";
import StandardModal from "../../Modals/StandardModal/StandardModal";
import { UseGlobalContext } from "../../../context/GlobalContext/GlobalContext";
import { useModalStore } from "../../../stores/modalStore";
import RegCard from "../../../classes/regClass_V2";
import { rarityConverter } from "../../Modals/InGameModals/Parts/CardGrid/utils";
import { useGameVarsStore } from "../../../stores/gameVars";

interface Props {
  highlightedImg: number | null;
  handleHover: (id: number) => void;
  handleLeave: (id: number) => void;
  setSelectedMapEntity: Dispatch<SetStateAction<number | null>>;
  mapEntities: TownMapEntitiesData;
}

const RegsOnMap = ({
  highlightedImg,
  handleHover,
  handleLeave,
  setSelectedMapEntity,
  mapEntities,
}: Props) => {
  // const pushModal = useModalStore((state) => state.pushModal);
  const { images } = UseGlobalContext();
  const pushModal = useModalStore((state) => state.pushModal);
  const gameVars = useGameVarsStore((state) => state);

  if (images === undefined)
    throw new Error("⛔ TownHallOnMap, images is undefined!");

  const handleOpenStandardModal = (card: RegCard) => {
    if (
      card === undefined ||
      card.rarity === undefined ||
      card.level === undefined
    )
      throw new Error("⛔ handleOpenStandardModal: card is undefined!");

    const background = card.name.includes("Wind")
      ? images.modal_backgrounds.windTurbineBG
      : images.modal_backgrounds.solarPanelBG;

    pushModal(
      <StandardModal
        bgImage={background}
        contentScreens={[
          <div style={{ fontSize: 42, color: "white" }}>
            REG MAIN SCREEN!!!
          </div>,
          <div style={{ fontSize: 42, color: "white" }}>
            REG - Level Up Screen!!
          </div>,
        ]}
        contentType="reg"
        label={rarityConverter(card.rarity) as string}
        level={card.level}
        card={card}
      />
    );
  };

  return (
    <div>
      {Object.entries(mapEntities).map(([spot, card]) =>
        card === null ||
        card?.id === null ||
        card?.type === undefined ||
        card?.type !== "reg" ||
        !isRegCard(card) ? null : (
          <div
            key={card.id}
            className={
              card.name.includes("Wind")
                ? `regSpotWind${spot}`
                : `regSpotSolar${spot}`
            }
            onClick={() => {
              setSelectedMapEntity(card.id);
              handleOpenStandardModal(card);
              console.log("Energy Prod: ", gameVars.energyProduced);
              console.log("Energy Cons: ", gameVars.energyConsumed);
              console.log("Energy Rem: ", gameVars.energyRemaining);
            }}
          >
            <GlowImage
              key={card.id}
              src={cardUrlsWithShadow.reg[card.name]}
              alt={card.name}
              isHovered={highlightedImg === card.id}
              onHover={() => handleHover(card.id as number)}
              onLeave={() => handleLeave(card.id as number)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default RegsOnMap;
