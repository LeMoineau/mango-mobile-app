import { StyleProp, View, ViewStyle } from "react-native";
import ExpoIcon from "../icons/ExpoIcon";
import { AllIconNames } from "../../types/IconName";
import ThemedText from "./ThemedText";
import { useTheme } from "@react-navigation/native";
import { style as StyleUtils } from "./../../utils/style-utils";

export default function IconedText({
  children,
  iconName,
  fontSize,
  style,
}: {
  children?: string;
  iconName: AllIconNames;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <View style={[StyleUtils.flexRow, StyleUtils.itemsCenter, {}, style]}>
      <ExpoIcon
        size={fontSize ? fontSize * 1.2 : 20}
        styleProps={[{ color: theme.colors.text }]}
        name={iconName}
      ></ExpoIcon>
      <ThemedText style={[{ fontSize }]}> {children}</ThemedText>
    </View>
  );
}
