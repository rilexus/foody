import { useState } from "react";

export const useToggle = (initial = false) => {
  const [state, setState] = useState(initial);

  // function that set the state to false
  const toggle = () => setState(!state);

  // return state
  return [state, toggle];
};
