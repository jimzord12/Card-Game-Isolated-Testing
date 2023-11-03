// interface propsTypes {}
import {
  multipleTree,
  singleTree,
  withShadow,
} from "../../../assets/imgs/onMapAssets/bushesAndTrees";
import Tree from "./Tree";

type treesType = {
  spot: number;
  img: string;
};

const trees: treesType[] = [
  {
    spot: 1,
    img: singleTree.tree_01,
  },
  {
    spot: 2,
    img: singleTree.tree_02,
  },
  {
    spot: 3,
    img: singleTree.tree_03,
  },
  {
    spot: 4,
    img: singleTree.tree_04,
  },
  {
    spot: 5,
    img: withShadow.treesShadowBig,
  },
  {
    spot: 6,
    img: withShadow.orangeBushShadow,
  },
  {
    spot: 7,
    img: withShadow.treesShadowSmall,
  },
  {
    spot: 8,
    img: multipleTree.trees_01,
  },
  {
    spot: 9,
    img: multipleTree.trees_02,
  },
];

const TreesOnMap = () => {
  return (
    <>
      {trees.map(({ spot, img }, index) => (
        <Tree key={index} spot={spot} imgSrc={img} />
      ))}
    </>
  );
};

export default TreesOnMap;
