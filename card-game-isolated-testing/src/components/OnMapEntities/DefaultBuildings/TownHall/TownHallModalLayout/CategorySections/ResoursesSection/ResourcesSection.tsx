import { useGeneralVariablesStore } from "../../../../../../../stores/generalVariables";
import ResourceGathRates from "./ResourceGathRates/ResourceGathRates";
import TotalResources from "./TotalResources/TotalResources";

const ResourcesSection = () => {
  const ratesResourcesToggler = useGeneralVariablesStore(
    (state) => state.ratesResourcesToggler
  );

  if (ratesResourcesToggler) {
    return <ResourceGathRates />;
  } else {
    return <TotalResources />;
  }
};

export default ResourcesSection;
