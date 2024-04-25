import "react-native-gesture-handler";
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
import ChapterReaderPage from "./chapter-reader-modal.tsx/ChapterReaderPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntersiteMangaInfosPage from "./intersite-manga-infos/IntersiteMangaInfosPage";
import IntersiteMangaSearchPage from "./intersite-manga-search/IntersiteMangaSearchPage";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function AppNavigator() {
  const inset = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  return (
    <>
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
    </>
  );
}

export default function Index() {
  const settingsStore = useSettingsStore();

  return (
    <View style={[{ flex: 1 }]}>
      <NavigationContainer
        theme={settingsStore.theme === "dark" ? DarkTheme : DefaultTheme}
      >
        <StatusBar hidden></StatusBar>
        <Stack.Navigator
          initialRouteName="App"
          screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        >
          <Stack.Screen
            name="App"
            component={AppNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ChapterReader" component={ChapterReaderPage} />
          <Stack.Screen
            name="IntersiteMangaInfo"
            component={IntersiteMangaInfosPage}
            options={{ animation: "fade_from_bottom" }}
          />
          <Stack.Screen
            name="IntersiteMangaSearch"
            component={IntersiteMangaSearchPage}
            options={{ animation: "fade_from_bottom" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
