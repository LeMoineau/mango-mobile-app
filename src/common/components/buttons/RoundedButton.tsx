import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import { style } from "../../utils/style-utils";
import ExpoIcon from "../icons/ExpoIcon";
import { useTheme } from "@react-navigation/native";
import { AllIconNames } from "src/common/types/IconName";

export default function RounedButton({
  content,
  contentStyle,
  styleProp,
  appendIcon,
  appendIconStyle,
  prependIcon,
  prependIconStyle,
  onPress,
}: {
  content?: string;
  contentStyle?: StyleProp<TextStyle>;
  styleProp?: StyleProp<ViewStyle>;
  appendIcon?: AllIconNames;
  appendIconStyle?: StyleProp<TextStyle>;
  prependIcon?: AllIconNames;
  prependIconStyle?: StyleProp<TextStyle>;
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
          { paddingHorizontal: content ? 20 : 10, paddingVertical: 10 },
          styleProp,
        ]}
      >
        {prependIcon && (
          <ExpoIcon
            name={prependIcon}
            styleProps={[
              { color: theme.colors.text, marginRight: content ? 10 : 0 },
              prependIconStyle,
            ]}
            size={20}
          ></ExpoIcon>
        )}
        {content && (
          <Text style={[{ color: theme.colors.text }, contentStyle]}>
            {content}
          </Text>
        )}
        {appendIcon && (
          <ExpoIcon
            name={appendIcon}
            styleProps={[
              { color: theme.colors.text, marginLeft: content ? 10 : 0 },
              appendIconStyle,
            ]}
            size={20}
          ></ExpoIcon>
        )}
      </Pressable>
    </>
  );
}
