import "./trees.css";

interface propTypes {
  spot: number;
  imgSrc: string;
}

const Tree = ({ spot, imgSrc }: propTypes) => {
  return (
    <div className={`treeSpot${spot}`}>
      <img className="tree" src={imgSrc} />
    </div>
  );
};

export default Tree;
