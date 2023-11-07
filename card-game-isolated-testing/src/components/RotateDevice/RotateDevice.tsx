import styles from "./rotateDevice.module.css";
interface Props {
  show: boolean;
}
const RotateDevice = ({ show }: Props) => {
  if (!show) return null;
  return (
    <div className={styles.rotateDeviceOverlay}>
      <p className={styles.rotateText}>
        Please rotate your device to landscape mode.
      </p>
    </div>
  );
};

export default RotateDevice;
