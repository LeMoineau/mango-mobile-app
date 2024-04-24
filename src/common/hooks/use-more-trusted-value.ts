import { useState } from "react";
import {
  isParentlessIntersiteChapter,
  ParentlessIntersiteChapter,
} from "../../../../shared/src/types/IntersiteChapter";
import { IntersiteManga } from "../../../../shared/src/types/IntersiteManga";
import { IdentifiedChapter } from "../../../../shared/src/types/Chapter";
import { ParentlessStoredManga } from "../../../../shared/src/types/Manga";
import { useSettingsStore } from "../store/settings.store";
import { SourceName } from "../../../../shared/src/types/primitives/Identifiers";

const useMoreTrustedValue = <
  T extends ParentlessIntersiteChapter | IntersiteManga
>() => {
  type TrustedValueType = T extends ParentlessIntersiteChapter
    ? IdentifiedChapter
    : ParentlessStoredManga;
  const [moreTrustedValue, setMoreTrustedValue] = useState<TrustedValueType>();
  const [moreTrustedSrc, setMoreTrustedSrc] = useState<SourceName>();
  const { srcs } = useSettingsStore();

  const setIntersiteValue = (
    value: T
  ): [SourceName, TrustedValueType] | undefined => {
    for (let src of srcs) {
      const target = isParentlessIntersiteChapter(value)
        ? value.chapters.find((c) => c.src === src)
        : value.mangas.find((m) => m.src === src);
      if (target) {
        setMoreTrustedValue(target as TrustedValueType);
        setMoreTrustedSrc(target.src);
        return [target.src, target as TrustedValueType];
      }
    }
    return;
  };

  return {
    moreTrustedValue,
    moreTrustedSrc,
    setIntersiteValue,
  };
};

export default useMoreTrustedValue;
