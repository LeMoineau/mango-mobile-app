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
import SelectSettingItem from "./elements/SelectSettingItem";
import { IntersiteMangaSearchSorting } from "../../common/types/filter/IntersiteMangaSearchFilter";
import ButtonSettingItem from "./elements/ButtonSettingItem";
import { useCacheStore } from "../../common/store/cache.store";

export default function SettingPage() {
  const { srcs, get, set } = useSettingsStore();
  const { fetch, get: getApiSettings } = useApi<ApiSettings>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );
  const { clear } = useCacheStore();

  const srcsFromServDifferentFromStored = (scrapersOnServ: SourceName[]) => {
    return scrapersOnServ.filter(
      (src) => !(get("srcs") as SourceName[]).find((s) => s === src)
    );
  };

  useEffect(() => {
    set("srcs", []);
    fetch("/settings").then((res) => {
      if (res) {
        const newSrcs = srcsFromServDifferentFromStored(res.scrapersEnabled);
        if (newSrcs.length > 0) {
          set("srcs", [...(get("srcs") as SourceName[]), ...newSrcs]);
        }
      }
    });
  }, []);

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
            srcs={srcs}
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
            title="Begin Scrap Manga Chapters from page 2"
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
        <SettingSection sectionName="Search Preferences" defaultMinimize>
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
          <SelectSettingItem
            title="Default Sorting"
            options={[
              { label: "Group By Manga", iconName: "sort" },
              { label: "By Sources", iconName: "sort" },
            ]}
            currentSelectedOption={
              get("defaultSortingInSearch") as IntersiteMangaSearchSorting
            }
            onChange={(val) => {
              set("defaultSortingInSearch", val as IntersiteMangaSearchSorting);
            }}
          ></SelectSettingItem>
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
          <ButtonSettingItem
            title="Vider le cache"
            onPress={async () => {
              await clear();
            }}
          ></ButtonSettingItem>
          {/* <ToggleSettingItem
            title="Vider le cache"
            hasSwitch={false}
          ></ToggleSettingItem> */}
        </SettingSection>
        <View style={[{ height: 90 }]}></View>
      </ScrollView>
    </View>
  );
}
