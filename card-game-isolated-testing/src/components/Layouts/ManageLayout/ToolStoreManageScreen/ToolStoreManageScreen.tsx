import useGetLabelsSize from "../../../../hooks/game/useGetLabelsSize";
import { ToolStoreResources, ToolStoreType } from "../../../../types";
import ResourceToolLine from "./Parts/ResourceToolLine/ResourceToolLine";

interface ToolStoreManageScreenProps {
  card: ToolStoreType;
}

const ToolStoreManageScreen = ({ card }: ToolStoreManageScreenProps) => {
  const deviceSize = useGetLabelsSize();
  const tools = ["crystals", "concrete", "metals", "diesel"];
  console.log("Card: ", card);
  return (
    <div className="flex flex-col justify-center items-center w-full h-fit mt-2">
      {tools.map((toolResType) => (
        <ResourceToolLine
          card={card}
          resType={toolResType as ToolStoreResources}
          size={deviceSize}
          key={`${card.id}-${toolResType}`}
        />
      ))}
    </div>
  );
};

export default ToolStoreManageScreen;
