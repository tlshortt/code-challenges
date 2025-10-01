import { useState } from "react";

type RadioProps = {
  label: string;
  name: string;
  options: string[];
};

const Radio: React.FC<RadioProps> = ({ label, name, options}) => {
  const [val, setVal] = useState(options[0]);

  return (
    <>
        <legend className="label">{label}</legend>
        {
          options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={name}
                value={option}
                checked={val === option}
                onChange={(e) => setVal(e.target.value)}
              />
              {option}
            </label>
          ))
        }

    </>
  );
}

export default Radio;