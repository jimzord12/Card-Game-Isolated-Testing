import BuildingCard from "../../../../classes/buildingClass_V2";
import RegCard from "../../../../classes/regClass_V2";
import { CardClass } from "../../../../types";
import { isSPCard } from "../../../../types/TypeGuardFns/SPGuards";
import ModalLevelIndicator from "../../../Modals/BaseModalParts/ModalLevelIndicator/ModalLevelIndicator";
import { rarityConverter } from "../../../Modals/InGameModals/Parts/CardGrid/utils";
import styles from "./cardLayout.module.css";

// 🧪 Uncomment for Storybook testing
// import levelLabel from "../../../../assets/imgs_new_convention/labels/labels-levelLabel.webp";

// const x = 32;

interface Props {
  card: CardClass;
  frameImg: string;
  currentModal?: "Inventory" | "Craft";
  //   size: number;
  // spot: CardSpot;
  onClick: () => void;
}

const CardLayout = ({ frameImg, card, onClick, currentModal }: Props) => {
  console.log("frameImg :>> ", frameImg);
  console.log("Card Data : ", card);

  return (
    <div className={styles.outerFrame} onClick={onClick}>
      {currentModal === "Craft" ? (
        // Section ONLY for Crafting Modal
        <>
          <div className={styles.cardFrameContainer}>
            <img src={frameImg} alt="Frame Image" className={styles.frameImg} />
          </div>
          {console.log(
            "SKATATATA__22: ",
            rarityConverter(card.rarity)?.toLowerCase()
          )}
          <div className={styles.innerFrame}>
            <h3 className={styles.cardTitle}>{card.name}</h3>
            <img src={card.img} alt="Card Image" className={styles.cardImg} />

            <p className={styles.cardDesc}>{card.desc}</p>
          </div>
        </>
      ) : (
        <>
          {/* Section ONLY for Inventory Modal */}
          {/* // TODO: Change the BG Color based on the Rarity */}

          {!isSPCard(card as CardClass) ? (
            <div
              about="Level Indicator Container"
              className="absolute w-full h-full"
            >
              <div
                about="Level Indicator Controller"
                className="absolute inset-x-0 -top-3"
              >
                <ModalLevelIndicator
                  contentType="building-passive"
                  level={(card as BuildingCard | RegCard).level}
                  isClosing={false}
                  withAnimation={false}
                  usage="Card"
                  // storybookTesting={levelLabel} // 🧪 Uncomment for Storybook testing
                />
              </div>
            </div>
          ) : null}
          <div className={styles.cardFrameContainer}>
            <img src={frameImg} alt="Frame Image" className={styles.frameImg} />
          </div>
          <div
            className={
              styles.innerFrame +
              " " +
              styles[rarityConverter(card.rarity)?.toLowerCase() ?? ""]
            }
          >
            <h3 className={styles.cardTitle}>{(card as CardClass).name}</h3>
            <img
              src={(card as CardClass).img}
              alt="Card Image"
              className={styles.cardImg}
            />

            <p className={styles.cardDesc}>{(card as CardClass).desc}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CardLayout;
