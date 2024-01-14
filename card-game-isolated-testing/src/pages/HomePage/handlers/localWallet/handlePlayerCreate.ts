import { HDNodeWallet, Wallet } from "ethers";
import { createPlayer } from "../../../../../api/apiFns/createPlayer";
import { gaslessNewPlayer } from "../../../../../api/apiFns/gasless/gaslessNewPlayer";
import { fetchUserDataWithWallet } from "../../../../../api/apiFns";
import { userAuthType } from "../../../../context/AuthContext/authTypes";

/**
 * @description - Creates a new Player in the DB and sends him 0.5 ETH
 * @param e - React.MouseEvent
 * @param playerName - The Player's Name
 * @param localWallet - The Local Wallet
 * @param getEthBalance - Function to get the ETH Balance (From useLocalWallet Hook)
 * @param setErrMsg - Function to set the Error Message (From the HomePage)
 * @param resetUser - Function to reset the User (From the HomePage)
 * @param setSuccessMsg - Function to set the Success Message (From the HomePage)
 */

const usernameRegex = /([a-zA-Z][a-zA-Z0-9 ]{0,15})/;

export const handlePlayerCreate = async (
  e: React.MouseEvent,
  playerName: string,
  localWallet: HDNodeWallet | Wallet,
  // getEthBalance: () => Promise<string>,
  setUser: (prevState: userAuthType | null) => void | null,
  setErrMsg: (msg: string) => void,
  resetUser: () => void,
  setSuccessMsg: (msg: string) => void
) => {
  if (!usernameRegex.test(playerName)) {
    setErrMsg(
      "The player name must begin with a letter, not exceed 16 characters and can contain only letters, numbers and spaces"
    );
    return;
  }

  e.preventDefault();

  try {
    const { success } = await createPlayer(playerName, localWallet.address); // in DB

    if (success) {
      resetUser(); // Cleaning the memory for security
      setSuccessMsg(
        `Your Account has been created! 🥳 Login to start playing!`
      );

      const userData = await fetchUserDataWithWallet(localWallet.address);

      // 👉 Pseudo Gasless Mechanism
      // setTransactionModalOpen(true); ✨ // OPEN MODAL
      console.log("🐱‍🏍 Starting the Gasless Mechanism...");
      const { message, tx } = await gaslessNewPlayer(localWallet.address);

      if (message === "User sufficient ETH balance") {
        //   setTransactionModalOpen(false); ✨ // Immedietly CLSOE MODAL
      } else {
        // await handleCloseTxModal(tx); ✨ // CLOSE MODAL AFTER 3 SECONDS
      }

      setUser({ ...userData });

      return true;
    }

    //TODO: Blockchain interaction 🅱
    // try {
    //   await createPlayer(user, response.data.insertId);
    // } catch (err) {
    //   console.log(err);
    // }

    // ⛔ Error Handling, based on the error
  } catch (err) {
    console.error("Response Error from Server: ", err);
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else if (err.response?.data?.errno === 1062) {
      console.error("DUPLICATES!!");
      setErrMsg("Name or Wallet already exists!");
    } else if (err.response?.status === 400) {
      setErrMsg("Missing Username or Wallet");
    } else if (err.response?.status === 401) {
      setErrMsg("Propably You don't have an Account");
    } else {
      setErrMsg("Login Failed");
    }
    return false;
  }
};
