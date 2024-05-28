export namespace TextFormatUtils {
  export function formatChapterName(
    chapterNumber: string,
    chapterMangaTitle: string
  ): string {
    let res = chapterNumber.trim().replace(/[^0-9\-]+/g, "");
    try {
      if (isNumber(res)) {
        res = `${Number(res)}`;
      }
    } catch {}
    return `${formatMangaTitle(chapterMangaTitle)}-${res}`;
  }

  export function formatMangaTitle(title: string): string {
    let res = title
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "");
    return res;
  }

  export function isNumber(str: string): boolean {
    return !Number.isNaN(Number(str));
  }

  /**
   * Remove a string from a string
   * @param strToRemove string to remove
   * @returns string without the string to remove
   */
  export function stringWithout(src: string, strToRemove: string): string {
    return src.split(strToRemove).join("").trim();
  }
}
