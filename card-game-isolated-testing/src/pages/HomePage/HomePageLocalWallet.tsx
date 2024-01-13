import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import useInput from "../../hooks/useInput";
import useLocalWallet from "../../hooks/blockchain/useLocalWallet";
import { waitForTx } from "../../utils/waitForTx";
import { ethers } from "ethers";
import SizedBox from "../../components/Utility/SizedBox";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton/CustomButton";
import styles from "./HomePage.module.css";
import { handlePlayerCreate } from "./handlers/localWallet/handlePlayerCreate";

const LOGIN_URL = "authNoPwd";
const CREATE_PL_URL = "register/player";
const GIVE_ETH_NEW_PLAYER = "gasless/register";
const GIVE_ETH_OLD_PLAYER = "gasless/login";
const usernameRegex = /([a-zA-Z][a-zA-Z0-9 ]{0,15})/;

export function HomePageLocalWallet() {
  const navigate = useNavigate();
  const { user: userData, login, logout } = useAuth();
  const [playerName, resetUser, userAttribs] = useInput("user", "");

  const {
    wallet: localWallet,
    deleteWallet,
    generateWallet,
    retrieveWallet,
    balance,
    getEthBalance,
  } = useLocalWallet();

  const [providerLW, setProviderLW] = useState<ethers.JsonRpcProvider | null>(
    null
  );
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  const smallDev = useMediaQuery("(max-width: 640px)");

  //   const handleCloseTxModal = (tx: ethers.TransactionResponse) => {
  //     if (providerLW !== null && providerLW instanceof ethers.JsonRpcProvider) {
  //       return new Promise((resolve, reject) => {
  //         setTimeout(async () => {
  //           try {
  //             const success = await waitForTx(providerLW, tx);
  //             console.log(success ? "1. isajdbasibdia" : "2. isajdbasibdia");
  //             setTransactionModalOpen(false);
  //             resolve(success);
  //             getEthBalance();
  //           } catch (error) {
  //             console.error("Error in waitForTx:", error);
  //             setTransactionModalOpen(false);
  //             reject(error);
  //           }
  //         }, 3000);
  //       });
  //     }

  // const handlePlayerLogin2 = async (e) => {
  //   e.preventDefault();
  //   console.log("Local Wallet::Page: ", user);
  //   let success = false;

  //   try {
  //     const response = await axios.post(
  //       LOGIN_URL,
  //       JSON.stringify({ walletAddress: walletAddr.accounts[0] }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );

  //     // 👉 Pseudo Gasless Mechanism
  //     setTransactionModalOpen(true);
  //     const gaslessResponse = await axios.post(
  //       GIVE_ETH_OLD_PLAYER,
  //       JSON.stringify({ address: walletAddr.accounts[0] }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );
  //     console.log("asdasa: ", gaslessResponse);

  //     if (gaslessResponse.data.message === "User sufficient ETH balance") {
  //       setTransactionModalOpen(false);
  //       const accessToken = response?.data?.aT;
  //       const user = response?.data?.username;

  //       setAccessToken(accessToken);
  //       setAuth((prev) => {
  //         return { user, accessToken, ...prev };
  //       });
  //       resetUser(); // Cleaning the memory for security
  //       setInitComplete(true);
  //       setPlayerToFetch(user);
  //     } else if (gaslessResponse.data.message === "User got 0.5 ETH") {
  //       await handleCloseTxModal(gaslessResponse.data.tx);

  //       const accessToken = response?.data?.aT;
  //       const user = response?.data?.username;

  //       setAccessToken(accessToken);
  //       setAuth((prev) => {
  //         return { user, accessToken, ...prev };
  //       });
  //       resetUser(); // Cleaning the memory for security
  //       setInitComplete(true);
  //       setPlayerToFetch(user);
  //     }
  //     success = true;

  //     // Error Handling, based on the error
  //   } catch (err) {
  //     console.error("1. Response Error from Server: ", err);
  //     console.error("2. Response Error from Server: ", err.message);
  //     if (err?.message.includes("user rejected signing")) {
  //       setErrMsg(
  //         "You rejected the Wallet Ownership Challenge. Suspicious..."
  //       );
  //     } else if (!err?.response) {
  //       setErrMsg("No Server Response");
  //     } else if (err.response?.status === 400) {
  //       setErrMsg("Missing Username or Password");
  //     } else if (err.response?.status === 401) {
  //       setErrMsg("Propably You don't have an Account");
  //     } else if (
  //       err?.response?.data?.message ===
  //       "Transfer already made in the last 24 hours"
  //     ) {
  //       setErrMsg(
  //         "You don't have enough ETH and the Auto-Transfer has already been used. The cooldown is 24h. Please try again later"
  //       );
  //     } else {
  //       setErrMsg("Login Failed");
  //     }
  //   } finally {
  //     if (!success) setTransactionModalOpen(false);
  //   }
  // };

  // const handlePlayerCreate = async (e) => {
  //   if (!usernameRegex.test(user)) {
  //     // Express Server
  //     setErrMsg(
  //       "The player name must begin with a letter, not exceed 16 characters and can contain only letters, numbers and spaces"
  //     );
  //     return;
  //   }

  //   e.preventDefault();
  //   console.log("LocalWallet::Page: ", walletAddr.accounts[0]);

  //   let success = false;

  //   // Express Server interaction
  //   try {
  //     const response = await axios.post(
  //       CREATE_PL_URL,
  //       JSON.stringify({ name: user, wallet: walletAddr.accounts[0] }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );

  //     if (response?.status === 201) {
  //       console.log("(Home Page: Express Response: ", response);
  //       resetUser(); // Cleaning the memory for security
  //       // resetWallet(); // Cleaning the memory for security
  //       setSuccessMsg(
  //         `Your Account has been created! 🥳 Login to start playing!`
  //       );
  //     }

  //     setPlayerData({ name: user });

  //     // 👉 Pseudo Gasless Mechanism
  //     setTransactionModalOpen(true);
  //     const gaslessResponse = await axios.post(
  //       GIVE_ETH_NEW_PLAYER,
  //       JSON.stringify({ address: walletAddr.accounts[0] }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     );

  //     if (gaslessResponse.data.success) {
  //       await handleCloseTxModal(gaslessResponse.data.tx);
  //       success = true;
  //     }

  //     //TODO: Open a Modal

  //     // Blockchain interaction
  //     try {
  //       await createPlayer(user, response.data.insertId);
  //     } catch (err) {
  //       console.log(err);
  //     }

  //     // Error Handling, based on the error
  //   } catch (err) {
  //     console.error("Response Error from Server: ", err);
  //     if (!err?.response) {
  //       setErrMsg("No Server Response");
  //     } else if (err.response?.data?.errno === 1062) {
  //       console.error("DUPLICATES!!");
  //       setErrMsg("Name or Wallet already exists!");
  //     } else if (err.response?.status === 400) {
  //       setErrMsg("Missing Username or Wallet");
  //     } else if (err.response?.status === 401) {
  //       setErrMsg("Propably You don't have an Account");
  //     } else {
  //       setErrMsg("Login Failed");
  //     }
  //   } finally {
  //     getEthBalance();
  //     if (!success) setTransactionModalOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   setUsesLW(true);
  // }, []);

  // useEffect(() => {
  //   setErrMsg(""); // Make the error disappear, when the user tries to fix it
  //   // setSuccessMsg(''); // Make the error disappear, when the user tries to fix it
  // }, [user]);

  // useEffect(() => {
  //   if (initComplete && auth.user) {
  //     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  //     console.log(auth.user);
  //     navigate("/battle/");
  //   }
  // }, [initComplete]);

  // useEffect(() => {
  //   console.log("1 - ajsdnbaiojsdL: ", hasMetaMaskRun);

  //   if (hasMetaMaskRun) {
  //     try {
  //       const provider = new ethers.providers.JsonRpcProvider(
  //         "https://snf-34965.ok-kno.grnetcloud.net"
  //       );
  //       setProviderLW(provider);
  //       console.log("2 - ajsdnbaiojsdL: ", provider);

  //       const success = retrieveWallet(provider);
  //       if (success) {
  //         console.log("Local Wallet Exists? : ", success);
  //         console.log("Local Wallet Address: ", localWallet?.address);
  //         if (localWallet?.address !== undefined) {
  //           const wallet = {
  //             accounts: [localWallet.address],
  //             chainId: 20231,
  //             localWallet,
  //           };
  //           setWallet(wallet);
  //           console.log("Local Wallet: ", wallet);
  //           // connectWalletWithProvider(provider);
  //           getEthBalance();

  //           (async function () {
  //             const response = await axios.post(
  //               LOGIN_URL,
  //               JSON.stringify({ walletAddress: localWallet.address }),
  //               {
  //                 headers: { "Content-Type": "application/json" },
  //                 withCredentials: true,
  //               }
  //             );
  //             console.log("2 - EXEVUTED!!! :: ", response);
  //             setPlayerData({ name: response.data.username });
  //           })();
  //         }
  //         // setHasLocalWallet(true);
  //       }
  //     } catch (error) {
  //       if (error.message.startsWith("No Local Wallet")) {
  //         console.log("⛔ Don't Forget Me!");
  //         // setHasLocalWallet(false);
  //       } else if (error?.response?.status === 400) {
  //       } else {
  //         throw error;
  //       }
  //     } finally {
  //       setProvider(provider);
  //       setEthersProvider(provider);
  //       setHasProvider(true);
  //     }
  //   }
  // }, [hasMetaMaskRun, hasLocalWalletHookRun]);

  // useEffect(() => {
  //   if (localWallet?.address !== undefined) {
  //     const wallet = {
  //       accounts: [localWallet.address],
  //       chainId: 20231,
  //       localWallet,
  //     };
  //     setWallet(wallet);
  //   }
  // }, [localWallet?.address]);

  // useEffect(() => {
  //   console.log("Balance Updated: ", balance);
  //   setWallet((prev) => ({ ...prev, balance }));
  // }, [balance]);

  return (
    <div className="flex flex-col">
      {/* ✨ <TransactionModal open={isTransactionModalOpen} /> */}

      {localWallet ? (
        <>
          <SizedBox />
          <p style={{ color: "whitesmoke", fontSize: 18, marginTop: 6 }}>
            - Local Wallet Found ✔
          </p>
          {userData?.username ? (
            <>
              <p style={{ color: "whitesmoke", fontSize: 18, marginTop: 6 }}>
                - Player Exists ✔
              </p>
              <p style={{ color: "whitesmoke", fontSize: 18, marginTop: 6 }}>
                - Your Current ETH:{" "}
                <span style={{ color: "limegreen", fontWeight: "500" }}>
                  {balance === "-1" ? "fetching ETH..." : balance}
                </span>{" "}
                👍
              </p>
            </>
          ) : (
            <p style={{ color: "whitesmoke", fontSize: 18, marginTop: 6 }}>
              - A Player must be created 😬 <br />
              {"- Enter a Player Name below and press 'Create Player'"}
            </p>
          )}
          <>
            <SizedBox />

            <p className={errMsg ? styles.errorStyles : styles.offscreenStyles}>
              {errMsg}
            </p>
            <p
              className={
                successMsg ? styles.successStyles : styles.offscreenStyles
              }
            >
              Your account has been created!
              <br /> Login to start playing! 🥳
              <br /> - The awesome thing about Web3...
              <br />{" "}
              {"..you don't even need to remember usernames & passwords!"}
            </p>
          </>
          <SizedBox />
          <CustomInput
            label="Player Name"
            placeHolder="Enter an Alias"
            Attribs={userAttribs}
            value={userData !== null ? userData.username : undefined}
          />

          <SizedBox />
          <CustomInput
            label="Local Wallet Address"
            placeHolder="Your Public Address"
            value={localWallet.address}
          />

          <SizedBox />
          <CustomInput
            label="Private Key"
            placeHolder="Your Public Address"
            value={localWallet.privateKey}
          />
          {userData?.username ? (
            <CustomButton
              title={"Start Playing"}
              handleClick={() => console.log("Mocking -> handlePlayerLogin2()")}
              // handleClick={handlePlayerLogin2}
              restStyles="mt-6 w-fit z-10"
            />
          ) : (
            <CustomButton
              title={"Create Player"}
              // handleClick={() => console.log("Mocking -> handlePlayerCreate()")}
              handleClick={(e) =>
                handlePlayerCreate(
                  e,
                  playerName,
                  localWallet,
                  login,
                  getEthBalance,
                  setErrMsg,
                  resetUser,
                  setSuccessMsg
                )
              }
              restStyles="mt-6 w-fit z-10"
            />
          )}
          <CustomButton
            title={"Delete Wallet"}
            handleClick={() => deleteWallet()}
            restStyles="mt-6 w-fit z-10 bg-red-700"
          />
        </>
      ) : (
        <>
          <p style={{ color: "whitesmoke", fontSize: 18, marginTop: 6 }}>
            No Local Wallet was found.
          </p>
          <SizedBox />
          <CustomButton
            title={"Create One Now"}
            // handleClick={() => console.log("handleLocalWalletCreation()")}
            handleClick={generateWallet}
            restStyles="mt-6 w-fit z-10"
          />
        </>
      )}
    </div>
  );
}

export default HomePageLocalWallet;
