import { Pressable, View } from "react-native";
import { AllIconNames } from "../../../common/types/IconName";
import { useTheme } from "@react-navigation/native";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import ThemedText from "../../../common/components/text/ThemedText";
import { style } from "../../../common/utils/style-utils";

export default function DotsOptionsItem({
  iconName,
  label,
  onPress,
}: {
  iconName: AllIconNames;
  label: string;
  onPress?: () => void;
}) {
  const theme = useTheme();
  return (
    <>
      <Pressable
        style={[
          style.flexRow,
          style.itemsCenter,
          {
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor: theme.colors.background,
          },
        ]}
        onPress={() => onPress && onPress()}
      >
        <ExpoIcon
          name={iconName}
          size={25}
          color={theme.colors.text}
          styleProps={[{ opacity: 0.7 }]}
        ></ExpoIcon>
        <View style={[{ width: 25 }]}></View>
        <ThemedText style={[{ fontWeight: "700", fontSize: 15 }]}>
          {label}
        </ThemedText>
      </Pressable>
    </>
  );
}
