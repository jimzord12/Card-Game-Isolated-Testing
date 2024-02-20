import RegCard from "../../../../classes/regClass_V2";
import { UseGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import RegCardDetailsSection from "../CardDetailsSection/RegCardDetailsSection";
import RegOutputSection from "../CardOutputSection/RegsOutputSections/RegOutputSection";

interface PassiveRegMainScreenProps {
  card: RegCard;
}

const PassiveRegMainScreen = ({ card }: PassiveRegMainScreenProps) => {
  const { images } = UseGlobalContext();

  // console.log("The selected size is: ", deviceSize);

  if (images?.maps === undefined || images?.onMapAssets === undefined)
    throw new Error("⛔ HopsitalLayoutManage.tsx: images are undefined!");

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      {/* <h2 className="text-white font-extrabold text-4xl">
    AmusementPark Main Screen
  </h2> */}
      <div className="flex flex-col tablet:flex-row w-full h-full gap-4">
        {/* Card's Details Section */}
        <RegCardDetailsSection card={card} />

        {/* Card's Provided Effects Section */}
        <RegOutputSection card={card} />
      </div>
    </div>
  );
};

export default PassiveRegMainScreen;
