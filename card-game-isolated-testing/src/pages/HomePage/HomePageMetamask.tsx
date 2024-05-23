// import { Link } from "react-router-dom";
// import { useCallback, useState } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
// import { useMutation } from "@tanstack/react-query";
// import { fetchUserDataWithWallet } from "../../../api/apiFns";
import styles from "./HomePage.module.css";
import SizedBox from "../../components/Utility/SizedBox";
import WalletStepper from "../../components/WalletRelated/WalletStepper";
import CustomInput from "../../components/CustomInput/CustomInput";
import useInput from "../../hooks/useInput";
import CustomButton from "../../components/Buttons/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import { useMetamask } from "../../hooks/blockchain/useMetamask";
import { generaChain } from "../../constants/blockchain/chainConfig";
import TransactionModal from "../../components/Modals/HomePageModals/TransactionModal";
import { handleOldPlayerETH } from "./handlers/localWallet/handleOldPlayerETH";
import { handlePlayerCreate } from "./handlers/localWallet/handlePlayerCreate";
import { useWeb3Login } from "../../hooks/blockchain/useWeb3Login";
import { loginWithWallet } from "../../../api/apiFns";
import { useGeneralVariablesStore } from "../../stores/generalVariables";
import CountdownTimer from "../../components/CountDownTimer/CountDownTimer";

const HomePageMetamask = () => {
  const { login, setUser } = useAuth();
  const {
    value: playerName,
    reset: resetUser,
    attributeObj: userAttribs,
  } = useInput("");
  const {
    ethersProvider,
    metamaskProvider,
    // errorMessage,
    wallet,
    // getProvider,
    // _updateWallet,
    switchNetwork,
    addNetwork,
    connectMetaMask,
  } = useMetamask();

  const { signMessage } = useWeb3Login({
    provider: ethersProvider,
    walletAddr: wallet.accounts[0],
    chainId: wallet.chainId,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  const [showNewPlayerForm, setShowNewPlayerForm] = useState(false);
  const [showNewPlayerForm2, setShowNewPlayerForm2] = useState(true);

  const [isPlayerRegistered, setIsPlayerRegistered] = useState(false);

  const [serverIsLive, setServerIsLive] = useState(false);
  const [waitingServer, setWaitingServer] = useState(false);

  const setIsNewPlayer = useGeneralVariablesStore(
    (state) => state.setIsNewPlayer
  );

  useEffect(() => {
    async function automaticLogin() {
      if (serverIsLive === false || wallet.accounts.length === 0) {
        console.log(
          "⛔ - [METAMASK-HOME PAGE] - Server is not live or Wallet is not connected."
        );
        console.log("⛔ - [METAMASK-HOME PAGE] - Server: ", serverIsLive);
        console.log("⛔ - [METAMASK-HOME PAGE] - Wallet: ", wallet);
        return;
      }

      try {
        const walletAddress = wallet.accounts[0];
        console.log("✅ - [METAMASK-HOME PAGE] - Wallet Accounts are present");
        const userData = await loginWithWallet(walletAddress);

        if (setUser === null)
          throw new Error("⛔ - useLocalWallet: setUser is null");

        setUser({ ...userData });
        setIsPlayerRegistered(true);
        setShowNewPlayerForm2(false);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any)?.response.status === 401) {
          console.log(
            "🔷 - ⛔ | Tried to Automatically Fetch User Data and Failed!"
          );
          setIsPlayerRegistered(false);
        } else {
          console.log(
            "🔷 - ⛔ | Automatic UserData Local Wallet Retrival Failed, here is the error: ",
            error
          );
        }
      }
    }

    if (currentStep >= 3) {
      automaticLogin();
    }
  }, [serverIsLive, wallet.accounts.length, currentStep]);

  // Checking the Server Status
  useEffect(() => {
    let serverTimeout: NodeJS.Timeout;
    if (!serverIsLive) {
      serverTimeout = setTimeout(() => {
        setErrMsg("Server Error: Please wait 45-60 secs and try again.");
        setWaitingServer(true);
      }, 5000);
    }

    const checkingServer = async () => {
      try {
        await loginWithWallet("0xCe8E2AAd6a2aE2C69B31e5CFa7512878c4cA4197");
        setServerIsLive(true);
        setErrMsg("");
        setWaitingServer(false);
        clearTimeout(serverTimeout);
      } catch (error) {
        console.error("⛔ - Server is not live: ", error);
        setErrMsg("Server Error: Please wait 45-60 secs and try again.");
        setWaitingServer(true);
      }
    };

    if (!serverIsLive) {
      console.log("🔃 Checking for Server Status...");
      checkingServer();
    }

    return () => {
      clearTimeout(serverTimeout);
    };
  }, [waitingServer, wallet.accounts.length]);

  const stepManager = () => {
    if (metamaskProvider) setCurrentStep(1); // Check if MetaMask is installed
    if (wallet.accounts.length > 0) setCurrentStep(2); // Check if MetaMask is connected
    if (wallet.chainId == generaChain.parsedChainId) setCurrentStep(3); // Check if MetaMask is installed
  };

  useEffect(() => {
    if (metamaskProvider) {
      stepManager();
    }
  }, [metamaskProvider, wallet.chainId, wallet.accounts.length]);

  const actionBtnManger = () => {
    switch (currentStep) {
      case 0:
        return {
          text: "Get MetaMask",
          handler: () => {
            window.open("https://metamask.io/", "_blank");
          },
        };
        break;

      case 1:
        return {
          text: "Connect Wallet",
          handler: () => {
            connectMetaMask();
          },
        };

      case 2:
        return {
          text: "Select Genera Network",
          handler: async () => {
            try {
              await switchNetwork();
            } catch (error) {
              if (
                (error as { message: string }).message ===
                "This chain does not exist on Metamask"
              ) {
                console.log("🟢 asdsada");
                await addNetwork();
                await switchNetwork();
              }
            }
          },
        };

      case 3:
        if (isPlayerRegistered) {
          return {
            text: "Login and Play",
            handler: handleLogin,
          };
        }

        if (!showNewPlayerForm) {
          console.log("asdasdasda", showNewPlayerForm);
          setShowNewPlayerForm(true);
        }

        return {
          text: "Create New Account",
          handler: handlePlayerCreation,
        };

      default:
        return { text: "Error!", handler: () => {} };
    }
  };

  const handleLogin = async (e: React.MouseEvent) => {
    const success = await signMessage();
    if (success) {
      try {
        const { username } = await loginWithWallet(wallet.accounts[0]);
        console.log("🟢✨ Handle Login: ", success, username);

        if (username) {
          try {
            handleOldPlayerETH(
              e,
              wallet.accounts[0],
              login!,
              setTransactionModalOpen,
              setErrMsg,
              resetUser
            );
          } catch (error) {
            setErrMsg(
              "We are experiencing some issues. Please try again later."
            );
          }
        }
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any).response.status === 401) {
          setErrMsg(
            "You are the true owner of this wallet, but you don't have a player account yet. Please create one."
          );
        }
      }
    }
  };

  const handlePlayerCreation = async (e: React.MouseEvent) => {
    const success = await handlePlayerCreate(
      e,
      playerName,
      wallet.accounts[0],
      setTransactionModalOpen,
      setUser,
      setErrMsg,
      resetUser,
      setSuccessMsg
    );

    if (success) {
      setShowNewPlayerForm2(false);
      setIsNewPlayer(true);
      setIsPlayerRegistered(true);
    } else {
      // setErrMsg("We are experiencing some issues. Please try again later.");
      console.error(
        "⛔ Custom: HomePage-Metamask: HandlePlayerCreate, Player Creation Failed"
      );
    }
  };

  // ✨ Temporary Commented Out
  // const {
  //   mutate: loginMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: (walletAddress: string) =>
  //     fetchUserDataWithWallet(walletAddress),
  //   onSuccess: (data) => {
  //     // Handle successful login
  //     console.log("🐱‍🏍 - The Received Data: ", data);
  //     login(data);
  //     // auth.login(data); // Assuming you have a login function in your auth context
  //   },
  //   onError: (error) => {
  //     // Handle error
  //     console.error("⛔ - Login error: ", error);
  //   },
  // });

  return (
    <div className="flex flex-col">
      <TransactionModal open={isTransactionModalOpen} />

      <>
        <p className={errMsg ? styles.errorStyles : styles.offscreenStyles}>
          {errMsg}
        </p>
        {waitingServer && !serverIsLive && (
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
          className={successMsg ? styles.successStyles : styles.offscreenStyles}
        >
          Your account has been created!
          <br /> Login to start playing! 🥳
          <br /> - The awesome thing about Web3...
          <br /> {"..you don't even need to remember usernames & passwords!"}
        </p>
      </>
      <div style={{ height: 16 }} />
      <div className="max-md:w-full xl:w-full w-2/3">
        {/* <SizedBox /> */}

        <WalletStepper currentStep={currentStep} />
        <SizedBox />
        {/* <TransactionModal open={isTransactionModalOpen} /> */}
      </div>
      <>
        {showNewPlayerForm2 && (
          <div
            title="Player Creation Form"
            className={`flex flex-col mt-8 mb-3 transition-height transition-opacity duration-700 ease-in ${
              showNewPlayerForm ? "opacity-100 h-full" : "opacity-0 h-[0px]"
            }`}
          >
            <div className="bg-emerald-700 p-4 w-fit rounded-xl">
              <p>You need to Create an Account to Play the Game.</p>
              <br />
              <p>Please enter a name for your Player.</p>
              <p>
                {" "}
                Afterwards, click the <strong>"Create Player</strong>" button.
              </p>
            </div>
            <SizedBox />

            <CustomInput
              label="Player Name"
              placeHolder="Enter your player name"
              Attribs={userAttribs}
            />
            <SizedBox />
            <CustomInput
              label="Wallet Address (Filled Automatically)"
              placeHolder="Enter your wallet address"
              value={wallet.accounts[0] ?? "Connect your Wallet First"}
              // Attribs={walletAttribs}
            />
          </div>
        )}
      </>
      <div className="flex flex-col">
        <div className="flex gap-6">
          <CustomButton
            title={actionBtnManger().text}
            handleClick={actionBtnManger().handler}
            isDisabled={
              currentStep === 3 &&
              playerName.length === 0 &&
              !isPlayerRegistered
            }
            restStyles="mt-6 w-fit z-10 transition-all duration-500"
            // isDisabled={!(currentStep == 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageMetamask;
