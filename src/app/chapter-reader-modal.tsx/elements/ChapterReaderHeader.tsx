import RounedButton from "@/common/components/buttons/RoundedButton";
import Gradient, {
  GradientDirection,
} from "@/common/components/image/Gradient";
import LoadingText from "@/common/components/text/LoadingText";
import ThemedText from "@/common/components/text/ThemedText";
import { useSettingsStore } from "@/common/store/settings.store";
import { useNavigationType } from "@/common/types/NavigationTypes";
import { style } from "@/common/utils/style-utils";
import { useNavigation, useTheme } from "@react-navigation/native";
import ChapterViewer from "@shared/types/chapterViewer";
import { View } from "react-native";

export default function ChapterReaderHeader({
  chapterViewer,
  onMenuButtonPress,
}: {
  chapterViewer?: ChapterViewer;
  onMenuButtonPress?: () => void;
}) {
  const theme = useTheme();
  const navigation: useNavigationType = useNavigation();
  const { readerHeaderHide } = useSettingsStore();

  return (
    <>
      {readerHeaderHide ? (
        <View
          style={[
            style.flexRow,
            style.justifyBetween,
            {
              width: "100%",
              zIndex: 10,
              paddingHorizontal: 10,
              paddingTop: 5,
            },
          ]}
        >
          <RounedButton
            prependIcon="arrow-back"
            styleProp={[{ backgroundColor: theme.colors.background }]}
            onPress={() => navigation.goBack()}
          ></RounedButton>
          <RounedButton
            prependIcon="menu"
            styleProp={[{ backgroundColor: theme.colors.background }]}
            onPress={onMenuButtonPress}
          ></RounedButton>
        </View>
      ) : (
        <View
          style={[
            {
              width: "100%",
              zIndex: 10,
              height: 50,
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          <View
            style={[
              style.flexRow,
              style.justifyBetween,
              style.itemsCenter,
              { paddingHorizontal: 10 },
            ]}
          >
            <View
              style={[
                style.flexRow,
                style.itemsCenter,
                style.overflowHidden,
                { flex: 1, justifyContent: "flex-start" },
              ]}
            >
              <RounedButton
                prependIcon="arrow-back"
                onPress={() => {
                  navigation.goBack();
                }}
              ></RounedButton>
              {chapterViewer ? (
                <ThemedText style={[{ fontSize: 15 }]}>
                  {chapterViewer.title}
                </ThemedText>
              ) : (
                <LoadingText></LoadingText>
              )}
            </View>
            <View style={[]}>
              <RounedButton
                prependIcon="menu"
                prependIconStyle={[{ fontSize: 25 }]}
                onPress={onMenuButtonPress}
              ></RounedButton>
            </View>
          </View>
          <Gradient
            width={"100%"}
            height={30}
            direction={GradientDirection.TOP_TO_BOTTOM}
            style={[{ position: "absolute", top: 50 }]}
          ></Gradient>
        </View>
      )}
    </>
  );
}
