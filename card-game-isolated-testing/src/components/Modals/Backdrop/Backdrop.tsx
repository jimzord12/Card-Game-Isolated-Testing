import type { ReactNode } from "react";

import styles from "./Backdrop.module.css";

type Props = {
  children: ReactNode;
  index: number;
};

const Backdrop = ({ children }: Props) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Backdrop;
