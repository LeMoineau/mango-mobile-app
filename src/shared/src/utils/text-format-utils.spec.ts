import { describe, expect, it } from "vitest";
import { TextFormatUtils } from "./text-format-utils";

describe("text-format-utils", () => {
  it("should remove left 0 when format chapter number", () => {
    const A_CHAPTER_NUMBER = "045";

    const res = TextFormatUtils.formatChapterNumber(A_CHAPTER_NUMBER);

    expect(res).toBe("45");
  });

  it("should remove unused space when format chapter number", () => {
    const A_CHAPTER_NUMBER = "  45   ";

    const res = TextFormatUtils.formatChapterNumber(A_CHAPTER_NUMBER);

    expect(res).toBe("45");
  });

  it("should not fail when chapter number is a string", () => {
    const A_CHAPTER_NUMBER = "S7-45";

    const res = TextFormatUtils.formatChapterNumber(A_CHAPTER_NUMBER);

    expect(res).toBe("7-45");
  });

  it("should remove # when chapter number has a #", () => {
    const A_CHAPTER_NUMBER = "#141";

    const res = TextFormatUtils.formatChapterNumber(A_CHAPTER_NUMBER);

    expect(res).toBe("141");
  });

  it("should put to lowercase when format manga title", () => {
    const A_MANGA_TITLE = "OnePiece";

    const res = TextFormatUtils.formatMangaTitle(A_MANGA_TITLE);

    expect(res).toBe("onepiece");
  });

  it("should remove unused space when format manga title", () => {
    const A_MANGA_TITLE = "   onepiece    ";

    const res = TextFormatUtils.formatMangaTitle(A_MANGA_TITLE);

    expect(res).toBe("onepiece");
  });

  it("it should keep only character when format manga title", () => {
    const A_MANGA_TITLE = "L'épopé";

    const res = TextFormatUtils.formatMangaTitle(A_MANGA_TITLE);

    expect(res).toBe("lpop");
  });

  describe("isNumber", () => {
    it("should return true if string is a number", () => {
      const A_NUMBER_STRING = "123";

      expect(TextFormatUtils.isNumber(A_NUMBER_STRING)).toBeTruthy();
    });

    it("should return false if string is not a number", () => {
      const A_NUMBER_STRING = "123a";

      expect(TextFormatUtils.isNumber(A_NUMBER_STRING)).toBeFalsy();
    });
  });

  describe("stringWithout", () => {
    it("should remove target string of src string", () => {
      const A_STRING = "test a string";
      const THE_STRING_TO_REMOVE = "test";

      expect(
        TextFormatUtils.stringWithout(A_STRING, THE_STRING_TO_REMOVE)
      ).toBe("a string");
    });

    it("should remove all occurence of target string of src string", () => {
      const A_STRING = "test atest stringtest";
      const THE_STRING_TO_REMOVE = "test";

      expect(
        TextFormatUtils.stringWithout(A_STRING, THE_STRING_TO_REMOVE)
      ).toBe("a string");
    });
  });
});
