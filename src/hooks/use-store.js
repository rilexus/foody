import { useReducer, useMemo } from "react";
import { useStoreEvent } from "./use-store-event";

/**
 * Custom hook for managing store state with electron
 * @description This hook provides a convenient way to manage application state stored in electron's store
 * @param {string} name - The key name for the store item
 * @returns {Array} An array containing [state, setter] where state is the current store value and setter is a function to update the store
 * @example
 * const [theme, setTheme] = useStore('theme');
 * // Usage: setTheme('dark') or setTheme(prev => ({ ...prev, mode: 'dark' }))
 */
export const useStore = (name) => {
  const [t, toggle] = useReducer(() => ({}), {});

  useStoreEvent("update", toggle);

  const state = useMemo(() => {
    if (typeof window !== "undefined" && window.electron?.store) {
      return window.electron.store.get(name);
    }
    return null;
  }, [t, name]);

  return [
    state,
    (v) => {
      if (typeof window !== "undefined" && window.electron?.store) {
        if (typeof v === "function") {
          window.electron.store.set(name, v(window.electron.store.get(name)));
        } else {
          window.electron.store.set(name, v);
        }
      }
    },
  ];
};
