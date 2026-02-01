import { useCallback, useState } from "react";

/**
 * A custom React hook that manages a boolean toggle state.
 *
 * @description This hook provides a simple way to manage a boolean value that can be toggled between true and false.
 * It's commonly used for managing UI states like visibility, open/closed status, or boolean flags.
 *
 * @param {boolean} initial - The initial value for the toggle state. Defaults to false.
 *
 * @returns {Array} An array containing two elements: [state, toggleFunction]
 *   - state (boolean): The current boolean value
 *   - toggleFunction (function): A function that toggles the state between true and false
 *
 * @example
 * // Basic usage
 * const [isToggled, toggle] = useToggle();
 *
 * // With initial value
 * const [isVisible, toggleVisibility] = useToggle(true);
 *
 * // Using the toggle function
 * toggle(); // Switches isToggled from false to true
 * toggle(); // Switches isToggled from true to false
 *
 * @author Stanislav Panchenko
 * @since 1.0.0
 */
export const useToggle = (initial = false) => {
  const [state, setState] = useState(initial);

  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};
