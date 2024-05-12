/* eslint-disable @typescript-eslint/no-explicit-any */
import { gaslessOldPlayer } from "../../../../../api/apiFns/gasless/gaslessOldPlayer";
import { handleCloseTxModal } from "./handleCloseTxModal";
import { Dispatch, SetStateAction } from "react";

export const handleOldPlayerETH = async (
  e: React.MouseEvent,
  walletAddress: string,
  login: (walletAddress: string) => Promise<void>,
  setTransactionModalOpen: Dispatch<SetStateAction<boolean>>,
  setErrMsg: (msg: string) => void,
  resetUser: () => void
) => {
  e.preventDefault();

  if (walletAddress === null)
    throw new Error(
      "⛔ - Custom: HomePage: handleOldPlayerETH: walletAddress is null"
    );

  try {
    // 👉 Pseudo Gasless Mechanism
    setTransactionModalOpen(true); // OPEN MODAL
    const { message, tx } = await gaslessOldPlayer(walletAddress);

    if (message === "User sufficient ETH balance") {
      setTransactionModalOpen(false); // Immedietly CLSOE MODAL
      login(walletAddress); // Login the User
    } else if (message === "User got 0.5 ETH") {
      await handleCloseTxModal(tx, setTransactionModalOpen); // CLOSE MODAL AFTER 3 SECONDS
      login(walletAddress); // Login the User
    }
  } catch (err) {
    // Error Handling, based on the error
    console.error("1. Response Error from Server: ", err);
    console.error("2. Response Error from Server: ", (err as any).message);
    if (!(err as any)?.message.includes("user rejected signing")) {
      setErrMsg("You rejected the Wallet Ownership Challenge. Suspicious...");
    } else if (!(err as any)?.response) {
      setErrMsg("No Server Response");
    } else if ((err as any).response?.status === 400) {
      setErrMsg("Missing Username or Password");
    } else if ((err as any).response?.status === 401) {
      setErrMsg("Propably You don't have an Account");  
    } else if (
      (err as any)?.response?.data?.message ===
      "Transfer already made in the last 24 hours"
    ) {
      setErrMsg(
        "You don't have enough ETH and the Auto-Transfer has already been used. The cooldown is 24h. Please try again later"
      );
    } else {
      setErrMsg("Login Failed");
    }
  } finally {
    // setTransactionModalOpen(false); ✨ // MAKE SURE MODAL IS CLOSED
    resetUser(); // Cleaning the memory for security
  }
};
//
