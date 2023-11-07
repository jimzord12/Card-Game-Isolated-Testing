import "./App.css";
import EntryPoint from "./components/EntryPoint/EntryPoint";
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundry";

function App() {
  return (
    <ErrorBoundary>
      <EntryPoint />
    </ErrorBoundary>
  );
}

export default App;
