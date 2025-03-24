import { beforeEach, describe, expect, it } from "vitest";
import { ArrayUtils } from "./array-utils";
import SplittingError from "../errors/SplittingError";

describe("array-utils", () => {
  let AN_ARRAY: any[] = [];
  const THE_LAST_ITEM = 4;
  const AN_INVENTORY_ARRAY = [
    { name: "asparagus", type: "vegetables", quantity: 9 },
    { name: "bananas", type: "fruit", quantity: 5 },
    { name: "goat", type: "meat", quantity: 23 },
    { name: "cherries", type: "fruit", quantity: 12 },
    { name: "fish", type: "meat", quantity: 22 },
    { name: "fish", type: "meat", quantity: 50 },
  ];

  beforeEach(() => {
    AN_ARRAY = [1, 2, 3];
  });

  it("should return last of array", () => {
    AN_ARRAY.push(THE_LAST_ITEM);

    const res = ArrayUtils.getLastOf(AN_ARRAY);

    expect(res).toBe(THE_LAST_ITEM);
  });

  it("should return n from splitting when trying splitting and get", () => {
    const A_STRING = "a,b";
    const A_SPLITTER = ",";
    const AN_INDEX = 1;

    const res = ArrayUtils.tryingSplitAndGet(A_STRING, A_SPLITTER, AN_INDEX);

    expect(res).toBe("b");
  });

  it("should send src when trying splitting and get on wrong string", () => {
    const A_STRING = "ab";
    const A_SPLITTER = ",";
    const AN_INDEX = 1;

    const res = ArrayUtils.tryingSplitAndGet(A_STRING, A_SPLITTER, AN_INDEX);

    expect(res).toBe(A_STRING);
  });

  it("should throw splitting error when trying splitting and get on wrong string and throwError true", () => {
    const A_STRING = "ab";
    const A_SPLITTER = ",";
    const AN_INDEX = 1;

    expect(() =>
      ArrayUtils.tryingSplitAndGet(A_STRING, A_SPLITTER, AN_INDEX, true)
    ).toThrow(SplittingError);
  });

  it("should transform each item of array into new items", () => {
    type A_FIRST_TYPE = { a: number };
    type A_SECOND_TYPE = { b: number };
    const AN_ARRAY = [{ a: 1 }, { a: 2 }];
    const A_TRANSFORMATER = (a_item: A_FIRST_TYPE): A_SECOND_TYPE => {
      return { b: a_item.a };
    };

    expect(ArrayUtils.transformEachItemOf(AN_ARRAY, A_TRANSFORMATER)).toEqual([
      { b: 1 },
      { b: 2 },
    ]);
  });

  it("should not transform item of transformater return undefined", () => {
    type A_FIRST_TYPE = { a: number };
    const AN_ARRAY = [{ a: 1 }, { a: 2 }];
    const A_TRANSFORMATER = (_: A_FIRST_TYPE) => undefined;

    expect(ArrayUtils.transformEachItemOf(AN_ARRAY, A_TRANSFORMATER)).toEqual(
      []
    );
  });

  describe("groupBy", () => {
    it("should group by simple attribute key in object array", () => {
      expect(
        ArrayUtils.groupBy(AN_INVENTORY_ARRAY, (item) => item.type)
      ).toStrictEqual({
        vegetables: [{ name: "asparagus", type: "vegetables", quantity: 9 }],
        fruit: [
          { name: "bananas", type: "fruit", quantity: 5 },
          { name: "cherries", type: "fruit", quantity: 12 },
        ],
        meat: [
          { name: "goat", type: "meat", quantity: 23 },
          { name: "fish", type: "meat", quantity: 22 },
          { name: "fish", type: "meat", quantity: 50 },
        ],
      });
    });

    it("should group by composite attribute key in object array", () => {
      expect(
        ArrayUtils.groupBy(
          AN_INVENTORY_ARRAY,
          (item) => `${item.type}-${item.name}`
        )
      ).toStrictEqual({
        "vegetables-asparagus": [
          { name: "asparagus", type: "vegetables", quantity: 9 },
        ],
        "fruit-bananas": [{ name: "bananas", type: "fruit", quantity: 5 }],
        "meat-goat": [{ name: "goat", type: "meat", quantity: 23 }],
        "fruit-cherries": [{ name: "cherries", type: "fruit", quantity: 12 }],
        "meat-fish": [
          { name: "fish", type: "meat", quantity: 22 },
          { name: "fish", type: "meat", quantity: 50 },
        ],
      });
    });
  });
});
