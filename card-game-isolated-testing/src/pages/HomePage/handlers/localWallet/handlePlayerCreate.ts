/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  loginWithWallet,
  updatePlayerData,
  createPlayer,
  gaslessNewPlayer,
} from "../../../../../api/apiFns";
import { userAuthType } from "../../../../context/AuthContext/authTypes";
import type { Dispatch, SetStateAction } from "react";
import { handleCloseTxModal } from "./handleCloseTxModal";
import { initNewPlayer } from "../../utils/initNewPlayer";

/**
 * @description - Creates a new Player in the DB and sends him 0.5 ETH
 * @param e - React.MouseEvent
 * @param playerName - The Player's Name
 * @param walletAddress - The Local Wallet
 * @param setErrMsg - Function to set the Error Message (From the HomePage)
 * @param resetUser - Function to reset the User (From the HomePage)
 * @param setSuccessMsg - Function to set the Success Message (From the HomePage)
 */

const usernameRegex = /([a-zA-Z][a-zA-Z0-9 ]{0,15})/;

export const handlePlayerCreate = async (
  e: React.MouseEvent,
  playerName: string,
  walletAddress: string,
  setTransactionModalOpen: Dispatch<SetStateAction<boolean>>,
  setUser: Dispatch<SetStateAction<userAuthType>> | null,
  setErrMsg: (msg: string) => void,
  resetUser: () => void,
  setSuccessMsg: (msg: string) => void
  // initNewPlayer: (playerId: number) => void
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  if (!usernameRegex.test(playerName)) {
    setErrMsg(
      "The player name must begin with a letter, not exceed 16 characters and can contain only letters, numbers and spaces"
    );
    return;
  }

  if (setUser === null) {
    throw new Error("⛔ Custom: HandlePlayerCreate: setUser is null");
  }

  e.preventDefault();

  try {
    const { success, userId } = await createPlayer(playerName, walletAddress); // in DB

    if (success) {
      resetUser(); // Cleaning the memory for security
      setSuccessMsg(
        `Your Account has been created! 🥳 Login to start playing!`
      );

      const userData = await loginWithWallet(walletAddress);

      // 👉 Pseudo Gasless Mechanism
      setTransactionModalOpen(true); // OPEN MODAL
      console.log("🐱‍🏍 Starting the Gasless Mechanism...");
      const { message, tx } = await gaslessNewPlayer(walletAddress);

      if (message === "User sufficient ETH balance") {
        setTransactionModalOpen(false); // Immedietly CLSOE MODAL
      } else {
        await handleCloseTxModal(tx, setTransactionModalOpen); // CLOSE MODAL AFTER 3 SECONDS
      }

      const startingStats = initNewPlayer(userId);

      // Initialze the Player in DB
      const wasPlayerInitSuccess = await updatePlayerData(
        userId,
        startingStats
      );

      if (!wasPlayerInitSuccess) {
        console.error("⛔ Custom: HandlePlayerCreate, Player Init Failed");
        setErrMsg("An Error Occured. Please try again later.");
        return false;
      }

      setUser({ ...userData });

      return true;
    }
  } catch (err) {
    console.error("Response Error from Server: ", err);
    if (!(err as any)?.response) {
      setErrMsg("No Server Response");
    } else if ((err as any).response?.data?.errno === 1062) {
      console.error("DUPLICATES!!");
      setErrMsg("Name or Wallet already exists!");
    } else if ((err as any).response?.status === 400) {
      setErrMsg("Missing Username or Wallet");
    } else if ((err as any).response?.status === 401) {
      setErrMsg("Probably You don't have an Account");
    } else {
      setErrMsg("Login Failed");
    }
    return false;
  }
};
