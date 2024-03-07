import { ChapterId, FormattedName, MangaId } from "../primitives/id";
import { IntersiteField } from "./IntersiteField";

export interface IntersiteChapterInfos {
  id: IntersiteField<ChapterId>;
  title: IntersiteField<string>;
  number: IntersiteField<string>;
  formattedNumber: string;
  image: IntersiteField<string>;
  realeaseDate: IntersiteField<Date>;
}

export default interface IntersiteChapter extends IntersiteChapterInfos {
  manga: {
    formattedTitle: FormattedName;
    title: IntersiteField<string>;
    id: IntersiteField<MangaId>;
  };
}
