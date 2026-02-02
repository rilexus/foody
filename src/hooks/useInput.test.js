import { renderHook, act } from "@testing-library/react";
import useInput from "./useInput";

describe("useInput", () => {
  // Test happy path with initial value
  test("initializes with correct value", () => {
    const { result } = renderHook(() => useInput("initial"));
    expect(result.current[0]).toBe("initial");
  });

  // Test updating with React event
  test("updates value from React event", () => {
    const { result } = renderHook(() => useInput("initial"));

    act(() => {
      result.current[1]({ target: { value: "updated" } });
    });

    expect(result.current[0]).toBe("updated");
  });

  // Test updating with string value (direct update)
  test("updates value from string input", () => {
    const { result } = renderHook(() => useInput("initial"));

    act(() => {
      result.current[1]("direct update");
    });

    expect(result.current[0]).toBe("direct update");
  });

  // Test with null/undefined initial values
  test("handles null and undefined initial values", () => {
    const { result: nullResult } = renderHook(() => useInput(null));
    expect(nullResult.current[0]).toBeNull();

    const { result: undefinedResult } = renderHook(() => useInput(undefined));
    expect(undefinedResult.current[0]).toBeUndefined();
  });

  // Test with zero and empty string values
  test("handles zero and empty string values", () => {
    const { result: zeroResult } = renderHook(() => useInput(0));
    expect(zeroResult.current[0]).toBe(0);

    const { result: emptyResult } = renderHook(() => useInput(""));
    expect(emptyResult.current[0]).toBe("");
  });

  // Test with object and array initial values
  test("handles object and array initial values", () => {
    const obj = { key: "value" };
    const arr = [1, 2, 3];

    const { result: objResult } = renderHook(() => useInput(obj));
    expect(objResult.current[0]).toBe(obj);

    const { result: arrResult } = renderHook(() => useInput(arr));
    expect(arrResult.current[0]).toBe(arr);
  });

  // Test edge case: event without target
  test("handles event without target property", () => {
    const { result } = renderHook(() => useInput("initial"));

    act(() => {
      result.current[1]({ type: "change" });
    });

    expect(result.current[0]).toBe("initial");
  });

  // Test edge case: event with target but no value property
  test("handles event with target but no value property", () => {
    const { result } = renderHook(() => useInput("initial"));

    act(() => {
      result.current[1]({ target: { textContent: "test" } });
    });

    expect(result.current[0]).toBe("initial");
  });

  // Test multiple updates
  test("handles multiple updates correctly", () => {
    const { result } = renderHook(() => useInput("initial"));

    act(() => {
      result.current[1]("first");
      result.current[1]("second");
      result.current[1]({ target: { value: "third" } });
    });

    expect(result.current[0]).toBe("third");
  });

  // Test consistency of handleChange function reference
  test("returns consistent handleChange function reference", () => {
    const { result } = renderHook(() => useInput("initial"));
    const firstHandler = result.current[1];

    act(() => {
      result.current[1]("update");
    });

    const secondHandler = result.current[1];
    expect(secondHandler).toBe(firstHandler);
  });
});
