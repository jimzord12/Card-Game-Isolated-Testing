import React, { useState, useEffect /*useRef*/ } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { cardInfo } from "../constants/index";
import { FaBirthdayCake } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { GiUpgrade, GiAbstract047 } from "react-icons/gi";
import { IoBuild } from "react-icons/io5";
import { loader } from "../assets";
import {
  numberWithDots,
  formatDate,
  smoothScrollTo,
  rarityCoverter,
  findOwnerWallet,
} from "../utils";

import WalletAvatar from "../components/WalletAvatar";
import { cardInfo as cardDesc, islands } from "../constants";

import { useGameVarsStore } from "../../../../stores/gameVars";
import {
  getPlayerByWallet,
  ownersSwapper,
  purchaseCard,
  removeFromMP,
  updatePlayerData,
} from "../../../../../api/apiFns";
import { classBuilding, classREG, classSP } from "../../../../classes";
import { mapOldCardIdsToNewOnes } from "../../../../utils/migration/mapOldCardIdsToNewOnes";
import { useGeneralVariablesStore } from "../../../../stores/generalVariables";

const createCardObject = (cardDataFromDB) => {
  switch (cardDataFromDB.templateId) {
    case 1:
      return new classREG({ ...cardDataFromDB, templateId: 201 });
    case 7:
      return new classSP({ ...cardDataFromDB, templateId: 301 });
    case 13:
      return new classBuilding({ ...cardDataFromDB, templateId: 101 });
    case 201:
    case 202:
    case 203:
    case 204:
      return new classREG(cardDataFromDB);
    case 301:
    case 302:
    case 303:
    case 304:
      return new classSP(cardDataFromDB);
    case 101:
    case 102:
    case 103:
    case 104:
      return new classBuilding(cardDataFromDB);
  }
};
const CardDetails = () => {
  const { state: locationState } = useLocation(); // Card's Data

  const playerData = useGameVarsStore((state) => state.player);
  const setPlayerData = useGameVarsStore((state) => state.setPlayer);
  const setShouldRefetchInvCards = useGeneralVariablesStore(
    (state) => state.setShouldRefecthInvCards
  );

  const refetchPlayerData = async (playerWallet) => {
    const playerData = await getPlayerByWallet(playerWallet);
    setPlayerData(playerData);
    return playerData;
  };

  console.log("Marketplace | CardDetails | locationState: ", locationState);
  const cardDataFromDB = locationState.card;
  const selectedCard = createCardObject(cardDataFromDB);
  const navigate = useNavigate();
  const {
    players,
    userId,
    refetchAllCards,
    playerBalance,
    setPlayerBalance,
    refetchSoldCards,
    setIsActive,
  } = useStateContext();

  console.log("Marketplace - Card Details |1| - Selected Card: ", selectedCard);

  const [isPurchasing, setIsPurchasing] = useState(false);

  // Transaction States
  const [showTranMsg, setShowTranMsg] = useState(false);
  const [tranType, setTranType] = useState("verify");

  const cardDetails = cardInfo[selectedCard.templateId];
  const owner = players.find((player) => player.id === selectedCard.ownerId);
  const redirectedFrom = locationState.from;

  const canAfford = playerBalance - selectedCard.priceTag >= 0;
  const isNotTheOnwer = selectedCard.ownerId !== playerData.id;
  const canBuy = canAfford && isNotTheOnwer;

  console.log("💰 |1| - CardDetails.jsx: Selected Card: ", selectedCard);
  console.log("💰 |2| - CardDetails.jsx: cardDetails: ", cardDetails);
  console.log("💰 |3| - CardDetails.jsx: redirectedFrom: ", redirectedFrom);

  // ✨🧪 REMOVE AFTER TESTING ✨🧪
  // const {
  //   data: fetchedData,
  //   isSuccess: isTranSuccess,
  //   isFetching: isTranLoading,
  //   isError: isTranError,
  //   // error,
  // } = useQuery({
  //   queryKey: [
  //     "buyCard",
  //     {
  //       cardId: selectedCard?.id,
  //       buyerId: userId,
  //       sellerId: selectedCard?.ownerId,
  //       priceTag: selectedCard?.priceTag,
  //       completed: false,
  //       rarity: selectedCard?.rarity,
  //       templateId: selectedCard?.templateId,
  //       level: selectedCard?.level,
  //     },
  //   ],
  //   queryFn: purchaseCard,
  //   enabled: beginTransaction && !!selectedCard.id,
  //   onError: (error) => {
  //     console.log("--- FAILED ---- Created Purchase (Marketplace): ", error);
  //     setTranType("failed");
  //   },
  // });

  // useEffect(() => {
  //   if (isTranSuccess) {
  //     console.log("SUCCESSFUL - Created Purchase (Marketplace): ", fetchedData);
  //     setTranType("success");
  //     playerData.gold -= selectedCard.priceTag;
  //     removeFromMP({ cardId: selectedCard.id });
  //     setTimeout(() => {
  //       setPlayerBalance((prev) => prev - selectedCard.priceTag);
  //       refetchSoldCards();
  //       refetchAllCards();
  //       refetchPlayerData();
  //       navigate("/marketplace");
  //       smoothScrollTo(0, 500);
  //     }, 3500);
  //   }
  // }, [fetchedData, isTranSuccess]);
  // ✨🧪 REMOVE AFTER TESTING ✨🧪

  const {
    mutate: purchaseMutation,
    isPending: isTxPending,
    isSuccess: isTxSuccess,
    isError: isTxError,
  } = useMutation({
    // mutationFn: purchaseCard, // This creates an Entry in the Maeketplace MySQL Table
    mutationFn: async (purchaseDetails) => {
      setIsPurchasing(true);
      setShouldRefetchInvCards(true);
      console.log(
        "🚀 - Custom: Marketplace | CardDetails.jsx : purchaseMutation: ",
        purchaseDetails
      );
      try {
        await purchaseCard(purchaseDetails);
      } catch (error) {
        throw new Error(error);
      }
    },
    onError: (error) => {
      console.error(
        " ⛔ - Custom: Marketplace | CardDetails.jsx : purchaseMutation: ",
        error
      );
      setTranType("failed");
    },
    onSuccess: async (data) => {
      console.log("✅ SUCCESSFUL - Created Purchase (Marketplace): ", data);
      const newPlayerBalance = playerBalance - selectedCard.priceTag;

      setPlayerData({ ...playerData, gold: newPlayerBalance }); // This is to update the player's Global State
      setPlayerBalance(newPlayerBalance); // This updates the player's balance only in Marketplace
      updatePlayerData(userId, { gold: newPlayerBalance }); // This updates the player's data in the DB

      await removeFromMP(selectedCard.id); // This changes the card's in_mp state to false (in the cards table)
      await ownersSwapper(selectedCard.id, userId); // This changes the card's owner_id to the buyer's id (in the cards table

      setTranType("success");

      refetchSoldCards();
      refetchAllCards();
      refetchPlayerData(playerData.walletAddress);
      setTimeout(() => {
        navigate("/marketplace");
        smoothScrollTo(0, 500);
        setIsPurchasing(false);
      }, 2000);
    },
  });

  useEffect(() => {
    if (showTranMsg) smoothScrollTo(document.body.scrollHeight, 1750);
  }, [showTranMsg]);

  const handlePurchase = async () => {
    if (selectedCard.id) {
      purchaseMutation({
        cardId: selectedCard?.id,
        buyerId: userId,
        sellerId: selectedCard?.ownerId,
        priceTag: selectedCard?.priceTag,
        completed: false,
        rarity: selectedCard?.rarity,
        templateId: selectedCard?.templateId,
        level: selectedCard?.level,
      });
    }
  };

  const handleCardRemoval = () => {
    removeFromMP({ cardId: selectedCard.id });
    setTimeout(() => {
      setIsActive("dashboard");
      refetchSoldCards();
      refetchAllCards();
      refetchPlayerData();
      navigate("/marketplace");
      smoothScrollTo(0, 500);
    }, 2000);
  };

  return (
    <div>
      {isTxPending && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            // TODO_DONE ✅: Fix for Production
            src={import.meta.env.VITE_HOST_URL + cardDetails.image}
            // src={cardDetails.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full md:justify-center flex-wrap justify-center gap-[30px]">
          <CountBox
            title="Rarity"
            value={rarityCoverter(selectedCard.rarity).text}
          />
          <CountBox
            title="Level"
            value={selectedCard.level === 0 ? "N/A" : selectedCard.level}
          />
          <CountBox title="Card ID" value={`#${selectedCard.id}`} />
        </div>
      </div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div className="flex flex-col w-full mt-0">
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Card Description
            </h4>

            <div className="mt-[10px] flex flex-row items-center flex-wrap gap-[14px] pl-2">
              <div>
                <p className="mt-[0px] font-epilogue font-normal text-[16px] text-[#808191] text-justify">
                  {console.log("Card Description: ", cardDesc)}
                  {
                    cardDesc[mapOldCardIdsToNewOnes(selectedCard.templateId)]
                      .desc
                  }
                </p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Cards Details
            </h4>
            {selectedCard !== null && (
              <div className="flex gap-4 flex-wrap justify-around sm:px-0 px-4">
                {selectedCard.output && (
                  <MainCategory
                    text="Output"
                    icon={<BsStars size={20} color={"white"} />}
                  >
                    {
                      <SubCategories
                        cardProps={selectedCard.output}
                        isSp={selectedCard.type === "Special Effect"}
                      />
                    }
                  </MainCategory>
                )}

                {selectedCard.maintenance && (
                  <MainCategory
                    text="Maintenance"
                    icon={<IoBuild size={20} color={"white"} />}
                  >
                    <SubCategories
                      cardProps={selectedCard.maintenance}
                      isSp={selectedCard.type === "Special Effect"}
                    />
                  </MainCategory>
                )}

                <MainCategory
                  text="Upgrade Requirements"
                  icon={<GiUpgrade size={20} color={"white"} />}
                >
                  <SubCategories
                    cardProps={selectedCard.requirements}
                    isSp={selectedCard.type === "Special Effect"}
                  />
                </MainCategory>

                <div className="flex gap-2 h-min w-full mt-[20px] border-[1px] border-[#808191] rounded-xl p-4">
                  <div className="flex gap-1 basis-[220px]">
                    <FaBirthdayCake
                      className="shrink-0"
                      size={20}
                      color={"white"}
                    />
                    <div className="flex flex-wrap w-full justify-between">
                      <p className="indent-2 font-epilogue font-normal text-[16px] text-white leading-[22px] whitespace-nowrap text-justify capitalize h-min">
                        Creation:{" "}
                      </p>
                      <div className="flex gap-2 items-start">
                        <div className="flex justify-between w-full ">
                          <p className="indent-2 font-epilogue font-normal text-[14px] text-[#808191] leading-[22px] text-justify">
                            {formatDate(selectedCard.creationTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col w-full mt-0 mb-6">
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Seller
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px] pl-2">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <WalletAvatar
                  walletAddress={findOwnerWallet(selectedCard, players)}
                  scale={4}
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white break-all">
                  {owner.name}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[16px] text-[#808191]">
                  from:{" "}
                  {console.log(
                    "OWNER::::::::::::::::::::::::::::::::::::: ",
                    owner
                  )}
                  {islands.find((island) => island.id === owner.island_id).name}
                </p>
              </div>
            </div>
          </div>

          <>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              {redirectedFrom === "profile" ? "Cancel Sale" : "Purchase"}
            </h4>

            {playerBalance && (
              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                {redirectedFrom === "profile" ? null : (
                  <div className="flex justify-between">
                    <p className="font-epilogue font-medium text-[16px] leading-[30px] text-left text-[#808191]">
                      Current Balance:
                    </p>
                    <p className="font-epilogue font-medium text-[18px] leading-[30px] text-right text-white">
                      {numberWithDots(playerBalance)}
                    </p>
                  </div>
                )}
                {redirectedFrom === "profile" ? null : (
                  <div className="flex justify-between border-solid border-b-2 border-gray-400 pb-1">
                    <p className="font-epilogue font-medium text-[16px] leading-[30px] text-left text-[#808191]">
                      Card's Price:
                    </p>
                    <p className="font-epilogue font-medium text-[18px] leading-[30px] text-right text-white">
                      {`-${numberWithDots(selectedCard.priceTag)}`}
                    </p>
                  </div>
                )}

                {redirectedFrom === "profile" ? null : (
                  <div className="flex justify-between mt-2 mb-4">
                    <p className="font-epilogue font-medium text-[16px] leading-[30px] text-left text-[#808191]">
                      New Balance:
                    </p>
                    <p className="font-epilogue font-medium text-[18px] leading-[30px] text-right text-white">
                      <span
                        style={{
                          color:
                            playerBalance - selectedCard.priceTag > 0
                              ? ""
                              : "red",
                        }}
                      >
                        {numberWithDots(playerBalance - selectedCard.priceTag)}
                      </span>
                    </p>
                  </div>
                )}

                <div className="mt-[0px]">
                  <Message
                    isVisible={showTranMsg}
                    setVisibility={setShowTranMsg}
                    isLoading={isTxPending}
                    isTranSuccess={isTxSuccess}
                    isTranError={isTxError}
                    type={tranType}
                    from={locationState.from}
                    text="Are you certain you wish you complete this transaction?"
                    handlerFunction={
                      redirectedFrom === "profile"
                        ? handleCardRemoval
                        : handlePurchase
                    }
                  />

                  {!isPurchasing && (
                    <CustomButton
                      btnType="button"
                      title={
                        redirectedFrom === "profile"
                          ? "Remove Card"
                          : canBuy
                          ? "Buy Card"
                          : "Can't Buy Card"
                      }
                      styles="w-full bg-[#8c6dfd]"
                      disabled={redirectedFrom === "profile" ? false : !canBuy}
                      handleClick={() => {
                        setShowTranMsg(true);
                        console.log("The Card Details: ", selectedCard);
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

const SubCategories = ({ cardProps, isSp }) => {
  console.log("cardProps: ", cardProps);
  console.log("SubCat isSp: ", isSp);
  const catInfo = Object.entries(cardProps);

  return (
    <div className="flex flex-col gap-2 pl-2 items-start">
      {catInfo.map(([category, value], index) => {
        return (
          <div
            className="flex w-full items-start"
            key={`${cardProps.name}-${cardProps.id}-${index}`}
          >
            <div className="flex">
              <GiAbstract047 size={18} color={"white"} />
            </div>
            <div className="flex justify-between w-full">
              <p className="indent-2 font-epilogue font-normal text-[14px] text-[#808191] leading-[22px] text-justify capitalize">
                {category}:{" "}
              </p>
              <p className="indent-2 font-epilogue font-normal text-[14px] text-white leading-[22px] text-justify">
                {numberWithDots(value, isSp)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const MainCategory = ({ children, text, icon }) => {
  return (
    <div className="flex gap-4 items-start w-full mt-[20px] border-[1px] border-[#808191] rounded-xl p-4">
      <div className="flex flex-col gap-4 basis-[220px]">
        <div className="flex flex-row gap-3">
          {icon}
          <p className="font-epilogue font-normal text-[16px] text-white leading-[26px] text-justify">
            {text}:
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

const Message = ({
  isVisible,
  setVisibility,
  text,
  type,
  from = "not-withdraw",
  isLoading,
  handlerFunction,
  isTranSuccess,
  isTranError,
}) => {
  const [showRemoveMsg, setShowRemoveMsg] = useState(false);
  const getStyles = () => {
    if (showRemoveMsg) return { bg: "bg-[#80d266]", margin: "mt-0" };
    if (type === "verify") return { bg: "bg-[#13131a]", margin: "mt-4" };
    if (type === "remove-card") return { bg: "bg-[#13131a]", margin: "mt-4" };
    if (type === "success") return { bg: "bg-[#80d266]", margin: "mt-0" };
    if (type === "failed") return { bg: "bg-[#cf4f54]", margin: "mt-0" };
  };

  const styles = getStyles();
  return (
    <div
      className={`${
        isVisible ? "opacity-100" : "hidden"
      } transition-opacity duration-200`}
    >
      {console.log("Is Fetching: ", isLoading)}
      {console.log("Is Error: ", isTranError)}
      {isLoading && !isTranError ? (
        <div className="flex justify-center items-center">
          <img
            src={loader}
            alt="loader"
            className="w-[150px] h-[150px] object-contain -translate-y-4"
          />
        </div>
      ) : (
        <div className={`mb-4 p-4 ${styles.bg} rounded-[10px]`}>
          {!isTranSuccess && !isTranError && !showRemoveMsg && (
            <h4 className="font-epilogue font-semibold text-[16px] leading-[22px] text-center text-white">
              {text}
            </h4>
          )}
          <div
            className={`flex justify-around gap-4 ${styles.margin} rounded-[10px]`}
          >
            <>
              {!isTranSuccess && !isTranError && !showRemoveMsg && (
                <>
                  <CustomButton
                    btnType="button"
                    title="Yes"
                    styles="w-[100px] bg-[#42ab21]"
                    handleClick={() => {
                      if (from === "profile") setShowRemoveMsg(true);
                      handlerFunction();
                    }}
                  />
                  <CustomButton
                    btnType="button"
                    title="No"
                    styles="w-[100px] bg-[#b30019]"
                    handleClick={() => setVisibility(false)}
                  />
                </>
              )}
              {isTranSuccess && (
                <h4 className="font-epilogue font-semibold text-[18px] text-white text-center">
                  Your transaction was successfully executed!
                </h4>
              )}
              {isTranError && !showRemoveMsg && (
                <h4 className="font-epilogue font-semibold text-[18px] text-white text-center">
                  Something went wrong with the transaction. Please try again
                  later
                </h4>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};
export default CardDetails;
