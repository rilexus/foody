import { useEffect } from "react";

export const useEventListener = (name, callback) => {
  useEffect(() => {
    const off = window.electron.eventbus.on(name, callback);
    return off;
  }, [name, callback]);

  return (name, data) => {
    window.electron.eventbus.send(name, data);
  };
};
