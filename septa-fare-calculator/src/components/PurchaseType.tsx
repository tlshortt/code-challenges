import { useState } from "react";

const PurchaseType = () => {
  const [purchase, setPurchase] = useState("onboard");

  return (
    <>
        <legend className="label">Where will you purchase the fare?</legend>
        <label>
          <input
            type="radio"
            name="purchase"
            value="kiosk"
            checked={purchase === "kiosk"}
            onChange={(e) => setPurchase(e.target.value)}
          />
          Station Kiosk
        </label>
        <label>
          <input
            type="radio"
            name="purchase"
            value="onboard"
            checked={purchase === "onboard"}
            onChange={(e) => setPurchase(e.target.value)}
          />
          Onboard
        </label>
    </>
  );
}

export default PurchaseType;