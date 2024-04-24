import { ReaderDisplayMode, Settings } from "../types/settings/Settings";

export namespace DefaultValues {
  export const SETTINGS: Settings = {
    theme: "light",
    srcs: ["mangaplus", "mangasaki"],
    readerDisplayMode: ReaderDisplayMode.LONG_STRIPE,
    readerHeaderHide: false,
  };
  export const READER_HEIGHT_RATE_UPDATE = 0.7;
}
