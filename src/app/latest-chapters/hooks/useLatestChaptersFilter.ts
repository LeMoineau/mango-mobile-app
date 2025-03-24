import { StorageKeys } from "../../../common/config/StorageKeys";
import useStorage from "../../../common/hooks/use-storage";
import LatestChapterFilter from "../../../common/types/filter/LatestChapterFilter";

export default function useLatestChaptersFilter() {
  const { saveJson, getJson } = useStorage();

  const saveFilter = async (filter: LatestChapterFilter) => {
    await saveJson(StorageKeys.LATEST_CHAPTERS_FILTERS, filter);
  };

  const getFilter = async (): Promise<LatestChapterFilter | undefined> => {
    const res = await getJson(StorageKeys.LATEST_CHAPTERS_FILTERS);
    if (!res) return;
    return res as LatestChapterFilter;
  };

  return {
    saveFilter,
    getFilter,
  };
}
