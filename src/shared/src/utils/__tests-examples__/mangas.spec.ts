import Manga from "../../types/basics/Manga";
import {
  MANGAPLUS_CHAPTER_140_DANDADAN,
  MANGAPLUS_CHAPTER_141_DANDADAN,
  MANGAPLUS_CHAPTER_1_DANDADAN,
  MANGAPLUS_CHAPTER_2_DANDADAN,
} from "./chapters.spec";

export const MANGAPLUS_MANGA_DANDADAN: Manga = {
  id: "100171",
  name: "Dandadan",
  author: "Yukinobu Tatsu",
  image:
    "https://mangaplus.shueisha.co.jp/drm/title/100171/title_thumbnail_portrait_list/312235.jpg?key=15694842bbfc7caa24a32acb2f439419&duration=86400",
  chapters: [
    MANGAPLUS_CHAPTER_1_DANDADAN,
    MANGAPLUS_CHAPTER_2_DANDADAN,
    MANGAPLUS_CHAPTER_140_DANDADAN,
    MANGAPLUS_CHAPTER_141_DANDADAN,
  ],
};
