// interface propsTypes {}
import { treeImgs } from "../../../data/imageData";
import Tree from "./Tree";

type treesType = {
  spot: number;
  img: string;
};

const trees: treesType[] = treeImgs;

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
