import { create } from "zustand";
import { Downloader } from "../types/downloader/Downloader";
import { DefaultValues } from "../config/DefaultValues";
import { StorageKeys } from "../config/StorageKeys";
import { ObjectUtils } from "../utils/object-utils";
import useStorage from "../hooks/use-storage";
import { UUID } from "../../../../shared/src/types/primitives/Identifiers";
import {
  DownloadedChapter,
  isStoredDownloadedChapter,
  StoredDownloadedChapter,
} from "../types/downloader/DownloadedChapter";
import { DownloadState } from "../types/downloader/DownloadState";
import { ScrapedChapter } from "../../../../shared/src/types/basics/Chapter";

interface DownloaderStoreState extends Downloader {
  getDownloadedChapter: (chapterId: UUID) => DownloadedChapter | undefined;
  isDownloaded: (chapterId: UUID) => boolean;
  startDownloading: (chapterId: UUID, scrapedChapter: ScrapedChapter) => void;
  progressDownloading: (chapterId: UUID, progress: number) => void;
  pauseDownloading: (chapterId: UUID) => void;
  resumeDownloading: (chapterId: UUID) => void;
  errorDownloading: (chapterId: UUID) => void;
  cancelDownloading: (chapterId: UUID) => void;
  finishDownloading: (chapterId: UUID, pagesURL: string[]) => Promise<void>;
  eraseDownload: (chapterId: UUID) => Promise<void>;
}

export const useDownloaderStore = create<DownloaderStoreState>()((set, get) => {
  const { getJson, saveJson, saveItemInJson } = useStorage();

  getJson(StorageKeys.DOWNLOADER).then(async (json) => {
    const baseValues = {
      ...DefaultValues.STORED_DOWNLOADER,
      ...json,
    };
    set(baseValues);
    if (json === null || !ObjectUtils.equals(json, baseValues)) {
      await saveJson(StorageKeys.DOWNLOADER, baseValues);
    }
  });

  const getDownloadedChapter = (chapterId: UUID) => {
    return get().chapters.find((c) => c.chapterId === chapterId);
  };

  const _setDownloadState = (
    chapterId: UUID,
    state: {
      downloadState?: DownloadState;
      progress?: number;
      pagesURL?: string[];
    }
  ) => {
    if (!state.downloadState && !state.progress) return;
    const tmp = [...get().chapters];
    const target = tmp.find((c) => c.chapterId === chapterId);
    if (!target) return;
    if (state.downloadState) target.downloadState = state.downloadState;
    if (state.progress) target.progress = state.progress;
    if (state.pagesURL) target.pagesURL = state.pagesURL;
    set({
      chapters: tmp,
    });
  };

  const startDownloading = (
    chapterId: UUID,
    scrapedChapter: ScrapedChapter
  ) => {
    if (getDownloadedChapter(chapterId)) return;
    set({
      chapters: [
        ...get().chapters,
        {
          chapterId,
          chapter: scrapedChapter,
          downloadState: "progress",
          progress: 0,
        },
      ],
    });
  };

  const pauseDownloading = (chapterId: UUID) => {
    _setDownloadState(chapterId, { downloadState: "pause" });
  };

  const resumeDownloading = (chapterId: UUID) => {
    _setDownloadState(chapterId, { downloadState: "progress" });
  };

  const progressDownloading = (chapterId: UUID, progress: number) => {
    _setDownloadState(chapterId, { downloadState: "progress", progress });
  };

  const errorDownloading = (chapterId: UUID) => {
    _setDownloadState(chapterId, { downloadState: "error" });
  };

  const cancelDownloading = (_: UUID) => {};

  const finishDownloading = async (chapterId: UUID, pagesURL: string[]) => {
    _setDownloadState(chapterId, { downloadState: "finish", pagesURL });
    await saveItemInJson(
      StorageKeys.DOWNLOADER,
      "chapters",
      get()
        .chapters.filter((c) => !c.pagesURL)
        .map(
          (c): StoredDownloadedChapter => ({
            chapterId: c.chapterId,
            chapter: c.chapter,
            pagesURL: c.pagesURL!,
          })
        )
    );
  };

  const eraseDownload = async (chapterId: UUID) => {
    const tmp = [...get().chapters];
    const index = tmp.findIndex((c) => c.chapterId === chapterId);
    if (index === -1) return;
    tmp.splice(index, 1);
    set({ chapters: tmp });
    await saveItemInJson(StorageKeys.DOWNLOADER, "chapters", tmp);
  };

  const isDownloaded = (chapterId: UUID) => {
    return isStoredDownloadedChapter(getDownloadedChapter(chapterId));
  };

  return {
    ...DefaultValues.STORED_DOWNLOADER,
    getDownloadedChapter,
    isDownloaded,
    startDownloading,
    progressDownloading,
    pauseDownloading,
    resumeDownloading,
    errorDownloading,
    cancelDownloading,
    finishDownloading,
    eraseDownload,
  };
});
