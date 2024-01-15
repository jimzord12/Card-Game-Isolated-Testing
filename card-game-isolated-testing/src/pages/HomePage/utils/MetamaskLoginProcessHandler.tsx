import { toast } from "react-toastify";
import { generaChain } from "../../../constants/blockchain/chainConfig";
import { BrowserProvider } from "ethers";

interface CustomErrorToastProps {
  text1: string;
  text2?: string;
  text3?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
const CustomErrorToast = ({ text1, text2, text3 }: CustomErrorToastProps) => (
  <div>
    {text1}
    {text2 && (
      <>
        <br />
        <br />
        {text2}
      </>
    )}
    {text3 && (
      <>
        <br />
        <br />
        {text3}
      </>
    )}
  </div>
);

export function loginProcessHandler(
  provider: BrowserProvider | null,
  chainId: number | null
) {
  // const operations = (op: string, step: number) => {
  //   // User presses "Connect" button
  //   if (op === "connect") {
  //     // Steo #1. User does not have wallet
  //     if (step === 1) {
  //       return true;
  //     }
  //   }
  // };

  if (provider === null) {
    // 1. User doesnt have wallet
    toast.error(
      <CustomErrorToast
        text1={`A Crypto Wallet is required,in order to interact with the site.`}
        text2={"If just installed or activated one, please refresh the page."}
      />,
      {
        position: "top-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    console.log(
      "useWeb3Login: ⛔ A Crypto Wallet is required,in order to interact with the site. If just installed or activated one, please refresh the page."
    );
    return false;
  } else if (provider && chainId === null) {
    // if (operations(operation, 1)) return true;
    // 3. User has wallet, has logged into the Wallet, but has not connected to the site
    toast.error(
      <CustomErrorToast
        text1={"To procceed please connect your wallet to the site."}
        text2={"There is an orange 'Connect' button for this purpose."}
      />,
      {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    console.log(
      "useWeb3Login: ⛔ To procceed please connect your wallet to the site. There is an orange 'Connect' button for this purpose."
    );
    return false;
    // ✨ } else if (hasProvider && wallet.chainId !== 20231) {
  } else if (chainId !== generaChain.parsedChainId) {
    // 4. User has wallet, and has connected it, but is on the wrong network
    toast.error(
      <CustomErrorToast
        text1={"Please change your selected network to: (GENERA)"}
      />,
      {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    console.log(
      "useWeb3Login: ⛔ Please change your selected network to: (GENERA)"
    );
    return false;
  }

  return true;
}
