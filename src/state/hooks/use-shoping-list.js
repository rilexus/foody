import { useApplicationState } from "../../hooks/use-application-state";

export const useShopingList = () => {
  const [state, set] = useApplicationState();

  return [
    state.shopingList,
    (list) => {
      set((s) => {
        return {
          ...s,
          shopingList: typeof list === "function" ? list(s.shopingList) : list,
        };
      });
    },
  ];
};
