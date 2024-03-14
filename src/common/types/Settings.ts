import { SourceName } from "@shared/types/primitives/id";
import { ThemeName } from "./ThemeName";

export interface Settings {
  theme: ThemeName;
  srcs: SourceName[];
  readerHeaderHide: boolean;
  readerDisplayMode: ReaderDisplayMode;
}

export enum ReaderDisplayMode {
  LONG_STRIPE,
  SINGLE_PAGE,
}

export type ReaderOption = "readerDisplayMode" | "readerHeaderHide";
export type ReaderOptionsValue = {
  readerDisplayMode: ReaderDisplayMode;
  readerHeaderHide: boolean;
};
