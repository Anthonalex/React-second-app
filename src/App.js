import "./App.css";
import Game from "./components/tic-tac-toe/tic-tak-toe";
import Calc from "./components/simpleCalculator/simpleCalc";
import HarwardDataFetcher from "./components/dataFetcherHarward/harwardData";

function App() {
  return (
    <div>
      <h1>tic tac toe</h1>
      <Game />
      <br />
      <br />
      <br />
      <Calc />
      <br />
      <br />
      <br />
      <HarwardDataFetcher/>
    </div>
  );
}

export default App;
