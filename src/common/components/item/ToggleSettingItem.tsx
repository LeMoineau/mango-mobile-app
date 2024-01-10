import { Pressable, Switch, Text, View } from "react-native";
import { IconName } from "../../types/primitives/IconName";
import { useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { style } from "../../types/primitives/Styles";
import { useState } from "react";

export default function ToggleSettingItem({
  icon,
  title,
  hasSwitch,
  defaultValue,
  onPress,
}: {
  icon?: IconName;
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
            <Ionicons
              style={[{ marginRight: 10 }]}
              color={theme.colors.text}
              name={icon}
              size={32}
            />
          )}
          <Text style={[{ color: theme.colors.text }]}>{title}</Text>
        </View>
        <Switch
          value={value}
          thumbColor={value ? theme.colors.primary : theme.colors.background}
          onValueChange={() => {
            setValue(!value);
          }}
        ></Switch>
      </View>
    </Pressable>
  );
}
