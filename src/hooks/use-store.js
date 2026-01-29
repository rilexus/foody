import { useReducer } from "react";
import { useStoreEvent } from "./use-store-event";

export const useStore = (name) => {
  const [, toggle] = useReducer(() => ({}), {});

  useStoreEvent("update", toggle);

  return [
    window.electron.store.get(name),
    (v) => {
      if (typeof v === "function") {
        window.electron.store.set(name, v(window.electron.store.get(name)));
      } else {
        window.electron.store.set(name, v);
      }
    },
  ];
};
