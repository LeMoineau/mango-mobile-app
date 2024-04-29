import { useState } from "react";
import { IntersiteManga } from "../../../../shared/src/types/IntersiteManga";
import { ParentlessStoredManga } from "../../../../shared/src/types/Manga";
import useMoreTrustedValue from "./use-more-trusted-value";

const useTrustedManga = () => {
  const [manga, setManga] = useState<ParentlessStoredManga>();
  const { getMoreTrustedManga } = useMoreTrustedValue();

  const setIntersiteManga = (intersiteManga: IntersiteManga) => {
    setManga(getMoreTrustedManga(intersiteManga));
  };

  return { manga, setIntersiteManga };
};

export default useTrustedManga;
