import { ActivityIndicator, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import ThemedText from "../../../common/components/text/ThemedText";
import RounedButton from "../../../common/components/buttons/RoundedButton";
import { useTheme } from "@react-navigation/native";

export default function IntersiteMangaInfosFooter({
  loading,
  chaptersFullyLoaded,
  chaptersLoading,
  refreshing,
  onPressRefreshBtn,
}: {
  loading: boolean;
  chaptersFullyLoaded: boolean;
  chaptersLoading: boolean;
  refreshing: boolean;
  onPressRefreshBtn?: () => void;
}) {
  const theme = useTheme();
  return (
    <>
      {loading || !chaptersFullyLoaded || chaptersLoading ? (
        <ActivityIndicator size={"large"}></ActivityIndicator>
      ) : (
        <View
          style={[
            style.flexCol,
            style.justifyCenter,
            style.itemsCenter,
            { paddingVertical: 10 },
          ]}
        >
          <ThemedText>Seems that there are no more chapters...</ThemedText>
          <View style={[{ height: 10 }]}></View>
          <RounedButton
            appendIcon={refreshing ? undefined : "refresh"}
            content={refreshing ? "REFRESHING" : "REFRESH"}
            contentStyle={[{ fontWeight: "500" }]}
            styleProp={[
              {
                backgroundColor: refreshing
                  ? theme.colors.border
                  : theme.colors.primary,
              },
            ]}
            onPress={() => {
              if (refreshing) return;
              onPressRefreshBtn && onPressRefreshBtn();
            }}
          ></RounedButton>
        </View>
      )}
      <View style={[{ height: 50 }]}></View>
    </>
  );
}
