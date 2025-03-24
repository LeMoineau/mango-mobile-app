import { useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import {
  Animated,
  DimensionValue,
  Easing,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

export default function LoadingText({
  width,
  height,
  marginBottom,
  viewContainerStyle,
}: {
  width?: DimensionValue;
  height?: DimensionValue;
  marginBottom?: DimensionValue;
  viewContainerStyle?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const opacity = new Animated.Value(0.5);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          easing: Easing.linear,
          useNativeDriver: false,
          delay: 500,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          easing: Easing.linear,
          useNativeDriver: false,
          delay: 500,
        }),
      ])
    ).start();
  });

  return (
    <View
      style={[
        { paddingVertical: 2, paddingBottom: marginBottom ?? 2 },
        viewContainerStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            borderRadius: 2,
            backgroundColor: theme.colors.text,
            opacity,
            width: width ?? 200,
            height: height ?? 25,
          },
        ]}
      ></Animated.View>
    </View>
  );
}
