import { ReactNode } from "react";
import BareBonesModal from "../../components/Modals/BareBonesModal/BareBonesModal";
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
        <BareBonesModal key={index} index={index}>
          {Content}
        </BareBonesModal>
      ))}
    </>
  );
};

export default ModalProvider;
