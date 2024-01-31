import { CardClass } from "../../../../../../../../types";
import { isSPCard } from "../../../../../../../../types/TypeGuardFns/SPGuards";
import CompleteCard from "../../../../../../../Cards/CardTemplates/CompleteCard/CompleteCard";
import InvSecondMenuSection from "./SecondMenuParts/InvSecondMenuSection";
import InvSecondMenuSectionSP from "./SecondMenuParts/InvSecondMenuSectionSP";
import vertDivider from "../../../../../../../../assets/craftAndInvModals/cardGrid/vertical_section_divider.png";

interface Props {
  selectedCard: CardClass;
  handleSell: (card: CardClass) => void;
  handleLevelUp: (card: CardClass) => void;
}

const InventoryCardGridSecondMenu = ({
  selectedCard,
  handleSell,
  handleLevelUp,
}: Props) => {
  return (
    <div
      key={"CardisSelected-" + selectedCard}
      className="single-card-container"
    >
      <div className="card-plus-btns">
        <CompleteCard card={selectedCard} currentModal="Inventory" />
        <div className="single-card-btn-container">
          <button
            className="single-card-btn btn-sell"
            // I use tge closeBtn class cuz I'm bored of renaming it :P
            style={{
              padding: "5px 10px",
              borderRadius: "10px",
              boxShadow: "1px 2px 2px 0px black",
            }}
            onClick={() => handleSell(selectedCard)}
          >
            Sell
          </button>
          {isSPCard(selectedCard) ? null : (
            <button
              className="single-card-btn btn-levelUp"
              // I use tge closeBtn class cuz I'm bored of renaming it :P
              style={{
                padding: "5px 10px",
                borderRadius: "10px",
                boxShadow: "1px 2px 2px 0px black",
              }}
              onClick={() => handleLevelUp(selectedCard)}
            >
              Level Up
            </button>
          )}
        </div>
      </div>

      <img
        src={vertDivider}
        alt="-- Vertical Divider --"
        className="vertical-divider"
      />

      <div className="single-card-desc">
        {/* MAINTENAMCE SECTION - START */}
        <h3> Maintenance</h3>
        {isSPCard(selectedCard) ? (
          <span className="single-card-desc-span">
            This Card does not require Maintenance
          </span>
        ) : (
          <ul>
            {!isSPCard(selectedCard) && (
              <InvSecondMenuSection
                category="maintenance"
                selectedCard={selectedCard}
                context="inventory"
              />
            )}
          </ul>
        )}
        {/* MAINTENAMCE SECTION - END */}

        {/* REQUIREMENTS SECTION - SP CARDS - START */}
        <h3> Requirements </h3>

        {/* SP CARDS - START */}
        {isSPCard(selectedCard) && (
          <InvSecondMenuSectionSP
            category="requirements"
            selectedCard={selectedCard}
            context="inventory"
          />
        )}
        {/* SP CARDS - END */}

        {/* <NOT> SP CARDS - START */}
        {!isSPCard(selectedCard) && (
          <InvSecondMenuSection
            category="requirements"
            selectedCard={selectedCard}
            context="inventory"
          />
        )}
        {/* <NOT> SP CARDS - END */}
        {/* REQUIREMENTS SECTION - END */}

        {/* OUTPUT SECTION - START */}

        <h3> Output </h3>

        {/* SP CARDS - START */}
        {isSPCard(selectedCard) && (
          <InvSecondMenuSectionSP
            category="output"
            selectedCard={selectedCard}
            context="inventory"
          />
        )}
        {/* SP CARDS - END */}

        {/* <NOT> SP CARDS - START */}
        {!isSPCard(selectedCard) && (
          <InvSecondMenuSection
            category="output"
            selectedCard={selectedCard}
            context="inventory"
          />
        )}
        {/* <NOT> SP CARDS - END */}

        {/* OUTPUT SECTION - END */}
      </div>
    </div>
  );
};

export default InventoryCardGridSecondMenu;
