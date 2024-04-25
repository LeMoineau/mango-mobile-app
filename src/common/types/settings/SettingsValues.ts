import { SourceName } from "../../../../../shared/src/types/primitives/Identifiers";
import { ThemeName } from "../ThemeName";

export type SettingsValue = {
  theme: ThemeName;
  srcs: SourceName[];
  chapterReaderDisplayMode: ChapterReaderDisplayMode;
  chapterReaderHasHeader: boolean;
  chapterReaderHasFooter: boolean;
};

export type ChapterReaderDisplayMode = "stripe" | "singlePage";
