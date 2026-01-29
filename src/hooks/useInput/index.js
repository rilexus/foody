import { useState } from "react";

const useInput = (initialValue, validateValue = () => true) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(value);
  const hasError = !valueIsValid && isTouched;

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue(initialValue);
    setIsTouched(false);
  };

  return {
    isValid: valueIsValid,
    hasError,
    value,
    register: {
      value,
      onChange,
      onBlur,
    },
    reset,
  };
};

export default useInput;
