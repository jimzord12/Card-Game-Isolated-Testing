import { HDNodeWallet, Wallet } from "ethers";
import preConfiguredAxios from "../../../../../api/apiConfig";
import { userAuthType } from "../../../../context/AuthContext/authTypes";

const CREATE_PL_URL = "register/player";
const GIVE_ETH_NEW_PLAYER = "gasless/register";
const usernameRegex = /([a-zA-Z][a-zA-Z0-9 ]{0,15})/;

export const handlePlayerCreate = async (
  e: React.MouseEvent,
  playerName: string,
  localWallet: HDNodeWallet | Wallet,
  login: (userCreds: userAuthType) => void,
  getEthBalance: () => Promise<string>,

  setErrMsg: (msg: string) => void,

  resetUser: () => void,
  setSuccessMsg: (msg: string) => void
) => {
  //   if (userData === null)
  //     throw new Error("⛔ - Custom: createPlayer: userData is null");

  //   if (userData.username === null || userData.username === undefined)
  //     throw new Error("⛔ - Custom: createPlayer: username is null or undefined");

  //   if (userData.wallet === null || userData.wallet === undefined)
  //     throw new Error("⛔ - Custom: createPlayer: wallet is null or undefined");

  if (!usernameRegex.test(playerName)) {
    setErrMsg(
      "The player name must begin with a letter, not exceed 16 characters and can contain only letters, numbers and spaces"
    );
    return;
  }

  e.preventDefault();
  //   console.log("LocalWallet::Page: ", walletAddr.accounts[0]);

  let success = false;

  // Express Server interaction
  try {
    const response = await preConfiguredAxios.post(
      CREATE_PL_URL,
      JSON.stringify({
        name: playerName,
        wallet: localWallet.address,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response?.status === 201) {
      console.log("(Home Page: Express Response: ", response);
      resetUser(); // Cleaning the memory for security
      // resetWallet(); // Cleaning the memory for security
      setSuccessMsg(
        `Your Account has been created! 🥳 Login to start playing!`
      );
    }

    // 👉 Pseudo Gasless Mechanism
    // setTransactionModalOpen(true);
    console.log("🐱‍🏍 Starting the Gasless Mechanism...");
    const gaslessResponse = await preConfiguredAxios.post(
      GIVE_ETH_NEW_PLAYER,
      JSON.stringify({ address: localWallet.address }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (gaslessResponse.data.success) {
      await handleCloseTxModal(gaslessResponse.data.tx);
      success = true;
      login();
    }

    //TODO: Open a Modal

    // // Blockchain interaction
    // try {
    //   await createPlayer(user, response.data.insertId);
    // } catch (err) {
    //   console.log(err);
    // }

    // Error Handling, based on the error
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
  } finally {
    await getEthBalance();
    // if (!success) setTransactionModalOpen(false);
  }
};
