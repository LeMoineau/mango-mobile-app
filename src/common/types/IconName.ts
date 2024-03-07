import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export type IoniconsNames = keyof typeof Ionicons.glyphMap;
export type MaterialIconsNames = keyof typeof MaterialIcons.glyphMap;
export type FontAwesomeNames = keyof typeof FontAwesome.glyphMap;

export type AllIconNames =
  | MaterialIconsNames
  | FontAwesomeNames
  | IoniconsNames;
