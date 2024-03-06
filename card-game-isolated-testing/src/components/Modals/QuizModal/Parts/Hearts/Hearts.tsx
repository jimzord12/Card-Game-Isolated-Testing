import { quizImages } from "../../../../../assets/quizImages";
import styles from "./styles.module.css";

interface HeartsProps {
  hearts: number;
}

const Hearts = ({ hearts }: HeartsProps) => {
  return (
    <div className="flex w-full h-full pt-2 pl-1 gap-2">
      {[1, 2, 3].map((_, index) => (
        <img
          key={index}
          className={`object-contain max-w-full max-h-full transition-colors ${
            index > hearts - 1 ? styles.wobbleAnim : ""
          }`}
          src={quizImages.heartImg}
          alt="Heart Image"
          style={
            index < hearts
              ? {}
              : {
                  filter: "grayscale(100%)",
                }
          }
        />
      ))}
    </div>
  );
};

export default Hearts;
