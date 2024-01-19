import { useState } from "react";
import useHardcoding from "./useHardcoding";
import { useGameVarsStore } from "../../stores/gameVars";

const TestInputField = () => {
  const { hardcodePlayer } = useHardcoding();
  const [playerAddress, setPlayerAddress] = useState<string>("");
  const player = useGameVarsStore((state) => state.player);

  return (
    <div className="flex flex-col w-full p-4">
      <label htmlFor="wallet_address">
        Provide Player's Wallet Address or ID:
      </label>

      <input
        type="text"
        id="name"
        name="wallet_address"
        required
        maxLength={42}
        size={10}
        onChange={(e) => setPlayerAddress(e.target.value)}
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"
        onClick={() => hardcodePlayer(playerAddress)}
      >
        Login as
      </button>

      <section className="mt-4 text-2xl text-black bg-green-400 rounded-lg p-4">
        <h2 className="flex justify-between">
          Player ID: <span className="font-bold">{player?.id}</span>
        </h2>
        <h2 className="flex justify-between">
          Player Name: <span className="font-bold">{player?.name}</span>
        </h2>
        <h2 className="flex justify-between">
          Player Gold: <span className="font-bold">{player?.gold}</span>
        </h2>
      </section>
    </div>
  );
};

export default TestInputField;
