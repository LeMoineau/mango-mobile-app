import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { DefaultValues } from "../config/DefaultValues";
import { StorageKeys } from "../config/StorageKeys";
import { ObjectUtils } from "../utils/object-utils";
import { Cache } from "../types/cache/Cache";
import { StoredManga } from "../../../../shared/src/types/Manga";
import { UUID } from "../../../../shared/src/types/primitives/Identifiers";

interface CacheStoreState extends Cache {
  getCachedManga: (mangaId: UUID) => StoredManga | undefined;
  saveManga: (mangaData: StoredManga) => Promise<void>;
}

export const useCacheStore = create<CacheStoreState>()((set, get) => {
  const { getJson, saveJson, saveItemInJson } = useStorage();

  getJson(StorageKeys.CACHE).then(async (json) => {
    const baseValues = {
      ...DefaultValues.CACHE,
      ...json,
    };
    set(baseValues);
    if (json === null || !ObjectUtils.equals(json, baseValues)) {
      await saveJson(StorageKeys.CACHE, baseValues);
    }
  });

  const getCachedManga = (mangaId: UUID): StoredManga | undefined => {
    return get().mangaDatas.find((m) => m.id === mangaId);
  };

  const saveManga = async (mangaData: StoredManga) => {
    if (getCachedManga(mangaData.id)) return;
    set({
      mangaDatas: [...get().mangaDatas, mangaData],
    });
    await saveItemInJson(StorageKeys.CACHE, "mangaDatas", get().mangaDatas);
  };

  return {
    ...DefaultValues.CACHE,
    getCachedManga,
    saveManga,
  };
});
