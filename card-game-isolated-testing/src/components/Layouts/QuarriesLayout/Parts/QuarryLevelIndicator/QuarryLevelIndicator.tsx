import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
import { QuarryType } from "../../../../../types";
import QuarryLevelLabel from "./Parts/QuarryLevelLabel";
import styles from "./styles";

interface Props {
  type: QuarryType;
  level: number;
  forceSize?: "extraSmall" | "small" | "medium" | "large";
}

const QuarryLevelIndicator = ({ type, level, forceSize }: Props) => {
  const { images } = UseGlobalContext();
  const deviceSize = useGetLabelsSize();
  if (images?.quarries === undefined)
    throw new Error("⛔ QuarryLevelIndicator.tsx: images are undefined!");

  const size = forceSize ? forceSize : deviceSize;

  const quarryImageMapping = {
    concrete: images.quarries.concreteIconQuarry,
    crystals: images.quarries.crystalsIconQuarry,
    metals: images.quarries.metalsIconQuarry,
    diesel: images.quarries.oilRigIconQuarry,
  };

  return (
    <div about={`Quarry-${type}`}>
      <div className={`flex ${styles.imgSize[size]}`}>
        <img
          className={`object-contain z-10 ${styles.imgSize[size]}`}
          src={quarryImageMapping[type]}
          alt={`${type}-Quarry-Icon`}
        />
      </div>
      <div
        className={`flex z-0 justify-center ${styles.positionY[size]} ${styles.imgSize[size]}`}
      >
        <QuarryLevelLabel level={level} forceSize={forceSize} />
      </div>
    </div>
  );
};

export default QuarryLevelIndicator;
