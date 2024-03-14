import { FlatList, ScrollView, View } from "react-native";
import { useSettingsStore } from "../../common/store/settings.store";
import Title from "../../common/components/text/Title";
import ToggleSettingItem from "./elements/ToggleSettingItem";
import { SourceName } from "@shared/types/primitives/id";
import useApi from "@shared/hooks/use-api";
import Config from "../../common/config/Config";
import { useEffect } from "react";
import SettingSection from "./elements/SettingSection";
import SourceSettingList from "./elements/SourceSettingList";

export default function SettingPage() {
  const settingsStore = useSettingsStore();
  const { fetch, get } = useApi<{ scrapersEnabled: SourceName[] }>(
    Config.getEnv().MANGO_SCRAPER_API_ENDPOINT
  );

  useEffect(() => {
    fetch("/settings");
  });

  return (
    <View style={[{ flex: 1, paddingHorizontal: 10 }]}>
      {/* <FlatList
        ListHeaderComponent={<Title hasDivider>Settings</Title>}
        data={[
          <SettingSection sectionName="Appearance">
            <ToggleSettingItem
              icon="moon"
              title="Mode Sombre"
              defaultValue={settingsStore.theme === "dark"}
              onPress={async (darkModeDisabled) => {
                if (darkModeDisabled) {
                  await settingsStore.setTheme("light");
                } else {
                  await settingsStore.setTheme("dark");
                }
              }}
            ></ToggleSettingItem>
          </SettingSection>,
          <SettingSection
            sectionName="Sources"
            description="Sources sorted from most trusted to least trusted"
          >
            <SourceSettingList
              srcs={settingsStore.srcs}
              srcsEnabled={get()?.scrapersEnabled}
              onChange={(srcs) => {
                settingsStore.setSourcesOrder(srcs);
              }}
            ></SourceSettingList>
          </SettingSection>,
        ]}
        renderItem={({ item }) => item}
        keyExtractor={(_, index) => `setting-flat-list-item-${index}`}
      ></FlatList> */}
      <ScrollView style={[{ height: "auto" }]}>
        <Title hasDivider>Settings</Title>
        <SettingSection sectionName="Appearance">
          <ToggleSettingItem
            icon="moon"
            title="Mode Sombre"
            defaultValue={settingsStore.theme === "dark"}
            onPress={async (darkModeDisabled) => {
              if (darkModeDisabled) {
                await settingsStore.setTheme("light");
              } else {
                await settingsStore.setTheme("dark");
              }
            }}
          ></ToggleSettingItem>
        </SettingSection>
        <SettingSection
          sectionName="Sources"
          description="Sources sorted from most trusted to least trusted"
        >
          <SourceSettingList
            srcs={settingsStore.srcs}
            srcsEnabled={get()?.scrapersEnabled}
            onChange={(srcs) => {
              settingsStore.setSourcesOrder(srcs);
            }}
          ></SourceSettingList>
        </SettingSection>
      </ScrollView>
    </View>
  );
}
