import {
  isScrapedChapter,
  ScrapedChapter,
} from "../../../shared/src/types/basics/Chapter";
import {
  isUUID,
  UUID,
} from "../../../shared/src/types/primitives/Identifiers";
import { DownloadState } from "./DownloadState";

export interface DownloadedChapter {
  chapterId: UUID;
  chapter: ScrapedChapter;
  downloadState?: DownloadState;
  progress?: number;
  pagesURL?: string[];
}

export interface StoredDownloadedChapter extends DownloadedChapter {
  pagesURL: string[];
}

/**
 * TYPES FUNCTION
 */

export function isStoredDownloadedChapter(
  downloadedChapter: any
): downloadedChapter is StoredDownloadedChapter {
  return (
    downloadedChapter &&
    isUUID(downloadedChapter.chapterId) &&
    isScrapedChapter(downloadedChapter.chapter) &&
    Array.isArray(downloadedChapter.pagesURL)
  );
}
