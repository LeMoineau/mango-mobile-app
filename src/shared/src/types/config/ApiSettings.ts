import { Lang, SourceName } from "../primitives/Identifiers";

export interface ApiSettings {
  scrapersEnabled: SourceName[];
  languagesSupported: Lang[];
}
