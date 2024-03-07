import { SourceName } from "@shared/types/primitives/id";
import { ThemeName } from "../types/ThemeName";

export interface Settings {
  theme: ThemeName;
  srcs: SourceName[];
}
