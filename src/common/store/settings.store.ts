import { create } from "zustand";
import { StorageKeys } from "../config/StorageKeys";
import { DefaultValues } from "../config/DefaultValues";
import { Settings } from "../types/settings/Settings";
import useStorage from "../hooks/use-storage";
import { ObjectUtils } from "../utils/object-utils";
import { SettingsKey } from "../types/settings/SettingsKeys";
import { SettingsValue } from "../types/settings/SettingsValues";

interface SettingsStoreState extends Settings {
  set: (
    setting: SettingsKey,
    value: SettingsValue[SettingsKey]
  ) => Promise<void>;
  get: (setting: SettingsKey) => SettingsValue[typeof setting];
}

export const useSettingsStore = create<SettingsStoreState>()((set, get) => {
  const { getJson, saveJson, saveItemInJson } = useStorage();

  getJson(StorageKeys.SETTINGS).then(async (json) => {
    const baseValues = {
      ...DefaultValues.SETTINGS,
      ...json,
    };
    set(baseValues);
    if (json === null || !ObjectUtils.equals(json, baseValues)) {
      await saveJson(StorageKeys.SETTINGS, baseValues);
    }
  });

  const _set = async (
    setting: SettingsKey,
    value: SettingsValue[SettingsKey]
  ): Promise<void> => {
    set({ [setting]: value });
    await saveItemInJson(StorageKeys.SETTINGS, setting, value);
  };

  const _get = (setting: SettingsKey): SettingsValue[typeof setting] => {
    return get()[setting];
  };

  return {
    ...DefaultValues.SETTINGS,
    set: _set,
    get: _get,
  };
});
