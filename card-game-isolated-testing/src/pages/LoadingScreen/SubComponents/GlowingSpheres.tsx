import styles from "./spheres.module.css";

const GlowingSpheres = () => {
  return (
    <div>
      <Shere1 />
      <Shere2 />
      <Shere3 />
      <Shere4 />
      <Shere5 />
    </div>
  );
};

const Shere1 = () => (
  <div
    className={`${styles.baseShape} ${styles.shape1} ${styles.delay1}`}
  ></div>
);
const Shere2 = () => (
  <div
    className={`${styles.baseShape} ${styles.shape2} ${styles.delay2}`}
  ></div>
);
const Shere3 = () => (
  <div
    className={`${styles.baseShape} ${styles.shape3} ${styles.delay5}`}
  ></div>
);
const Shere4 = () => (
  <div
    className={`${styles.baseShape} ${styles.shape4} ${styles.delay3}`}
  ></div>
);
const Shere5 = () => (
  <div
    className={`${styles.baseShape} ${styles.shape5} ${styles.delay4}`}
  ></div>
);

export default GlowingSpheres;
