// useToastError.js
import { toast } from "react-toastify";
import CustomToastError from "./parts/CustomToastError";
// Correct the path to your CustomToastError component

interface Props {
  autoClose?: number;
}

export const useToastError = ({ autoClose = 10000 }: Props = {}) => {
  const showError = (
    title = "Error",
    message = "Something went wrong!",
    specialText?: string,
    closeAfter?: number,
    draggable?: boolean,
    closeOnClick?: boolean
  ) => {
    toast.error(
      // Using .error to get the default error styling, you can modify further if needed
      <CustomToastError
        title={title}
        message={message}
        specialText={specialText}
      />,
      {
        autoClose: closeAfter !== undefined ? closeAfter : autoClose,
        draggable: draggable !== undefined ? draggable : true,
        closeOnClick: closeOnClick !== undefined ? closeOnClick : true,
        // autoClose: false,
      }
    );
  };

  return { showError };
};
