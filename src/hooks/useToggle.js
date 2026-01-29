import { useState, useCallback } from "react";

/**
 * Custom hook for toggling boolean state
 * @param {boolean} [initialValue=false] - Initial toggle state
 * @param {number} [debounceTime=0] - Optional debounce time in ms
 * @returns {Object} Toggle state and control functions
 */
const useToggle = (initialValue = false, debounceTime = 0) => {
  const [isToggled, setIsToggled] = useState(initialValue);
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Clear any pending debounce
  const clearDebounce = useCallback(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }
  }, [debounceTimer]);

  // Toggle with optional debounce
  const toggle = useCallback(
    (value) => {
      clearDebounce();

      if (debounceTime > 0) {
        const timer = setTimeout(() => {
          setIsToggled((prev) => (typeof value === "boolean" ? value : !prev));
        }, debounceTime);
        setDebounceTimer(timer);
      } else {
        setIsToggled((prev) => (typeof value === "boolean" ? value : !prev));
      }
    },
    [clearDebounce, debounceTime],
  );

  return [isToggled, toggle];
};

export default useToggle;
