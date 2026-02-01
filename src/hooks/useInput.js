import { useState, useCallback } from "react";

/**
 * Custom hook for managing input values
 * @param {string} initialValue - The initial value for the input
 * @returns {[string, (e: React.ChangeEvent<HTMLInputElement>) => void]} - Tuple of [value, handleChange]
 */
function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((e) => {
    // Handle both React events and direct value updates
    if (e && typeof e.target !== "undefined") {
      setValue(e.target.value);
    } else if (typeof e === "string") {
      setValue(e);
    }
  }, []);

  return [value, handleChange];
}

export default useInput;
