// import { ReactNode } from "react";
// import { useModalStore } from "../../stores/modalStore";

// import styles from "./baseModal.module.css";

// type Props = {
//   children: ReactNode;
//   index: number; // Index to identify which modal to close
//   // You can add more props that handle behaviors like closing the modal
// };

// const Modal = ({ children, index }: Props) => {
//   const popModal = useModalStore((state) => state.popModal);
//   // This function would handle closing the modal when the backdrop is clicked
//   const handleClose = () => {
//     // Logic to remove the modal from the stack
//     let times = useModalStore.getState().stack.length - 1 - index;
//     while (times >= 0) {
//       popModal();
//       times--;
//     }
//   };

//   return (
//     <div
//       className={
//         styles.modalBackdrop
//       } /* Enable to close on backdrop click onClick={handleClose} */
//     >
//       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//         {children}
//         <button className={styles.modalCloseButton} onClick={handleClose}>
//           &times;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import { ReactNode, useEffect, useState } from "react";
import { useModalStore } from "../../stores/modalStore";

import styles from "./baseModal.module.css";

type Props = {
  children: ReactNode;
  index: number;
};

const Modal = ({ children, index }: Props) => {
  const [isClosing, setIsClosing] = useState(false);
  const popModal = useModalStore((state) => state.popModal);
  const modalStack = useModalStore((state) => state.stack);

  useEffect(() => {
    if (modalStack.length - 1 < index) {
      setIsClosing(true);
    }
  }, [modalStack.length, index]);

  const handleClose = () => {
    setIsClosing(true);
    let times = modalStack.length - 1 - index;
    setTimeout(() => {
      while (times >= 0) {
        popModal();
        times--;
      }
    }, 700); // Set timeout to match animation duration
  };

  const modalClass = isClosing
    ? `${styles.modalContent} ${styles.slideOutEllipticTopBck}`
    : styles.modalContent;

  return (
    <div className={styles.modalBackdrop} onClick={handleClose}>
      <div className={modalClass} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.modalCloseButton} onClick={handleClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
