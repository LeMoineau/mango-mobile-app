import { useState } from "react";
import { StoredChapter } from "../../../../../shared/src/types/Chapter";
import Config from "../../../common/config/Config";
import useResponsePageApi from "../../../common/hooks/use-response-page-api";

const useLatestChapters = () => {
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
  };
};

export default useLatestChapters;
