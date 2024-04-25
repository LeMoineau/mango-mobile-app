import { Settings } from "../types/settings/Settings";

export namespace DefaultValues {
  export const SETTINGS: Settings = {
    theme: "light",
    srcs: ["mangaplus", "mangasaki"],
    chapterReaderDisplayMode: "singlePage",
    chapterReaderHasHeader: true,
    chapterReaderHasFooter: true,
  };
  export const READER_HEIGHT_RATE_UPDATE = 0.7;
}
