import { Animated, Pressable, Text, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import { useTheme } from "@react-navigation/native";
import { AllIconNames } from "../../../common/types/IconName";
import ThemedText from "../../../common/components/text/ThemedText";
import useAnimatedValue from "../../../common/hooks/use-animated-value";
import { colors } from "../../../../../shared/src/config/enums/Colors";

export default function ButtonSettingItem({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon?: AllIconNames;
  onPress?: () => void;
}) {
  const theme = useTheme();
  const { animValue, setEnabled } = useAnimatedValue({ duration: 50 });

  return (
    <Pressable
      onPress={() => {
        onPress && onPress();
        setEnabled(false);
      }}
      onTouchStart={() => setEnabled(true)}
      onTouchCancel={() => setEnabled(false)}
      onTouchEnd={() => setEnabled(false)}
    >
      <Animated.View
        style={[
          style.flexRow,
          style.justifyBetween,
          style.itemsCenter,
          {
            paddingVertical: 10,
            transform: [
              {
                scale: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.95],
                }),
              },
            ],
          },
        ]}
      >
        <View
          style={[
            style.flexRow,
            style.justifyCenter,
            style.itemsCenter,
            style.rounded,
            style.border,
            {
              flex: 1,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 15,
              paddingVertical: 10,
            },
          ]}
        >
          {icon && (
            <ExpoIcon
              styleProps={[{ marginRight: 10 }]}
              color={theme.colors.text}
              name={icon}
              size={32}
            />
          )}
          <Text style={[{ color: colors.white }]}>{title}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}
