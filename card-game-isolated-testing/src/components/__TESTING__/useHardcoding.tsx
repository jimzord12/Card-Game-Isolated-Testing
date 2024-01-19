import { useGameVarsStore } from "../../stores/gameVars";
import { getPlayerByWallet } from "../../../api/apiFns";
import { useEffect } from "react";

const useHardcoding = () => {
  const setPlayer = useGameVarsStore((state) => state.setPlayer);

  // By Default, the 'Dimius' player is fetched from the API
  useEffect(() => {
    const getData = async () => {
      try {
        const playerData = await getPlayerByWallet(
          "0xe63761bfe4599aab4a7d4cfbb2229103199b3631"
        );
        setPlayer(playerData.player);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any)?.message === "Network Error") {
          console.log("⛔ - Custom: The Error is: ", error);
          throw new Error("⛔ - Custom: Web Server is probably down!");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } else if ((error as any)?.request?.status === 401) {
          throw new Error("⛔ - Custom: Player not found!");
        } else {
          console.log("⛔ - Custom: The Error is: ", error);
          throw new Error("⛔ - Custom: Something went Wrong!");
        }
      }
    };

    getData();
  }, []);

  const hardcodePlayer = async (walletAddress: string) => {
    if (!walletAddress) return;
    try {
      const playerData = await getPlayerByWallet(walletAddress);
      setPlayer(playerData.player);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any)?.message === "Network Error") {
        console.log("⛔ - Custom: The Error is: ", error);
        throw new Error("⛔ - Custom: Web Server is probably down!");
      } else {
        console.log("The Error is: ", error);
        throw new Error("⛔ - Custom: Player not found!");
      }
    }
  };
  return { hardcodePlayer };
};

export default useHardcoding;
// setPlayer({
//   id: 731,
//   name: "Dimius",
//   wallet: "0xe63761bfe4599aab4a7d4cfbb2229103199b3631",
//   password: "12345678!@#",
//   island_id: 6,
//   townhall_lvl: 2,
//   workers_concrete: 7,
//   workers_metals: 8,
//   workers_crystals: 9,
//   taxes: null,
//   voteCasted: null,
//   concrete: 48602,
//   metals: 28871,
//   crystals: 24640,
//   population: 30,
//   gold: 1000000,
//   alliance: null,
//   rank: 49,
//   grp: null,
//   lastETHtransfer: null,
//   refreshToken: null,
//   timestamp: "2021-10-13T14:00:00.000Z",
// });
