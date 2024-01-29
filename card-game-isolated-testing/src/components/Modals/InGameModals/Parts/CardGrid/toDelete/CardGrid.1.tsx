// import { useEffect, useState } from "react";
// import { classREG } from "../../../../../classes/index.js";
// import {
//   isFloat,
//   rarityCoverter,
//   convertToMySQLDateTime,
//   convertToMySQLDate,
// } from "./utils";
// import Card from "../../../../Cards/TemplateCard/TemplateCard";
// import {
//   useToastConfetti,
//   useToastError,
// } from "../../../../../hooks/notifications";
// import vertDivider from "../../myAssets/vertical_section_divider.png";
// import CustomInput from "../../../../CustomInput/CustomInput";
// import { updateCardData } from "../../../../../../api/apiFns/index.js";
// import { cardsWithStats } from "../../../../../constants/game/gameConfig";
// import {
//   BuildingName,
//   CardClass,
//   CardRequirements,
//   RegName,
//   SPName,
// } from "../../../../../types/index.js";
// import SPCard from "../../../../../classes/spClass_V2.js";
// import { useCardMutations } from "./useCardMutations.js";
// import { useAllCardsStore } from "../../../../../stores/allCards.js";
// import { useGameVarsStore } from "../../../../../stores/gameVars.js";

// // interface IPlayerResources {
// //   gold: number;
// //   concrete: number;
// //   metals: number;
// //   crystals: number;
// //   population: number;
// //   energy: number;
// // }

// export default function CardGrid({
//   setSelectedCardModal,
//   selectedCardModal,
//   handleCardClickScroll,
//   currentModal,
//   setIsOpen,
// }) {
//   const {
//     activeCards, // TODO: Use Zustang Store, All Cards: activeCards,
//     setActiveCards, // TODO: Use Zustang Store, All Cards: addCardToActiveCards #1
//     // TODO: Use Zustang Store, All Cards: removeCardFromActiveCards #2
//     // TODO: Use Zustang Store, All Cards: removeCardFromInventory #2
//     materialResourcesRef, // TODO: use player from GameVards
//     testCardTemplateData, // TODO: constants/templates
//     energyRef, // TODO: use "energy" from GameVards
//     specialEffectsRef, // TODO: 🛑 NOT yet  implemented in GameVards
//     maxLimitsRef, // TODO: use "townhallLevel" from GameVards + 🛑 a constants file
//     fetchedPlayer, // TODO: use player from GameVards
//     awardPoints, // TODO: 🅱 🛑 Not yet implemented in Blockchain Hooks
//     createNFTCard, // TODO: 🅱 🛑 Not yet implemented in Blockchain Hooks
//   } = usePlayerContext();

//   const {
//     cards,
//     activeCards,
//     inventory: inventoryCards,
//     addCard,
//     removeCard,
//     addCardToActiveCards,
//     removeCardFromActiveCards,
//     addCardToInventory,
//     removeCardFromInventory,
//   } = useAllCardsStore((state) => state);

//   const {
//     energy,
//     energyConsumed,
//     energyProduced,
//     expences,
//     player,
//     updatePlayerData,
//   } = useGameVarsStore((state) => state);

//   const {
//     createCard_DB,
//     isSuccessNewCard,
//     newCardData,
//     createCardStats_DB,
//     putCardForSale,
//   } = useCardMutations();

//   const toastConfetti = useToastConfetti();
//   const toastError = useToastError();
//   const [newCard_2, setNewCard_2] = useState<CardClass | null>(null); // Can't think another name for "newCard" 🤣
//   const [showPriceInput, setShowPriceInput] = useState(false);
//   const [priceInput, setPriceInput] = useState("");

//   useEffect(() => {
//     console.log(
//       "CardGrid: UseEffect() Number of Activated Cards: ",
//       activeCards.length,
//       activeCards,
//       cards
//     );
//   }, [activeCards]);

//   // TODO: Refactor this. It's a mess! Insert it into
//   useEffect(() => {
//     if (isSuccessNewCard && newCardData?.cardId && newCard_2) {
//       const newCard = newCard_2;
//       newCard.id = newCardData.cardId;
//       // TODO: Add the new Card to the Blockchain 🅱
//       // TODO: Add the new Card to the Inventory
//       addCardToInventory(newCard);
//       // setInventoryCards((prev) => [...prev, newCard]); // TODO_DONE ✅: Use Zustang Store, All Cards: addCardToInventory(newCard)
//       if (cardsWithStats.includes(newCard.templateId)) {
//         createCardStats_DB({
//           cardId: newCard.id,
//           gold: 0,
//           concrete: 0,
//           metals: 0,
//           crystals: 0,
//           population: 0,
//           energy: 0,
//           rank: 0,
//           expenses: 0,
//         });
//       }

//       console.log("CardGrid::UseEffect() Complete New Card: ", newCard);

//       toastConfetti.show(
//         "Crafted New Card",
//         "Congratulations on Crafting a New Card!"
//       );
//     }
//   }, [
//     createCardStats_DB,
//     isSuccessNewCard,
//     newCard_2,
//     toastConfetti,
//     newCardData,
//   ]);

//   function createCard(
//     type: "reg" | "building" | "sp",
//     cardName: RegName | BuildingName | SPName
//   ) {
//     const cardData = {
//       id: null,
//       owner: fetchedPlayer.id,
//       templateId: Number(selectedCardModal),
//       playerName: fetchedPlayer.name,
//       cardName,
//     };

//     let freshCard: CardClass;

//     switch (type) {
//       case "reg":
//         freshCard = classREG.createNew(cardData, testCardTemplateData);
//         break;

//       case "building":
//         freshCard = new classCard_V2(
//           cardData,
//           testCardTemplateData[selectedCardModal],
//           true
//         );
//         break;

//       case "sp":
//         freshCard = new classCard_V2(
//           cardData,
//           testCardTemplateData[selectedCardModal],
//           true
//         );
//         break;

//       default:
//         throw new Error("⛔ CardGrid: createCard: Invalid Card Type!");
//     }

//     // checkAndSubtractRes(freshCard, "craft");
//     // 🅱 Blockchain: Game Smart Contract
//     awardPoints("cardCreation");
//     createNFTCard(newCard.id, newCard.templateId); // Blockchain: Game Smart Contract

//     console.log("CardGrid, Create Card: ", selectedCardModal);
//     console.log("CardGrid, Create Card Data: ", cardData);
//     // Rarity, Level, State, Locked are automatically calculated inside the Class
//     // Important! Add the 3rd Parameter to "true" when creating a new Card!
//     return freshCard;
//   }

//   /**
//    *
//    * @param _card Selected Card
//    * @param type Action type: "level" or "craft"
//    * @description Checks if the player has the resources to level up or craft a card. If yes, it subtracts the resources from the player. If not, it shows an alert with the missing resources.
//    */
//   function checkAndSubtractRes(_card: CardClass, type: "level" | "craft") {
//     if (
//       player === null ||
//       player.gold === null ||
//       player.concrete === null ||
//       player.metals === null ||
//       player.crystals === null ||
//       player.population === null ||
//       player.diesel === null ||
//       energy === null
//     )
//       throw new Error("⛔ CardGrid: checkAndSubtractRes: Player is null!");

//     const playerResources: CardRequirements = {
//       gold: player.gold,
//       concrete: player.concrete,
//       metals: player.metals,
//       crystals: player.crystals,
//       population: player.population,
//       diesel: player.diesel,
//     };
//     const alertFlags = [];

//     for (const key in _card.requirements) {
//       if (Object.hasOwnProperty.call(_card.requirements, key)) {
//         // Checks if the requirements are met
//         if (
//           playerResources[key as keyof CardRequirements] <
//           _card.requirements[key as keyof CardRequirements]
//         ) {
//           // If they are NOT...
//           alertFlags.push(key);
//         }
//       }
//     }

//     // 🔷 Players has enough resources
//     if (alertFlags.length === 0) {
//       if (type === "level" && !(_card instanceof SPCard) && _card.level === 5) {
//         toastError.showError(
//           "MAX Level",
//           "😅 Your Card is at the Maximum Level! It can not be leveled Up any further"
//         );
//         return;
//       }

//       // 🔷 Subtracks the Resources. Also Prints the Old and New Resources
//       for (const key in _card.requirements) {
//         if (Object.hasOwnProperty.call(_card.requirements, key)) {
//           console.log(
//             "Old [",
//             key,
//             "] => ",
//             playerResources[key as keyof CardRequirements]
//           );

//           // 🔷 Subtracts the Resources
//           playerResources[key as keyof CardRequirements] -=
//             _card.requirements[key as keyof CardRequirements];

//           // 🔷 Updates the State of GameVars Store
//           updatePlayerData(playerResources);

//           console.log(
//             "New [",
//             key,
//             "] => ",
//             playerResources[key as keyof CardRequirements]
//           );
//           console.log("------------------------------------");
//         }
//       }

//       if (type === "level" && !(_card instanceof SPCard) && _card.level >= 1) {
//         _card.levelUp(); //
//         const { level, id } = _card;
//         updateCardData({ id, level });
//         // setForceRerender((prev) => !prev);
//         // alert('💪 Awesome! You just leveled Up your Card!');
//         toastConfetti.show(
//           "Leveled Up Card",
//           "💪 Awesome! You just leveled Up your Card!"
//         );
//       }

//       if (type === "craft") {
//         const newCard = createCard(_card.type, _card.name);
//         console.log("The Newly Created Card: ", newCard);
//         setNewCard_2(newCard);
//         if (_card.type === "sp" && _card instanceof SPCard) {
//           const { templateId, rarity, creationTime } = newCard;
//           createCard_DB({
//             templateId,

//             ownerId: fetchedPlayer.id,
//             state: false,
//             locked: false,
//             rarity,
//             creationTime: convertToMySQLDate(creationTime),
//             creator: fetchedPlayer.name,
//           });
//         } else {
//           const { templateId, level, state, rarity, creationTime } = newCard;
//           createCard_DB({
//             templateId,
//             level,
//             ownerId: fetchedPlayer.id,
//             state,
//             locked: false,
//             rarity,
//             creationTime: convertToMySQLDate(creationTime),
//             creator: fetchedPlayer.name,
//           });
//         }
//       }
//     } else {
//       toastError.showError(
//         "Low on Resources",
//         "😬 You are short on the following Resources: ",
//         alertFlags.join(", ")
//       );
//     }
//   }

//   // Here we register the effects of SE Cards
//   // TODO: Fix When Creating Game Loop
//   function createEffect(_templateId, boost) {
//     if (specialEffectsRef.current.isEffectActive) {
//       return false;
//     }
//     if (testCardTemplateData[_templateId].name === "Workaholism") {
//       return {
//         isEffectActive: true,
//         // endDate: 1679833229000, // @Important!: Very bad naming! StartDate is the correct one!!!
//         endDate: Date.now(),
//         goldGathRate: 1,
//         popGrowthRate: 1,
//         concreteGathRate: boost,
//         metalsGathRate: boost,
//         crystalsGathRate: boost,
//       };
//     }
//   }

//   // TODO: Takes a Card Type and checks if there is available space for it. This is done by looking at the mapEntities in useTownMapStore
//   function checkSpace(cardType) {
//     if (cardType === "REG") {
//       const regCards = activeCards.filter(
//         (card) => card.type.toLowerCase() === "reg"
//       );
//       if (regCards.length === maxLimitsRef.current.generatorsSpace) {
//         // alert(
//         //   `😱 Currently, your Town can not utilize more than (${maxLimitsRef.current.generatorsSpace}) Generators. Consider Upgrading/Level Up your Town Hall Building.`
//         // );
//         toastError.showError(
//           "MAX Generator Capacity",
//           `😱 Currently, your Town can not utilize more than (${maxLimitsRef.current.generatorsSpace}) Generators. Consider Upgrading/Level Up your Town Hall Building.`
//         );
//         return false;
//       }
//     }

//     if (cardType === "Building") {
//       const buildingCards = activeCards.filter(
//         (card) => card.type.toLowerCase() === "building"
//       );
//       if (buildingCards.length === maxLimitsRef.current.buildingsSpace) {
//         // alert(
//         //   `😱 Currently, your Town can not have more than (${maxLimitsRef.current.buildingsSpace}) Buildings. Consider Upgrading/Level Up your Town Hall Building.`
//         // );
//         toastError.showError(
//           "MAX Buildings Capacity",
//           `😱 Currently, your Town can not utilize more than (${maxLimitsRef.current.buildingsSpace}) Buildings. Consider Upgrading/Level Up your Town Hall Building.`
//         );
//         return false;
//       }
//     }
//     return true;
//   }

//   const handleActivateClick = (_card) => {
//     console.log("Attempting Card Activation: ", _card);
//     const hasAvailSpace = checkSpace(_card.type);
//     // -3. Check if the Card is of type "Special Effect"
//     if (!hasAvailSpace) return; // If there is no available space, do nothing.
//     if (_card.type === "Special Effect") {
//       if (_card.disabled === true) {
//         // alert(
//         //   '😅 Special Effect Cards can be used only Once per Player. You have already used this one!'
//         // );
//         toastError.showError(
//           "MAX Special Effects Capacity",
//           "😅 Special Effect Cards can be used only Once per Player. You have already used this one!"
//         );
//       } else {
//         const effect = createEffect(
//           _card.templateId,
//           Number(_card.output.boost)
//         );
//         if (effect === false) {
//           // alert('Only one effect can be active at a time. 😅');
//           toastError.showError(
//             "MAX Special Effects Capacity",
//             "😅 Special Effect Cards can be used only Once per Player. You have already used this one!"
//           );
//           return;
//         } else {
//           const { id } = _card;
//           const mysqlDate = convertToMySQLDateTime(Date.now());
//           console.log("HandleActivateClick::MySQLDate: ", mysqlDate);
//           updateCardData({ id, state: true, endDate: mysqlDate });
//           specialEffectsRef.current = effect; // TODO: Add a Zustand Store Property "CurrentSPEffect" in GameVars
//         }
//       }
//     }

//     // (For REGs) Check if there is enough Gold to activate
//     if (_card.type.toLowerCase() === "reg") {
//       const regCards = activeCards.filter(
//         (card: CardClass) => card.type.toLowerCase() === "reg"
//       );
//       const playerGold = materialResourcesRef.current.gold; //TODO: Use Global Variable from GameVars

//       // TODO: Add a Zustand Store Property "maintenanceExpenses" in GameVars
//       const totalMaintenanceGold = regCards.reduce((acc, card) => {
//         return acc + card.maintenance.gold;
//       }, 0);
//       console.log("1 SUKA SUKA! ", playerGold);
//       console.log("2 SUKA SUKA! ", totalMaintenanceGold);
//       if (totalMaintenanceGold + _card.maintenance.gold > playerGold) {
//         // alert(
//         //   `😱 Your current Gold is not enough to pay for the maintenance of your Generators! Therefore, you can not activate any more generators.`
//         // );
//         toastError.showError(
//           "Low on Gold",
//           "😱 Your current Gold is not enough to pay for the maintenance of your Generators! Therefore, you can not activate any more generators."
//         );
//         return;
//       }
//     }

//     // -1. (For Buildings) Check if there is enough Energy to activate
//     // TODO: Add a Zustand Store Properties "energyDelta" in GameVars
//     if (
//       _card.maintenance?.energy !== undefined &&
//       energyRef.current.delta - _card.maintenance.energy < 0
//     ) {
//       // alert(`You need more ⚡ Energy to activate the (${_card.name}) Card!`);
//       toastError.showError(
//         "Insufficient Energy",
//         `You need more ⚡ Energy to activate the (${_card.name}) Card!`
//       );
//       return;
//     }
//     // 0. Change Card's State to true
//     _card.activate();

//     // 4. Update MySQL Database
//     const { state, id } = _card;
//     updateCardData({ id, state });

//     // 1. Add Selected Card => Activated Cards
//     setActiveCards((prev) => [...prev, _card]); // TODO: Use Zustang Store, All Cards: addCardToActiveCards(_card)

//     // 2. Remove Selected Card from the Inventory
//     // setInventoryCards([...removeObjectWithId(inventoryCards, _card.id)]); // TODO_DONE ✅: Use Zustang Store, All Cards: removeCardFromInventory(_card)
//     removeCardFromInventory(_card);

//     // 5. Go 1 step back in the Modal (Where all the cards are dispayed)
//     setSelectedCardModal(null);

//     // 6. Close the Modal
//     setIsOpen(false);
//   };

//   const handleSellClick = (_card: CardClass) => {
//     // handle sell functionality here
//     // setForceRerender((prev) => !prev);
//     if (showPriceInput) {
//       if (parseInt(priceInput) === 0 || priceInput === "") {
//         setShowPriceInput(false);
//         return;
//       }
//       putCardForSale({
//         cardId: _card.id,
//         in_mp: true,
//         priceTag: Number(priceInput),
//         state: false,
//       });

//       // setInventoryCards([...removeObjectWithId(inventoryCards, _card.id)]); // TODO_DONE ✅: Use Zustang Store, All Cards: removeCardFromInventory(_card)
//       removeCardFromInventory(_card);
//       setIsOpen(false);
//       setSelectedCardModal(null);
//       console.log("Sell Button was clicked!");
//       console.log("Active Card: ", activeCards);
//       console.log("Inventory: ", inventoryCards);
//       setShowPriceInput(false);
//       return;
//     } else {
//       setShowPriceInput(true);
//     }

//     // setIsOpen(false);
//   };

//   const handleLevelUpClick = (_card: CardClass) => {
//     checkAndSubtractRes(_card, "level");
//     setIsOpen(false);
//   };

//   const handleCraftClick = (_card: CardClass) => {
//     // handle craft functionality here
//     // 1. Check if player has the resources to craft the Card
//     // 2. If "Yes" => Next(), Else "No" Show AlertModal (Not yet created!)
//     // 3. Subtract the resources from the player
//     // 4. Create the new Card (It needs a unique ID)
//     // 5. Add the Card to:
//     //    1) MySQL
//     //    2) To Blockchain
//     //    3) Local Storage
//     //    4) Frontend => CardsInInventory (Context Variable
//     checkAndSubtractRes(_card, "craft");

//     // 6. Go 1 step back in the Modal (Where all the cards are dispayed)
//     setSelectedCardModal(null);

//     // 7. Close Gracefully the Modal
//     setIsOpen(false);
//   };

//   return (
//     <div
//       className={selectedCardModal === null ? "card-grid" : "single-card-grid"}
//     >
//       {/* Here is the 1st Card Menu, where all the cards are displayed  */}
//       {selectedCardModal === null
//         ? cards.map((card, index) => (
//             <div
//               key={
//                 currentModal === "Craft"
//                   ? "noCardSelected-" + "Craft-" + index
//                   : "noCardSelected-" + "Inv-" + index
//               }
//             >
//               {/* Render the card contents here */}
//               {card.templateId != 0 && (
//                 <Card
//                   id={card.id} // In Craft Modal: undefined
//                   templateId={card.templateId}
//                   name={card.name}
//                   type={card.type}
//                   level={card.level} // In Craft Modal: undefined
//                   rarity={card.rarity} // In Craft Modal: undefined
//                   // image={getImage(card.name)}
//                   // image={cardImages}
//                   image={card.image}
//                   // description={getDesc(card.name)}
//                   isDisabled={card.disabled}
//                   description={card.desc}
//                   setSelectedCardModal={setSelectedCardModal}
//                   selectedCardModal={selectedCardModal}
//                   handleCardClickScroll={handleCardClickScroll}
//                   currentModal={currentModal}
//                 />
//               )}
//             </div>
//           ))
//         : /* Here is the 2nd Card Menu, when we click/select a Card from the 1st Menu we arrive here  */
//           cards
//             .filter((card) => {
//               if (currentModal === "Craft")
//                 return card.templateId === selectedCardModal;
//               return card.id === selectedCardModal;
//             })
//             .map((card) => (
//               <div
//                 key={
//                   currentModal === "Craft"
//                     ? "CardisSelected-" + card.templateId
//                     : "CardisSelected-" + card.index
//                 }
//                 className="single-card-container"
//               >
//                 <div className="card-plus-btns">
//                   {console.log("asdasdasas: ", card)}
//                   <Card
//                     id={card.id}
//                     templateId={card.templateId}
//                     name={card.name}
//                     type={card.type}
//                     level={card.level}
//                     rarity={card.rarity}
//                     image={card.image}
//                     isDisabled={card.disabled}
//                     description={card.desc}
//                     setSelectedCardModal={setSelectedCardModal}
//                     selectedCardModal={selectedCardModal}
//                     currentModal={currentModal}
//                   />
//                   {/* Single Card Menu for - Inventory - */}
//                   {currentModal === "Inventory" && (
//                     <div className="single-card-btn-container">
//                       <button
//                         className="single-card-btn btn-activate"
//                         // I use tge closeBtn class cuz I'm bored of renaming it :P
//                         style={{
//                           padding: "5px 10px",
//                           borderRadius: "10px",
//                           boxShadow: "1px 2px 2px 0px black",
//                           pointerEvents: card.disabled ? "none" : "",
//                           filter: card.disabled ? "grayscale(100%)" : "",
//                         }}
//                         onClick={() => handleActivateClick(card)}
//                       >
//                         Activate
//                       </button>

//                       <button
//                         className="single-card-btn btn-sell"
//                         style={{
//                           padding: "5px 10px",
//                           borderRadius: "10px",
//                           boxShadow: "1px 2px 2px 0px black",
//                         }}
//                         onClick={() => handleSellClick(card)}
//                       >
//                         Sell
//                       </button>

//                       {showPriceInput && (
//                         <div className="flex flex-col items-center w-full">
//                           <CustomInput
//                             label="Price Tag"
//                             placeHolder="Ex. 25000"
//                             Attribs={{
//                               type: "text",
//                               onChange: (e) => {
//                                 // Use a regular expression to ensure only numbers are allowed
//                                 if (
//                                   /^\d*$/.test(e.target.value) &&
//                                   e.target.value !== "."
//                                 ) {
//                                   setPriceInput(e.target.value);
//                                   console.log("Price Tag: ", e.target.value);
//                                 } else {
//                                   e.target.value = "0";
//                                   setPriceInput("0");
//                                 }
//                               },
//                             }}
//                           />
//                         </div>
//                       )}

//                       {card.type !== "Special Effect" && (
//                         <button
//                           className="single-card-btn btn-levelUp"
//                           style={{
//                             marginTop: showPriceInput ? "10px" : "0px",
//                             padding: "5px 10px",
//                             borderRadius: "10px",
//                             boxShadow: "1px 2px 2px 0px black",
//                           }}
//                           onClick={() => handleLevelUpClick(card)}
//                         >
//                           Level Up
//                         </button>
//                       )}
//                     </div>
//                   )}
//                   {/* Single Card Menu for - Craft - */}
//                   {currentModal === "Craft" && (
//                     <div className="single-card-btn-container">
//                       <button
//                         className="single-card-btn btn-craft"
//                         // I use tge closeBtn class cuz I'm bored of renaming it :P
//                         style={{
//                           padding: "5px 10px",
//                           borderRadius: "10px",
//                           boxShadow: "1px 2px 2px 0px black",
//                         }}
//                         onClick={() => handleCraftClick(card)}
//                       >
//                         Craft ⚙
//                       </button>
//                     </div>
//                   )}
//                 </div>
//                 <img
//                   src={vertDivider}
//                   alt="-- Vertical Divider --"
//                   // style={{ display: 'block' }}
//                   className="vertical-divider"
//                 />

//                 <div className="single-card-desc">
//                   {card.type !== "Special Effect" && (
//                     <>
//                       <h3> Maintenance</h3>
//                       {card.maintenance === false ? (
//                         <span className="single-card-desc-span">
//                           This Card does not require Maintenance
//                         </span>
//                       ) : (
//                         <ul>
//                           {card.type !== "Special Effect" &&
//                             Object.entries(card.maintenance).map(
//                               ([key, value], index) => (
//                                 <li
//                                   key={`noSE-Maintaince-Prop-${index}`}
//                                   className="single-card-li"
//                                 >
//                                   <span className="single-card-maintenance-prop">
//                                     {key}:{` `}
//                                   </span>
//                                   <span className="single-card-maintenance-value">
//                                     {value}
//                                   </span>
//                                 </li>
//                               )
//                             )}
//                         </ul>
//                       )}
//                     </>
//                   )}

//                   {card.type !== "Special Effect" ? (
//                     <>
//                       <h3>
//                         {" "}
//                         {`${
//                           currentModal === "Craft" ? "Craft" : "Upgrade"
//                         } - Requirements`}{" "}
//                       </h3>
//                       {card.level >= 5 ? (
//                         <span className="single-card-desc-span">
//                           This Card can not be upgraded any further
//                         </span>
//                       ) : (
//                         <ul>
//                           {Object.entries(card.requirements).map(
//                             ([key, value], index) => (
//                               <li
//                                 key={`noSE-Requirements-Prop-${index}`}
//                                 className="single-card-li"
//                               >
//                                 <span className="single-card-maintenance-prop">
//                                   {key}:{` `}
//                                 </span>
//                                 <span className="single-card-maintenance-value">
//                                   {value}
//                                 </span>
//                               </li>
//                             )
//                           )}
//                         </ul>
//                       )}
//                     </>
//                   ) : (
//                     <>
//                       {currentModal === "Craft" ? (
//                         <>
//                           <h3>Requirements</h3>
//                           {Object.entries(card.requirements).map(
//                             ([key, value], index) => (
//                               <li
//                                 key={`Craft-Requirements-Prop-${index}`}
//                                 className="single-card-li"
//                               >
//                                 <span className="single-card-maintenance-prop">
//                                   {key}:{` `}
//                                 </span>
//                                 <span className="single-card-maintenance-value">
//                                   {value}
//                                 </span>
//                               </li>
//                             )
//                           )}
//                         </>
//                       ) : (
//                         <>
//                           <h3>Rarity</h3>
//                           <span
//                             className="single-card-maintenance-prop special-card"
//                             style={{ fontSize: "26px", display: "block" }}
//                           >
//                             {rarityCoverter(card.rarity)}
//                           </span>
//                         </>
//                       )}
//                     </>
//                   )}

//                   <h3> Output </h3>
//                   {card.output === false ? (
//                     <span className="single-card-desc-span">
//                       This Card does not provide any output
//                     </span>
//                   ) : (
//                     <ul>
//                       {card.type === "Special Effect"
//                         ? Object.entries(card.output).map(
//                             ([key, value], index) => (
//                               <>
//                                 {currentModal === "Craft" ? (
//                                   <li
//                                     key={`Craft-SE-Output-Prop-${index}`}
//                                     className="single-card-li"
//                                   >
//                                     {/* <span className="single-card-maintenance-prop">
//                                                           {key}:{` `}
//                                                         </span> */}
//                                     <span className="single-card-maintenance-prop">
//                                       {card.desc}
//                                     </span>
//                                   </li>
//                                 ) : (
//                                   <li
//                                     key={`Inv-SE-Output-Prop-${index}`}
//                                     className="single-card-li"
//                                   >
//                                     <span className="single-card-maintenance-prop special-card">
//                                       {card.desc}
//                                     </span>
//                                     {/* <span className="single-card-maintenance-value">
//                                                           {card.desc}
//                                                         </span> */}
//                                   </li>
//                                 )}
//                               </>
//                             )
//                           )
//                         : // For REG & Buildings 🏙 🏘
//                           Object.entries(card.output).map(
//                             ([key, value], index) => (
//                               <>
//                                 {/* If the Card is: 'REG' */}
//                                 {card.type === "REG" ? (
//                                   <li
//                                     key={`Inv-REG-Output-Prop-${index}`}
//                                     className="single-card-li"
//                                   >
//                                     <span className="single-card-maintenance-prop">
//                                       {key}:{` `}
//                                     </span>
//                                     {currentModal === "Craft" ? (
//                                       <span className="single-card-maintenance-value">
//                                         {"???"}
//                                       </span>
//                                     ) : (
//                                       <span className="single-card-maintenance-value">
//                                         {value}
//                                       </span>
//                                     )}
//                                   </li>
//                                 ) : (
//                                   // {/* If the Card is: 'Building' */}
//                                   <li
//                                     key={`Inv-Building-Output-Prop-${index}`}
//                                     className="single-card-li"
//                                   >
//                                     <span className="single-card-maintenance-prop">
//                                       {key}:{` `}
//                                     </span>
//                                     {currentModal === "Craft" ? (
//                                       <span className="single-card-maintenance-value">
//                                         {"???"}
//                                       </span>
//                                     ) : (
//                                       <span className="single-card-maintenance-value">
//                                         {isFloat(value)
//                                           ? value * 100 + "%"
//                                           : value}
//                                       </span>
//                                     )}
//                                   </li>
//                                 )}
//                               </>
//                             )
//                           )}
//                     </ul>
//                   )}
//                 </div>
//                 {/* ))} */}
//               </div>
//             ))}
//     </div>
//   );
// }
