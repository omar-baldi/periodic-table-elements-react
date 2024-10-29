import { act, renderHook } from "@testing-library/react";
//TODO: replace with absolute import path
import { useExtractElements } from "../../../src/hooks/useExtractElements";

describe("useExtractElements", () => {
  it("should extract correct entries when no additional option config is provided", () => {
    const hook = renderHook(useExtractElements);
    const r = hook.result;

    expect(r.current[0]).toHaveLength(0);

    act(() => {
      const [, handleChange] = r.current;
      handleChange("breaking");
    });

    expect(r.current[0]).toEqual([
      [expect.any(String), { char: "br", isPeriodicElement: true }],
      [expect.any(String), { char: "e", isPeriodicElement: false }],
      [expect.any(String), { char: "a", isPeriodicElement: false }],
      [expect.any(String), { char: "k", isPeriodicElement: false }],
      [expect.any(String), { char: "i", isPeriodicElement: false }],
      [expect.any(String), { char: "n", isPeriodicElement: false }],
      [expect.any(String), { char: "g", isPeriodicElement: false }],
    ]);
  });

  it("should extract correct entries when 'extractAllElements' is provided", () => {
    const hook = renderHook(() => {
      const options = { extractAllElements: true };
      return useExtractElements(options);
    });

    const r = hook.result;

    expect(r.current[0]).toHaveLength(0);

    act(() => {
      const [, handleChange] = r.current;
      handleChange("breaking");
    });

    expect(r.current[0]).toEqual([
      [expect.any(String), { char: "br", isPeriodicElement: true }],
      [expect.any(String), { char: "e", isPeriodicElement: false }],
      [expect.any(String), { char: "a", isPeriodicElement: false }],
      [expect.any(String), { char: "k", isPeriodicElement: true }],
      [expect.any(String), { char: "in", isPeriodicElement: true }],
      [expect.any(String), { char: "g", isPeriodicElement: false }],
    ]);
  });
});
