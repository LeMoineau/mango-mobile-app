import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { DimensionValue, StyleProp, ViewStyle } from "react-native";

export enum GradientDirection {
  TOP_TO_BOTTOM,
  BOTTOM_TO_TOP,
  LEFT_TO_RIGHT,
  RIGHT_TO_LEFT,
}

export default function Gradient({
  from,
  to,
  direction,
  ...props
}: {
  from?: string;
  to?: string;
  direction?: GradientDirection;
  style?: StyleProp<ViewStyle>;
  width?: DimensionValue;
  height?: DimensionValue;
}) {
  const theme = useTheme();

  return (
    <LinearGradient
      colors={[from ?? theme.colors.background, to ?? "transparent"]}
      style={[
        { width: props.width ?? "100%", height: props.height ?? 300 },
        props.style,
      ]}
      start={
        direction !== undefined
          ? direction === GradientDirection.BOTTOM_TO_TOP
            ? [0.5, 1]
            : direction === GradientDirection.TOP_TO_BOTTOM
            ? [0.5, 0]
            : direction === GradientDirection.LEFT_TO_RIGHT
            ? [0, 0.5]
            : [1, 0.5]
          : [0.5, 1]
      }
      end={
        direction !== undefined
          ? direction === GradientDirection.BOTTOM_TO_TOP
            ? [0.5, 0]
            : direction === GradientDirection.TOP_TO_BOTTOM
            ? [0.5, 1]
            : direction === GradientDirection.LEFT_TO_RIGHT
            ? [1, 0.5]
            : [0, 0.5]
          : [0.5, 0]
      }
      locations={[0, 1]}
    />
  );
}
