import { create } from "zustand";
import asyncStorageService from "../services/async-storage.service";
import { StorageKeys } from "../config/StorageKeys";
import { ThemeName } from "../types/primitives/ThemeName";
import { DefaultValues } from "../config/DefaultValues";
import { Settings } from "../config/Settings";

interface SettingsStoreState extends Settings {
  setTheme: (theme: ThemeName) => Promise<void>;
}

export const useSettingsStore = create<SettingsStoreState>()((set) => {
  asyncStorageService.getJsonObject(StorageKeys.SETTINGS).then(async (val) => {
    if (val) {
      await load(val as Settings);
    } else {
      await saveDefaultValues();
    }
  });

  const load = async (val: Settings) => {
    set({
      theme: val.theme,
    });
  };

  const saveDefaultValues = async () => {
    await asyncStorageService.saveJson(
      StorageKeys.SETTINGS,
      DefaultValues.settings
    );
  };

  const setTheme = async (theme: ThemeName) => {
    set({ theme: theme });
    await asyncStorageService.saveItemInJson(
      StorageKeys.SETTINGS,
      "theme",
      theme
    );
  };

  return {
    ...DefaultValues.settings,
    setTheme,
  };
});
