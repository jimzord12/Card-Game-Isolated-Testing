import { lazy, useEffect, useState } from "react";
import UseLandscape from "../../hooks/useLandscape";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";
import RotateDevice from "../RotateDevice/RotateDevice";

const ImageProviderV5 = lazy(
  () => import("../../context/GlobalContext/GlobalContext")
);
const Game = lazy(() => import("../Game/Game"));

const EntryPoint = () => {
  // const { images, areImagesReady } = ImageContextAPI();
  const [loading, setLoading] = useState(true);
  const [hasLoadingScreenLoaded, setHasLoadingScreenLoaded] = useState(false);
  const [start, setStart] = useState(false);

  const show = UseLandscape();

  useEffect(() => {
    if (hasLoadingScreenLoaded) setStart(true);
  }, [hasLoadingScreenLoaded]);
  // throw new Error("Asdas");
  return (
    <>
      {loading && (
        <LoadingScreen
          setHasLoadingScreenLoaded={() => setHasLoadingScreenLoaded(true)}
        />
      )}

      {start && (
        <ImageProviderV5 setLoading={setLoading}>
          {!loading && (
            <>
              <RotateDevice show={show} />
              <Game />
            </>
          )}
        </ImageProviderV5>
      )}
    </>
  );
};

export default EntryPoint;
