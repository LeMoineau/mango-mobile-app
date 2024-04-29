import { useState } from "react";
import useMoreTrustedValue from "./use-more-trusted-value";
import { IdentifiedChapter } from "../../../../shared/src/types/Chapter";
import { ParentlessIntersiteChapter } from "../../../../shared/src/types/IntersiteChapter";

const useTrustedChapter = () => {
  const [chapter, setChapter] = useState<IdentifiedChapter>();
  const { getMoreTrustedChapter } = useMoreTrustedValue();

  const setIntersiteChapter = (
    intersiteChapter: ParentlessIntersiteChapter
  ) => {
    setChapter(getMoreTrustedChapter(intersiteChapter));
  };

  return { chapter, setIntersiteChapter };
};

export default useTrustedChapter;
