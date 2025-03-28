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
import { StatusBar, View } from "react-native";
import Home from "./home/Home";
import ChapterReaderPage from "./chapter-reader/ChapterReaderPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntersiteMangaInfosPage from "./intersite-manga-infos/IntersiteMangaInfosPage";
import IntersiteMangaSearchPage from "./intersite-manga-search/IntersiteMangaSearchPage";
import DotsOptionsPage from "./dots-options/DotsOptionsPage";
import AddingInFavoritesListPage from "./adding-in-favorites-list/AddingInFavoritesListPage";
import FavoritesListInfosPage from "./favorites-list-infos/FavoritesListInfosPage";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialRouteName="Home"
      tabBar={(props) => <CustomTopBar {...props} />}
      pagerStyle={{ flex: 1 }}
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
  );
}

export default function Index() {
  const { get } = useSettingsStore();

  return (
    <View style={[{ flex: 1 }]}>
      <NavigationContainer
        theme={get("theme") === "dark" ? DarkTheme : DefaultTheme}
      >
        <StatusBar backgroundColor={DarkTheme.colors.background}></StatusBar>
        <Stack.Navigator
          initialRouteName="App"
          screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
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
          />
          <Stack.Screen
            name="DotsOptions"
            component={DotsOptionsPage}
            options={{
              presentation: "transparentModal",
            }}
          />
          <Stack.Screen
            name="IntersiteMangaSearch"
            component={IntersiteMangaSearchPage}
          />
          <Stack.Screen
            name="AddingInFavoritesList"
            component={AddingInFavoritesListPage}
            options={{
              presentation: "transparentModal",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="FavoritesListInfos"
            component={FavoritesListInfosPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
