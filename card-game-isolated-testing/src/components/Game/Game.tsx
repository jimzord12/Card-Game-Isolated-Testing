import { Suspense, lazy, useState } from "react";
import ModalProvider from "../../context/ModalContext/ModalProvider";
import UseLandscape from "../../hooks/useLandscape";
import RotateDevice from "../RotateDevice/RotateDevice";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";
import { useRequireAuth } from "../../hooks/auth/useRequiresAuth";
import CustomButton from "../Buttons/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import GameButton from "../Buttons/GameButton/GameButton";
// import CraftCardModal from "../Modals/InGameModals/CraftCardModal/CraftCardModal";
// import InventoryModal from "../Modals/InGameModals/InventoryModal/InventoryModal";

const ImageProviderV5 = lazy(
  () => import("../../context/GlobalContext/GlobalContext")
);
const TownMap = lazy(() => import("../../pages/Maps/TownMap/TownMap"));
const WorldMap = lazy(() => import("../../pages/Maps/WorldMap/WorldMap"));

const CraftCardModal = lazy(
  () => import("../Modals/InGameModals/CraftCardModal/CraftCardModal")
);
const InventoryModal = lazy(
  () => import("../Modals/InGameModals/InventoryModal/InventoryModal")
);

type MapTypes = "town" | "world";

const Game = () => {
  const shouldShow = UseLandscape();
  const [loading, setLoading] = useState(true);
  const [mapToDisplay, setMapToDisplay] = useState<MapTypes>("world");

  const [isInvModalOpen, setIsInvModalOpen] = useState(false);
  const [isCraftModalOpen, setIsCraftModalOpen] = useState(false);

  const navigate = useNavigate();

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
              {/* INV + CRAFT MODALS */}

              <CraftCardModal
                isCraftModalOpen={isCraftModalOpen}
                setIsCraftModalOpen={setIsCraftModalOpen}
              />
              <InventoryModal
                isInvModalOpen={isInvModalOpen}
                setIsInvModalOpen={setIsInvModalOpen}
              />

              <div className="z-[401] absolute top-4 left-20">
                <CustomButton
                  title="Swap Map"
                  handleClick={() =>
                    setMapToDisplay((prev) =>
                      prev === "world" ? "town" : "world"
                    )
                  }
                />
              </div>
              <div className="z-[401] absolute top-24 left-20">
                <CustomButton
                  title="Marketplace"
                  restStyles="bg-blue-500 hover:bg-blue-700"
                  handleClick={() => navigate("/marketplace/")}
                />
              </div>
              <div className="z-[401] absolute top-44 left-20">
                <CustomButton
                  title="Leaderboard"
                  restStyles="bg-violet-500 hover:bg-violet-700"
                  handleClick={() => navigate("/leaderboard/")}
                />
              </div>
              <div className="z-[401] absolute top-64 left-20">
                <GameButton
                  onClick={() => {
                    setIsInvModalOpen(false);
                    setIsCraftModalOpen((prev) => !prev);
                  }}
                  text="Craft Modal"
                  btnType="primary"
                />
              </div>
              <div className="z-[401] absolute top-[336px] left-20">
                <GameButton
                  onClick={() => {
                    setIsCraftModalOpen(false);
                    setIsInvModalOpen((prev) => !prev);
                  }}
                  text="Inventory Modal"
                  btnType="primary"
                />
              </div>

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
