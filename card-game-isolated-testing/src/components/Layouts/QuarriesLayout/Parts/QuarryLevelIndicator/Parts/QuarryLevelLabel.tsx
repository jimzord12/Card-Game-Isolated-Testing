import { UseGlobalContext } from "../../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../../hooks/game/useGetLabelsSize";
import styles from "./styles";

interface Props {
  level: number;
  forceSize?: "extraSmall" | "small" | "medium" | "large";
}

const QuarryLevelLabel = ({ level, forceSize }: Props) => {
  const { images } = UseGlobalContext();
  const deviceSize = useGetLabelsSize();

  if (images?.quarries === undefined)
    throw new Error("⛔ QuarryLevelLabel.tsx: images are undefined!");

  const size = forceSize ? forceSize : deviceSize;

  return (
    <div
      className="relative flex justify-center items-center w-fit h-fit"
      about={`Quarry-Level-Label-${level}`}
    >
      <img
        src={images.labels.quarryLevelLabel}
        className={`object-contain ${styles.imgSize[size]}`}
        alt="Quarry Level Label"
      />
      <h2 className={`absolute ${styles.textSize[size]}`}>{level}</h2>
    </div>
  );
};

export default QuarryLevelLabel;
