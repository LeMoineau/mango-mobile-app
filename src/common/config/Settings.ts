import { SourceName } from "../types/primitives/Ids";
import { ThemeName } from "../types/primitives/ThemeName";

export interface Settings {
  theme: ThemeName;
  srcs: SourceName[];
}
