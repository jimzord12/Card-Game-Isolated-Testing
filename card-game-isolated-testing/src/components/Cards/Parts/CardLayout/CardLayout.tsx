import BuildingCard from "../../../../classes/buildingClass_V2";
import RegCard from "../../../../classes/regClass_V2";
import {
  CardClass,
  TemplateDataBuilding,
  TemplateDataReg,
  TemplateDataSP,
} from "../../../../types";
import { isSPCard } from "../../../../types/TypeGuardFns/SPGuards";
import ModalLevelIndicator from "../../../Modals/BaseModalParts/ModalLevelIndicator/ModalLevelIndicator";
import styles from "./cardLayout.module.css";

// 🧪 Uncomment for Storybook testing
// import levelLabel from "../../../../assets/imgs_new_convention/labels/labels-levelLabel.webp";

// const x = 32;
type TemplateData = TemplateDataBuilding | TemplateDataReg | TemplateDataSP;

interface Props {
  cardData: TemplateData | CardClass;
  frameImg: string;
  isForCrafting: boolean;
  currentModal?: "Inventory" | "Craft";
  //   size: number;
  // spot: CardSpot;
  onClick: () => void;
}

const CardLayout = ({
  frameImg,
  cardData,
  onClick,
  isForCrafting,
  currentModal,
}: Props) => {
  console.log("frameImg :>> ", frameImg);
  console.log("Card Data : ", cardData);

  return (
    <div className={styles.outerFrame} onClick={onClick}>
      {isForCrafting ? (
        // Section ONLY for Crafting Modal
        <>
          <div className={styles.cardFrameContainer}>
            <img src={frameImg} alt="Frame Image" className={styles.frameImg} />
          </div>
          <div className={styles.innerFrame}>
            <h3 className={styles.cardTitle}>
              {(cardData as TemplateData).name}
            </h3>
            <img
              src={(cardData as TemplateData).image}
              alt="Card Image"
              className={styles.cardImg}
            />

            <p className={styles.cardDesc}>{(cardData as TemplateData).desc}</p>
          </div>
        </>
      ) : (
        <>
          {/* Section ONLY for Inventory Modal */}
          {/* // TODO: Change the BG Color based on the Rarity */}
          {!isSPCard(cardData as CardClass) && currentModal === "Inventory" ? (
            <div
              about="Level Indicator Container"
              className="absolute w-full h-full"
            >
              <div
                about="Level Indicator Controller"
                className="absolute -top-2 -right-2 w-fit"
              >
                <ModalLevelIndicator
                  contentType="building-passive"
                  level={(cardData as BuildingCard | RegCard).level}
                  isClosing={false}
                  withAnimation={false}
                  // storybookTesting={levelLabel} // 🧪 Uncomment for Storybook testing
                />
              </div>
            </div>
          ) : null}
          <div className={styles.cardFrameContainer}>
            <img src={frameImg} alt="Frame Image" className={styles.frameImg} />
          </div>
          <div className={styles.innerFrame}>
            <h3 className={styles.cardTitle}>{(cardData as CardClass).name}</h3>
            <img
              src={(cardData as CardClass).img}
              alt="Card Image"
              className={styles.cardImg}
            />

            <p className={styles.cardDesc}>{(cardData as CardClass).desc}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CardLayout;
