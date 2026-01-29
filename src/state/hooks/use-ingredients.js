import { useApplicationState } from "../../hooks/use-application-state";

export const useIngredients = () => {
  const [state, setState] = useApplicationState();
  return [
    state.ingredients,
    (ingredients) => {
      setState((s) => {
        return {
          ...s,
          ingredients:
            typeof ingredients === "function"
              ? ingredients(s.ingredients)
              : ingredients,
        };
      });
    },
  ];
};
