import { Text, View } from "react-native";
import { SourceName } from "@shared/types/primitives/id";
import { useTheme } from "@react-navigation/native";
import { style } from "../../../common/utils/style-utils";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import { colors } from "@shared/utils/color-utils";

export default function SourceSettingItem({
  sourceName,
  online,
}: {
  sourceName: SourceName;
  online?: boolean;
}) {
  const theme = useTheme();
  return (
    <>
      <View
        style={[
          style.flexRow,
          style.justifyBetween,
          style.itemsCenter,
          { height: 50, width: "100%" },
        ]}
      >
        <View style={[style.flexRow, style.itemsCenter, {}]}>
          <Text style={[{ color: theme.colors.text, marginRight: 10 }]}>
            {sourceName}
          </Text>
          {online === undefined ? (
            <></>
          ) : online ? (
            <ExpoIcon
              name="check-circle"
              color={colors.green[500]}
              size={15}
            ></ExpoIcon>
          ) : (
            <ExpoIcon
              name="cloud-offline"
              color={colors.gray[500]}
              size={15}
            ></ExpoIcon>
          )}
        </View>
        <ExpoIcon
          name="drag-indicator"
          size={25}
          color={theme.colors.text}
        ></ExpoIcon>
      </View>
    </>
  );
}
