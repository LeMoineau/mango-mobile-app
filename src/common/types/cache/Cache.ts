import { IntersiteManga } from "../../../../../shared/src/types/basics/IntersiteManga";

export interface Cache {
  intersiteMangas: IntersiteManga[];
  currentIntersiteManga?: IntersiteManga;
}
