import { create } from "zustand";
import { StorageKeys } from "../config/StorageKeys";
import { ThemeName } from "../types/ThemeName";
import { DefaultValues } from "../config/DefaultValues";
import { Settings } from "../config/Settings";
import useStorage from "../hooks/use-storage";
import { SourceName } from "@shared/types/primitives/id";
import { IntersiteField } from "@shared/types/intersite/IntersiteField";
import { ObjectUtils } from "../utils/object-utils";

interface SettingsStoreState extends Settings {
  setTheme: (theme: ThemeName) => Promise<void>;
  setSourcesOrder: (srcs: SourceName[]) => void;
  getMoreTrustedIn: <T>(
    intersiteField: IntersiteField<T>
  ) => [SourceName, T] | [];
}

export const useSettingsStore = create<SettingsStoreState>()((set, get) => {
  const { getJson, saveJson, saveItemInJson } = useStorage();

  getJson(StorageKeys.SETTINGS).then(async (json) => {
    const baseValues = {
      ...DefaultValues.settings,
      ...json,
    };
    set(baseValues);
    if (json === null || !ObjectUtils.equals(json, baseValues)) {
      await saveJson(StorageKeys.SETTINGS, baseValues);
    }
  });

  const setTheme = async (theme: ThemeName) => {
    set({ theme: theme });
    await saveItemInJson(StorageKeys.SETTINGS, "theme", theme);
  };

  const setSourcesOrder = async (srcs: SourceName[]) => {
    set({ srcs: srcs });
    await saveItemInJson(StorageKeys.SETTINGS, "srcs", srcs);
  };

  const getMoreTrustedIn = <T>(
    intersiteField: IntersiteField<T>
  ): [SourceName, T] | [] => {
    for (let src of get().srcs) {
      if (intersiteField[src]) {
        return [src, intersiteField[src]];
      }
    }
    return [];
  };

  return {
    ...DefaultValues.settings,
    setTheme,
    setSourcesOrder,
    getMoreTrustedIn,
  };
});
