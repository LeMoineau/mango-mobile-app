import { ActivityIndicator, View } from "react-native";
import { style } from "../../../common/utils/style-utils";
import ThemedText from "../../../common/components/text/ThemedText";
import RoundedButton from "../../../common/components/buttons/RoundedButton";
import { useTheme } from "@react-navigation/native";
import { colors } from "../../../shared/src/config/enums/Colors";

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
      {(loading || chaptersLoading) && (
        <ActivityIndicator size={"large"}></ActivityIndicator>
      )}
      <View
        style={[
          style.flexCol,
          style.justifyCenter,
          style.itemsCenter,
          { paddingVertical: 10 },
        ]}
      >
        {chaptersFullyLoaded && (
          <>
            <View style={[{ height: 10 }]}></View>
            <ThemedText>Seems that there are no more chapters...</ThemedText>
          </>
        )}
        <View style={[{ height: 10 }]}></View>
        <RoundedButton
          appendIcon={refreshing || chaptersLoading ? undefined : "refresh"}
          content={refreshing || chaptersLoading ? "LOADING" : "REFRESH"}
          contentStyle={[{ fontWeight: "500" }]}
          color={colors.white}
          styleProp={[
            {
              backgroundColor:
                refreshing || chaptersLoading
                  ? theme.colors.border
                  : theme.colors.primary,
            },
          ]}
          onPress={() => {
            if (refreshing || chaptersLoading) return;
            onPressRefreshBtn && onPressRefreshBtn();
          }}
        ></RoundedButton>
      </View>
      <View style={[{ height: 50 }]}></View>
    </>
  );
}
