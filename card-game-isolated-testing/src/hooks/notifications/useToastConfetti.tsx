import { toast, cssTransition } from "react-toastify";
import CustomToastWithConfetti from "./parts/CustomToastWithConfetti";

interface Props {
  autoClose?: number;
}

export const useToastConfetti = ({ autoClose = 10000 }: Props = {}) => {
  const show = (
    title = "Crafted New Card",
    message = "Congratulations on Crafting a New Card!"
  ) => {
    const bounceTransition = cssTransition({
      enter: "bounce-in",
      exit: "bounce-out",
    });

    toast(<CustomToastWithConfetti title={title} message={message} />, {
      autoClose: autoClose,
      transition: bounceTransition,
    });
  };

  return { show };
};
