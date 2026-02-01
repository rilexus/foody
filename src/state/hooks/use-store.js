import { useMemo, useReducer } from "react";
import { useStoreEvent } from "./use-store-event";

export const useStore = (name) => {
  const [t, toggle] = useReducer(() => ({}), {});

  useStoreEvent("update", toggle);

  const state = useMemo(() => window.electron.store.get(name), [t]);

  return [
    state,
    (v) => {
      if (typeof v === "function") {
        window.electron.store.set(name, v(window.electron.store.get(name)));
      } else {
        window.electron.store.set(name, v);
      }
    },
  ];
};
