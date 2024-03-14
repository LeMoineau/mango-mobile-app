import { create } from "zustand";
import { StorageKeys } from "../config/StorageKeys";
import { ThemeName } from "../types/ThemeName";
import { DefaultValues } from "../config/DefaultValues";
import {
  ReaderDisplayMode,
  ReaderOption,
  ReaderOptionsValue,
  Settings,
} from "../types/Settings";
import useStorage from "../hooks/use-storage";
import { SourceName } from "@shared/types/primitives/id";
import { IntersiteField } from "@shared/types/intersite/IntersiteField";
import { ObjectUtils } from "../utils/object-utils";
import { AllIconNames } from "../types/IconName";

interface SettingsStoreState extends Settings {
  setTheme: (theme: ThemeName) => Promise<void>;
  setSourcesOrder: (srcs: SourceName[]) => void;
  getMoreTrustedIn: <T>(
    intersiteField: IntersiteField<T>
  ) => [SourceName, T] | [];
  setReaderOptions: <T extends ReaderOption>(
    option: T,
    value: ReaderOptionsValue[T]
  ) => Promise<void>;
  getNextReaderDisplayMode: () => {
    nextDisplayMode: ReaderDisplayMode;
    nextLabel: string;
    nextIcon: AllIconNames;
  };
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

  const setReaderOptions = async <T extends ReaderOption>(
    option: T,
    value: ReaderOptionsValue[T]
  ) => {
    console.log(option, value);
    set({ [option]: value });
    await saveItemInJson(StorageKeys.SETTINGS, option, value);
  };

  const getNextReaderDisplayMode = (): {
    nextDisplayMode: ReaderDisplayMode;
    nextLabel: string;
    nextIcon: AllIconNames;
  } => {
    const nextIndex =
      (get().readerDisplayMode + 1) %
      (Object.values(ReaderDisplayMode).length / 2);
    return {
      nextDisplayMode: [
        ReaderDisplayMode.LONG_STRIPE,
        ReaderDisplayMode.SINGLE_PAGE,
      ][nextIndex],
      nextLabel: ["Long Stripe", "Single Page"][nextIndex],
      nextIcon: (["stretch-to-page", "page-copy"] as AllIconNames[])[nextIndex],
    };
  };

  return {
    ...DefaultValues.SETTINGS,
    setTheme,
    setSourcesOrder,
    getMoreTrustedIn,
    setReaderOptions,
    getNextReaderDisplayMode,
  };
});
