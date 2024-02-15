import BuildingCard from "../../../../../classes/buildingClass_V2";
import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import LabelWithIcon from "../../../../Labels/LabelWithIcon/LabelWithIcon";

interface Props {
  card: BuildingCard;
}

const AmusementParkLvlUp = ({ card }: Props) => {
  const { images } = UseGlobalContext();

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ HopsitalLayoutManage.tsx: images are undefined!");

  return (
    <div className="flex w-full h-full justify-center items-center">
      <h2 className="text-white font-extrabold text-4xl">
        AmusementPark Level Up Screen
      </h2>
      <LabelWithIcon
        image={images.gameIcons.energyProductionGameIcon}
        labelImages={images.labels}
        labelType="simple"
        size="medium"
        value={card.maintenance.energy}
        position="left"
      />
    </div>
  );
};

export default AmusementParkLvlUp;
