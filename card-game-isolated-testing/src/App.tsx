import "./App.css";

import TownMap from "./components/TownMap/TownMap";

import { mapTown } from "./assets/imgs/maps";

function App() {
  return (
    <>
      <TownMap mapImagePath={mapTown} />
    </>
  );
}

export default App;
