export interface ChapterPage {
  url: string;
  decryptionKey?: string;
}

/**
 * TYPES FUNCTION
 */

export function isChapterPage(page: any): page is ChapterPage {
  return (
    page.url &&
    (page.decryptionKey ? typeof page.decryptionKey === "string" : true)
  );
}
