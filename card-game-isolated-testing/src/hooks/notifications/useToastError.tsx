// useToastError.js
import { toast, cssTransition } from "react-toastify";
import CustomToastError from "./parts/CustomToastError";
// Correct the path to your CustomToastError component

interface Props {
  autoClose?: number;
}

export const useToastError = ({ autoClose = 10000 }: Props = {}) => {
  const showError = (
    title = "Error",
    message = "Something went wrong!",
    specialText = "For this Reason"
  ) => {
    const bounceTransition = cssTransition({
      enter: "bounce-in",
      exit: "bounce-out",
    });

    toast.error(
      // Using .error to get the default error styling, you can modify further if needed
      <CustomToastError
        title={title}
        message={message}
        specialText={specialText}
      />,
      {
        autoClose: autoClose,
        transition: bounceTransition,
      }
    );
  };

  return { showError };
};
