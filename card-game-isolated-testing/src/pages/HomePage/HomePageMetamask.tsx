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

const HomePageMetamask = () => {
  const { login, setUser } = useAuth();
  const [playerName, resetUser, userAttribs] = useInput("user", "");
  const {
    ethersProvider,
    metamaskProvider,
    // errorMessage,
    wallet,
    // getProvider,
    // _updateWallet,
    switchNetwork,
    // addNetwork,
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

  const stepManager = () => {
    if (metamaskProvider) setCurrentStep(1); // Check if MetaMask is installed
    if (wallet.accounts.length > 0) setCurrentStep(2); // Check if MetaMask is connected
    if (wallet.chainId == generaChain.parsedChainId) setCurrentStep(3); // Check if MetaMask is installed
  };

  useEffect(() => {
    if (metamaskProvider) {
      // console.log("UseEffect: from Metamask HomePage");
      // console.log(metamaskProvider);
      // console.log("Wallet: ", wallet);
      stepManager();
    }
  }, [metamaskProvider, wallet.chainId, wallet.accounts.length]);

  useEffect(() => {
    console.log("first");
  }, [errMsg, successMsg]);

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
        break;

      case 2:
        return {
          text: "Select Genera Network",
          handler: () => {
            switchNetwork();
          },
        };
        break;

      case 3:
        return {
          text: "Login with Wallet",
          handler: handleLogin,
        };
        break;

      default:
        return { text: "Error!", handler: () => {} };
    }
  };

  const handleLogin = async (e: React.MouseEvent) => {
    const success = await signMessage();
    if (success) {
      try {
        const { username } = await loginWithWallet(wallet.accounts[0]);
        console.log("Handle Login: ", success, username);

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

  // if (isPending) return <div style={{ fontSize: 24 }}>Loading...</div>;

  // if (error) return <div style={{ fontSize: 24 }}>{error.message}</div>;

  return (
    <div className="flex flex-col">
      <TransactionModal open={isTransactionModalOpen} />

      <p className={errMsg ? styles.errorStyles : styles.offscreenStyles}>
        {errMsg}
      </p>
      <p className={successMsg ? styles.successStyles : styles.offscreenStyles}>
        Your account has been created!
        <br /> Login to start playing! 🥳
        <br /> - The awesome thing about Web3...
        <br /> {"..you don't even need to remember usernames & passwords!"}
      </p>
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
            <p>
              Please enter a name for your Player. Afterwards, click the{" "}
              <strong>"Create Player</strong>" button.
            </p>
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
            restStyles="mt-6 w-fit z-10"
            // isDisabled={!(currentStep == 0)}
          />
          {showNewPlayerForm2 && currentStep === 3 && (
            <h4 className="text-white font-semibold text-3xl self-center mt-4">
              OR
            </h4>
          )}
        </div>

        <>
          {showNewPlayerForm && showNewPlayerForm2 ? (
            <CustomButton
              title="Create Player"
              handleClick={async (e) => {
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

                if (success) setShowNewPlayerForm2(false);
              }} // ✨ Restore
              restStyles="mt-6 w-fit z-10"
            />
          ) : (
            <>
              {showNewPlayerForm2 && currentStep === 3 && (
                <CustomButton
                  title="New Player?"
                  handleClick={() => {
                    setShowNewPlayerForm(true);
                    setErrMsg("");
                  }}
                  restStyles="mt-6 w-fit z-10"
                />
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default HomePageMetamask;
