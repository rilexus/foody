import { useStore } from "./use-store";

export const useApplicationState = () => {
  return useStore("application-state");
};
