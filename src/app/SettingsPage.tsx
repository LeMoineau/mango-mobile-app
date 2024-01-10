import { ScrollView, View } from "react-native";
import { useSettingsStore } from "../common/store/settings.store";
import Title from "../common/components/text/Title";
import ToggleSettingItem from "../common/components/item/ToggleSettingItem";

export default function SettingPage() {
  const settingsStore = useSettingsStore();

  return (
    <View style={[{ flex: 1, paddingHorizontal: 10 }]}>
      <ScrollView style={[{ height: "auto" }]}>
        <Title hasDivider>Settings</Title>
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
      </ScrollView>
    </View>
  );
}
