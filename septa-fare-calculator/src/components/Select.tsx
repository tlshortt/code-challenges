import { useState } from "react";

type SelectProps = {
  label: string;
  selectId: string;
  options: string[];
  ariaDescribedBy?: string;
};

const Select: React.FC<SelectProps> = ({ label, selectId, options, ariaDescribedBy, ...props }) => {
  const [val, setVal] = useState("");

  return (
    <>
        <label htmlFor="zone">{label}</label>
        <select
          id={selectId}
          value={val}
          aria-describedby={ariaDescribedBy}
          onChange={(e) => setVal(e.target.value)}
          {...props}
        >
          {
            options.map((option) => (
              <option key={option}>
                {option}
              </option>
            ))
          }
        </select>
    </>
  );
}

export default Select;
