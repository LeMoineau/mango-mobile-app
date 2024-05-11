import { ActivityIndicator, View } from "react-native";
import { UUID } from "../../../shared/src/types/primitives/Identifiers";
import ThemedText from "../../../common/components/text/ThemedText";
import RoundedButton from "../../../common/components/buttons/RoundedButton";
import { useTheme } from "@react-navigation/native";
import { style } from "../../../common/utils/style-utils";
import Divider from "../../../common/components/text/Divider";

export default function LatestChapterFooter({
  noMoreChapters,
  mangaAllowed,
  currentPage,
  onPressLoadMoreBtn,
}: {
  noMoreChapters: boolean;
  mangaAllowed: UUID[];
  currentPage: number;
  onPressLoadMoreBtn?: () => void;
}) {
  const theme = useTheme();
  return (
    <>
      <View style={[style.flexRow, style.itemsCenter]}>
        <View style={[{ flex: 1 }]}>
          <Divider></Divider>
        </View>
        <ThemedText style={[{ color: theme.colors.border }]}>
          page {currentPage}
        </ThemedText>
        <View style={[{ flex: 1 }]}>
          <Divider></Divider>
        </View>
      </View>
      {noMoreChapters ? (
        <ThemedText>No more chapters...</ThemedText>
      ) : (
        <View
          style={[
            style.flexRow,
            style.justifyCenter,
            { paddingTop: 15, paddingBottom: 50 },
          ]}
        >
          {mangaAllowed.length > 0 ? (
            <RoundedButton
              styleProp={[{ backgroundColor: theme.colors.primary }]}
              color={theme.colors.text}
              content="Load more"
              onPress={() => onPressLoadMoreBtn && onPressLoadMoreBtn()}
            ></RoundedButton>
          ) : (
            <ActivityIndicator
              size="large"
              style={{ paddingBottom: 20 }}
              color={theme.colors.primary}
            />
          )}
        </View>
      )}
    </>
  );
}
