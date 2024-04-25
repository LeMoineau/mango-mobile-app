import { SettingsKey } from "./SettingsKeys";
import { SettingsValue } from "./SettingsValues";

export type Settings = { [key in SettingsKey]: SettingsValue[key] };
