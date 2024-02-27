import Default_B_RequiredResourcesSection from "./Parts/Default_B_RequiredResourcesSection";
import Factory_LvlUp_NewStats from "./Parts/Factory_LvlUp_NewStats";
import Townhall_LvlUp_NewStats from "./Parts/Townhall_LvlUp_NewStats";

interface DefaultBuildingsLvlUpScreenProps {
  type: "townhall" | "factory";
}
const DefaultBuildingsLvlUpScreen = ({
  type,
}: DefaultBuildingsLvlUpScreenProps) => {
  return (
    <div
      className="flex flex-col w-full h-fit largeScreen:h-full justify-center items-center"
      about={`LevelUp-Layout-${type}`}
    >
      {/* <h2 className="text-white font-extrabold text-4xl">
      AmusementPark Main Screen
    </h2> */}
      <h2 className="text-white text-xl largeScreen:text-3xl mb-6 bg-emerald-800/[.7] p-4 rounded-2xl border-4">
        Required Resources & New Stats
      </h2>
      <div className="flex w-full h-fit gap-4 justify-center items-center">
        {/* Card's Details Section */}
        <Default_B_RequiredResourcesSection type={type} />

        {/* Card's Provided Effects Section */}
        {type === "townhall" ? (
          <Townhall_LvlUp_NewStats />
        ) : (
          <Factory_LvlUp_NewStats />
        )}
      </div>
    </div>
  );
};

export default DefaultBuildingsLvlUpScreen;
