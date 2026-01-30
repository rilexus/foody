/**
 * @typedef {{
 *   unit: "kg" | "g" | "l" | "ml" | "cup" | "tbsp" | "tsp" | "oz" | "lb" | "whole" | "bunch" | "clove" | "piece",
 *   amount: number
 * }} Ingredient
 */

/**
 * Returns true if ingredient1 has at least ingredient2 available (ingredient1 - ingredient2 >= 0),
 * with unit conversion where meaningful.
 *
 * Notes/assumptions:
 * - "oz" is treated as mass ounce (avoirdupois) = 28.349523125 g (not fluid ounce).
 * - Volume conversions use: 1 cup = 250 ml (metric cup), 1 tbsp = 15 ml, 1 tsp = 5 ml.
 * - Count-like units ("whole", "bunch", "clove", "piece") are NOT convertible between each other.
 *   They are only comparable if both units match exactly.
 *
 * @param {Ingredient} ingredient1
 * @param {Ingredient} ingredient2
 * @returns {boolean}
 */
export function calculateAvailability(ingredient1, ingredient2) {
  const UNIT = {
    // mass -> grams
    kg: { kind: "mass", toBase: 1000 },
    g: { kind: "mass", toBase: 1 },
    oz: { kind: "mass", toBase: 28.349523125 },
    lb: { kind: "mass", toBase: 453.59237 },

    // volume -> milliliters
    l: { kind: "volume", toBase: 1000 },
    ml: { kind: "volume", toBase: 1 },
    cup: { kind: "volume", toBase: 250 }, // metric cup
    tbsp: { kind: "volume", toBase: 15 },
    tsp: { kind: "volume", toBase: 5 },

    // counts (not convertible across labels)
    whole: { kind: "count", toBase: 1 },
    bunch: { kind: "count", toBase: 1 },
    clove: { kind: "count", toBase: 1 },
    piece: { kind: "count", toBase: 1 },
  };

  const normalize = (ing) => {
    if (!ing || typeof ing !== "object")
      throw new TypeError("Ingredient must be an object.");
    const { unit, amount } = ing;

    const meta = UNIT[unit];
    if (!meta) throw new TypeError(`Unsupported unit: ${String(unit)}`);

    if (typeof amount !== "number" || !Number.isFinite(amount) || amount < 0) {
      throw new TypeError(
        "Ingredient.amount must be a finite, non-negative number.",
      );
    }

    return {
      kind: meta.kind,
      unit,
      value: amount * meta.toBase, // grams, milliliters, or raw count
    };
  };

  const a = normalize(ingredient1);
  const b = normalize(ingredient2);

  // Can't compare mass vs volume vs count
  if (a.kind !== b.kind) return false;

  // Count-like units must match exactly (no conversion between bunch/clove/etc.)
  if (a.kind === "count" && a.unit !== b.unit) return false;

  const EPS = 1e-12; // small tolerance for floating-point math
  return a.value + EPS >= b.value;
}
