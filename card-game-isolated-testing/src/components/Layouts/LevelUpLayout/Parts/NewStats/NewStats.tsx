import BuildingCard from "../../../../../classes/buildingClass_V2";
import RegCard from "../../../../../classes/regClass_V2";
import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
import { isBuildingCard } from "../../../../../types/TypeGuardFns/BuildingGuards";
import { isRegCard } from "../../../../../types/TypeGuardFns/RegGuards";
import { isToolStore } from "../../../../../types/TypeGuardFns/isToolStore";
import LabelWithIcon from "../../../../Labels/LabelWithIcon/LabelWithIcon";

interface NewStatsProps {
  card: BuildingCard | RegCard;
  //   imagesForSB?: ImageGroups;
}

const NewStats = ({ card }: NewStatsProps) => {
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
    throw new Error("⛔ NewStats.tsx: images are undefined!");

  let image: string;
  let oldOutput: number;
  let newOutput: number;
  let oldMaintenance: number;
  let newMaintenance: number;

  if (isRegCard(card)) {
    image = images.gameIcons.expensesGameIcon;
    oldMaintenance = card.maintenance.gold;
    oldOutput = card.output.energy;
    newOutput = card.getNewStats().newOutput.energy;
    newMaintenance = card.getNewStats().newMaintenance.gold;
  } else if (isBuildingCard(card)) {
    image = images.gameIcons.energyUtilizationGameIcon;
    oldMaintenance = card.maintenance.energy;
    oldOutput = card.output.boost;
    newOutput = card.getNewStats().newOutput.boost;
    newMaintenance = card.getNewStats().newMaintenance.energy;
  } else {
    throw new Error(
      "⛔ NewStats.tsx: card is neither a BuildingCard nor a RegCard!"
    );
  }

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
              image={image}
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
              image={image}
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
              image={images.gameIcons.levelUpGradientGameIcon}
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
                  text: "Old Output",
                  style: "white",
                } as const
              }
            />
            <LabelWithIcon
              image={images.gameIcons.levelUpGradientGameIcon}
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
                  text: "New Output",
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

export default NewStats;
