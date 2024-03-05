export interface ChapterPage {
  url: string;
  decryptionKey?: string;
}

export default interface ChapterViewer {
  pages: ChapterPage[];
}
