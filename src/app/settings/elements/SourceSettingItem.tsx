import { Pressable, Text, View } from "react-native";
import { SourceName } from "../../../../../shared/src/types/primitives/Identifiers";
import { useTheme } from "@react-navigation/native";
import { style } from "../../../common/utils/style-utils";
import ExpoIcon from "../../../common/components/icons/ExpoIcon";
import { colors } from "../../../../../shared/src/config/enums/Colors";

export default function SourceSettingItem({
  sourceName,
  online,
  firstChild,
  lastChild,
  onUpBtnPress,
  onDownBtnPress,
}: {
  sourceName: SourceName;
  online?: boolean;
  firstChild?: boolean;
  lastChild?: boolean;
  onUpBtnPress?: () => void;
  onDownBtnPress?: () => void;
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
        <View style={[style.flexRow, style.itemsCenter, {}]}>
          {!firstChild && (
            <Pressable
              onPress={() => !firstChild && onUpBtnPress && onUpBtnPress()}
            >
              <ExpoIcon
                name="arrow-up"
                size={20}
                color={theme.colors.text}
                styleProps={[{ opacity: firstChild ? 0.5 : 1 }]}
              ></ExpoIcon>
            </Pressable>
          )}
          {!firstChild && !lastChild && <View style={[{ width: 10 }]}></View>}
          {!lastChild && (
            <Pressable
              onPress={() => !lastChild && onDownBtnPress && onDownBtnPress()}
            >
              <ExpoIcon
                name="arrow-down"
                size={20}
                color={theme.colors.text}
                styleProps={[{ opacity: lastChild ? 0.5 : 1 }]}
              ></ExpoIcon>
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
}
