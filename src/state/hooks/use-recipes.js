import { useApplicationState } from "./use-application-state";

export const useRecipes = () => {
  const [state, setState] = useApplicationState();

  return [
    state.recipes,
    (recipes) => {
      setState((state) => {
        if (typeof recipes === "function") {
          return { ...state, recipes: recipes(state.recipes) };
        } else {
          return { ...state, recipes };
        }
      });
    },
  ];
};
