import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import LabelWithIcon from "../../../../Labels/LabelWithIcon/LabelWithIcon";
import BuildingCard from "../../../../../classes/buildingClass_V2";
import { useGameVarsStore } from "../../../../../stores/gameVars";
import { round2Decimal } from "../../../../../utils/game/roundToDecimal";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
// import { useMediaQuery } from "usehooks-ts";

interface Props {
  card: BuildingCard;
}

// ✨ This is Version 2, trying to make content responsive through overflow
// TODO: Create Custom TailwindCSS Breakpoints for mobile and tablet
const AmusementParkMain = ({ card }: Props) => {
  const { images } = UseGlobalContext();
  const popGrowthRate = useGameVarsStore((state) => state.popGrowthRate);
  const deviceSize = useGetLabelsSize();

  console.log("The selected size is: ", deviceSize);

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ HopsitalLayoutManage.tsx: images are undefined!");

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      {/* <h2 className="text-white font-extrabold text-4xl">
        AmusementPark Main Screen
      </h2> */}
      <div className="flex flex-col tablet:flex-row w-full h-full gap-4">
        {/* Card's Details Section */}
        <section
          about={`Card-Details-[${card.id}]`}
          className="flex flex-col justify-center items-center w-full tablet:p-8"
        >
          <div className="flex flex-col p-2 pb-6 tablet:p-8 lg:p-16 w-fit bg-emerald-700/[.6] rounded-2xl gap-8 lg:gap-16">
            {/* First 2 Labels */}
            <div className="flex">
              <LabelWithIcon
                image={images.gameIcons.idGameIcon}
                labelImages={images.labels}
                labelType="golden"
                size={deviceSize}
                value={`#${card.id}`}
                position="left"
                valueType={
                  {
                    color: "black",
                  } as const
                }
                desc={
                  {
                    text: "Card ID",
                    style: "white",
                  } as const
                }
              />
              <LabelWithIcon
                image={images.gameIcons.userGameIcon}
                labelImages={images.labels}
                labelType="golden"
                size={deviceSize}
                value={card.creator}
                position="left"
                valueType={
                  {
                    color: "black",
                  } as const
                }
                desc={
                  {
                    text: "Creator",
                    style: "white",
                  } as const
                }
              />
            </div>

            {/* Second 2 Labels */}
            <div className="flex">
              <LabelWithIcon
                image={images.gameIcons.calendarGameIcon}
                labelImages={images.labels}
                labelType="golden"
                size={deviceSize}
                value={card.getCreationTime()}
                position="left"
                valueType={
                  {
                    color: "black",
                  } as const
                }
                desc={
                  {
                    text: "Creation Time",
                    style: "white",
                  } as const
                }
              />

              <LabelWithIcon
                image={images.gameIcons.energyUtilizationGameIcon}
                labelImages={images.labels}
                labelType="golden"
                size={deviceSize}
                value={`${card.maintenance.energy} ⚡`}
                position="left"
                valueType={
                  {
                    color: "black",
                  } as const
                }
                desc={
                  {
                    text: "Req. Energy",
                    style: "white",
                  } as const
                }
              />
            </div>
          </div>
        </section>

        {/* Card's Provided Effects Section */}
        <section
          about={`Card-Output-[${card.id}]`}
          className="relative flex flex-col justify-center items-center w-full h-full "
        >
          <img
            className="absolute max-w-1/2 max-h-full tablet:w-full tablet:h-full largeScreen:h-fit bg-emerald-700/[.6] rounded-2xl"
            src={images.frames.metalFrame}
            alt="Metal Frame"
          />
          <div className="flex justify-around items-center p-16 h-2/3">
            {/* <img
              className="hidden tablet:block sm:min-w-1/3 h-1/2 object-contain z-10"
              src={images.cards.amusementParkCard}
              alt="Amusement Park"
            /> */}
            <div className="flex flex-col items-center gap-12">
              <LabelWithIcon
                labelImages={images.labels}
                image={images.gameIcons.growthGameIcon}
                labelType="simple"
                value={`${round2Decimal(popGrowthRate - card.output.boost)} /h`}
                desc={{
                  text: "Citizen Growth Before",
                  style: "white",
                }}
                size={deviceSize}
                valueType={
                  {
                    color: "white",
                  } as const
                }
              />
              <LabelWithIcon
                labelImages={images.labels}
                image={images.gameIcons.growthGameIcon}
                labelType="simple"
                value={`${round2Decimal(popGrowthRate)} /h`}
                desc={{
                  text: "Citizen Growth After",
                  style: "white",
                }}
                size={deviceSize}
                valueType={
                  {
                    color: "white",
                  } as const
                }
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AmusementParkMain;
