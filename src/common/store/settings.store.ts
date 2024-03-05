import { create } from "zustand";
import { StorageKeys } from "../config/StorageKeys";
import { ThemeName } from "../types/primitives/ThemeName";
import { DefaultValues } from "../config/DefaultValues";
import { Settings } from "../config/Settings";
import useStorage from "../hooks/use-storage";
import { SourceName } from "../types/primitives/Ids";

interface SettingsStoreState extends Settings {
  setTheme: (theme: ThemeName) => Promise<void>;
  setSourcesOrder: (srcs: SourceName[]) => void;
}

export const useSettingsStore = create<SettingsStoreState>()((set) => {
  const { getJson, saveJson, saveItemInJson } = useStorage();

  getJson(StorageKeys.SETTINGS).then(async (val) => {
    if (val) {
      await load(val as Settings);
    } else {
      await saveDefaultValues();
    }
  });

  const load = async (val: Settings) => {
    set({
      theme: val.theme,
      srcs: val.srcs,
    });
  };

  const saveDefaultValues = async () => {
    await saveJson(StorageKeys.SETTINGS, DefaultValues.settings);
  };

  const setTheme = async (theme: ThemeName) => {
    set({ theme: theme });
    await saveItemInJson(StorageKeys.SETTINGS, "theme", theme);
  };

  const setSourcesOrder = async (srcs: SourceName[]) => {
    set({ srcs: srcs });
    await saveItemInJson(StorageKeys.SETTINGS, "srcs", srcs);
  };

  return {
    ...DefaultValues.settings,
    setTheme,
    setSourcesOrder,
  };
});
