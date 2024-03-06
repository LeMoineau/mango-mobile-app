import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import LatestChaptersPage from "./latest-chapters/LatestChaptersPage";
import SettingPage from "./settings/SettingsPage";
import { useSettingsStore } from "../common/store/settings.store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomTopBar from "../common/components/navigation/CustomTopBar";
import { StatusBar, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Home from "./home/Home";

const Tab = createMaterialTopTabNavigator();

export default function Index() {
  const settingsStore = useSettingsStore();
  const inset = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  return (
    <View style={[{ flex: 1 }]}>
      <NavigationContainer
        theme={settingsStore.theme === "dark" ? DarkTheme : DefaultTheme}
      >
        <StatusBar hidden></StatusBar>
        <Tab.Navigator
          tabBarPosition="bottom"
          initialRouteName="Home"
          tabBar={CustomTopBar}
          sceneContainerStyle={[
            {
              paddingTop: inset.top,
              paddingBottom: inset.bottom,
              paddingLeft: inset.left + 10,
              paddingRight: inset.right + 10,
              width: width,
              height: height,
              maxWidth: width,
              maxHeight: height,
              overflow: "hidden",
            },
          ]}
        >
          <Tab.Screen
            name="New Chapters"
            component={LatestChaptersPage}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="globe" size={20} color={color}></Ionicons>
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="book" size={20} color={color}></Ionicons>
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingPage}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons name="settings" size={20} color={color}></Ionicons>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
