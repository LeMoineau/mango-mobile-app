import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
  Foundation,
} from "@expo/vector-icons";

export type IoniconsNames = keyof typeof Ionicons.glyphMap;
export type MaterialIconsNames = keyof typeof MaterialIcons.glyphMap;
export type FontAwesomeNames = keyof typeof FontAwesome.glyphMap;
export type MaterialCommunityIconsNames =
  keyof typeof MaterialCommunityIcons.glyphMap;
export type FoundationNames = keyof typeof Foundation.glyphMap;

export type AllIconNames =
  | MaterialIconsNames
  | FontAwesomeNames
  | IoniconsNames
  | MaterialCommunityIconsNames
  | FoundationNames;
