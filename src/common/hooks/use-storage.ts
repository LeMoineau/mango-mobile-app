import AsyncStorage from "@react-native-async-storage/async-storage";
import { JsonObject } from "../../shared/src/types/primitives/jsonObject";

const useStorage = () => {
  const saveString = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  };

  const saveNumber = async (key: string, value: number) => {
    await saveString(key, `${value}`);
  };

  const saveBoolean = async (key: string, value: boolean) => {
    await saveString(key, `${value}`);
  };

  const saveJson = async (key: string, value: JsonObject) => {
    await saveString(key, JSON.stringify(value));
  };

  const saveItemInJson = async (
    key: string,
    keyJson: string,
    value: string | number | boolean | JsonObject
  ) => {
    let json = await getJson(key);
    if (!json) {
      json = {};
    }
    if (json) {
      json[keyJson] = value;
      await saveJson(key, json);
    }
  };

  const addItemInObjectInJson = async (
    key: string,
    keyObject: string,
    keyItem: string,
    valueItem: string | number | boolean | JsonObject
  ) => {
    const json = await getJson(key);
    if (json) {
      if (!Object.keys(json).includes(keyObject)) {
        await saveItemInJson(key, keyObject, {});
      }
      await saveItemInJson(
        key,
        keyObject,
        Object.assign(json[keyObject], { [keyItem]: valueItem })
      );
    }
  };

  const getString = async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const getNumber = async (key: string): Promise<number | null> => {
    const strVal = await getString(key);
    return strVal ? Number.parseInt(strVal) : null;
  };

  const getBoolean = async (key: string): Promise<boolean | null> => {
    const strVal = await getString(key);
    return strVal === null ? null : strVal === "true";
  };

  const getJson = async (key: string): Promise<JsonObject | null> => {
    const strVal = await getString(key);
    return strVal ? JSON.parse(strVal) : null;
  };

  return {
    saveString,
    saveNumber,
    saveBoolean,
    saveJson,
    saveItemInJson,
    addItemInObjectInJson,
    getString,
    getNumber,
    getBoolean,
    getJson,
  };
};

export default useStorage;
