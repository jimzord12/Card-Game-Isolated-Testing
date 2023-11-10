import { UseGlobalContext } from "../../context/GlobalContext/GlobalContext";
import styles from "./rotateDevice.module.css";
interface Props {
  show: boolean;
}
const RotateDevice = ({ show }: Props) => {
  const { images } = UseGlobalContext();

  if (!show) return null;
  return (
    <div className={styles.rotateDeviceOverlay}>
      <p className={styles.rotateText}>
        Please rotate your device to landscape mode.
      </p>
      <img
        className={styles.rotateImg}
        src={images?.appUtils.rotateDeviceImgAppUtil}
        alt="rotate"
      />
    </div>
  );
};

export default RotateDevice;
