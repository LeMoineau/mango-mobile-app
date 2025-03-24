import { SourceName } from "../../../shared/src/types/primitives/Identifiers";

export type IntersiteMangaSearchSorting = "Group By Manga" | "By Sources";

export default interface IntersiteMangaSearchFilter {
  srcs?: SourceName[];
  sort?: IntersiteMangaSearchSorting;
}
