// import { Link } from "react-router-dom";
// import { useCallback, useState } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { useMutation } from "@tanstack/react-query";
import { loginWithWallet } from "../../../api/apiFns";
import styles from "./HomePage.module.css";
import SizedBox from "../../components/Utility/SizedBox";
import WalletStepper from "../../components/WalletRelated/WalletStepper";
import CustomInput from "../../components/CustomInput/CustomInput";
import useInput from "../../hooks/useInput";
import CustomButton from "../../components/Buttons/CustomButton/CustomButton";
import { useState } from "react";
import { actionBtnManger } from "./utils/actionBtnManger";

const HomePageMetamask = () => {
  const { user: authedUser, login, logout } = useAuth();
  const [user, resetUser, userAttribs] = useInput("user", "");

  const [currentStep, setCurrentStep] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [showNewPlayerForm, setShowNewPlayerForm] = useState(false);
  const [showNewPlayerForm2, setShowNewPlayerForm2] = useState(true);

  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: (walletAddress: string) => loginWithWallet(walletAddress),
    onSuccess: (data) => {
      // Handle successful login
      console.log("🐱‍🏍 - The Received Data: ", data);
      login(data);
      // auth.login(data); // Assuming you have a login function in your auth context
    },
    onError: (error) => {
      // Handle error
      console.error("⛔ - Login error: ", error);
    },
  });

  /* //TODO: Needs Metasmask Provider to work...
  const stepManager = () => {
    if (hasProvider) setCurrentStep(1); // Check if MetaMask is installed
    if (walletAddr.accounts.length > 0) setCurrentStep(2); // Check if MetaMask is connected
    if (walletAddr.chainId == generaChain.parsedChainId) setCurrentStep(3); // Check if MetaMask is installed
  };
  */

  // const fakeLogin = useCallback(() => {
  //   // setWalletAddress(randomWalletAddress);
  //   loginMutation(randomWalletAddress);
  // }, [loginMutation, randomWalletAddress]);

  // if (isPending) return <div style={{ fontSize: 24 }}>Loading...</div>;

  // if (error) return <div style={{ fontSize: 24 }}>{error.message}</div>;

  return (
    // <div>
    //   <h1 style={{ color: auth.user?.wallet ? "green" : "" }}>HomePage</h1>
    //   <Link to={"/game"}>Go to Game</Link>
    //   <br />
    //   <button onClick={fakeLogin}>Login</button>
    // </div>
    <div className="flex flex-col">
      <p className={errMsg ? styles.errorStyles : styles.offscreenStyles}>
        {errMsg}
      </p>
      <p className={successMsg ? styles.successStyles : styles.offscreenStyles}>
        Your account has been created!
        <br /> Login to start playing! 🥳
        <br /> - The awesome thing about Web3...
        <br /> {"..you don't even need to remember usernames & passwords!"}
      </p>
      <SizedBox />
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
            className={`flex flex-col mb-3 transition-height transition-opacity duration-700 ease-in ${
              showNewPlayerForm ? "opacity-100 h-full" : "opacity-0 h-[0px]"
            }`}
          >
            <CustomInput
              label="Player Name"
              placeHolder="Enter your player name"
              Attribs={userAttribs}
            />
            <SizedBox />
            <CustomInput
              label="Wallet Address (Filled Automatically)"
              placeHolder="Enter your wallet address"
              value={authedUser?.wallet ?? "Connect your Wallet First"}
              // Attribs={walletAttribs}
            />
          </div>
        )}
      </>
      <div className="flex flex-col">
        <div className="flex gap-6">
          <CustomButton
            title={actionBtnManger(currentStep).text}
            handleClick={actionBtnManger(currentStep).handler}
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
              handleClick={() => console.log("Creating a")} // 🧪 Mockup
              // handleClick={handlePlayerCreate} // ✨ Restore
              restStyles="mt-6 w-fit z-10"
            />
          ) : (
            <>
              {showNewPlayerForm2 && currentStep === 3 && (
                <CustomButton
                  title="New Player?"
                  handleClick={() => {
                    console.log("🧪 WalletAddr: ", authedUser?.username);
                    setShowNewPlayerForm(true);
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
