import { Pressable, Switch, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { style } from "../../../common/utils/style-utils";
import { useState } from "react";
import { AllIconNames } from "./../../../common/types/IconName";
import ExpoIcon from "./../../../common/components/icons/ExpoIcon";

export default function ToggleSettingItem({
  icon,
  title,
  defaultValue,
  onPress,
}: {
  icon?: AllIconNames;
  title: string;
  hasSwitch?: boolean;
  defaultValue?: boolean;
  onPress?: (value: boolean) => void;
}) {
  const theme = useTheme();
  const [value, setValue] = useState(defaultValue ?? false);

  return (
    <Pressable
      onPress={() => {
        setValue(!value);
        onPress && onPress(value);
      }}
    >
      <View style={[style.flexRow, style.justifyBetween, style.itemsCenter]}>
        <View style={[style.flexRow, style.itemsCenter, { flex: 1 }]}>
          {icon && (
            <ExpoIcon
              styleProps={[{ marginRight: 10 }]}
              color={theme.colors.text}
              name={icon}
              size={32}
            />
          )}
          <Text style={[{ color: theme.colors.text }]}>{title}</Text>
        </View>
        <Switch
          value={value}
          thumbColor={value ? theme.colors.primary : theme.colors.border}
          trackColor={{
            true: theme.colors.border,
            false: theme.colors.border,
          }}
          disabled
        ></Switch>
      </View>
    </Pressable>
  );
}
