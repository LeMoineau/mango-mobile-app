import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { Animated, View, TouchableOpacity, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { style } from "../../utils/style-utils";

export default function CustomTopBar({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        style.flexRow,
        style.wFull,
        style.border,
        {
          height: 50,
          backgroundColor: theme.colors.background,
          zIndex: 10,
          borderColor: theme.colors.border,
          borderStyle: "solid",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          bottom: 0,
          left: 0,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;

        const isFocused = state.index === index;
        const currentColor = isFocused
          ? theme.colors.primary
          : theme.colors.text;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.2)),
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              style.flexCol,
              style.justifyCenter,
              style.itemsCenter,
              style.hFull,
              { flex: 1 },
            ]}
          >
            <Animated.View
              style={[
                style.flexCol,
                style.justifyCenter,
                style.itemsCenter,
                style.hFull,
                { flex: 1, opacity },
              ]}
            >
              {(options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: currentColor,
                })) ?? (
                <Ionicons name="book" size={20} color={currentColor}></Ionicons>
              )}
              <Text style={[{ color: currentColor }]}>{label}</Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
