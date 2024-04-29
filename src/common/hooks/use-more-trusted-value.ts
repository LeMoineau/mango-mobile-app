import { ParentlessIntersiteChapter } from "../../../../shared/src/types/IntersiteChapter";
import { IntersiteManga } from "../../../../shared/src/types/IntersiteManga";
import { ParentlessStoredManga } from "../../../../shared/src/types/Manga";
import { useSettingsStore } from "../store/settings.store";
import { IdentifiedChapter } from "../../../../shared/src/types/Chapter";

const useMoreTrustedValue = () => {
  const { srcs } = useSettingsStore();

  const getMoreTrustedManga = (
    intersiteManga: IntersiteManga
  ): ParentlessStoredManga | undefined => {
    for (let src of srcs) {
      const target = intersiteManga.mangas.find((m) => m.src === src);
      if (target) return target;
    }
    return;
  };

  const getMoreTrustedChapter = (
    intersiteChapter: ParentlessIntersiteChapter
  ): IdentifiedChapter | undefined => {
    for (let src of srcs) {
      const target = intersiteChapter.chapters.find((c) => c.src === src);
      if (target) return target;
    }
    return;
  };

  return { getMoreTrustedManga, getMoreTrustedChapter };
};

export default useMoreTrustedValue;
