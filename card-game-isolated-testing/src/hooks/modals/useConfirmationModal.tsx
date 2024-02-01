import ConfirmationModal from "../../components/Modals/ConfirmationModal/ConfirmationModal";
import { useModalStore } from "../../stores/modalStore";
interface Props {
  title: string;
  message?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}
const useConfirmationModal = ({
  title,
  message,
  onConfirm,
  onCancel,
}: Props) => {
  const pushModal = useModalStore((state) => state.pushModal);
  const popModal = useModalStore((state) => state.popModal);

  const openConfirmationModal = () => {
    pushModal(
      <ConfirmationModal
        title={title}
        onConfirm={onConfirm}
        onCancel={onCancel}
        message={message}
      />
    );
  };

  const closeConfirmationModal = () => {
    popModal();
  };

  return { openConfirmationModal, closeConfirmationModal };
};

export default useConfirmationModal;
