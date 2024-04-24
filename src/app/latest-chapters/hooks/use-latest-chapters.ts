import { useState } from "react";
import { StoredChapter } from "../../../../../shared/src/types/Chapter";
import Config from "../../../common/config/Config";
import { useNavigationType } from "../../../common/types/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import { TextFormatUtils } from "../../../../../shared/src/utils/text-format-utils";
import useResponsePageApi from "../../../common/hooks/use-response-page-api";

const useLatestChapters = () => {
  // const { fetch } = useApi(Config.getEnv().MANGO_BD_API_ENDPOINT);
  const navigator: useNavigationType = useNavigation();

  const [noMoreChapters, setNoMoreChapters] = useState(false);
  const { elements, fetch, refresh } = useResponsePageApi<StoredChapter>(
    Config.getEnv().MANGO_BD_API_ENDPOINT
  );
  const [refreshing, setRefreshing] = useState(false);

  const fetchNextPage = () => {
    fetch("/latestchapters").then((res) => {
      if (!res || res.elements.length <= 0) {
        setNoMoreChapters(true);
        return;
      }
    });
  };

  const openIntersiteMangaPage = (chapter: StoredChapter) => {
    navigator.navigate("IntersiteMangaInfo", {
      intersiteMangaFormattedName: TextFormatUtils.formatMangaTitle(
        chapter.manga.title
      ),
    });
  };

  const _refresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  return {
    chapters: elements,
    fetchNextPage,
    noMoreChapters,
    openIntersiteMangaPage,
    refreshing,
    refresh: _refresh,
  };
};

export default useLatestChapters;
