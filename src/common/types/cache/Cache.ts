import { IntersiteManga } from "../../../../../shared/src/types/IntersiteManga";

export interface Cache {
  intersiteMangas: IntersiteManga[];
  currentIntersiteManga?: IntersiteManga;
}
