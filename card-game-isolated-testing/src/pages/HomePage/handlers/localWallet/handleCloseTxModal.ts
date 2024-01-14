import { ethers } from "ethers";
import { waitForTx } from "../../utils/waitForTx";
import { Dispatch, SetStateAction } from "react";

export const handleCloseTxModal = (
  tx: ethers.TransactionResponse,
  setTransactionModalOpen: Dispatch<SetStateAction<boolean>>
) => {
  const provider = new ethers.JsonRpcProvider(
    "https://snf-34965.ok-kno.grnetcloud.net"
  );

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const success = await waitForTx(provider, tx);
        console.log(success ? "1. isajdbasibdia" : "2. isajdbasibdia");
        setTransactionModalOpen(false);
        resolve(success);
      } catch (error) {
        console.error(
          "⛔ Custom: HandleCloseTxModalL: Error in waitForTx:",
          error
        );
        setTransactionModalOpen(false);
        reject(error);
      }
    }, 5000);
  });
};
