import { useGameVarsStore } from "../../../../../stores/gameVars";
import QuarryGoBackBtn from "../../../QuarriesLayout/Parts/QuarryGoBackBtn/QuarryGoBackBtn";
import QuarryLevelIndicator from "../../../QuarriesLayout/Parts/QuarryLevelIndicator/QuarryLevelIndicator";
import QuarryLevelUpBtn from "../../../QuarriesLayout/Parts/QuarryLevelUpBtn/QuarryLevelUpBtn";
import ConcreteQuarrySliderSection from "../../../QuarriesLayout/QuarrySliderSections/ConcreteQuarrySliderSection";

interface Props {
  handleGoBack: () => void;
}

const TownHallConcreteQuarry = ({ handleGoBack }: Props) => {
  const quarryLevels = useGameVarsStore((state) => state.quarryLevels);

  return (
    <div className="relative flex flex-col items-center gap-2 tablet:gap-4">
      <div className="absolute left-8 top-4 flex justify-center items-start gap-2 tablet:gap-4">
        <QuarryLevelIndicator level={quarryLevels.concrete} type="concrete" />
        <div className="flex p-2 tablet:p-4 w-fit h-fit border-2 tablet:border-4 rounded-2xl bg-red-600/70">
          <h2 className="text-white text-xl tablet:text-2xl largeScreen:text-3xl">
            Concrete Quarry
          </h2>
        </div>
      </div>
      <div className="absolute right-8 top-4 flex justify-center items-start gap-2 tablet:gap-4">
        <QuarryGoBackBtn onClick={handleGoBack} />
      </div>
      <div className="absolute right-28 tablet:right-36 largeScreen:right-44 top-4 flex justify-center items-start gap-2 tablet:gap-4">
        <QuarryLevelUpBtn type="concrete" />
      </div>
      <ConcreteQuarrySliderSection />
    </div>
  );
};

export default TownHallConcreteQuarry;
