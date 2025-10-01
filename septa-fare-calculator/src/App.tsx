import { useEffect } from "react";
import "./App.css";
import septaLogo from "./assets/septa-logo.svg";
import Select from "./components/Select";
import Radio from "./components/Radio";
import NumberInput from "./components/NumberInput";
import { useFaresService } from "./services/faresService";
import { useFareStore } from "./store/fareStore";

const App = () => {
  const { 
    zoneOptions, 
    timeOptions,
    purchaseTypeOptions,
    fullData,
    timeHelperInfo,
    purchaseHelperInfo,
    bulkPriceMinimum,
    loading,
    error
  } = useFaresService("/fares.json");
 
  const {
    selectedZone,
    selectedTime,
    selectedPurchaseType,
    numberOfRides,
    calculatedFare,
    setSelectedZone,
    setSelectedTime,
    setSelectedPurchaseType,
    setNumberOfRides,
    setFaresData
  } = useFareStore();

  // Set fares data in store when loaded
  useEffect(() => {
    if (fullData?.zones) {
      setFaresData(fullData.zones);
    }
  }, [fullData, setFaresData]);

  const currentTimeHelperText =
    numberOfRides >= bulkPriceMinimum
      ? timeHelperInfo?.["anytime"] ?? ""
      : selectedTime?.value
      ? timeHelperInfo?.[selectedTime.value] ?? ""
      : "";

  const currentPurchaseHelperText = selectedPurchaseType && purchaseHelperInfo
    ? purchaseHelperInfo[selectedPurchaseType.value] 
    : "";

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="fare-calculator">
      <header className="fare-header">
        <img src={septaLogo} alt="Septa logo" className="logo" />
        <h1>Regional Rail Fares</h1>
      </header>

      <div className="fare-section">
        <Select 
          label="Where are you going?" 
          ariaDescribedBy="zones-helper" 
          selectId="zone" 
          options={zoneOptions}
          value={selectedZone}
          onChange={setSelectedZone}
        />
      </div>

      <div className="fare-section">
        <Select 
          label="When are you riding?" 
          ariaDescribedBy="riding-helper" 
          selectId="riding" 
          options={timeOptions}
          value={selectedTime}
          onChange={setSelectedTime}
        />
        <small className="helper">{currentTimeHelperText}</small>
      </div>

      <div className="fare-section">
        <Radio 
          label="Where will you purchase the fare?" 
          name="purchase" 
          options={purchaseTypeOptions}
          value={selectedPurchaseType}
          onChange={setSelectedPurchaseType}
        />
        <small className="helper">{currentPurchaseHelperText}</small>
      </div>

      <div className="fare-section">
        <NumberInput 
          label="How many rides will you need?" 
          type="number" 
          inputId="rides"
          value={numberOfRides}
          onChange={setNumberOfRides}
        />
      </div>

      <footer className="fare-footer">
        <p>Your fare will cost</p>
        {calculatedFare && <strong>${calculatedFare.toFixed(2)}</strong>}
        {!calculatedFare && selectedZone && selectedTime && selectedPurchaseType && (
          <em>Calculating...</em>
        )}
      </footer>
    </div>
  );
}

export default App;
