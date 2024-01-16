import { Suspense, lazy, useState } from "react";
import ModalProvider from "../../context/ModalContext/ModalProvider";
import UseLandscape from "../../hooks/useLandscape";
import RotateDevice from "../RotateDevice/RotateDevice";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";
import { useRequireAuth } from "../../hooks/auth/useRequiresAuth";

const ImageProviderV5 = lazy(
  () => import("../../context/GlobalContext/GlobalContext")
);
const TownMap = lazy(() => import("../../pages/Maps/TownMap/TownMap"));
const WorldMap = lazy(() => import("../../pages/Maps/WorldMap/WorldMap"));

type MapTypes = "town" | "world";

const Game = () => {
  const shouldShow = UseLandscape();
  const [loading, setLoading] = useState(true);
  const [mapToDisplay /*setMapToDisplay*/] = useState<MapTypes>("world");

  const auth = useRequireAuth();

  // If not authenticated, nothing will be rendered and user will be redirected
  if (!auth.user) return null;

  return (
    <>
      {loading && <LoadingScreen />}
      <Suspense
        fallback={<div>Dynamically Importing the ImageProviderV5...</div>}
      >
        <ImageProviderV5 setLoading={setLoading}>
          {!loading && (
            <>
              <RotateDevice show={shouldShow} />
              <ModalProvider>
                {mapToDisplay === "town" && <TownMap />}
                {mapToDisplay === "world" && <WorldMap />}
              </ModalProvider>
            </>
          )}
        </ImageProviderV5>
      </Suspense>
    </>
  );
};

export default Game;
