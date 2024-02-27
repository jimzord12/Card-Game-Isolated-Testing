import { factoryBarrelsPerLevel } from "../../../../../constants/game/defaultBuildingsConfig";
import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
import { useGameVarsStore } from "../../../../../stores/gameVars";
import { Level } from "../../../../../types";
import LabelWithIcon from "../../../../Labels/LabelWithIcon/LabelWithIcon";

const Factory_LvlUp_NewStats = () => {
  const size = useGetLabelsSize();
  const gameVars = useGameVarsStore((state) => state);
  const factoryLevel = gameVars.factoryLevel;

  const { images } = UseGlobalContext();
  //   let images: ImageGroups | undefined = contextImgs;

  //   if (imagesForSB !== undefined) images = imagesForSB;

  if (
    // imagesForSB === undefined &&
    images === undefined ||
    images === null
  )
    throw new Error("⛔ NewStats.tsx: images are undefined!");

  const newBarrelCapacity =
    factoryBarrelsPerLevel[(factoryLevel + 1) as Level] -
    factoryBarrelsPerLevel[factoryLevel];

  return (
    <>
      {gameVars.factoryLevel === 5 ? (
        <h2 className="text-white text-3xl text-center">
          Factory's Level is Maxed out! You can not level it up any further.
        </h2>
      ) : (
        <section
          className="flex flex-col w-fit p-4 pb-12 pt-8 border-4 rounded-2xl bg-emerald-700/[.6]"
          about="Townhall-New-Stats"
        >
          <div
            about="Townhall-Effect"
            className="h-fit pb-8 flex flex-col gap-16"
          >
            {/* <LabelWithIcon
              image={images.gameIcons.dieselBarrelGameIcon}
              labelImages={images!.labels}
              labelType="golden"
              size={size}
              value={`+${factoryBarrelsPerLevel[factoryLevel]}`}
              position="left"
              valueType={
                {
                  color: "black",
                  addGrayScale: "yes",
                } as const
              }
              desc={
                {
                  text: "Old Barrel Capacity",
                  style: "white",
                } as const
              }
            /> */}
            <LabelWithIcon
              image={images.gameIcons.dieselBarrelGameIcon}
              labelImages={images!.labels}
              labelType="golden"
              size={size}
              value={`+${newBarrelCapacity}`}
              position="left"
              valueType={
                {
                  color: "black",
                } as const
              }
              desc={
                {
                  text: "New Barrel Capacity",
                  style: "white",
                } as const
              }
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Factory_LvlUp_NewStats;
