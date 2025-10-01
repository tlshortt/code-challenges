import { useState } from "react";

type TextInputProps = {
  label: string;
  type: string;
  inputId: string;
};

const TextInput: React.FC<TextInputProps> = ({ label, type, inputId}) => {
  const [val, setVal] = useState<number>(0);

  return (
    <>
        <label htmlFor={inputId}>{label}</label>
        <input
          type={type}
          id={inputId}
          value={val}
          min={1}
          onChange={(e) => setVal(parseInt(e.target.value, 10))}
        />
    </>
  );
}

export default TextInput;