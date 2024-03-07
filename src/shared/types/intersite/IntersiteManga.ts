import { IntersiteField } from "./IntersiteField";
import { IntersiteChapterInfos } from "./IntersiteChapter";
import { FormattedName, MangaId } from "../primitives/id";

export interface IntersiteMangaInfos {
  id: IntersiteField<MangaId>;
  name: IntersiteField<string>;
  formattedName: FormattedName;
  author: IntersiteField<string>;
  image: IntersiteField<string>;
}

export interface IntersiteManga extends IntersiteMangaInfos {
  chapters: IntersiteChapterInfos[];
}
