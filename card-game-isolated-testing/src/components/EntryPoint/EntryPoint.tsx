import { lazy, useEffect, useState } from "react";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";

const ImageProviderV3 = lazy(
  () => import("../../context/ImageContext/ImageContextV3")
);
const Game = lazy(() => import("../Game/Game"));

const EntryPoint = () => {
  // const { images, areImagesReady } = ImageContextAPI();
  const [loading, setLoading] = useState(true);
  const [hasLoadingScreenLoaded, setHasLoadingScreenLoaded] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (hasLoadingScreenLoaded) setStart(true);
  }, [hasLoadingScreenLoaded]);

  return (
    <>
      {loading && (
        <LoadingScreen
          setHasLoadingScreenLoaded={() => setHasLoadingScreenLoaded(true)}
        />
      )}

      {start && (
        <ImageProviderV3 setLoading={setLoading}>
          <Game />
        </ImageProviderV3>
      )}
    </>
  );
};

export default EntryPoint;
