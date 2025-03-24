import {
  DownloadedChapter,
  StoredDownloadedChapter,
} from "./DownloadedChapter";

export interface Downloader {
  chapters: DownloadedChapter[];
}

export interface StoredDownloader {
  chapters: StoredDownloadedChapter[];
}
