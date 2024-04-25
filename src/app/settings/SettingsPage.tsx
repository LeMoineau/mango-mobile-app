import { ScrollView, View } from "react-native";
import { useSettingsStore } from "../../common/store/settings.store";
import Title from "../../common/components/text/Title";
import ToggleSettingItem from "./elements/ToggleSettingItem";
import { SourceName } from "@shared/types/primitives/Identifiers";
import useApi from "@shared/hooks/use-api";
import Config from "../../common/config/Config";
import { useEffect } from "react";
import SettingSection from "./elements/SettingSection";
import SourceSettingList from "./elements/SourceSettingList";
import { ApiSettings } from "../../../../shared/src/types/config/ApiSettings";

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
        <SettingSection sectionName="Scraping Preferences">
          <ToggleSettingItem title="Auto-Scrap Preferred Source"></ToggleSettingItem>
          <ToggleSettingItem title="Auto-Scrap Manga Infos"></ToggleSettingItem>
          <ToggleSettingItem title="Auto-Scrap when image not found in manga infos"></ToggleSettingItem>
          <ToggleSettingItem title="Auto-Scrap when image not found in search"></ToggleSettingItem>
          <ToggleSettingItem title="Auto-Scrap in search"></ToggleSettingItem>
        </SettingSection>
      </ScrollView>
    </View>
  );
}
