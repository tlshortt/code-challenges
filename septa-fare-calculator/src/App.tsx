import "./App.css";
import septaLogo from "./assets/septa-logo.svg";
import Zone from "./components/Zones";
import TimeOfTravel from "./components/TimeOfTravel";
import PurchaseType from "./components/PurchaseType";
import NoOfRides from "./components/NoOfRides";

const App = () => {

  // For now, hard-code fare calculation
  const fare = 28.0;

  return (
    <div className="fare-calculator">
      <header className="fare-header">
        <img src={septaLogo} alt="Septa logo" className="logo" />
        <h1>Regional Rail Fares</h1>
      </header>

      <div className="fare-section">
        <Zone />
      </div>

      <div className="fare-section">
        <TimeOfTravel />
        <small className="helper">"info" from json goes here</small>
      </div>

      <div className="fare-section">
        <PurchaseType />
      </div>

      <div className="fare-section">
        <NoOfRides />
      </div>

      <footer className="fare-footer">
        <p>Your fare will cost</p>
        <strong>${fare.toFixed(2)}</strong>
      </footer>
    </div>
  );
}

export default App;
