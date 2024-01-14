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

// const LOGIN_URL = "authNoPwd";
// const CREATE_PL_URL = "register/player";
// const GIVE_ETH_NEW_PLAYER = "gasless/register";
// const GIVE_ETH_OLD_PLAYER = "gasless/login";
// const usernameRegex = /([a-zA-Z][a-zA-Z0-9 ]{0,15})/;

export function HomePageLocalWallet() {
  // const navigate = useNavigate();
  const { user: userData, login, setUser } = useAuth();
  const [playerName, resetUser, userAttribs] = useInput("user", "");

  const {
    wallet: localWallet,
    deleteWallet,
    generateWallet,
    balance,
    getEthBalance,
  } = useLocalWallet();

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  useEffect(() => {
    if (userData?.wallet) getEthBalance();
  }, [getEthBalance, userData?.wallet]);

  return (
    <div className="flex flex-col">
      <TransactionModal open={isTransactionModalOpen} />

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
          {userData?.username && login !== null ? (
            <CustomButton
              title={"Start Playing"}
              // handleClick={() => console.log("Mocking -> handlePlayerLogin2()")}
              handleClick={(e) =>
                handleOldPlayerETH(
                  e,
                  userData,
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
              // handleClick={() => console.log("Mocking -> handlePlayerCreate()")}
              handleClick={(e) =>
                handlePlayerCreate(
                  e,
                  playerName,
                  localWallet,
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
