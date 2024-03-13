import { useDebugValue } from "react";
import BuildingCard from "../../../../../classes/buildingClass_V2";
import RegCard from "../../../../../classes/regClass_V2";
import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
import { CardRequirements } from "../../../../../types";
import LabelWithIcon from "../../../../Labels/LabelWithIcon/LabelWithIcon";

interface RequiredResourcesProps {
  card: BuildingCard | RegCard;
  //   imagesForSB?: ImageGroups;
}

const RequiredResources = ({ card }: RequiredResourcesProps) => {
  const size = useGetLabelsSize();

  const { images } = UseGlobalContext();
  //   let images: ImageGroups | undefined = contextImgs;

  //   if (imagesForSB !== undefined) images = imagesForSB;

  if (
    // imagesForSB === undefined &&
    images === undefined ||
    images === null
  )
    throw new Error("⛔ RequiredResources.tsx: images are undefined!");

  type ImgMapping = {
    [K in keyof CardRequirements]: string;
  };

  const imgMapping: ImgMapping = {
    gold: images.gameIcons.goldGameIcon,
    concrete: images.gameIcons.concreteGameIcon,
    crystals: images.gameIcons.crystalsGameIcon,
    metals: images.gameIcons.metalsGameIcon,
    diesel: images.gameIcons.dieselBarrelGameIcon,
    population: images.gameIcons.citizenCircularGameIcon,
  };

  const { requirements } = card;

  return (
    <>
      {card.level === 5 ? (
        <>
          <div className="h-4 tablet:h-20 largeScreen:h-48" />
          <div className="flex max-h-full items-center justify-center bg-emerald-700/85 rounded-lg py-6 px-4 mx-12">
            <h2 className="text-white text-2xl text-center tablet:text-3xl">
              Your Card's Level is Maxed out! You can not level it up any
              further.
            </h2>
          </div>
        </>
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

export default RequiredResources;
