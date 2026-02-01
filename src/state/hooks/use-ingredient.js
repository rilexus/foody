import { useMemo } from "react";
import { useIngredients } from "./use-ingredients";

export const useIngredient = ({ id }) => {
  const [ingr, set] = useIngredients();

  const ingredient = useMemo(() => ingr.find((i) => i.id === id), [id, ingr]);

  return [
    ingredient,
    (i) => {
      return set((ingredients) => {
        // TODO: if no id found, add to the array
        return ingredients.map((ing) => {
          if (ing.id === id) {
            return { ...ing, ...i };
          }
          return ing;
        });
      });
    },
  ];
};
