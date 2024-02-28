import { UseGlobalContext } from "../../../../../context/GlobalContext/GlobalContext";
import useGetLabelsSize from "../../../../../hooks/game/useGetLabelsSize";
import styles from "./styles";

interface Props {
  onClick: () => void;
}

const QuarryGoBackBtn = ({ onClick }: Props) => {
  const { images } = UseGlobalContext();
  if (images === undefined || images === null)
    throw new Error("⛔ QuarryGoBackBtn.tsx, images is undefined | null!");
  const deviceSize = useGetLabelsSize();

  return (
    <div
      className="w-fit p-2 border-2 largeScreen:p-4 largeScreen:border-4 rounded-xl bg-slate-700/70 hover:bg-red-700/60"
      onClick={onClick}
    >
      <img
        className={`object-contain rotate-180 ${styles.imgSize[deviceSize]}`}
        src={images.gameIcons.sideBarArrowGameIcon}
        alt="Go Back Arrow"
      />
    </div>
  );
};

export default QuarryGoBackBtn;
