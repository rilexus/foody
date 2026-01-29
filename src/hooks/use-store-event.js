import { useEffect } from "react";

export const useStoreEvent = (name, cb) => {
  useEffect(() => {
    const off = window.electron.store.on(name, cb);
    return off;
  }, [name, cb]);
};
