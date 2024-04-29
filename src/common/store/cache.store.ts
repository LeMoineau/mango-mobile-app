import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { DefaultValues } from "../config/DefaultValues";
import { StorageKeys } from "../config/StorageKeys";
import { ObjectUtils } from "../utils/object-utils";
import { Cache } from "../types/cache/Cache";
import { UUID } from "../../../../shared/src/types/primitives/Identifiers";
import { IntersiteManga } from "../../../../shared/src/types/IntersiteManga";

interface CacheStoreState extends Cache {
  getIntersiteManga: (intersiteMangaId: UUID) => IntersiteManga | undefined;
  saveIntersiteManga: (intersiteMangaData: IntersiteManga) => Promise<void>;
  setCurrentIntersiteManga: (intersiteManga: IntersiteManga) => void;
  saveCurrentIntersiteManga: () => Promise<void>;
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

  const getIntersiteManga = (
    intersiteMangaId: UUID
  ): IntersiteManga | undefined => {
    return get().intersiteMangas.find((m) => m.id === intersiteMangaId);
  };

  const saveIntersiteManga = async (intersiteManga: IntersiteManga) => {
    if (getIntersiteManga(intersiteManga.id)) return;
    set({
      intersiteMangas: [...get().intersiteMangas, intersiteManga],
    });
    await saveItemInJson(
      StorageKeys.CACHE,
      "intersiteMangas",
      get().intersiteMangas
    );
  };

  const setCurrentIntersiteManga = (intersiteManga: IntersiteManga) => {
    set({ currentIntersiteManga: intersiteManga });
  };

  const saveCurrentIntersiteManga = async () => {
    const { currentIntersiteManga } = get();
    if (!currentIntersiteManga) return;
    await saveIntersiteManga(currentIntersiteManga);
  };

  return {
    ...DefaultValues.CACHE,
    getIntersiteManga,
    saveIntersiteManga,
    setCurrentIntersiteManga,
    saveCurrentIntersiteManga,
  };
});
