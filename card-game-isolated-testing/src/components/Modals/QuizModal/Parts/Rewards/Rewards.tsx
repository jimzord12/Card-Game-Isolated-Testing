import { quizImages } from "../../../../../assets/quizImages";
import styles from "./styles.module.css";

interface RewardsProps {
  rewards: number;
}

const Rewards = ({ rewards }: RewardsProps) => {
  return (
    <div className="flex w-full h-full pt-2 pr-1 gap-2">
      {[1, 2, 3].map((_, index) => (
        <img
          key={index}
          className={`object-contain max-w-full max-h-full transition-all ${
            index === rewards - 1 ? styles.jelloAnim : ""
          }`}
          src={quizImages.starImg}
          alt="Heart Image"
          style={index > rewards - 1 ? { filter: "grayscale(100%)" } : {}}
        />
      ))}
    </div>
  );
};

export default Rewards;
