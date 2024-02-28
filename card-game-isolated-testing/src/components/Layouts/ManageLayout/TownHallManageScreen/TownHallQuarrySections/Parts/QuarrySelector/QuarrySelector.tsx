import { useMemo } from "react";
import { UseGlobalContext } from "../../../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../../../hooks/game/useGetLabelsSize";
import { QuarryType } from "../../../../../../../types";
import styles from "./styles";
interface Props {
  type: QuarryType;
  onClick: () => void;
}

const quarryDescription = {
  concrete: "Concrete Quarry",
  crystals: "Crystals Quarry",
  metals: "Metals Quarry",
  diesel: "Oil Rig",
};

const QuarrySelector = ({ type, onClick }: Props) => {
  const { images } = UseGlobalContext();
  const deviceSize = useGetLabelsSize();

  if (images === undefined || images === null)
    throw new Error("⛔ QuarrySelector.tsx, images is undefined | null!");

  const quarryImg = useMemo(() => {
    switch (type) {
      case "concrete":
        return images.emblems.concreteEmblem;
      case "crystals":
        return images.emblems.crystalsEmblem;
      case "metals":
        return images.emblems.metalsEmblem;
      case "diesel":
        return images.emblems.oilRigEmblem;
      default:
        throw new Error("⛔ QuarrySelector.tsx: Invalid Quarry Type!");
    }
  }, [type, images]);

  return (
    <div
      className=" border-2 tablet:border-3 bg-emerald-600/70 p-2 tablet:p-4 rounded-xl flex flex-col gap-2 items-center tablet:gap-4 tablet:text-2xl largeScreen:text-3xl w-fit cursor-pointer hover:drop-shadow-md hover:animate-bounce"
      onClick={onClick}
    >
      <img
        className={`object-contain ${styles.imgSize[deviceSize]}`}
        src={quarryImg}
        alt="Quarry Emblem"
      />
      <p className="flex-shrink text-white text-center text-sm tablet:text-lg largeScreen:text-2xl">
        {quarryDescription[type]}
      </p>
    </div>
  );
};

export default QuarrySelector;
