import React from "react";
import GlowingSpheres from "./SubComponents/GlowingSpheres";
import styles from "./loadingScreen.module.css";

// interface Props {
//   // setHasLoadingScreenLoaded: RefObject<boolean>;
//   setHasLoadingScreenLoaded: () => void;
// }

const LoadingScreen = React.memo(() => {
  // const LoadingScreen = React.memo(({ setHasLoadingScreenLoaded }: Props) => {

  // useEffect(() => {
  //   // setHasLoadingScreenLoaded(true);
  //   setHasLoadingScreenLoaded();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const { loadingProgress } = ImageContextAPI();
  return (
    <div className={styles.loadingScreenContainer}>
      <GlowingSpheres />
      <div className={styles.innerContainer}>
        <div className={styles.cssLoader}>
          <div className={styles.percentageIndicator}>♥</div>
        </div>
        <div className={styles.spacer} />
        <h3 className={styles.loadingScreenText}>Downloading Game Assets</h3>
      </div>
    </div>
  );
});

export default LoadingScreen;
