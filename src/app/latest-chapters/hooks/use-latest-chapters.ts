import { useState } from "react";
import { StoredChapter } from "../../../../../shared/src/types/Chapter";
import Config from "../../../common/config/Config";
import { useNavigationType } from "../../../common/types/navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { TextFormatUtils } from "../../../../../shared/src/utils/text-format-utils";
import useResponsePageApi from "../../../common/hooks/use-response-page-api";

const useLatestChapters = () => {
  const navigator: useNavigationType = useNavigation();

  const {
    elements: chapters,
    fullyLoaded: noMoreChapters,
    fetch: fetchChapters,
    refresh,
  } = useResponsePageApi<StoredChapter>(Config.getEnv().MANGO_BD_API_ENDPOINT);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNextPage = () => {
    fetchChapters("/latestchapters");
  };

  const openIntersiteMangaPage = (chapter: StoredChapter) => {
    navigator.navigate("IntersiteMangaInfo", {
      intersiteMangaFormattedName: TextFormatUtils.formatMangaTitle(
        chapter.manga.title
      ),
    });
  };

  const searchIntersiteManga = (queryMangaTitle: string) => {
    navigator.navigate("IntersiteMangaSearch", {
      query: queryMangaTitle,
    });
  };

  const _refresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  return {
    chapters,
    noMoreChapters,
    refreshing,
    fetchNextPage,
    refresh: _refresh,
    openIntersiteMangaPage,
    searchIntersiteManga,
  };
};

export default useLatestChapters;
