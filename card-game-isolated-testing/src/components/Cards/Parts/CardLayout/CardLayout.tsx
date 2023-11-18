import {
  TemplateDataBuilding,
  TemplateDataReg,
  TemplateDataSP,
} from "../../../../types";
import styles from "./cardLayout.module.css";

// const x = 32;

interface Props {
  cardData: TemplateDataBuilding | TemplateDataReg | TemplateDataSP;
  frameImg: string;
  //   size: number;
  // spot: CardSpot;
  onClick: () => void;
}

const CardLayout = ({ frameImg, cardData, onClick }: Props) => {
  console.log("frameImg :>> ", frameImg);
  return (
    <div
      className={styles.outerFrame}
      //   style={{
      //     width: size + x,
      //     height: size * 1.75 + x,
      //   }}
      onClick={onClick}
    >
      <div className={styles.cardFrameContainer}>
        <img src={frameImg} alt="Frame Image" className={styles.frameImg} />
      </div>
      <div
        className={styles.innerFrame}
        // style={{
        //   width: size,
        //   height: size * 1.75,
        // }}
      >
        <h3 className={styles.cardTitle}>{cardData.name}</h3>
        <img src={cardData.image} alt="Card Image" className={styles.cardImg} />

        <p className={styles.cardDesc}>{cardData.desc}</p>
        {/* <LevelIndicator level={-1} /> */}
      </div>
    </div>
  );
};

export default CardLayout;
