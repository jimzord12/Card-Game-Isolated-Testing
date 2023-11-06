import "./App.css";
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundry";
import TownMap from "./components/TownMap/TownMap";
import { ImageProvider } from "./context/ImageContext/ImageContext";
// import

// const dataFromDB =



function App() {
  return (
    <ErrorBoundary>
      <ImageProvider>
        <TownMap />
        {/* <WorldMap /> */}
      </ImageProvider>
    </ErrorBoundary>
  );
}

export default App;
