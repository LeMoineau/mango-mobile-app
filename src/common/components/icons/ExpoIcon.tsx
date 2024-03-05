import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

type IoniconsNames = keyof typeof Ionicons.glyphMap;
type MaterialIconsNames = keyof typeof MaterialIcons.glyphMap;
type FontAwesomeNames = keyof typeof FontAwesome.glyphMap;

export type AllIconNames =
  | MaterialIconsNames
  | FontAwesomeNames
  | IoniconsNames;

export default function ExpoIcon({
  name,
  size,
  color,
}: {
  name: AllIconNames;
  size?: number;
  color?: string;
}) {
  return (
    <>
      {name in Ionicons.glyphMap ? (
        <Ionicons
          color={color}
          size={size}
          name={name as IoniconsNames}
        ></Ionicons>
      ) : name in MaterialIcons.glyphMap ? (
        <MaterialIcons
          name={name as MaterialIconsNames}
          size={size}
          color={color}
        ></MaterialIcons>
      ) : (
        <FontAwesome
          name={name as FontAwesomeNames}
          size={size}
          color={color}
        ></FontAwesome>
      )}
    </>
  );
}
