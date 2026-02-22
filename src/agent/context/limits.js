/**
 * Checks whether the current token count has reached or exceeded a given
 * percentage of the context window.
 *
 * @param {number} totalTokens - The current number of tokens used.
 * @param {number} contextWindow - The maximum token capacity of the context window.
 * @param {number} [threshold=0.5] - The fraction of the context window to treat as the limit (0–1).
 * @returns {boolean} `true` if `totalTokens` is at or above the threshold.
 */
export const isOverThreshold = (
  totalTokens,
  contextWindow,
  threshold = 0.5,
) => {
  return totalTokens >= contextWindow * threshold;
};

/**
 * Calculates what percentage of the context window has been consumed.
 *
 * @param {number} totalTokens - The current number of tokens used.
 * @param {number} contextWindow - The maximum token capacity of the context window.
 * @returns {number} A value between 0 and 100 representing percentage usage.
 */
export const calculateTokenUsage = (totalTokens, contextWindow) => {
  return (totalTokens / contextWindow) * 100;
};
