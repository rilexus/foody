function toBaseUnit(amount, unit) {
  const u = unit.toLowerCase();
  if (u === "kg") return { amount: amount * 1000, unit: "g" };
  if (u === "g") return { amount, unit: "g" };
  if (u === "l") return { amount: amount * 1000, unit: "ml" };
  if (u === "ml") return { amount, unit: "ml" };
  // Fallback: keep as-is (e.g., "pcs")
  return { amount, unit };
}

export function calcWeeklyShoppingList(state, mealPlanId = 1) {
  const mealPlan = state.mealPlans.find((p) => p.id === mealPlanId);
  if (!mealPlan) throw new Error(`Meal plan ${mealPlanId} not found`);

  const ingredientById = new Map(state.ingredients.map((i) => [i.id, i]));
  const recipeById = new Map(state.recipes.map((r) => [r.id, r]));

  // Count recipe occurrences in the week
  const recipeCounts = new Map(); // recipeId -> count
  for (const col of mealPlan.columns ?? []) {
    for (const rid of col.recipes ?? []) {
      recipeCounts.set(rid, (recipeCounts.get(rid) ?? 0) + 1);
    }
  }

  // Aggregate required amounts (normalized)
  const required = new Map(); // key `${ingredientId}__${baseUnit}` -> amount
  for (const [recipeId, count] of recipeCounts.entries()) {
    const recipe = recipeById.get(recipeId);
    if (!recipe) throw new Error(`Recipe ${recipeId} not found`);

    for (const ri of recipe.ingredients ?? []) {
      const base = toBaseUnit(ri.amount, ri.unit);
      const key = `${ri.id}__${base.unit}`;
      required.set(key, (required.get(key) ?? 0) + base.amount * count);
    }
  }

  // Available pantry amounts (normalized); ignore if not in stock
  const available = new Map(); // key `${ingredientId}__${baseUnit}` -> amount
  for (const ing of state.ingredients) {
    const base = toBaseUnit(ing.availableAmount ?? 0, ing.availableUnit ?? "");
    const key = `${ing.id}__${base.unit}`;
    const usable = ing.inStock ? base.amount : 0;
    available.set(key, (available.get(key) ?? 0) + usable);
  }

  // Build shopping list = max(0, required - available)
  const shopping = [];
  for (const [key, reqAmt] of required.entries()) {
    const [idStr, unit] = key.split("__");
    const ingredientId = Number(idStr);

    const ingMeta = ingredientById.get(ingredientId);
    const availAmt = available.get(key) ?? 0;
    const toBuy = Math.max(0, reqAmt - availAmt);

    if (toBuy > 0) {
      shopping.push({
        ingredientId,
        name: ingMeta?.name ?? `Ingredient ${ingredientId}`,
        category: ingMeta?.category ?? null,
        unit,
        requiredAmount: reqAmt,
        availableAmount: availAmt,
        toBuyAmount: toBuy,
      });
    }
  }

  // Optional: stable ordering (category, then name)
  shopping.sort((a, b) => {
    const ca = a.category ?? "";
    const cb = b.category ?? "";
    if (ca !== cb) return ca.localeCompare(cb);
    return a.name.localeCompare(b.name);
  });

  return {
    // full requirements can be useful for UI
    required: [...required.entries()].map(([key, amount]) => {
      const [idStr, unit] = key.split("__");
      const ingredientId = Number(idStr);
      const ingMeta = ingredientById.get(ingredientId);
      return {
        ingredientId,
        name: ingMeta?.name ?? `Ingredient ${ingredientId}`,
        category: ingMeta?.category ?? null,
        unit,
        amount,
      };
    }),
    shopping,
  };
}
