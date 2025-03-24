import { useTheme } from "@react-navigation/native";
import { StyleProp, Text, TextStyle } from "react-native";

export default function ThemedText({
  children,
  ...props
}: {
  children?: string | React.ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  const theme = useTheme();

  return (
    <Text style={[{ color: theme.colors.text }, props.style]}>{children}</Text>
  );
}
