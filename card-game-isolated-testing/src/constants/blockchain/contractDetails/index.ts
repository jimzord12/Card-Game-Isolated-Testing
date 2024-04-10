import { contractRewardingAddress, RewardingABI } from "./rewardingTool";
import { gameABI, gameAddress } from "./game";

export const contractDetails = {
  gameContract: {
    address: gameAddress,
    abi: gameABI,
  },
  rewardingContract: {
    address: contractRewardingAddress,
    abi: RewardingABI,
  },
};
