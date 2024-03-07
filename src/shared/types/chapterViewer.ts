export interface ChapterPage {
  url: string;
  decryptionKey?: string;
  width?: number;
  height?: number;
}

export default interface ChapterViewer {
  pages: ChapterPage[];
}
