import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardGrid from "../Parts/CardGrid/CardGrid";
import CardManager from "../Parts/CardManager/CardManager";

import "./inventoryModal.css";
import { CardClass } from "../../../../types/index.js";
import { useAllCardsStore } from "../../../../stores/allCards.js";
import useGetLabelsSize from "../../../../hooks/game/useGetLabelsSize.js";

interface InventoryModalProps {
  isInvModalOpen: boolean;
  setIsInvModalOpen: (isOpen: boolean) => void;
}

export default function InventoryModal({
  isInvModalOpen,
  setIsInvModalOpen,
}: InventoryModalProps) {
  //   const { activeCards, inventoryCards, playerContextInitialized } =
  //     usePlayerContext();
  // TODO: Use Zustang store to get the cards

  const inventoryCards = useAllCardsStore((state) => state.inventory);
  const [isOpen, setIsOpen] = useState(isInvModalOpen);
  const [filteredCardsModal, setFilteredCardsModal] =
    useState<CardClass[]>(inventoryCards);
  const [selectedCardModal, setSelectedCardModal] = useState<CardClass | null>(
    null
  ); // This holds the selected Card
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const deviceSize = useGetLabelsSize();

  useEffect(() => {
    setIsOpen(isInvModalOpen);
    // console.log("Inventory Modal, UseEffect: Current Cards: ", inventoryCards);
  }, [isInvModalOpen]);

  useEffect(() => {
    setFilteredCardsModal(inventoryCards);
  }, [inventoryCards]);

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleModalClick);

  //   return () => {
  //     document.removeEventListener("mousedown", handleModalClick);
  //   };
  // });

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const onFilteredCardsChange = (filteredCards: CardClass[]) => {
    setFilteredCardsModal([...filteredCards]);
  };

  //   function scrollToTop() {
  //     modalRef.current.scrollTo({
  //       top: 0,
  //       behavior: "instant",
  //     });
  //   }

  const closeModal = () => {
    setIsInvModalOpen(false);
    setIsOpen(false);
    const id = setTimeout(() => {
      setSelectedCardModal(null);
    }, 750);
    setTimeoutId(id);
  };

  //   function handleCardClickScroll() {
  //     scrollToTop();
  //   }

  return (
    <>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // ref={modalRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.75 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: "fit-content",
              maxHeight: deviceSize === "extraSmall" ? "100%" : "85%",
              paddingBottom: "65px",
              zIndex: 501,
              padding: "20px",
              overflowY: "auto",
              borderTop: "4px solid black",
              background: "linear-gradient(to bottom, #45B649, #DCE35B)",
              borderRadius: "15px 15px 0px 0px",
            }}
            // onClick={handleModalClick}
          >
            <button
              className="closeBtn"
              style={{
                // position: "absolute",
                position: "sticky",
                zIndex: 10,
                // right: "10px",
                left: "97%",
                top: "10px",
                backgroundColor: "#4286f4",
                color: "white",
                marginTop: "0px",
                padding: "5px 10px",
                borderRadius: "10px",
                boxShadow: "1px 2px 2px 0px black",
              }}
              onClick={closeModal}
            >
              Close
            </button>

            <div className="modal-content">
              {/* Start - Conditional Rendering Here, when no Card has been selected */}
              {selectedCardModal === null && (
                <div className="modal-body">
                  <div className="filtering-column">
                    <CardManager
                      cards={inventoryCards}
                      onFilteredCardsChange={onFilteredCardsChange}
                    />
                  </div>
                  <div className="card-column">
                    <CardGrid
                      cards={filteredCardsModal}
                      setSelectedCardModal={setSelectedCardModal}
                      selectedCardModal={selectedCardModal}
                      // handleCardClickScroll={handleCardClickScroll}
                      currentModal="Inventory"
                      setIsOpen={setIsOpen}
                      closeModal={closeModal}
                    />
                  </div>
                </div>
              )}
              {/* End - Conditional Rendering Here, when no Card has been selected */}
              {/* ********************************* */}
              {/* Start - When a Card is selected */}

              {selectedCardModal !== null && (
                <div className="modal-body">
                  {/* <div className="filtering-column">
                    <CardManager
                      cards={cards}
                      onFilteredCardsChange={onFilteredCardsChange}
                    />
                  </div> */}
                  <div className="card-column">
                    <CardGrid
                      cards={filteredCardsModal}
                      setSelectedCardModal={setSelectedCardModal}
                      selectedCardModal={selectedCardModal}
                      currentModal="Inventory"
                      setIsOpen={setIsOpen}
                      closeModal={closeModal}
                    />
                  </div>
                  <button
                    className="closeBtn"
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "10px",
                      width: "fit-content",
                      backgroundColor: "#4286f4",
                      color: "white",
                      marginTop: "0px",
                      padding: "5px 10px",
                      borderRadius: "10px",
                      boxShadow: "1px 2px 2px 0px black",
                    }}
                    onClick={() => setSelectedCardModal(null)}
                  >
                    Go Back
                  </button>
                </div>
              )}
              {/* End - When a Card is selected */}
              <div className="modal-footer">{/* Render the footer here */}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
