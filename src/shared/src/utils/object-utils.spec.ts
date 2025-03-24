import { describe, expect, it, vi } from "vitest";
import { ObjectUtils } from "./object-utils";

describe("object-utils", () => {
  it("should call callback for every key in object", () => {
    const AN_OBJECT = { a: 1, b: 2, c: 3 };
    const A_CALLBACK = vi.fn();

    ObjectUtils.forEachKeyInObject(AN_OBJECT, A_CALLBACK);

    expect(A_CALLBACK).toHaveBeenCalledTimes(3);
    expect(A_CALLBACK).toHaveBeenCalledWith("a", 1);
    expect(A_CALLBACK).toHaveBeenCalledWith("b", 2);
    expect(A_CALLBACK).toHaveBeenCalledWith("c", 3);
  });
});
