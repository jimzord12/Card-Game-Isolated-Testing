import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
import { ToolStoreType } from "../../../../../types";
import { isBuildingCard } from "../../../../../types/TypeGuardFns/BuildingGuards";
import { isRegCard } from "../../../../../types/TypeGuardFns/RegGuards";
import { isToolStore } from "../../../../../types/TypeGuardFns/isToolStore";
import LabelWithIcon from "../../../../Labels/LabelWithIcon/LabelWithIcon";

interface NewToolStoreStatsProps {
  card: ToolStoreType;
  //   imagesForSB?: ImageGroups;
}

const NewToolStoreStats = ({ card }: NewToolStoreStatsProps) => {
  const size = useGetLabelsSize();
  console.log("Amusement Park - Level - Size: ", size);

  const { images } = UseGlobalContext();
  //   let images: ImageGroups | undefined = contextImgs;

  //   if (imagesForSB !== undefined) images = imagesForSB;

  if (
    // imagesForSB === undefined &&
    images === undefined ||
    images === null
  )
    throw new Error("⛔ NewToolStoreStats.tsx: images are undefined!");

  const energyUtilImg = images.gameIcons.energyUtilizationGameIcon;
  const outputImg = images.gameIcons.levelUpGradientGameIcon;
  const oldMaintenance = card.maintenance.energy;
  const oldOutput = card.level;
  const newOutput = oldOutput + 1;
  const newMaintenance = card.getNewStats().newMaintenance.energy;

  return (
    <>
      {card.level === 5 ? (
        <h2 className="text-white text-3xl text-center">
          Your Card's Level is Maxed out! You can not level it up any further.
        </h2>
      ) : (
        <section
          className="grid grid-cols-2 gap-x-4 w-fit p-4 border-4 rounded-2xl bg-emerald-700/[.6]"
          about="Card-New-Stats"
        >
          <div
            about="New-Maintanace"
            className="h-fit pb-8 flex flex-col gap-8"
          >
            <LabelWithIcon
              image={energyUtilImg}
              labelImages={images!.labels}
              labelType="golden"
              size={size}
              value={oldMaintenance}
              position="left"
              valueType={
                {
                  color: "black",
                  addGrayScale: "yes",
                } as const
              }
              desc={
                {
                  text: isRegCard(card) ? "Old Gold /h" : "Old Req. Energy",
                  style: "white",
                } as const
              }
            />
            <LabelWithIcon
              image={energyUtilImg}
              labelImages={images!.labels}
              labelType="golden"
              size={size}
              value={newMaintenance}
              position="left"
              valueType={
                {
                  color: "black",
                } as const
              }
              desc={
                {
                  text: isRegCard(card) ? "New Gold /h" : "New Req. Energy",
                  style: "white",
                } as const
              }
            />
          </div>
          <div about="New-Effect" className="h-fit pb-8 flex flex-col gap-8">
            <LabelWithIcon
              image={outputImg}
              labelImages={images!.labels}
              labelType="golden"
              size={size}
              value={oldOutput}
              position="left"
              valueType={
                {
                  color: "black",
                  addGrayScale: "yes",
                  type:
                    isBuildingCard(card) && !isToolStore(card)
                      ? "%"
                      : undefined,
                } as const
              }
              desc={
                {
                  text: "Old Max Tool Lvl",
                  style: "white",
                } as const
              }
            />
            <LabelWithIcon
              image={outputImg}
              labelImages={images!.labels}
              labelType="golden"
              size={size}
              value={newOutput}
              position="left"
              valueType={
                {
                  color: "black",
                  type:
                    isBuildingCard(card) && !isToolStore(card)
                      ? "%"
                      : undefined,
                } as const
              }
              desc={
                {
                  text: "New Max Tool Lvl",
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

export default NewToolStoreStats;
