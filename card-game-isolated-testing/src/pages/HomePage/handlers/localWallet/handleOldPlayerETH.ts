/* eslint-disable @typescript-eslint/no-explicit-any */
import { userAuthType } from "../../../../context/AuthContext/authTypes";
import { gaslessOldPlayer } from "../../../../../api/apiFns/gasless/gaslessOldPlayer";
import { handleCloseTxModal } from "./handleCloseTxModal";
import { Dispatch, SetStateAction } from "react";

export const handleOldPlayerETH = async (
  e: React.MouseEvent,
  userData: userAuthType,
  login: (walletAddress: string) => Promise<void>,
  setTransactionModalOpen: Dispatch<SetStateAction<boolean>>,
  setErrMsg: (msg: string) => void,
  resetUser: () => void
) => {
  e.preventDefault();
  console.log("Local Wallet::Page: ", userData);

  if (userData === null)
    throw new Error(
      "⛔ - Custom: HomePage: handlePlayerLogin: userData is null"
    );

  if (userData.username === null || userData.username === undefined)
    throw new Error(
      "⛔ - Custom: HomePage: handlePlayerLogin: username is null or undefined"
    );

  if (userData.wallet === null || userData.wallet === undefined)
    throw new Error(
      "⛔ - Custom: HomePage: handlePlayerLogin: wallet is null or undefined"
    );

  try {
    // 👉 Pseudo Gasless Mechanism
    setTransactionModalOpen(true); // OPEN MODAL
    const { message, tx } = await gaslessOldPlayer(userData.wallet);

    if (message === "User sufficient ETH balance") {
      setTransactionModalOpen(false); // Immedietly CLSOE MODAL
      login(userData.wallet); // Login the User
    } else if (message === "User got 0.5 ETH") {
      await handleCloseTxModal(tx, setTransactionModalOpen); // CLOSE MODAL AFTER 3 SECONDS
      login(userData.wallet); // Login the User
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
