import BuildingCard from "../../../../../classes/buildingClass_V2";
import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import NewStats from "../../../../Layouts/LevelUpLayout/Parts/NewStats/NewStats";
import RequiredResources from "../../../../Layouts/LevelUpLayout/Parts/RequiredResources/RequiredResources";

interface Props {
  card: BuildingCard;
}

const AmusementParkLvlUp = ({ card }: Props) => {
  const { images } = UseGlobalContext();

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ HopsitalLayoutManage.tsx: images are undefined!");

  return (
    <div
      className="flex flex-col w-full h-fit justify-center items-center"
      about="AmusementP-LVL-UP"
    >
      {/* <h2 className="text-white font-extrabold text-4xl">
        AmusementPark Main Screen
      </h2> */}
      <h2 className="text-white text-xl largeScreen:text-3xl mb-6 bg-emerald-800/[.7] p-4 rounded-2xl border-4">
        Required Resources & New Stats
      </h2>
      <div className="flex flex-col tablet:flex-col w-full h-fit gap-4 justify-center items-center">
        {/* Card's Details Section */}
        <RequiredResources card={card} />

        {/* Card's Provided Effects Section */}
        <NewStats card={card} />
      </div>
    </div>
  );
};

export default AmusementParkLvlUp;
