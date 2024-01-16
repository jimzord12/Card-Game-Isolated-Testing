// import { useCallback, useEffect, useState } from "react";

// // CSS Modules
// import styles from "./css/general.module.css";

// // On-Map Assets
// import { buildings, regs } from "../../assets/imgs/onMapAssets";

// // Components
// import GlowOutlineFilter from "../GlowOutlineFilter";

// import { testingBuildingImgs } from "../../data/test/buildingImgs";
// import { testingDefaultImgs } from "../../data/test/defaultImgs";
// import { testingPlaceholderImgs } from "../../data/test/placeholderImgs";
// import { testingREGImgs } from "../../data/test/regImgs";
// import EntityTemplateGroup from "../OnMapEntities/EntityTemplateGroup/EntityTemplateGroup";
// import TreesOnMap from "../OnMapEntities/Trees/TreesOnMap";

// // interface propsTypes {
// //   mapImagePath: string;
// // }

// // From here the Images will be exposes to the rest of the App!
// // TODO: Create a ImageContext or something

// // Buildings Testing
// // const testingAsset = buildings.radioStation;
// // const buildingsImgs = testingBuildingImgs(testingAsset);

// // // REG Testing
// // const testingREGAsset = regs.simpleSolarPanel;
// const regSubType: SubType = testingREGAsset.includes("Solar")
//   ? "solar"
//   : "wind";
// console.log("testingREG: ", testingREGAsset);
// // const REGImages = testingREGImgs(testingREGAsset, regSubType);

// // // Default Buildings
// // const defaultBuildings = testingDefaultImgs();

// // const placeholders = testingPlaceholderImgs();

// /////////////////////////////////////////////////////////////////////////////
// // File's Component
// const TownMap = () => {
//   const [highlightedImg, setHighlightedImg] = useState<number | null>(null);
//   const [selectedMapEntity, setSelectedMapEntity] = useState<number | null>(
//     null
//   );

//   useEffect(() => {
//     if (selectedMapEntity === null) return;
//     console.log("The Selected Image is this: ", selectedMapEntity);
//   }, [selectedMapEntity]);

//   const handleHover = useCallback((id: number) => {
//     setHighlightedImg(id);
//   }, []);

//   const handleLeave = useCallback(() => {
//     setHighlightedImg(null);
//   }, []);

//   return (
//     <>
//       <div className={styles.imageContainer}>
//         <img
//           src={mapImagePath}
//           alt="Background - TownMap"
//           className={styles.backgroundImage}
//         />

//         <>
//           <GlowOutlineFilter />
//           {/* >>> PLACEHOLDERS <<< */}
//           {/* <Placeholders
//             images={placeholders}
//             setSelectedMapEntity={setSelectedMapEntity}
//             handleHover={handleHover}
//             handleLeave={handleLeave}
//             highlightedImg={highlightedImg}
//           /> */}

//           {/* >>> BUILDINGS <<< */}
//           <EntityTemplateGroup
//             setSelectedMapEntity={setSelectedMapEntity}
//             imageDetails={buildingsImgs}
//             handleHover={handleHover}
//             handleLeave={handleLeave}
//             highlightedImg={highlightedImg}
//           />

//           {/* >>> REGS <<< */}
//           <EntityTemplateGroup
//             setSelectedMapEntity={setSelectedMapEntity}
//             imageDetails={REGImages}
//             handleHover={handleHover}
//             handleLeave={handleLeave}
//             highlightedImg={highlightedImg}
//           />

//           {/* >>> DEFAULT BUILDINGS <<< */}
//           <EntityTemplateGroup
//             setSelectedMapEntity={setSelectedMapEntity}
//             imageDetails={defaultBuildings}
//             handleHover={handleHover}
//             handleLeave={handleLeave}
//             highlightedImg={highlightedImg}
//           />

//           {/* PLACEHOLDERS */}
//           {/* <EntityTemplateGroup
//             setSelectedMapEntity={setSelectedMapEntity}
//             imageDetails={placeholders}
//             handleHover={handleHover}
//             handleLeave={handleLeave}
//             highlightedImg={highlightedImg}
//           /> */}

//           {/* >>> TREES & BUSHES <<< */}
//           <TreesOnMap />
//         </>
//       </div>
//     </>
//   );
// };

// export default TownMap;
