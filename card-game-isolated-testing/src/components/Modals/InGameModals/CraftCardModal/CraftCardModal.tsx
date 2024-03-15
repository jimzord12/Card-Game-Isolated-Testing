import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardGrid from "../Parts/CardGrid/CardGrid";
import CardCategory from "../../../Cards/CardCategory/CardCategory";
import { cardCategoryImgs } from "../../../../assets/craftAndInvModals/cardCategoryImgs/index.js";
import "./craftCardModal.css";
import { typeFinder } from "./utils.js";
import { CardClass, CardType } from "../../../../types/index.js";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useAllCardsStore } from "../../../../stores/allCards.js";
import useGetLabelsSize from "../../../../hooks/game/useGetLabelsSize.js";

// TODO: Create a Class for General CardsDd Classes and based on the Card Type, create the correct Card Class
// const CardCategory = lazy(
//   () => import("../../../Cards/CardCategory/CardCategory")
// );

interface Props {
  isCraftModalOpen: boolean;
  setIsCraftModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CraftCardModal({
  isCraftModalOpen,
  setIsCraftModalOpen,
}: Props) {
  const [isOpen, setIsOpen] = useState(isCraftModalOpen);
  const [cards, setCards] = useState<CardClass[] | null>(null);
  const [filteredCardsModal, setFilteredCardsModal] = useState<
    CardClass[] | null
  >(null);
  const [selectedCardModal, setSelectedCardModal] = useState<CardClass | null>(
    null
  ); // This holds the selected Card
  const [typeSelection, setTypeSelection] = useState<CardType | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // const [initCompleted, setInitCompleted] = useState(false);
  const [cardsInitCompleted, setCardsInitCompleted] = useState(false);
  const templateCards = useAllCardsStore((state) => state.templateCards);

  const deviceSize = useGetLabelsSize();
  // const hasUseEffectRun = useRef(false);

  // const NameToImgMapping = {
  //   WindTurbine: WindTurbine_V2,
  //   Workaholism: workaholismImg,
  //   Techstore: Techstore,
  // };

  useEffect(() => {
    setIsOpen(isCraftModalOpen);
  }, [isCraftModalOpen]);

  // Init Cards - Step #1
  useEffect(() => {
    // if (!hasUseEffectRun.current) {
    //   hasUseEffectRun.current = true;
    // const templateCards = cardsInit();
    // console.log("Craft Modal: Suka! cards: ", cards);
    console.log("CraftModal: templateCards: ", templateCards);
    setCards(templateCards);
    setCardsInitCompleted(true);
    // }
  }, []);

  // Init State - Step #2
  useEffect(() => {
    if (cardsInitCompleted) {
      // console.log("Craft Modal: Filtered cards: ", cards);
      setFilteredCardsModal(cards);
      // setCardsInitCompleted(false);
    }
  }, [cardsInitCompleted]);

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

  // function cardsInit(obj) {
  //   console.log("======== Craft Modal Cards ========");
  //   const cards = [];

  //   // const inventoryCardsArr = [];
  //   for (const [key, cardSpecs] of Object.entries(obj)) {
  //     if (obj.hasOwnProperty(key) && !isNaN(Number(key))) {
  //       // console.log(key);
  //       // console.log(cardSpecs);
  //       const jsCard = new classCard_Craft(cardSpecs, key);
  //       jsCard.image = NameToImgMapping[jsCard.img];
  //       cards.push(jsCard);
  //       console.log("Card ===> ", jsCard);
  //     }
  //   }
  //   console.log("======== ======== ========");
  //   return cards;
  // }

  const resetCardFilters = () => {
    setFilteredCardsModal(cards);
  };

  // const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsCraftModalOpen(false);
    setSelectedCardModal(null);
    const id = setTimeout(() => {
      setSelectedCardModal(null);
      setTypeSelection(null);
    }, 750);
    setTimeoutId(id);
  };

  // Prevent click inside the modal from closing it
  const handleCloseModalContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // function handleCardClickScroll() {
  //   scrollToTop();
  // }

  function handleSimpleCardSelection(selection: string) {
    // console.log("Selection: ", selection.toLowerCase());
    // console.log("selectedCardModal: ", selectedCardModal);
    if (selection.toLowerCase() === "building") {
      setTypeSelection("building");
      // console.log('The', selection, 'Card Type was selected!');
    }

    if (selection.toLowerCase() === "reg") {
      setTypeSelection("reg");
      // console.log('The', selection, 'Card Type was selected!');
    }

    if (selection.toLowerCase() === "sp") {
      setTypeSelection("sp");
      // console.log('The', selection, 'Card Type was selected!');
    }

    if (typeof selection === "string") {
      if (filteredCardsModal === null)
        throw new Error(
          "⛔ CraftCardModal: handleSimpleCardSelection: filteredCardsModal is null"
        );

      const filteredCards = filteredCardsModal.filter(
        (card) => card.type.toLowerCase() === selection.toLowerCase()
      );
      // console.log("handleSimpleCardSelection: asdasd: ", filteredCards);
      setFilteredCardsModal(filteredCards);
      return;
    }
    throw new Error(
      "CardCategory.jsx: handleSimpleCardSelection() => Invalid arg"
    );
  }

  return (
    <AnimatePresence>
      {/* <button onClick={openModal}>Open Modal</button> */}
      {isOpen && cardsInitCompleted && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.75 }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            overflowY: "hidden",
            width: "100%",
            height: "fit-content",
            maxHeight: deviceSize === "extraSmall" ? "100%" : "85%",
            zIndex: 501,
            padding: "20px",
            paddingBottom: "65px",
            // overflowY: "auto", ✨
            borderTop: "4px solid black",
            background: "linear-gradient(to bottom, #45B649, #DCE35B)",
            borderRadius: "15px 15px 0px 0px",
          }}
          // onClick={handleCloseModalClick}
        >
          <button
            className="closeBtn"
            style={{
              position: "fixed",
              right: "10px",
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

          {typeSelection !== null && (
            <button
              className="closeBtn"
              style={{
                position: "fixed",
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
              onClick={() => {
                setTypeSelection(null);
                resetCardFilters();
              }}
            >
              Go Back
            </button>
          )}

          <LazyLoadComponent placeholder={<span>Loading...</span>}>
            <div
              className="modal-content"
              onClick={handleCloseModalContentClick}
            >
              {/* Step #1 | Select Type of Card to Craft */}
              {typeSelection === null && (
                <div className="modal-body unselected">
                  <div className="craft-card-typeSelection-container">
                    <CardCategory
                      image={cardCategoryImgs.buildingCategory}
                      text="Building"
                      handleSimpleCardSelection={handleSimpleCardSelection}
                    />
                    {/* </LazyLoadComponent> */}
                    {/* <LazyLoadComponent placeholder={<span>Loading...</span>}> */}
                    <CardCategory
                      image={cardCategoryImgs.REG_Category}
                      text="REG"
                      handleSimpleCardSelection={handleSimpleCardSelection}
                    />
                    {/* </LazyLoadComponent> */}
                    {/* <LazyLoadComponent placeholder={<span>Loading...</span>}> */}
                    <CardCategory
                      image={cardCategoryImgs.SP_Category}
                      text="Special Effect"
                      handleSimpleCardSelection={handleSimpleCardSelection}
                    />
                  </div>
                </div>
              )}

              {/* Step #2 | Show Available Cards + Filtering Functionality */}

              {/* Step #2.1 | Start - Conditional Rendering Here, when no Card has been selected */}
              {selectedCardModal === null &&
                typeSelection !== null &&
                filteredCardsModal !== null && (
                  <>
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "32px",
                        fontWeight: 600,
                        color: "white",
                        textShadow: "2px 2px black",
                        marginTop: "24px",
                      }}
                    >
                      {typeFinder(typeSelection)}
                    </div>
                    <div className="modal-body">
                      {/* Cards Display Container */}
                      <div className="card-column">
                        <CardGrid
                          cards={filteredCardsModal}
                          setSelectedCardModal={setSelectedCardModal}
                          selectedCardModal={selectedCardModal}
                          closeModal={closeModal}
                          // handleCardClickScroll={handleCardClickScroll}
                          currentModal="Craft"
                          setIsOpen={setIsOpen}
                        />
                      </div>
                    </div>
                  </>
                )}
              {/* End - Conditional Rendering Here, when no Card has been selected */}
              {/* ********************************* */}

              {/* When a Card is selected/clicked... */}
              {selectedCardModal !== null && filteredCardsModal !== null && (
                <div className="modal-body">
                  <div className="card-column">
                    <CardGrid
                      cards={filteredCardsModal}
                      setSelectedCardModal={setSelectedCardModal}
                      selectedCardModal={selectedCardModal}
                      currentModal="Craft"
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
          </LazyLoadComponent>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
