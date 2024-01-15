import { useState } from "react";
import { BrowserProvider } from "ethers";
import { toast } from "react-toastify";
import { getRandomNum, validateSignedMsg } from "../../../api/apiFns";
import { loginProcessHandler } from "../../pages/HomePage/utils/MetamaskLoginProcessHandler";

export async function getNonce() {
  try {
    const nonce = await getRandomNum();
    return nonce;
  } catch (error) {
    console.error("⛔ (Express Oracle) Failed to fetch nonce:", error);
    toast.error(
      "We are experiencing issues with the Web Server, please try again later",
      {
        position: "top-center",
        autoClose: 12000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
    return null;
  }
}

interface Web3LoginProps {
  provider: BrowserProvider | null;
  walletAddr: string;
  chainId: number | null;
}

export function useWeb3Login({
  provider,
  walletAddr,
  chainId,
}: Web3LoginProps) {
  // Hook's State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  const signMessage = async () => {
    // Checks if wallet, provider, etc. exist
    const isWeb3Ready = loginProcessHandler(provider, chainId);

    if (!isWeb3Ready) return;

    // Again bad naming, this is the random number from the WS
    const nonce = await getNonce();

    const message = `This is your generated random verification number: ${nonce}.\n \nNo action is required from your side concerning the random number. We simply show it for transparency reasons.\n \nBy allowing your Wallet to sign this message, using your private key, it can be proven that you are the true owner of this wallet, without the need for a password.\n \nPlease click "Sign" to proceed.`;

    console.log("1.1  -  Web3 Login - Nonce: ", nonce);
    console.log("1.3  -  Web3 Login - Used Provider: ", provider);
    if (nonce && provider) {
      console.log("2  -  Web3 Login - ");

      const _signer = await provider.getSigner();

      // setSigner(_signer);

      const signedMessage = _signer.signMessage(message);

      try {
        console.log("The Message: ", message);

        const responsePromise = signedMessage
          .then((signedMessage) =>
            validateSignedMsg(message, walletAddr, signedMessage)
          )
          .then((response) => {
            if (response.verified) {
              return response;
            } else {
              throw new Error("Signature verification failed");
            }
          });

        toast.promise(
          responsePromise,
          {
            pending: "Sign this message and await for verification...",
            success: {
              render: ({ data }) => {
                setIsAuthenticated(data.verified);
                if (data.verified) {
                  return "Your signature is valid! Welcome";
                } else {
                  return "The signature is invalid!";
                }
              },
            },
            error: "Failed to verify signed message",
          },
          {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );

        return responsePromise.then(() => true);
      } catch (error) {
        console.error("Failed to verify signed message:", error);
        throw error;
      }
    }
  };

  return { isAuthenticated, signMessage };
}
