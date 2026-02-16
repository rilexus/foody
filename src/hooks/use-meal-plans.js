import { useApplicationState } from "./use-application-state";

export const useMealPlans = () => {
  const [state, setState] = useApplicationState();
  const mealPlans = state.mealPlans;

  const setMealPlans = (mealPlans) => {
    setState((state) => {
      if (typeof mealPlans === "function") {
        return {
          ...state,
          mealPlans: mealPlans(state.mealPlans),
        };
      }

      return {
        ...state,
        mealPlans,
      };
    });
  };
  return [mealPlans, setMealPlans];
};
