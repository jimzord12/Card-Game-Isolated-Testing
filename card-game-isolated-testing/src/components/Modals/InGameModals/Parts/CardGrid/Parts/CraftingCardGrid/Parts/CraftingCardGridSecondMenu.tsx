import BuildingCard from "../../../../../../../../classes/buildingClass_V2";
import RegCard from "../../../../../../../../classes/regClass_V2";
import SPCard from "../../../../../../../../classes/spClass_V2";
import {
  BuildingTemplateId,
  CardClass,
  RegTemplateId,
  SPTemplateId,
} from "../../../../../../../../types";
import { isSPCard } from "../../../../../../../../types/TypeGuardFns/SPGuards";
import CompleteCard from "../../../../../../../Cards/CardTemplates/CompleteCard/CompleteCard";
import SecondsMenuSection from "./SecondMenuParts/SecondsMenuSection";
import SecondsMenuSectionSP from "./SecondMenuParts/SecondsMenuSectionSP";
import vertDivider from "../../../../../../../../assets/craftAndInvModals/cardGrid/vertical_section_divider.png";
import { useModalStore } from "../../../../../../../../stores/modalStore";
import ConfirmationModal from "../../../../../../ConfirmationModal/ConfirmationModal";

interface Props {
  selectedCard: CardClass | null;
  handleCraftClick: (card: CardClass) => void;
}

const CraftingCardGridSecondMenu = ({
  selectedCard,
  handleCraftClick,
}: Props) => {
  const pushModal = useModalStore((state) => state.pushModal);

  let currentlySelectedCard: CardClass;
  switch (selectedCard?.type) {
    case "building":
      currentlySelectedCard = BuildingCard.createNew({
        ownerId: 0,
        playerName: "playerName",
        templateId: selectedCard.templateId! as BuildingTemplateId,
      });
      break;

    case "reg":
      currentlySelectedCard = RegCard.createNew({
        ownerId: 0,
        playerName: "playerName",
        templateId: selectedCard.templateId! as RegTemplateId,
      });
      break;

    case "sp":
      currentlySelectedCard = SPCard.createNew({
        ownerId: 0,
        playerName: "playerName",
        templateId: selectedCard.templateId! as SPTemplateId,
      });
      break;

    default:
      throw new Error("⛔ CraftingCardGrid: SecondMenu: cardType is undefined");
  }

  const openConfirmationModal = () => {
    pushModal(
      <ConfirmationModal
        title="Crafting a Card"
        message={`Are you certain you wish to proceed?`}
        onConfirm={() => handleCraftClick(currentlySelectedCard)}
      />
    );
  };

  return (
    <div
      key={"CardisSelected-" + selectedCard}
      className="single-card-container"
    >
      <div className="card-plus-btns">
        <CompleteCard card={currentlySelectedCard} currentModal="Craft" />
        <div className="single-card-btn-container">
          <button
            className="single-card-btn btn-craft"
            // I use tge closeBtn class cuz I'm bored of renaming it :P
            style={{
              padding: "5px 10px",
              borderRadius: "10px",
              boxShadow: "1px 2px 2px 0px black",
            }}
            onClick={openConfirmationModal}
          >
            Craft ⚙
          </button>
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
        {isSPCard(currentlySelectedCard) ? (
          <span className="single-card-desc-span">
            This Card does not require Maintenance
          </span>
        ) : (
          <ul>
            {!isSPCard(currentlySelectedCard) && (
              <SecondsMenuSection
                category="maintenance"
                currentlySelectedCard={currentlySelectedCard}
                context="craft"
              />
            )}
          </ul>
        )}
        {/* MAINTENAMCE SECTION - END */}

        {/* REQUIREMENTS SECTION - SP CARDS - START */}
        <h3> Requirements </h3>

        {/* SP CARDS - START */}
        {isSPCard(currentlySelectedCard) && (
          <SecondsMenuSectionSP
            category="requirements"
            currentlySelectedCard={currentlySelectedCard}
            context="craft"
          />
        )}
        {/* SP CARDS - END */}

        {/* <NOT> SP CARDS - START */}
        {!isSPCard(currentlySelectedCard) && (
          <SecondsMenuSection
            category="requirements"
            currentlySelectedCard={currentlySelectedCard}
            context="craft"
          />
        )}
        {/* <NOT> SP CARDS - END */}
        {/* REQUIREMENTS SECTION - END */}

        {/* OUTPUT SECTION - START */}

        <h3> Output </h3>

        {/* SP CARDS - START */}
        {isSPCard(currentlySelectedCard) && (
          <SecondsMenuSectionSP
            category="output"
            currentlySelectedCard={currentlySelectedCard}
            context="craft"
          />
        )}
        {/* SP CARDS - END */}

        {/* <NOT> SP CARDS - START */}
        {!isSPCard(currentlySelectedCard) && (
          <SecondsMenuSection
            category="output"
            currentlySelectedCard={currentlySelectedCard}
            context="craft"
          />
        )}
        {/* <NOT> SP CARDS - END */}

        {/* OUTPUT SECTION - END */}
      </div>
    </div>
  );
};

export default CraftingCardGridSecondMenu;
