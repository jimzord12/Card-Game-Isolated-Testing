import RegCard from "../../../../classes/regClass_V2";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../hooks/game/useGetLabelsSize";
import LabelWithIcon from "../../../Labels/LabelWithIcon/LabelWithIcon";

interface CardDetailsSectionProps {
  card: RegCard;
}

const BuildingCardDetailsSection = ({ card }: CardDetailsSectionProps) => {
  const { images } = UseGlobalContext();
  const deviceSize = useGetLabelsSize();

  // console.log("The selected size is: ", deviceSize);

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ HopsitalLayoutManage.tsx: images are undefined!");

  return (
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
            image={images.gameIcons.expensesGameIcon}
            labelImages={images.labels}
            labelType="golden"
            size={deviceSize}
            value={`${card.maintenance.gold}`}
            position="left"
            valueType={
              {
                color: "black",
              } as const
            }
            desc={
              {
                text: "Gold per hour",
                style: "white",
              } as const
            }
          />
        </div>
      </div>
    </section>
  );
};

export default BuildingCardDetailsSection;
