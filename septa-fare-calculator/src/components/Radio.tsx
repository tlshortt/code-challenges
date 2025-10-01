import { memo } from "react";
import { type Option } from "../utils/types";

type RadioProps = {
  label: string;
  name: string;
  options: Option[];
  value: Option | null;
  onChange: (option: Option) => void;
};

const Radio: React.FC<RadioProps> = memo(({ label, name, options, value, onChange}) => {
  return (
    <>
        <legend className="label">{label}</legend>
        {
          options.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value?.value === option.value}
                onChange={e => {
                    const selectedOption = options.find(option => String(option.value) === e.target.value);
                    if (selectedOption) {
                      onChange(selectedOption);
                    }
                }}
              />
              {option.name}
            </label>
          ))
        }
    </>
  );
});

export default Radio;