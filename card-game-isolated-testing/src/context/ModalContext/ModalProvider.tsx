import { ReactNode } from "react";
import Modal from "../../components/Modals/BaseModal/Modal";
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
        <Modal key={index} index={index}>
          {Content}
        </Modal>
      ))}
    </>
  );
};

export default ModalProvider;
