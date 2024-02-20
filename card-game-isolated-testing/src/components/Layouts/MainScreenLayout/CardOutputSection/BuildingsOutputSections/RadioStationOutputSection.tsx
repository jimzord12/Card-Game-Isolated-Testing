import BuildingCard from "../../../../../classes/buildingClass_V2";
import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
import { round2Decimal } from "../../../../../utils/game/roundToDecimal";
import LabelWithIcon from "../../../../Labels/LabelWithIcon/LabelWithIcon";

interface RadioStationOutputSectionProps {
  card: BuildingCard;
}

const RadioStationOutputSection = ({
  card,
}: RadioStationOutputSectionProps) => {
  const { images } = UseGlobalContext();
  const deviceSize = useGetLabelsSize();

  // console.log("The selected size is: ", deviceSize);

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ HopsitalLayoutManage.tsx: images are undefined!");
  return (
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
        <div className="flex flex-col items-center gap-12">
          <LabelWithIcon
            labelImages={images.labels}
            image={images.cards.energyDrinkCard}
            labelType="simple"
            value={round2Decimal(card.output.boost)}
            desc={{
              text: "Special Effect Boost",
              style: "white",
            }}
            size={deviceSize}
            valueType={
              {
                color: "white",
                type: "%",
              } as const
            }
          />
          {/* <LabelWithIcon
            labelImages={images.labels}
            image={images.cards.energyDrinkCard}
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
          /> */}
        </div>
      </div>
    </section>
  );
};

export default RadioStationOutputSection;
