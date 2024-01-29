import { useMutation } from "@tanstack/react-query";

import {
  createCard,
  createCardStats,
  sellCard,
} from "../../../../../../api/apiFns";

export function useCardMutations() {
  // Mutation #1 - Create a new Card
  const {
    data: newCardData,
    mutate: createCardMutation,
    isSuccess: isSuccessNewCard,
  } = useMutation({
    mutationFn: createCard, // Replace with your API function
    onError: () => console.error("Error while creating the new card!"),
    onSuccess: (newCard) => console.log("New Card: ", newCard),
  });

  // Mutation #2 - Create Card's Stats
  const createCardStatsMutation = useMutation({
    mutationFn: createCardStats, // Replace with your API function
    onError: () => console.error("Error while creating the new card STATS!"),
    onSuccess: (newCardStats) => console.log("New Card STATS: ", newCardStats),
  });

  // Mutation #3 - Sell Card
  const sellCardMutation = useMutation({
    mutationFn: sellCard, // Replace with your API function
    onError: () => console.error("Error while selling the card!"),
    onSuccess: (response) => console.log("Response from MP: ", response),
  });

  return {
    createCard_DB: createCardMutation,
    createCardStats_DB: createCardStatsMutation.mutate,
    putCardForSale: sellCardMutation.mutate,
    isSuccessNewCard,
    newCardData,
    // You can also return the status of these mutations if needed, like isSuccess, isLoading, etc.
  };
}
