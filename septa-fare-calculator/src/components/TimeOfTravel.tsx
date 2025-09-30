import { useState } from "react";

const TimeOfTravel = () => {
  const [riding, setRiding] = useState("Anytime");

  /* TODO: enum for riding options */

  return (
    <>
        <label htmlFor="riding">When are you riding?</label>
        <select
          id="riding"
          aria-describedby="riding-helper"
          value={riding}
          onChange={(e) => setRiding(e.target.value)}
        >
          <option>Anytime</option>
          <option>Weekdays</option>
          <option>Evenings or Weekends</option>
        </select>
    </>
  );
}

export default TimeOfTravel;
