// GlowImage.tsx
import styles from "./styles.module.css";

interface GlowImageProps {
  src: string;
  alt: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const GlowImage: React.FC<GlowImageProps> = ({
  src,
  alt,
  isHovered,
  onHover,
  onLeave,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.onMap} ${isHovered ? styles.outlineGlowImage : ""}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    />
  );
};

export default GlowImage;
