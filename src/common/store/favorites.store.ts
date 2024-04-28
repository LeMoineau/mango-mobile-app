import { create } from "zustand";
import { Favorites } from "../types/favorites/Favorites";
import { FavoritesList } from "../types/favorites/FavoritesList";
import useStorage from "../hooks/use-storage";
import { StorageKeys } from "../config/StorageKeys";
import { DefaultValues } from "../config/DefaultValues";
import { ObjectUtils } from "../utils/object-utils";
import { UUID } from "../../../../shared/src/types/primitives/Identifiers";

interface FavoritesStoreState extends Favorites {
  get: (name: string) => FavoritesList | undefined;
  getAll: () => FavoritesList[];
  delete: (name: string) => Promise<void>;
  create: (name: string, intersiteMangaIds?: UUID[]) => Promise<void>;
  addIn: (name: string, intersiteMangaId: UUID) => Promise<void>;
  like: (intersiteMangaId: UUID) => Promise<void>;
  removeFrom: (name: string, intersiteMangaId: UUID) => Promise<void>;
  unlike: (intersiteMangaId: UUID) => Promise<void>;
  rename: (oldName: string, newName: string) => Promise<void>;
  intersiteMangaAlreadyIn: (
    favListName: string,
    intersiteMangaId: UUID
  ) => boolean;
  intersiteMangaAlreadyLiked: (intersiteMangaId: UUID) => boolean;
}

export const useFavoritesStore = create<FavoritesStoreState>()(
  (setState, getState) => {
    const { getJson, saveJson, saveItemInJson } = useStorage();

    getJson(StorageKeys.FAVORITES).then(async (json) => {
      const baseValues = {
        ...DefaultValues.FAVORITES,
        ...json,
      };
      setState(baseValues);
      if (json === null || !ObjectUtils.equals(json, baseValues)) {
        await saveJson(StorageKeys.FAVORITES, baseValues);
      }
    });

    const get = (name: string): FavoritesList | undefined => {
      return getState().lists.find((l) => l.name === name);
    };

    const getAll = (): FavoritesList[] => {
      return getState().lists;
    };

    const _save = async (favList: FavoritesList) => {
      let lists = getState().lists;
      const index = lists.findIndex((l) => l.name === favList.name);
      if (index === -1) {
        lists.push(favList);
      } else {
        lists.splice(index, 1, favList);
      }
      setState({ lists });
      await saveItemInJson(StorageKeys.FAVORITES, "lists", lists);
    };

    const _delete = async (name: string) => {
      if (name === DefaultValues.LIKE_FAVORITES_LIST_NAME) return;
      let lists = getState().lists;
      const index = lists.findIndex((l) => l.name === name);
      if (index === -1) return;
      lists.splice(index, 1);
      setState({ lists });
      await saveItemInJson(StorageKeys.FAVORITES, "lists", lists);
    };

    const create = async (name: string, intersiteMangaIds?: UUID[]) => {
      if (get(name) !== undefined) return;
      await _save({
        name,
        intersiteMangaIds: intersiteMangaIds ?? [],
      });
    };

    const addIn = async (favoritesListName: string, intersiteMangaId: UUID) => {
      const favList = get(favoritesListName);
      if (!favList || favList.intersiteMangaIds.includes(intersiteMangaId)) {
        return;
      }
      favList.intersiteMangaIds.push(intersiteMangaId);
      await _save(favList);
    };

    const like = async (intersiteMangaId: UUID) => {
      await addIn(DefaultValues.LIKE_FAVORITES_LIST_NAME, intersiteMangaId);
    };

    const removeFrom = async (
      favoritesListName: string,
      intersiteMangaId: UUID
    ) => {
      const favList = get(favoritesListName);
      if (!favList) return;
      const index = favList.intersiteMangaIds.findIndex(
        (id) => id === intersiteMangaId
      );
      if (index === -1) return;
      favList.intersiteMangaIds.splice(index, 1);
      await _save(favList);
    };

    const unlike = async (intersiteMangaId: UUID) => {
      await removeFrom(
        DefaultValues.LIKE_FAVORITES_LIST_NAME,
        intersiteMangaId
      );
    };

    const rename = async (oldName: string, newName: string) => {
      if (oldName === DefaultValues.LIKE_FAVORITES_LIST_NAME) return;
      const favList = get(oldName);
      if (!favList) return;
      create(newName, favList.intersiteMangaIds);
      _delete(oldName);
    };

    const intersiteMangaAlreadyIn = (
      favListName: string,
      intersiteMangaId: UUID
    ) => {
      return (
        get(favListName)?.intersiteMangaIds.find(
          (id) => id === intersiteMangaId
        ) !== undefined
      );
    };

    const intersiteMangaAlreadyLiked = (intersiteMangaId: UUID): boolean => {
      return intersiteMangaAlreadyIn(
        DefaultValues.LIKE_FAVORITES_LIST_NAME,
        intersiteMangaId
      );
    };

    return {
      ...DefaultValues.FAVORITES,
      get,
      getAll,
      create,
      addIn,
      like,
      removeFrom,
      unlike,
      rename,
      delete: _delete,
      intersiteMangaAlreadyIn,
      intersiteMangaAlreadyLiked,
    };
  }
);
