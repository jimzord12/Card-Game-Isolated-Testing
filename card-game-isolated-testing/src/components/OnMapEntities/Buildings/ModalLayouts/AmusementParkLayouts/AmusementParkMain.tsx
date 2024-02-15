import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import LabelWithIcon from "../../../../Labels/LabelWithIcon/LabelWithIcon";
import BuildingCard from "../../../../../classes/buildingClass_V2";
import Label from "../../../../Labels/Label/Label";
import { useGameVarsStore } from "../../../../../stores/gameVars";
import { round2Decimal } from "../../../../../utils/game/roundToDecimal";

interface Props {
  card: BuildingCard;
}

const AmusementParkMain = ({ card }: Props) => {
  const { images } = UseGlobalContext();
  const popGrowthRate = useGameVarsStore((state) => state.popGrowthRate);

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ HopsitalLayoutManage.tsx: images are undefined!");

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <h2 className="text-white font-extrabold text-4xl">
        AmusementPark Main Screen
      </h2>
      <div className="flex w-full h-full">
        <section
          about={`Card-Details-[${card.id}]`}
          className="flex flex-col items-center w-full h-full p-8 bg-slate-700/[.6]"
        >
          <LabelWithIcon
            image={images.gameIcons.idGameIcon}
            labelImages={images.labels}
            labelType="golden"
            size="small"
            value={`#${card.id}`}
            position="left"
            valueType={
              {
                color: "black",
              } as const
            }
          />
          <LabelWithIcon
            image={images.gameIcons.userGameIcon}
            labelImages={images.labels}
            labelType="golden"
            size="small"
            value={card.creator}
            position="left"
            valueType={
              {
                color: "black",
              } as const
            }
          />
          <LabelWithIcon
            image={images.gameIcons.calendarGameIcon}
            labelImages={images.labels}
            labelType="golden"
            size="small"
            value={card.getCreationTime()}
            position="left"
            valueType={
              {
                color: "black",
              } as const
            }
          />

          <LabelWithIcon
            image={images.gameIcons.energyUtilizationGameIcon}
            labelImages={images.labels}
            labelType="golden"
            size="small"
            value={`${card.maintenance.energy} ⚡`}
            position="left"
            valueType={
              {
                color: "black",
              } as const
            }
          />
        </section>
        <section
          about={`Card-Output-[${card.id}]`}
          className="relative flex flex-col w-full h-full "
        >
          <img
            className="absolute bg-emerald-700/[0.4] rounded-2xl"
            src={images.frames.metalFrame}
            alt="Metal Frame"
          />
          <div className="flex justify-around items-center p-16 h-2/3 ">
            <img
              className="min-w-1/3 h-1/2 object-contain z-10"
              src={images.cards.amusementParkCard}
              alt="Amusement Park"
            />
            <div className="flex flex-col gap-12">
              <Label
                labelImages={images.labels}
                type="simple"
                value={`${round2Decimal(popGrowthRate - card.output.boost)} /h`}
                desc={{
                  text: "Citizen Growth Before",
                  style: "white",
                }}
                size="medium"
                valueType={
                  {
                    color: "white",
                  } as const
                }
              />
              <Label
                labelImages={images.labels}
                type="simple"
                value={`${round2Decimal(popGrowthRate)} /h`}
                desc={{
                  text: "Citizen Growth After",
                  style: "white",
                }}
                size="medium"
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
