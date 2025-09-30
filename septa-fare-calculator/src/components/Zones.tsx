import { useState } from "react";

const Zone = () => {
  const [zone, setZone] = useState("Zone 1");

  /* TODO: enum for zones */

  return (
    <>
        <label htmlFor="zone">Where are you going?</label>
        <select
          id="zone"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        >
          <option>Zone 1</option>
          <option>Zone 2</option>
          <option>Zone 3</option>
          <option>Zone 4</option>
        </select>
    </>
  );
}

export default Zone;
