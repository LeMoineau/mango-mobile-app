import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import { style } from "../../utils/style-utils";
import ExpoIcon from "../icons/ExpoIcon";
import { useTheme } from "@react-navigation/native";
import { AllIconNames } from "../../types/IconName";

export default function RoundedButton({
  content,
  contentStyle,
  styleProp,
  appendIcon,
  appendIconStyle,
  prependIcon,
  prependIconStyle,
  themed,
  color,
  onPress,
}: {
  content?: string;
  contentStyle?: StyleProp<TextStyle>;
  styleProp?: StyleProp<ViewStyle>;
  appendIcon?: AllIconNames;
  appendIconStyle?: StyleProp<TextStyle>;
  prependIcon?: AllIconNames;
  prependIconStyle?: StyleProp<TextStyle>;
  color?: string;
  themed?: boolean;
  onPress?: () => void;
}) {
  const theme = useTheme();
  return (
    <>
      <Pressable
        onPress={() => onPress && onPress()}
        style={[
          style.flexRow,
          style.justifyCenter,
          style.itemsCenter,
          style.roundedLg,
          {
            paddingHorizontal: content ? 20 : 10,
            paddingVertical: 10,
            backgroundColor: themed ? theme.colors.border : undefined,
          },
          styleProp,
        ]}
      >
        {prependIcon && (
          <ExpoIcon
            name={prependIcon}
            styleProps={[
              {
                color: color ?? theme.colors.text,
                marginRight: content ? 10 : 0,
              },
              prependIconStyle,
            ]}
            size={20}
          ></ExpoIcon>
        )}
        {content && (
          <Text style={[{ color: color ?? theme.colors.text }, contentStyle]}>
            {content}
          </Text>
        )}
        {appendIcon && (
          <ExpoIcon
            name={appendIcon}
            styleProps={[
              {
                color: color ?? theme.colors.text,
                marginLeft: content ? 10 : 0,
              },
              appendIconStyle,
            ]}
            size={20}
          ></ExpoIcon>
        )}
      </Pressable>
    </>
  );
}
