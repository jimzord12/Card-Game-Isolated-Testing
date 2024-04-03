interface ChainConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
  rpcUrls: string[];
  blockExplorerUrls: string[] | null;
  parsedChainId?: number;
}

export const generaChain: ChainConfig = {
  chainId: "0x4F07", // Required, the chainId of the Ethereum network as a hexadecimal string.
  // ✨ chainId: '0x4F07', // Required, the chainId of the Ethereum network as a hexadecimal string.
  chainName: "GENERA", // Required, the name of the network.
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 }, // Optional
  // rpcUrls: ['http://83.212.81.174:8545'], // Required, the RPC endpoint URL.
  rpcUrls: ["https://snf-34965.ok-kno.grnetcloud.net/"], // Required, the RPC endpoint URL.
  blockExplorerUrls: null,
  parsedChainId: parseInt("0x4F07", 16), // Optional, the block explorer URL for the network.
  // ✨ parsedChainId: parseInt(0x4f07, 16), // Optional, the block explorer URL for the network.
};
