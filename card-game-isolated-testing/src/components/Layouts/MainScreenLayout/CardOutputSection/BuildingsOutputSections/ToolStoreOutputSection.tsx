import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
import { ToolStoreResources, ToolStoreType } from "../../../../../types";
import ResourceToolCurrent from "../../../ManageLayout/ToolStoreManageScreen/Parts/ResourceToolCurrent/ResourceToolCurrent";

interface ToolStoreOutputSectionProps {
  card: ToolStoreType;
}

const ToolStoreOutputSection = ({ card }: ToolStoreOutputSectionProps) => {
  const { images } = UseGlobalContext();
  const deviceSize = useGetLabelsSize();
  const tools = ["crystals", "concrete", "metals", "diesel"];

  // console.log("The selected size is: ", deviceSize);

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ HopsitalLayoutManage.tsx: images are undefined!");
  return (
    <section
      about={`Card-Output-[${card.id}]`}
      className="flex flex-col justify-start largeScreen:justify-center items-center w-full h-full"
    >
      {/* <div className="w-[800px]" /> */}
      {/* <img
        className="absolute top-0 w-1/2 h-[370px] tablet:w-[800px] tablet:h-[600px] largeScreen:h-fit bg-emerald-700/[.6] rounded-2xl"
        src={images.frames.metalFrame}
        alt="Metal Frame"
      /> */}
      <div className="flex justify-around items-center h-fit bg-emerald-700/[.6] rounded-2xl tablet:h-fit tablet:w-[400px] pt-4 pb-4">
        <div className="flex flex-col items-center ">
          {/* translate-y-16 */}
          {tools.map((toolResType) => (
            <ResourceToolCurrent
              card={card}
              labelImages={images.labels}
              toolType={toolResType as keyof ToolStoreType["stats"]}
              resType={toolResType as ToolStoreResources}
              size={deviceSize}
              key={`${card.id}-${toolResType}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolStoreOutputSection;
