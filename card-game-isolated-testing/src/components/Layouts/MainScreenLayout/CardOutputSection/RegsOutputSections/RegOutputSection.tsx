import RegCard from "../../../../../classes/regClass_V2";
import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
import { round2Decimal } from "../../../../../utils/game/roundToDecimal";
import LabelWithIcon from "../../../../Labels/LabelWithIcon/LabelWithIcon";

interface Props {
  card: RegCard;
}

const RegOutputSection = ({ card }: Props) => {
  const { images } = UseGlobalContext();
  const deviceSize = useGetLabelsSize();

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ RegOutputSection.tsx: images are undefined!");

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
        {/* <img
    className="hidden tablet:block sm:min-w-1/3 h-1/2 object-contain z-10"
    src={images.cards.amusementParkCard}
    alt="Amusement Park"
  /> */}
        <div className="flex flex-col items-center gap-12">
          <LabelWithIcon
            labelImages={images.labels}
            image={images.gameIcons.energyProductionGameIcon}
            labelType="simple"
            value={`${round2Decimal(card.output.energy)}`}
            desc={{
              text: "Produced Energy",
              style: "white",
            }}
            size={deviceSize}
            valueType={
              {
                color: "white",
              } as const
            }
          />
          {/* <LabelWithIcon
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
          /> */}
        </div>
      </div>
    </section>
  );
};

export default RegOutputSection;
