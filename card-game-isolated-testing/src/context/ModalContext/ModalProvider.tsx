import type { ReactNode } from "react";
import Backdrop from "../../components/Modals/Backdrop/Backdrop";
import { useModalStore } from "../../stores/modalStore";

interface Props {
  children: ReactNode;
}

const ModalProvider = ({ children }: Props) => {
  const modals = useModalStore((state) => state.stack);

  return (
    <>
      {children}
      {modals.map((Content, index) => (
        <Backdrop key={index} index={index}>
          {Content}
        </Backdrop>
      ))}
    </>
  );
};

export default ModalProvider;
