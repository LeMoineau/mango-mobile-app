import RoundedButton from "./../../../common/components/buttons/RoundedButton";
import { AllIconNames } from "./../../../common/types/IconName";
import { style } from "./../../../common/utils/style-utils";
import { useTheme } from "@react-navigation/native";
import { View } from "react-native";

export default function ChapterReaderMenuItem({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: AllIconNames;
  onPress?: () => void;
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        style.flexRow,
        {
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          width: "100%",
          height: 50,
          marginBottom: 10,
        },
      ]}
    >
      <RoundedButton
        prependIcon={icon}
        prependIconStyle={[{ paddingRight: 10 }]}
        styleProp={[
          style.roundedSm,
          {
            backgroundColor: theme.colors.border,
            flex: 1,
            justifyContent: "flex-start",
          },
        ]}
        contentStyle={[{ fontSize: 15 }]}
        content={label}
        onPress={onPress}
      ></RoundedButton>
    </View>
  );
}
