import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import useInput from "../../hooks/useInput";
import useLocalWallet from "../../hooks/blockchain/useLocalWallet";
import SizedBox from "../../components/Utility/SizedBox";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton/CustomButton";
import styles from "./HomePage.module.css";
import { handlePlayerCreate } from "./handlers/localWallet/handlePlayerCreate";
import TransactionModal from "../../components/Modals/HomePageModals/TransactionModal";
import { handleOldPlayerETH } from "./handlers/localWallet/handleOldPlayerETH";
import CountdownTimer from "../../components/CountDownTimer/CountDownTimer";
import { loginWithWallet } from "../../../api/apiFns";
import RestoreWalletModal from "../../components/Modals/HomePageModals/RestoreWalletModal";
import DeleteWalletModal from "../../components/Modals/HomePageModals/DeleteWalletModal";

function HomePageLocalWallet() {
  const { user: userData, login, setUser } = useAuth();
  const [playerName, resetUser, userAttribs] = useInput("user", "");
  const [waitingServer, setWaitingServer] = useState(false);
  const [serverIsLive, setServerIsLive] = useState(false);

  const {
    wallet: localWallet,
    deleteWallet,
    generateWallet,
    balance,
    getEthBalance,
    setLW_HookHasRun,
    retrieveWallet,
  } = useLocalWallet();

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isDeleteWalletModalOpen, setDeleteWalletModalOpen] = useState(false);
  const [isRestoreWalletModalOpen, setRestoreWalletModalOpen] = useState(false);

  useEffect(() => {
    if (userData?.wallet) getEthBalance();
  }, [getEthBalance, userData?.wallet]);

  useEffect(() => {
    const checkingServer = async () => {
      try {
        await loginWithWallet("0xCe8E2AAd6a2aE2C69B31e5CFa7512878c4cA4197");
        setServerIsLive(true);
        setErrMsg("");
        setWaitingServer(false);
      } catch (error) {
        setErrMsg("Server Error: Please wait 45-60 secs and try again.");
        setWaitingServer(true);
      }
    };

    const serverTimeout = setTimeout(() => {
      setErrMsg("Server Error: No response received.");
      setWaitingServer(true);
    }, 5000);

    console.log("🔃 Checking for Server Status...");

    if (setLW_HookHasRun) {
      checkingServer();
      clearTimeout(serverTimeout);
    }

    return () => {
      clearTimeout(serverTimeout);
    };
  }, [localWallet, userData?.username, waitingServer, setLW_HookHasRun]);

  return (
    <div className="flex flex-col">
      <TransactionModal open={isTransactionModalOpen} />
      <RestoreWalletModal
        open={isRestoreWalletModalOpen}
        retrieveWallet={retrieveWallet}
        //   () => {

        //   const {walletAddress} = retrieveWallet()
        //   if (walletAddress) throw Error("🔴 - Wallet Address is not null")
        //   setUser({

        // })
        // }
        // }
        setModalVisibility={setRestoreWalletModalOpen}
      />
      <DeleteWalletModal
        open={isDeleteWalletModalOpen}
        setModalVisibility={setDeleteWalletModalOpen}
        deleteWallet={() => {
          resetUser();
          deleteWallet();
        }}
      />

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
            {waitingServer && (
              <CountdownTimer
                initialCount={15}
                setWaitingServer={setWaitingServer}
              />
            )}
            {!serverIsLive && !waitingServer && (
              <p className={styles.infoStyles}>
                Wait a moment while we check the server status...
              </p>
            )}

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
            isDisabled={!serverIsLive}
          />

          <SizedBox />
          <CustomInput
            label="Public Address"
            placeHolder="Your Public Address"
            value={localWallet.address}
            copyToClipboard
          />

          <SizedBox />
          <CustomInput
            label="Private Key"
            placeHolder="Your Public Address"
            value={localWallet.privateKey}
            copyToClipboard
          />
          {localWallet.address && login !== null ? ( // ✨
            // {userData?.username && login !== null ? (
            <CustomButton
              title="Start Playing"
              isDisabled={!serverIsLive}
              handleClick={(e) =>
                handleOldPlayerETH(
                  e,
                  localWallet.address,
                  login,
                  setTransactionModalOpen,
                  setErrMsg,
                  resetUser
                )
              }
              restStyles="mt-6 w-fit z-10"
            />
          ) : (
            <CustomButton
              title={"Create Player"}
              isDisabled={!serverIsLive}
              handleClick={(e) =>
                handlePlayerCreate(
                  e,
                  playerName,
                  localWallet.address,
                  setTransactionModalOpen,
                  setUser,
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
            handleClick={() => setDeleteWalletModalOpen(true)}
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
            handleClick={generateWallet}
            restStyles="mt-6 w-fit z-10"
          />
          <CustomButton
            title={"Restore Wallet"}
            handleClick={() => setRestoreWalletModalOpen(true)}
            restStyles="mt-6 w-fit z-10 bg-blue-700 text-white"
          />
        </>
      )}
    </div>
  );
}

export default HomePageLocalWallet;
