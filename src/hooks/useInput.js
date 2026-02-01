import { useState, useCallback } from "react";

/**
 * Custom hook for managing input state
 * @description This hook provides a convenient way to manage the state of an input field
 * @param {string} initialValue - The initial value for the input field
 * @returns {Array} An array containing [value, handleChange] where value is the current input value and handleChange is the event handler
 * @example
 * const [name, handleNameChange] = useInput('');
 * // Usage in JSX: <input value={name} onChange={handleNameChange} />
 */
function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((e) => {
    if (e && typeof e.target !== "undefined") {
      setValue(e.target.value);
    }
  }, []);

  return [value, handleChange];
}

export default useInput;
