import { defaultBuildingsConfig } from "../../../../../constants/game";
import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
import { useGameVarsStore } from "../../../../../stores/gameVars";
import { CardRequirements, Level } from "../../../../../types";
import LabelWithIcon from "../../../../Labels/LabelWithIcon/LabelWithIcon";

interface Default_B_RequiredResourcesSectionProps {
  type: "townhall" | "factory";
  //   imagesForSB?: ImageGroups;
}

type ImgMapping = {
  [K in keyof CardRequirements]: string;
};

const Default_B_RequiredResourcesSection = ({
  type,
}: Default_B_RequiredResourcesSectionProps) => {
  const size = useGetLabelsSize();
  const { images } = UseGlobalContext();
  const { townhallLevel, factoryLevel } = useGameVarsStore((state) => state);

  if (
    // imagesForSB === undefined &&
    images === undefined ||
    images === null
  )
    throw new Error(
      "⛔ Default_B_RequiredResourcesSection.tsx: images are undefined!"
    );

  let requirements: CardRequirements;
  const entityLevel: Level = type === "townhall" ? townhallLevel : factoryLevel;

  const imgMapping: ImgMapping = {
    gold: images.gameIcons.goldGameIcon,
    concrete: images.gameIcons.concreteGameIcon,
    crystals: images.gameIcons.crystalsGameIcon,
    metals: images.gameIcons.metalsGameIcon,
    diesel: images.gameIcons.dieselBarrelGameIcon,
    population: images.gameIcons.citizenCircularGameIcon,
  };

  if (type === "townhall") {
    requirements = defaultBuildingsConfig.townhallRequirements[entityLevel];
  } else if (type === "factory") {
    requirements = defaultBuildingsConfig.factoryRequirements[entityLevel];
  } else {
    throw new Error(
      "⛔ Default_B_RequiredResourcesSection.tsx: type is neither townhall nor factory!"
    );
  }

  return (
    <>
      {entityLevel === 5 ? (
        <h2 className="text-white text-3xl text-center">
          {`${
            type === "townhall" ? "Townhall" : "Factory"
          } Level is Maxed out! You can not level it up any further.`}
        </h2>
      ) : (
        <section
          className="grid grid-cols-2 gap-4 gap-y-10 w-fit p-4 pb-10 border-4 rounded-2xl bg-emerald-700/[.6]"
          about="Card-Level-Up"
        >
          {Object.entries(requirements).map(([key, value]) => {
            if (value === 0 || value === null || value === undefined)
              return null;

            return (
              <div key={key}>
                <LabelWithIcon
                  image={imgMapping[key as keyof CardRequirements]}
                  labelImages={images!.labels}
                  labelType="rusty"
                  size={size}
                  value={value}
                  position="left"
                  valueType={
                    {
                      color: "rusty",
                    } as const
                  }
                  desc={
                    {
                      text: key,
                      style: "white",
                    } as const
                  }
                />
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default Default_B_RequiredResourcesSection;
