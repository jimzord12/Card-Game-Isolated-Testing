import React, { useState, useContext, createContext, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useGameVarsStore } from "../../../../stores/gameVars";

import {
  getAllCardsForSale,
  getAllPlayers,
  getSoldCards,
  deletePurchase,
} from "../../../../../api/apiFns";
// import useLocationChange from '../hooks/useLocationChange';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const playerData = useGameVarsStore((state) => state.player);

  // const onLocationChange = useLocationChange(['allCards']);
  // const { setAuth, auth } = useAuth(); //@Get it from Main App! ✨
  console.log("🧪 Marketplace | Context | The Player Data: ", playerData);
  const [userId, setUserId] = useState(playerData.id); //@Get it from Main App! ✨
  const [cards, setCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  // const [marketplaceCards, setMarketplaceCards] = useState([]);
  const [players, setPlayers] = useState([]); //@Get it from Main App! ✨
  const [playersMapping, setPlayersMapping] = useState({});
  const [userSoldCards, setUserSoldCards] = useState([]);
  const [playerBalance, setPlayerBalance] = useState(
    Math.trunc(playerData.gold)
  );
  const [isActive, setIsActive] = useState("dashboard");

  //@Get it from Main App! ✨
  // const axiosPrivate = "nothing...xD";

  //@Get it from Main App! ✨
  const playerWallet = playerData.wallet;
  // const testingPlayerName = "the collector"

  // #2 - Query - Getting the Cards
  const {
    data: allCardsData,
    isSuccess: isSuccessAllCards,
    isLoading: isLoadingAllCards,
    isError: isErrorAllCards,
    error: allCardsError,
    refetch: refetchAllCards,
  } = useQuery({
    queryKey: ["allCards"],
    queryFn: getAllCardsForSale,
    refetchOnMount: "always",
    enabled: playerData.gold !== null,
  });

  useEffect(() => {
    if (isSuccessAllCards && allCardsData) {
      console.log("SUCCESSFUL - All Cards (Marketplace): ", allCardsData);
      setCards(allCardsData);
      setPlayerCards(allCardsData.filter((card) => card.ownerId === userId));
    }
  }, [isSuccessAllCards, allCardsData, userId]);

  // #3 - Query - Getting all Players
  //@Note: Need to get all the PLayers to map ownerID to ownerName or Wallet
  //@Get it from Main App! ✨
  const { data: fetchedPlayersData, isSuccess: isSuccessPlayers } = useQuery({
    queryKey: ["allPlayers"],
    queryFn: getAllPlayers,
    enabled: isSuccessAllCards,
  });

  useEffect(() => {
    if (isSuccessPlayers && fetchedPlayersData) {
      console.log(
        "SUCCESSFUL - All Players (Marketplace): ",
        fetchedPlayersData
      );
      setPlayers(fetchedPlayersData);
      setPlayersMapping((prev) => {
        const formattedPlayers = {};
        fetchedPlayersData.forEach((player) => {
          formattedPlayers[`${player.id}`] = player.name;
        });
        return { ...prev, ...formattedPlayers };
      });
    }
  }, [isSuccessPlayers, fetchedPlayersData]);

  const {
    data: soldCardsData,
    isSuccess: isSoldCardsSuccess,
    isLoading: isLoadingSoldCards,
    refetch: refetchSoldCards,
    isError: isErrorSoldCards,
  } = useQuery({
    queryKey: ["playerSoldCards", userId],
    queryFn: getSoldCards,
    retry: 0,
    enabled: isSuccessPlayers && players.length > 0,
    onError: () => {
      setUserSoldCards([]);
    },
  });

  useEffect(() => {
    if (isSoldCardsSuccess && soldCardsData) {
      console.log(
        "SUCCESSFUL - Got Purchase Events (Marketplace): ",
        soldCardsData
      );
      console.log(
        "SUCCESSFUL - Got Purchase Events (Marketplace) - UserID: ",
        userId
      );
      setUserSoldCards(soldCardsData);
    } else if (isErrorSoldCards) {
      console.log(
        "ERROR - Getting Purchase Events (Marketplace): ",
        isErrorSoldCards
      );
      setUserSoldCards([]);
    }
  }, [isSoldCardsSuccess, soldCardsData, isErrorSoldCards]);

  const { mutate: removePurchaseEvent, isSuccess: hasCards4Sale } = useMutation(
    {
      mutationFn: deletePurchase,
      onSuccess: (wasSuccess) => {
        console.log(
          "✅ - 3 - Success - User Claimed his/her Gold from the Marketplace. The Response Data: ",
          wasSuccess
        );
        refetchSoldCards();
      },
    }
  );

  return (
    <StateContext.Provider
      value={{
        cards,
        playerCards,
        setCards,
        isSuccessAllCards,
        isLoadingAllCards,
        isErrorAllCards,
        allCardsError,
        setUserId,
        userId,
        players,
        playersMapping,
        setPlayerBalance,
        playerBalance,
        isSuccessPlayers,
        isSoldCardsSuccess,
        playerWallet,
        refetchAllCards,
        refetchSoldCards,
        userSoldCards,
        isLoadingSoldCards,
        setIsActive,
        isActive,
        removePurchaseEvent,
        hasCards4Sale,
        isErrorSoldCards,
      }}
    >
      <>
        {isSuccessPlayers ? (
          children
        ) : (
          <h4 className="text-[black] text-2xl font-semibold">
            Loading StateContext
          </h4>
        )}
      </>
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
