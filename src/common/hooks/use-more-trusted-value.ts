import { ParentlessIntersiteChapter } from "../../shared/src/types/basics/IntersiteChapter";
import { IntersiteManga } from "../../shared/src/types/basics/IntersiteManga";
import { ParentlessStoredManga } from "../../shared/src/types/basics/Manga";
import { useSettingsStore } from "../store/settings.store";
import { IdentifiedChapter } from "../../shared/src/types/basics/Chapter";
import { SourceName } from "../../shared/src/types/primitives/Identifiers";

const useMoreTrustedValue = () => {
  const { srcs } = useSettingsStore();

  const getMoreTrustedManga = (
    intersiteManga: IntersiteManga,
    inSrcs?: SourceName[]
  ): ParentlessStoredManga | undefined => {
    for (let src of srcs) {
      if (inSrcs && !inSrcs.includes(src)) continue;
      const target = intersiteManga.mangas.find((m) => m.src === src);
      if (target) return target;
    }
    return;
  };

  const getMoreTrustedChapter = (
    intersiteChapter: ParentlessIntersiteChapter,
    inSrcs?: SourceName[]
  ): IdentifiedChapter | undefined => {
    for (let src of srcs) {
      if (inSrcs && !inSrcs.includes(src)) continue;
      const target = intersiteChapter.chapters.find((c) => c.src === src);
      if (target) return target;
    }
    return;
  };

  return { getMoreTrustedManga, getMoreTrustedChapter };
};

export default useMoreTrustedValue;
