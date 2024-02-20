import BuildingCard from "../../../classes/buildingClass_V2";
import RegCard from "../../../classes/regClass_V2";
import NewStats from "./Parts/NewStats/NewStats";
import RequiredResources from "./Parts/RequiredResources/RequiredResources";

interface LevelUpLayoutProps {
  card: BuildingCard | RegCard;
}
const LevelUpLayout = ({ card }: LevelUpLayoutProps) => {
  return (
    <div
      className="flex flex-col w-full h-fit justify-center items-center"
      about={`LevelUp-Layout-${card.type}-${card.name}-${card.id}`}
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

export default LevelUpLayout;
