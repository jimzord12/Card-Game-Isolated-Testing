import { ImageContextAPI } from "../../context/ImageContext/ImageContextV3";
import styles from "./rotateDevice.module.css";
interface Props {
  show: boolean;
}
const RotateDevice = ({ show }: Props) => {
  const { images } = ImageContextAPI();
  console.log("&&&&&&&&&&&&&&& ", images);
  if (!show) return null;
  return (
    <div className={styles.rotateDeviceOverlay}>
      <p className={styles.rotateText}>
        Please rotate your device to landscape mode.
      </p>
      <img className={styles.rotateImg} src={images?.appUtils.rotateDeviceImg} alt="rotate" />
    </div>
  );
};

export default RotateDevice;
