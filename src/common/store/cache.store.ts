import { create } from "zustand";
import useStorage from "../hooks/use-storage";
import { DefaultValues } from "../config/DefaultValues";
import { StorageKeys } from "../config/StorageKeys";
import { ObjectUtils } from "../utils/object-utils";
import { Cache } from "../types/cache/Cache";
import { UUID } from "../../../../shared/src/types/primitives/Identifiers";
import { IntersiteManga } from "../../../../shared/src/types/basics/IntersiteManga";

interface CacheStoreState extends Cache {
  getIntersiteManga: (intersiteMangaId: UUID) => IntersiteManga | undefined;
  saveIntersiteManga: (
    intersiteMangaData: IntersiteManga,
    props?: {
      forceSave?: boolean;
    }
  ) => Promise<void>;
  setCurrentIntersiteManga: (intersiteManga: IntersiteManga) => void;
  saveCurrentIntersiteManga: () => Promise<void>;
  clear: () => Promise<void>;
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

  const saveIntersiteManga = async (
    intersiteManga: IntersiteManga,
    props?: {
      forceSave?: boolean;
    }
  ) => {
    if (getIntersiteManga(intersiteManga.id) && (!props || !props.forceSave)) {
      return;
    }
    const tmp = [...get().intersiteMangas];
    const index = tmp.findIndex((im) => im.id === intersiteManga.id);
    if (index !== -1) {
      tmp.splice(index, 1, intersiteManga);
    } else {
      tmp.push(intersiteManga);
    }
    set({
      intersiteMangas: tmp,
    });
    await saveItemInJson(StorageKeys.CACHE, "intersiteMangas", tmp);
  };

  const setCurrentIntersiteManga = (intersiteManga: IntersiteManga) => {
    set({ currentIntersiteManga: intersiteManga });
  };

  const saveCurrentIntersiteManga = async () => {
    const { currentIntersiteManga } = get();
    if (!currentIntersiteManga) return;
    await saveIntersiteManga(currentIntersiteManga);
  };

  const clear = async () => {
    set({ ...DefaultValues.CACHE });
    await saveJson(StorageKeys.CACHE, DefaultValues.CACHE);
  };

  return {
    ...DefaultValues.CACHE,
    getIntersiteManga,
    saveIntersiteManga,
    setCurrentIntersiteManga,
    saveCurrentIntersiteManga,
    clear,
  };
});
