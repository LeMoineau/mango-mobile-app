import { StyleProp, View, ViewStyle } from "react-native";
import { style } from "../../utils/style-utils";
import { useTheme } from "@react-navigation/native";

export default function Divider({
  style: styleProp,
}: {
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  return (
    <View style={[{ paddingHorizontal: 10, width: "100%" }, styleProp]}>
      <View
        style={[
          style.border,
          {
            borderColor: theme.colors.border,
            borderBottomWidth: 0,
            width: "100%",
          },
        ]}
      ></View>
    </View>
  );
}
