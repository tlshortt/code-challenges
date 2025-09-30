import { useState } from "react";

const NoOfRides = () => {
  const [rides, setRides] = useState<number>(4);

  return (
    <>
        <label htmlFor="rides">How many rides will you need?</label>
        <input
          type="number"
          id="rides"
          value={rides}
          min={1}
          onChange={(e) => setRides(Number(e.target.value))}
        />
    </>
  );
}

export default NoOfRides;