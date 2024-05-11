import { ScrollView, View } from "react-native";
import { useSettingsStore } from "../../common/store/settings.store";
import Title from "../../common/components/text/Title";
import ToggleSettingItem from "./elements/ToggleSettingItem";
import { SourceName } from "../../shared/src/types/primitives/Identifiers";
import useApi from "../../shared/src/hooks/use-api";
import Config from "../../common/config/Config";
import { useEffect } from "react";
import SettingSection from "./elements/SettingSection";
import SourceSettingList from "./elements/SourceSettingList";
import { ApiSettings } from "../../shared/src/types/config/ApiSettings";

export default function SettingPage() {
  const { get, set } = useSettingsStore();
  const { fetch, get: getApiSettings } = useApi<ApiSettings>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );

  useEffect(() => {
    fetch("/settings");
  });

  return (
    <View style={[{ flex: 1, paddingHorizontal: 10 }]}>
      <ScrollView style={[{ height: "auto" }]}>
        <Title hasDivider>Settings</Title>
        <SettingSection sectionName="Appearance">
          <ToggleSettingItem
            icon="moon"
            title="Mode Sombre"
            defaultValue={get("theme") === "dark"}
            onPress={async (darkModeDisabled) => {
              if (darkModeDisabled) {
                await set("theme", "light");
              } else {
                await set("theme", "dark");
              }
            }}
          ></ToggleSettingItem>
        </SettingSection>
        <SettingSection
          sectionName="Sources"
          description="Sources sorted from most trusted to least trusted"
        >
          <SourceSettingList
            srcs={get("srcs") as SourceName[]}
            srcsEnabled={getApiSettings()?.scrapersEnabled}
            onChange={(srcs) => {
              set("srcs", srcs);
            }}
          ></SourceSettingList>
        </SettingSection>
        <SettingSection sectionName="Scraping Preferences" defaultMinimize>
          <ToggleSettingItem
            title="Auto-Scrap Manga Infos"
            defaultValue={get("autoScrapMangaInfos") === true}
            onPress={(val) => set("autoScrapMangaInfos", !val)}
          ></ToggleSettingItem>
          <ToggleSettingItem
            title="Auto-Scrap when image not found in manga infos"
            defaultValue={
              get("autoScrapWhenImageNotFoundInMangaInfos") === true
            }
            onPress={(val) =>
              set("autoScrapWhenImageNotFoundInMangaInfos", !val)
            }
          ></ToggleSettingItem>
          <ToggleSettingItem
            title="Auto-Scrap in search"
            defaultValue={get("autoScrapInSearch") === true}
            onPress={(val) => set("autoScrapInSearch", !val)}
          ></ToggleSettingItem>
          <ToggleSettingItem
            title="Auto-Scrap when image not found in search"
            defaultValue={get("autoScrapWhenImageNotFoundInSearch") === true}
            onPress={(val) => set("autoScrapWhenImageNotFoundInSearch", !val)}
          ></ToggleSettingItem>
        </SettingSection>
        <SettingSection sectionName="Favorites Preferences" defaultMinimize>
          <ToggleSettingItem
            title="When adding in favList, not close after one add"
            defaultValue={get("notClosingAfterAddingMangaInList") === true}
            onPress={(val) => set("notClosingAfterAddingMangaInList", !val)}
          ></ToggleSettingItem>
          <ToggleSettingItem
            title="Default favList item state expanded"
            defaultValue={get("defaultFavoritesListItemExpanded") === true}
            onPress={(val) => set("defaultFavoritesListItemExpanded", !val)}
          ></ToggleSettingItem>
          <ToggleSettingItem
            title="Open Manga Infos on manga avatar press"
            defaultValue={get("openMangaInfosOnMangaAvatarPress") === true}
            onPress={(val) => set("openMangaInfosOnMangaAvatarPress", !val)}
          ></ToggleSettingItem>
        </SettingSection>
        <SettingSection sectionName="Cache Preferences" defaultMinimize>
          {/* <ToggleSettingItem
            title="When adding in favorites, save mangas info"
            defaultValue={get("saveMangaWhenAddingInFavorites") === true}
            onPress={(val) => set("saveMangaWhenAddingInFavorites", !val)}
          ></ToggleSettingItem> */}
          <ToggleSettingItem
            title="Auto-Scrap when image not found in saved manga"
            defaultValue={get("autoScrapWhenImageNotFoundInCache") === true}
            onPress={(val) => set("saveMangaWhenAddingInFavorites", !val)}
          ></ToggleSettingItem>
          <ToggleSettingItem
            title="Vider le cache"
            hasSwitch={false}
          ></ToggleSettingItem>
        </SettingSection>
        <View style={[{ height: 90 }]}></View>
      </ScrollView>
    </View>
  );
}
