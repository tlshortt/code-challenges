import { memo, useCallback } from "react";

type NumberInputProps = {
  label: string;
  type: string;
  inputId: string;
  value: number;
  onChange: (value: number) => void;
};

const NumberInput: React.FC<NumberInputProps> = memo(({ label, type, inputId, value, onChange}) => {
  const handleChange = useCallback((e: { target: { value: string; }; }) => {
    const parsed = parseInt(e.target.value, 10);

    if (isNaN(parsed)) {
      onChange(1); // when user empties the input
      return;
    }

    // minimum of 1
    onChange(parsed < 1 ? 1 : parsed);
  }, [onChange]);

  return (
    <>
        <label htmlFor={inputId}>{label}</label>
        <input
          type={type}
          id={inputId}
          value={value}
          min={1}
          onChange={handleChange}
        />
    </>
  );
});

export default NumberInput;