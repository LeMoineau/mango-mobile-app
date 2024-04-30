import RoundedButton from "@/common/components/buttons/RoundedButton";
import Gradient, {
  GradientDirection,
} from "@/common/components/image/Gradient";
import LoadingText from "@/common/components/text/LoadingText";
import ThemedText from "@/common/components/text/ThemedText";
import { useSettingsStore } from "@/common/store/settings.store";
import { useNavigationType } from "@/common/types/navigation/NavigationTypes";
import { style } from "@/common/utils/style-utils";
import { useNavigation, useTheme } from "@react-navigation/native";
import { View } from "react-native";

export default function ChapterReaderHeader({
  chapterTitle,
  onMenuButtonPress,
}: {
  chapterTitle?: string;
  onMenuButtonPress?: () => void;
}) {
  const theme = useTheme();
  const navigation: useNavigationType = useNavigation();
  const { get } = useSettingsStore();

  return (
    <>
      {!get("chapterReaderHasHeader") ? (
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
          <RoundedButton
            prependIcon="arrow-back"
            styleProp={[{ backgroundColor: theme.colors.background }]}
            onPress={() => navigation.goBack()}
          ></RoundedButton>
          <RoundedButton
            prependIcon="menu"
            styleProp={[{ backgroundColor: theme.colors.background }]}
            onPress={onMenuButtonPress}
          ></RoundedButton>
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
              <RoundedButton
                prependIcon="arrow-back"
                onPress={() => {
                  navigation.goBack();
                }}
              ></RoundedButton>
              {chapterTitle ? (
                <ThemedText style={[{ fontSize: 15 }]}>
                  {chapterTitle}
                </ThemedText>
              ) : (
                <LoadingText></LoadingText>
              )}
            </View>
            <View style={[]}>
              <RoundedButton
                prependIcon="menu"
                prependIconStyle={[{ fontSize: 25 }]}
                onPress={onMenuButtonPress}
              ></RoundedButton>
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
