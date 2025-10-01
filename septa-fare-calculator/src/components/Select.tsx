import { memo } from "react";
import { type Option } from "../utils/types";

type SelectProps = {
  label: string;
  selectId: string;
  options: Option[];
  value: Option | null;
  ariaDescribedBy?: string;
  onChange: (option: Option | null) => void;
};

const Select: React.FC<SelectProps> = memo(({ label, selectId, options, value, onChange, ariaDescribedBy, ...props }) => {
  return (
    <>
        <label htmlFor={selectId}>{label}</label>
        <select
          id={selectId}
          value={value ? value.value : ""}
          aria-describedby={ariaDescribedBy}
          onChange={e => {
            if (e.target.value === "") {
              onChange(null);
            } else {
              const selectedOption = options.find(option => String(option.value) === e.target.value);
              onChange(selectedOption || null);
            }
          }}
          {...props}
        >
          <option value="">Select an option</option>
          {
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))
          }
        </select>
    </>
  );
});

export default Select;
