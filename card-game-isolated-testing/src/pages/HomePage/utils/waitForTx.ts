import {
  TransactionReceipt,
  JsonRpcProvider,
  TransactionResponse,
} from "ethers";

export const waitForTx = async (
  ethersProvider: JsonRpcProvider,
  tx: TransactionResponse
) => {
  console.log("⚡ 1. Received Tx: ", tx);
  console.log("⚡ 2. Provider Tx: ", ethersProvider);
  const receipt: TransactionReceipt | null =
    await ethersProvider.waitForTransaction(tx.hash);
  // You can also check the receipt status if needed:
  if (receipt?.status === 1) {
    return true;
  } else {
    throw new Error("Transaction failed");
  }
};
