// import { DefaultValues } from "../config/DefaultValues";
// import asyncStorageService from "../services/async-storage.service";
// import { useSettingsStore } from "./settings.store";

// describe("settings store", () => {
//   it("should load saved settings when init and exist settings saved", () => {
//     jest
//       .spyOn(asyncStorageService, "getJsonObject")
//       .mockResolvedValue(undefined);
//     jest.spyOn(asyncStorageService, "saveJson");

//     const settingStore = useSettingsStore();

//     expect(asyncStorageService.saveJson).toHaveBeenCalledWith(
//       DefaultValues.settings
//     );
//   });

//   it("should save default settings values when init and no settings saved", () => {});

//   it("should update theme when setting theme", () => {});

//   it("should save new theme when setting theme", () => {});
// });
