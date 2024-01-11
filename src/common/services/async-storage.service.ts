import AsyncStorage from "@react-native-async-storage/async-storage";
import { JsonObject } from "../types/primitives/JsonObject";

class AsyncStorageService {
  public async getString(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }

  public async getJsonObject(key: string): Promise<JsonObject | undefined> {
    const json = await this.getString(key);
    return json && JSON.parse(json);
  }

  public async saveString(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  }

  public async saveJson(key: string, value: JsonObject) {
    await this.saveString(key, JSON.stringify(value));
  }

  public async saveItemInJson(key: string, keyJson: string, value: any) {
    const json = await this.getJsonObject(key);
    if (!json) {
      return;
    }
    json[keyJson] = value;
    await this.saveJson(key, json);
  }

  // public async deleteItem(key: string) {
  //   this.storage.delete(key);
  // }
}

export default new AsyncStorageService();
