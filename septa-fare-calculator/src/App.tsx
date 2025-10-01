import "./App.css";
import septaLogo from "./assets/septa-logo.svg";
import Select from "./components/Select";
import Radio from "./components/Radio";
import TextInput from "./components/TextInput";
import { useFaresService } from "./services/faresService";

const App = () => {
  const { zoneOptions, timeOptions, purchaseTypeOptions, loading, error } = useFaresService("/fares.json");

  console.log("zone:", zoneOptions);
  console.log("time:", timeOptions);
  console.log("purchase:", purchaseTypeOptions);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="fare-calculator">
      <header className="fare-header">
        <img src={septaLogo} alt="Septa logo" className="logo" />
        <h1>Regional Rail Fares</h1>
      </header>

      <div className="fare-section">
        <Select label="Where are you going?" ariaDescribedBy="zones-helper" selectId="zone" options={zoneOptions} />
      </div>

      <div className="fare-section">
        <Select label="When are you riding?" ariaDescribedBy="riding-helper" selectId="riding" options={timeOptions} />
        <small className="helper">"info" from json goes here</small>
      </div>

      <div className="fare-section">
        <Radio label="Where will you purchase the fare?" name="purchase" options={purchaseTypeOptions} />
      </div>

      <div className="fare-section">
        <TextInput label="How many rides will you need?" type="number" inputId="rides" />
      </div>

      <footer className="fare-footer">
        <p>Your fare will cost</p>
        {/* <strong>${fare.toFixed(2)}</strong> */}
      </footer>
    </div>
  );
}

export default App;
