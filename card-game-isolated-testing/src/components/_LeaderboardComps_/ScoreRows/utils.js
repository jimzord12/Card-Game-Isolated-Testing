export const sortedPlayers = (players) => {
  players.sort((a, b) => (Number(a.rank) < Number(b.rank) ? 1 : -1));
  return players;
};

export const findPlayerIndex = (playerName, sortedPlayers) => {
  if (!playerName || !sortedPlayers) return;
  // console.log(' 1 - findPlayerIndex: ', playerName);
  // console.log(' 2 - findPlayerIndex: ', sortedPlayers);
  const isCurrentPlayer = (player) => player.name === playerName;
  return sortedPlayers.findIndex(isCurrentPlayer);
};

// export const StoreData = (key, value) => {
//   sessionStorage.setItem(key, JSON.stringify(SortScores(value)));
// };

export const GetData = (key) => JSON.parse(sessionStorage.getItem(key)) || [];

// Used with the fireworks animation (So for us it is not needed)
export const CheckForTopThree = (value) => {
  const previous = JSON.parse(sessionStorage.getItem("top-three")) || [];
  const top = previous.some((val) => value >= Number(val));
  return top;
};

export const TopThreeScores = (players) => {
  const topThree = [];
  players.slice(0, 3).forEach((player) => {
    topThree.push(player.rank);
  });

  // StoreData('top-three', topThree);
  return topThree;
};

export const AlternatingBackground = (player, allPlayers) => {
  // ✨ 🥩 Here: Query the database for a all the available players (players === rows)
  // ✨ 🥩 Depending on the index I have to apply the correct style to the row
  const playerIndex = player && findPlayerIndex(player.name, allPlayers);
  const rows = [...document.querySelectorAll(".score-list-row")];
  rows.forEach((row, index) => {
    if (index % 2 === 0) {
      row.style.backgroundColor = "rgba(121, 20, 99, 0.2)";
    }
    // console.log("======================================");
    // console.log("1 - AlternatingBackground: ", index);
    // console.log("2 - AlternatingBackground: ", playerIndex);
    // console.log("======================================");

    if (index === playerIndex)
      row.style.backgroundColor = "rgba(0, 230, 0, 0.4)";
  });
};
